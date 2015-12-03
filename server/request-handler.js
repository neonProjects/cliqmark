var fs = require('fs');
var md5 = require('md5');
var util = require('./utility');
var jwt = require('jsonwebtoken');
var db = require('./db/schema');
var path = require('path');

var config = {
  shotpath: './server/shots/',
  secret: 'cliqmark is ruling the universe'
};

exports.getImage = function(req, res) {
  // get and return snapshot image of bookmarked page
  var options = {
    root: __dirname + '/shots',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.code;
  console.log('filename: ',fileName);

  res.sendFile(fileName + '.org.png', options, function (err) {
    if (err) {
      console.log('error');
      res.sendFile('no_screenshot.png', options);
    }
    else {
      console.log('Sent:', fileName);
    }
  });
};

exports.signupUserForm = function(req, res) {
  // show signup form
};

exports.loginUserForm = function(req, res) {
  // show login form
  var pathToIndex = req.params[0] ? req.params[0] : 'index.html';
  res.sendfile(pathToIndex, {root: path.join(__dirname, '../client')});
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

  var userId = req.query.userId;
  console.log('userId: ', userId)
  db.getBookmarks(userId, function(err, bookmarks) {
    if (err) {
      // console.log('error gettign bookmark')
      res.status(401).send(err);
    } else {
      res.status(200).send(bookmarks);
    }
  });
};

exports.addBookmark = function(req, res) {
  var url = req.body.url;
  var userId = req.body.userId;
  var taxonomyResult = util.taxonomy(url);
  console.log("I AM LOGGING TAXONOMYRESULT", taxonomyResult);
  console.log('url: ',url);
  console.log(userId);

  if (!url) { return res.status(401).send('no url'); }
  if (!userId) { return res.status(401).send('no user'); }

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
      if(taxonomyResult === undefined){
        taxonomyResult = 'other';
      }
      exports.addTag(req, res, taxonomyResult, bookmarkId);

    });
  });
};

exports.deleteBookmark = function(req, res) {
  //todo: add this functionality to client
  var bookmarkId = req.body.bookmarkId;

  db.removeBookmark(bookmarkId, function(err) {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send('deleted');
    }
  });
};

exports.addTag = function(req, res, tagName, bookmarkId) {
  //todo: add this functionality to client

  db.addTag(tagName, bookmarkId, function(err, tagId) {
    if (err) {
      res.status(401).send(err);
    } else {
      var bmTag = {
        bookmarkId: bookmarkId,
        tagId: tagId
      };
      res.status(200).send(bmTag);
    }
  });
};

exports.deleteTag = function(req, res) {
  //todo: add this functionality to client
  var tagId = req.body.tagId;
  // var tagName = req.body.tagName;
  var bookmarkId = req.body.bookmarkId;

  db.removeTag(tagId, bookmarkId, function(err) {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send('deleted');
    }
  });
};

exports.loginUser = function(req, res) {
  //basic mechanism of auth exists at server level
  //client / chrome-extension architecture needs to be built
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
      var token = jwt.sign(user, config.secret, {
        expiresInMinutes: 6000
      });
      res.json({ success: true, userId: userId, message: 'user authenticated', token: token });
      //util.createSession(req, res, user);
      //res.status(200).send(user);
    }
  });
};

exports.signupUser = function(req, res) {
  console.log(req.body);
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
      console.log(user);
      var token = jwt.sign(user, config.secret, {
        expiresInMinutes: 6000
      });
      res.json({ success: true, userId: userId, message: 'user authenticated', token: token });
      //util.createSession(req, res, user);
      //res.status(200).send(user);
    }
  });
};
