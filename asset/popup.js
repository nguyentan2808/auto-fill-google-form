document.getElementById('get').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].url.includes('https://docs.google.com/forms')) {
      const payload = {
        type: 'getAnswer',
      };
      chrome.tabs.sendMessage(tabs[0].id, payload);
    } else {
      alert('Please open the form has filled answer in Google Docs');
    }
  });
});
