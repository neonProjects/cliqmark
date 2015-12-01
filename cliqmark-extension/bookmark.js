// This is the context script that runs in the browser window (Not the extension) and has 
// access to user session info on window.localStorage
chrome.runtime.sendMessage({userId: window.localStorage.cliqmark_user}, function(response) {
  console.log('response received');
});