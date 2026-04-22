chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "loading" || !tab.url) return;

  const { blockedSites = [] } = await chrome.storage.local.get("blockedSites");

  const url = new URL(tab.url);
  const domain = url.hostname.replace("www.", "");

  const match = blockedSites.find(site => site.domain === domain && site.enabled);

  if (match) {
    chrome.tabs.update(tabId, {
      url: "data:text/html,<h1 style='text-align:center;margin-top:20%'>🚫 Blocked</h1><p style='text-align:center'>This site is blocked.</p>"
    });
  }
});