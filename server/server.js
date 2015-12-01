var express = require('express');
var session = require('express-session');
var handler = require('./request-handler');
var parser = require('body-parser');
var app = express();
var path = require('path');
var morgan = require('morgan');
var util = require('./utility');
var cors = require('cors');
var jwt = require('jsonwebtoken');


// app.use(session({
//   secret: 'hrr9-neon rulezz',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));

app.use(cors());
app.use(morgan('dev'));
app.use(parser.json());

app.use(express.static(path.join(__dirname, '../client')));

// app.use('/app/*', function(req, res){
//   //var uid = req.params.uid;
//   var pathToIndex = req.params[0] ? req.params[0] : 'index.html';
//   res.sendfile(pathToIndex, { root: path.join(__dirname, '../client') });
// });


var routes = express.Router();

// planned to serve login page, not implemented yet
// routes.get('/login', handler.loginUserForm);
// routes.get('/login', function(req, res) {
//   return res.redirect('/#/login');
// });
// expects 'username' and 'password' in post body
routes.post('/login', handler.loginUser);
// logs out user
// routes.get('/logout', handler.logoutUser);

// planned to serve signup page, not implemented yet
// routes.get('/signup', handler.signupUserForm);
// expects 'username' and 'password' in post body
routes.post('/api/signup', handler.signupUser);


// serves to the image requests
routes.get('/bookmarks/:code', /* util.checkUser,*/ handler.getImage);

// expects 'url' and 'userId' in post body
routes.post('/addBookmark', /* util.checkUser,*/ handler.addBookmark);

// expects 'userId' in query (url: http://localhost:3000?userId=1)
routes.get('/getBookmarks', /* util.checkUser,*/ handler.getBookmarks);

// route middleware to verify a token
routes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['token'];

  // console.log(token);
  console.log(req.body);
  console.log(req.query);
  console.log(req.headers);

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'cliqmark is ruling the universe', function(err, decoded) {
      if (err) {
        // return res.redirect('/login');
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log(decoded);
        next();
      }
    });

  } else {

    // if there is no token
    // send to login page
    // return res.redirect('/login');
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

// routes.get('/bookmarks/', /* util.checkUser,*/ function(req, res) {
//   return res.redirect('/#/bookmarks');
// });


// to serve angular app maybe, not implemented yet
// routes.get('/showBookmarks', /* util.checkUser,*/ handler.showBookmarks);


// expects 'bookmarkId' in post body
routes.post('/deleteBookmark', /* util.checkUser,*/ handler.deleteBookmark);


// expects 'tagName' and 'bookmarkId' in post body
routes.post('/addTag', /* util.checkUser,*/ handler.addTag);
// expects 'tagId' and 'bookmarkId' in post body
routes.post('/deleteTag', /* util.checkUser,*/ handler.deleteTag);



//routes.use(express.static(path.join(__dirname, '../client')));  //todo: check this
app.use('/api', routes);

module.exports = app;
