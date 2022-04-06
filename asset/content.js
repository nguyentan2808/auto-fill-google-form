const getResult = () => {
  let listResult = [];
  const listCard = document.querySelectorAll('div[role="listitem"]');

  for (const card of listCard) {
    const question = card.querySelector('div[role="heading"]').textContent;
    const answer = card.querySelector('[aria-checked="true"]')?.parentNode.parentNode.textContent;

    if (question && answer) {
      listResult.push({
        question,
        answer,
      });
    }
  }

  return listResult;
};

chrome.runtime.onMessage.addListener(function (request) {
  if (request.type === 'fillAnswer') {
    const { listResult } = request;
    for (const item of listResult) {
      const listMatch = document.querySelectorAll(`[data-value="${item.answer}"]`);
      for (const match of listMatch) {
        const card = match.closest('[role="listitem"]');
        if (card.textContent.includes(item.question)) {
          match.click();
        }
      }
    }

    alert('Done!');
  } else if (request.type === 'getAnswer') {
    const listResult = getResult();
    chrome.runtime.sendMessage({ listResult });
  }
});
