var user;
//listen for message from app's index page
console.log("hello error 1");
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  //this will only be sent if user is logged in
  console.log("hello error");
  if (request.messageFromWeb.cliqmark_user) {
    console.log(request.messageFromWeb);
    //assign user the userId
    user = request.messageFromWeb.cliqmark_user
  }
});

var addBookmark = function(info, tab){
  console.log('info: ', info, 'tab: ', tab)
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://0.0.0.0:3000/api/addBookmark', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON with individual userID

  xhr.send(JSON.stringify({ userId: user, url: tab.url }));
  xhr.onloadend = function () {

  };

}


//creates right-clickable menu item
chrome.contextMenus.create({
   title: "CliqMark This Page",
   contexts:["all"],  // ContextType
  });

chrome.contextMenus.onClicked.addListener(addBookmark);
