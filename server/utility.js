var request = require('request');
var cheerio = require('cheerio');
var md5 = require('md5');
var urlToImage = require('url-to-image');
var easyimg = require('easyimage');
var sanitizeHtml = require('sanitize-html');
var Promise = require('bluebird');
//Create the AlchemyAPI object
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();
var alch = Promise.promisifyAll(alchemyapi);



var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

exports.getPageInfo = function(url, callback) {
  var id = md5(url); //to use as filename of snapshot of webpage

  request.get(url, function(err, response, html) {
    if (!err) {

      var page = { title: '', url: url, snapshot: '' };
      var titleFilter = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
      var match = titleFilter.exec(html);
      if (match && match[2]) {
         page.title = match[2];
      }

      var $ = cheerio.load(html);
      var text = page.title + ' ' + sanitizeHtml($('body').html(), { allowedTags: [],allowedAttributes: [] });

      // leave only alphanumeric characters
      text = text.replace(/\s+/g, " ")
             .replace(/[^a-zA-Z ]/g, " ")
             .toLowerCase();

      // split on spaces for a list of all the words on that page and
      // loop through that list
      var arrText = text.split(" ");
      var corpus = {};

      arrText.forEach(function (word, index) {
        word = word.trim();

        // we don't want to include very short or long words, as they're
        // probably bad data
        if (word.length > 3 && word.length < 20) {
          arrText[index] = word;

          if (corpus[word]) {
            corpus[word]++;
          } else {
            corpus[word] = 1;
          }
        } else {
          arrText[index] = '';
        }
      });

      // remove empty elements
      arrText = arrText.filter(Boolean);
      text = arrText.join(' ');
      page.text = text;
      page.corpus = corpus;

      page.snapshot = id + '.png';
      page.createdAt = new Date();

      callback(page);
    }
  });
};

exports.getPageSnapshot = function(url, snapshotPath) {

  var options = {
      width: 1280,
      height: 800,
      // Give a short time to load additional resources
      requestTimeout: 300
  };

  urlToImage(url, snapshotPath + '.org.png', options)
  .then(function() {
    console.log('snapshot taken');

    easyimg.crop({
      src: snapshotPath + '.org.png', dst:snapshotPath + '.1280.png',
      cropwidth:1280, cropheight:1280,
      gravity: 'North',
      x:0, y:0
    })
    .then(function(image) {
      easyimg.resize({
        src:snapshotPath + '.1280.png',
        dst:snapshotPath,
        width:300,
        height:00
      })
      .then(function(image) {
        console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
      })
      .catch(function (err) {
        console.log(err);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
  })
  .catch(function(err) {
    console.error(err);
  });
};

exports.isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next) {
  if (!exports.isLoggedIn(req)) {
    console.log('failed to auth');
    res.redirect('/login');
  } else {
    console.log('authenticated');
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      // res.redirect('/');
    });
};


exports.taxonomy = function(url){
  var result;
  console.log('alch: ',alch)
  return alch.taxonomyAsync('url', url, {}).then(function(response){

    //console.log('taxonomy: ', response.taxonomy);
    var arr = response.taxonomy;
    for(var i = 0; i < arr.length; i++){
      if((arr[i]['score']) >= 0.75){
        return arr[i]['label'].match(/\/(.+?)(?=\/)/)[1];

        //console.log(arr[0]['label'].match(/\/(.+?)(?=\/)/));

      }
    }

  })
}
