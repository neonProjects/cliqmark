var Sequelize = require('sequelize');
var sequelize = new Sequelize('cliqmark', 'username', 'password', {
  host: process.ENV.port
});
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

//create a Users table
var User = sequelize.define('users', {
  userId: Sequelize.UUID,
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: Sequelize.STRING
});

//create a Bookmarks table
var Bookmark = sequelize.define('bookmarks', {
  bookmarkId: Sequelize.UUID,
  title: Sequelize.STRING,
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  baseUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  snapshotUrl: Sequelize.STRING, //URL from server
  text: Sequelize.Text
}); 

//create Tags table
var Tag = sequelize.define('tags', {
  tagId: Sequelize.UUID,
  tagName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

//create the tables if they don't exist
sequelize.sync();

//CREATE RELATIONS

//Bookmarks have one user, users have many bookmarks
Bookmark.hasOne(User);
//Bookmarks have many tags, and tags have many bookmarks
Bookmark.belongsToMany(Tag, { through: "BookmarkTags" });
Tag.belongsToMany(Bookmark, { through: "BookmarkTags" });


//////////////////////////////////////////
//HELPER FUNCTIONS FOR QUERYING DATABASE//
//////////////////////////////////////////

//check if user exists, and create a new user with a hashed password
var createUser = function(user, pw, callback) {
  User.findOne({ where: {
    username: user,
  }).success(function(user) {
    if (user) {
      callback(function(err) {
        console.log("Username already taken")
      });
    } else {
      return bcrypt.hash(pw, null, null).then(function(hash) {
        User.create({ username: user, password: hash }).success(function(user) {
          if (user) {
            callback(null, user.userId);
          } else {
            callback(function() {
              console.log("Unable to create user.")
            });
          }
        });
      });
    }
  });

};

//Check if user exists, check if password is correct, and pass a boolean to the callback
var authUser = function(user, password, callback) {
  User.findOne({ where: { username: user } }).success(function(user) {
    if (!user) {
      callback(function() {
        console.log("Incorrect username or password.")
      })
    } else {
      bcrypt.compare(password, user.password, function(err, passwordMatch) {
        if (err) {
          callback(err);
        } else {
          callback(null, passwordMatch);
        }
      });
    }
  });
};

//check if bookmark exists, and create a new bookmark
var createBookmark = function(userId, title, url, snapshotUrl, baseUrl, text, callback) {
  Bookmark.findOrCreate({
    userId: userId,
    title: title,
    url: url,
    snapshotUrl: snapshotUrl,
    baseUrl: baseUrl,
    text: text
  }).success(function(bookmark, created) {
    if (created) {
      callback(null, bookmark.bookmarkId);
    } else {
      callback(function() {
        console.log("You've already bookmarked this page.");
      });
    }
  });
};

//get all bookmarks with a the logged in users ID
var getBookmarks = function(userId, callback) {
  Bookmark.findAll({ where: { userId: userId } }).then(function(bookmarks) {
    if (bookmarks.length) {
      callback(null, bookmarks);
    } else {
      callback(function() {
        console.log("We didn't find any bookmarks.");
      });
    }
  })
};

//remove a bookmark with the given bookmark ID
var removeBookmark = function(bookmarkId, callback) {
  Bookmark.findOne({ where: { bookmarkId: bookmarkId } }).then(function(bookmark) {
    bookmark.destroy().then(function() {
      if (bookmark) {
        callback(function() {
          console.log("Could not delete bookmark.");
        })
      }
    })
  })
};

// callback has (err) argument, only passed when error occurs
var addTag = function(tagName, bookmark, callback) {
  Tag.findOrCreate({ where: { tagName: tagname }}).success(function(tag, created) {
    tag.addBookmark(bookmark, { where: { bookmarkId: bookmarkId }}).then(function(tag) {
      if (!tag) {
        callback(function() {
          console.log("Could not add tag.")
        })
      } else {
        callback(null, tag.tagName)
      }
    }
  })
};

//  callback has (err) arguments
var removeTag = function(tagName, bookmarkId, callback) {
  Tag.findOne({ where: { tagName: tagName } }).then(function(tag) {
    tag.destroy().then(function() {
      if (tag) {
        console.log("Could not remove tag.")
      } else
    });
  });
};
