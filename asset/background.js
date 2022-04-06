chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request?.listResult.length > 0) {
    const { listResult } = request;
    chrome.tabs.query({}, function (tabs) {
      for (const tab of tabs) {
        if (tab.url.includes('https://docs.google.com/forms') && tab.url.includes('formResponse')) {
          chrome.tabs.sendMessage(tab.id, { type: 'fillAnswer', listResult });
        }
      }
    });
  }
});
