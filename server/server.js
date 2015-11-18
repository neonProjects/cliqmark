var express = require('express');
var session = require('express-session');
var handler = require('./request-handler');
var parser = require('body-parser');
var app = express();
var path = require('path');
var morgan = require('morgan');
var util = require('./utility');

app.use(session({
  secret: 'hrr9-neon rulezz',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(morgan('dev'));
app.use(parser.json());

// to serve angular app maybe, not implemented yet
app.get('/showBookmarks', /* util.checkUser,*/ handler.showBookmarks);

// expects 'url' and 'userId' in post body
app.post('/addBookmark', /* util.checkUser,*/ handler.addBookmark);
// expects 'bookmarkId' in post body
app.post('/deleteBookmark', /* util.checkUser,*/ handler.deleteBookmark);
// expects 'userId' in query (url: http://localhost:3000?userId=1)
app.get('/getBookmarks', /* util.checkUser,*/ handler.getBookmarks);

// expects 'tagName' and 'bookmarkId' in post body
app.post('/addTag', /* util.checkUser,*/ handler.addTag);
// expects 'tagId' and 'bookmarkId' in post body
app.post('/deleteTag', /* util.checkUser,*/ handler.deleteTag);

// planned to serve login page, not implemented yet
app.get('/login', handler.loginUserForm);
// expects 'username' and 'password' in post body
app.post('/login', handler.loginUser);
// logs out user
app.get('/logout', handler.logoutUser);

// planned to serve signup page, not implemented yet
app.get('/signup', handler.signupUserForm);
// expects 'username' and 'password' in post body
app.post('/signup', handler.signupUser);

app.use(express.static(path.join(__dirname, '../client')));

module.exports = app;
