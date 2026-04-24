const selectors = {
  reels: 'a[href="/reels/"], a[href*="reels"]',
  explore: 'a[href="/explore/"]'
};

function hideElements(type, hide) {
  const elements = document.querySelectorAll(selectors[type]);

  elements.forEach(el => {
    const parent = el.closest('li, div');
    if (parent) {
      parent.style.display = hide ? 'none' : '';
    }
  });
}

function applySettings(settings) {
  hideElements("reels", settings.hideReels);
  hideElements("explore", settings.hideExplore);
}

// Load saved settings
chrome.storage.sync.get(
  { hideReels: false, hideExplore: false },
  (settings) => {
    applySettings(settings);
  }
);

// Listen for updates from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "UPDATE_SETTINGS") {
    applySettings(msg.settings);
  }
});

// Handle Instagram dynamic navigation
const observer = new MutationObserver(() => {
  chrome.storage.sync.get(
    { hideReels: false, hideExplore: false },
    applySettings
  );
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});