
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('./db/schema');

var config = {
  shotpath: './server/shots/',
};


exports.signupUserForm = function(req, res) {
  // show signup form
};

exports.loginUserForm = function(req, res) {
  // show login form
};

exports.showBookmarks = function(req, res) {
  //show angular app
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.getBookmarks = function(req, res) {
  var userId = req.body.userId;
  db.getBookmarks(userId, function(err, bookmarks) {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(bookmarks);
    }
  });
};

exports.addBookmark = function(req, res) {
  var url = req.body.url;
  var userId = req.body.userId;

  if (!util.isValidUrl(url)) {
    console.log('Not a valid url: ', url);
    return res.status(404).send('Not a valid URL');
  }

  util.getPageInfo(url, function(page) {
    util.getPageSnapshot(url, config.shotpath + page.snapshot);

    db.createBookmark(userId, page.title, page.url, page.snapshot, '', page.text, function(err, bookmarkId){
      if (err) {
        res.status(401).send(err);
      } else {
        page.id = bookmarkId;
        res.status(200).send(page);
      }
    });
  });
};

exports.deleteBookmark = function(req, res) {
  var bookmarkId = req.body.bookmarkId;

  db.removeBookmark(bookmarkId, function(err) {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send('deleted');
    }
  });
};

exports.addTag = function(req, res) {
  var tagName = req.body.tagName;
  var bookmarkId = req.body.bookmarkId;

  db.addTag(tagName, bookmarkId, function(err, tagId) {
    if (err) {
      res.status(401).send(err);
    } else {
      var bmTag = {
        bookmarkId: bookmarkId,
        tagId: TagId
      };
      res.status(200).send(bmTag);
    }
  });
};

exports.deleteTag = function(req, res) {
  var tagId = req.body.tagId;
  var tagName = req.body.tagName;
  var bookmarkId = req.body.bookmarkId;

  db.removeTag(tagName, bookmarkId, function(err) {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send('deleted');
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  db.authUser(username, password, function(err, userId) {
    if (err) {
      res.status(401).send(err);
    } else {
      var user = {
        userId: userId,
        username: username
      };
      util.createSession(req, res, user);
      res.status(200).send(user);
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  db.createUser(username, password, function(err, userId) {
    if (err) {
      res.status(401).send(err);
    } else {
      var user = {
        userId: userId,
        username: username
      };
      util.createSession(req, res, user);
      res.status(200).send(user);
    }
  });
};

