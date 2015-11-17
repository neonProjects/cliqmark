var Sequelize = require('sequelize');
var sequelize = new Sequelize('cliqmark', 'username', 'password', {
  host: process.ENV.port
});

//create a Users table
var User = sequelize.define('users', {
  userId: Sequelize.UUID,
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

//create a Bookmarks table
var Bookmark = sequelize.define('bookmarks', {
  bookmarkId: Sequelize.UUID,
  title: Sequelize.STRING,
  url: Sequelize.STRING,
  baseUrl: Sequelize.STRING,
  snapshotUrl: Sequelize.STRING, //URL from server
  text: Sequelize.Text
}); 

//create Tags table
var Tag = sequelize.define('tags', {
  tagId = Sequelize.UUID,
  tagName = Sequelize.STRING
});

//create join tables
//Bookmarks have one user, users have many bookmarks
Bookmark.hasOne(User);
//Bookmarks have many tags, and tags have many bookmarks
Bookmark.belongsToMany(Tag, { through: "BookmarkTags" });
Tag.belongsToMany(Bookmark, { through: "BookmarkTags" });


//////////////////////////////////////////
//HELPER FUNCTIONS FOR QUERYING DATABASE//
//////////////////////////////////////////

createUser(username, password, callback); // callback has (err, userId) arguments
authUser(username, password, callback); // callback has (err, userId) arguments
createBookmark(userId, title, url, snapshotUrl, baseUrl, text, callback); //callback has (err, bookmarkId) arguments
getBookmarks(userId, callback); // callback has (err, bookmarks) arguments. bookmarks is array bookmark objects
removeBookmark(bookmarkId, callback); // callback has (err) argument, only passed when error occurs
addTag(tagName, bookmarkId, callback); //  callback has (err, tagId) arguments
removeTag(tagName, bookmarkId, callback); // callback has (err) arguments