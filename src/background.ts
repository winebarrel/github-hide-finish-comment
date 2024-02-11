export async function hideComment() {
  const approveElem = document.querySelector(
    "input#pull_request_review\\[event\\]_approve",
  ) as HTMLInputElement;

  if (!approveElem) {
    return;
  }

  const approve = approveElem as HTMLInputElement;

  if (approve.disabled) {
    return;
  }

  const commentElem = document.querySelector(
    "input#pull_request_review\\[event\\]_comment",
  );

  if (!commentElem) {
    return;
  }

  const comment = commentElem as HTMLInputElement;
  comment.checked = false;
  comment.parentElement?.remove();
  approve.checked = true;
}

const rURL = new RegExp("^https://github.com/[^/]+/[^/]+/pull/[0-9]+/files$");

chrome.tabs.onUpdated.addListener(async (tabId, props, tab) => {
  if (props.status == "complete" && tab.url?.match(rURL)) {
    chrome.scripting.executeScript({
      target: { tabId },
      func: hideComment,
    });
  }
});
