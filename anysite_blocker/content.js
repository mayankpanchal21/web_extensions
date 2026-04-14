(async () => {
  const { blockedSites = [] } = await chrome.storage.local.get("blockedSites");

  const domain = location.hostname.replace("www.", "");

  const blocked = blockedSites.find(site => site.domain === domain && site.enabled);

  if (blocked) {
    document.documentElement.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
        <div style="text-align:center;">
          <h1>🚫 Blocked</h1>
          <p>This website is restricted.</p>
        </div>
      </div>
    `;
  }
})();