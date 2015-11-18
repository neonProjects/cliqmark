var express = require('express');
var util = require('./utility');
var handler = require('./request-handler');

var app = express();

app.use(express.session());

app.get('/showBookmarks', /* util.checkUser,*/ handler.showBookmarks);
app.get('/addBookmark', /* util.checkUser,*/ handler.addBookmark);
app.get('/deleteBookmark', /* util.checkUser,*/ handler.deleteBookmark);
app.get('/getBookmarks', /* util.checkUser,*/ handler.getBookmarks);

app.get('/addTag', /* util.checkUser,*/ handler.addTag);
app.get('/deleteTag', /* util.checkUser,*/ handler.deleteTag);


app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

module.exports = app;
