chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.query({url: 'https://www.corporatehours.com/*'}, function(tabs) {
      if (tabs.length > 0) {
        chrome.tabs.executeScript(tabs[0].id, {file: 'content.js'});
      } else {
        chrome.tabs.create({url: 'http://www.corporatehours.com/User/Login?refurl=http://www.corporatehours.com/Project/TimeSheet/AddTimeSheet'});
      }
    });
  });
  