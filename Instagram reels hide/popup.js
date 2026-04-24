const reelsToggle = document.getElementById("reelsToggle");
const exploreToggle = document.getElementById("exploreToggle");

// Load saved state
chrome.storage.sync.get(
  { hideReels: false, hideExplore: false },
  (data) => {
    reelsToggle.checked = data.hideReels;
    exploreToggle.checked = data.hideExplore;
  }
);

// Save and notify content script
function updateSettings() {
  const settings = {
    hideReels: reelsToggle.checked,
    hideExplore: exploreToggle.checked
  };

  chrome.storage.sync.set(settings);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "UPDATE_SETTINGS",
      settings
    });
  });
}

reelsToggle.addEventListener("change", updateSettings);
exploreToggle.addEventListener("change", updateSettings);