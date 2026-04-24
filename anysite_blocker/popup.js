const listEl = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const input = document.getElementById("domainInput");

async function getSites() {
  const data = await chrome.storage.local.get("blockedSites");
  return data.blockedSites || [];
}

async function saveSites(sites) {
  await chrome.storage.local.set({ blockedSites: sites });
}

function createToggle(site, index, sites) {
  const toggle = document.createElement("div");
  toggle.className = "toggle" + (site.enabled ? " active" : "");

  toggle.onclick = async () => {
    sites[index].enabled = !sites[index].enabled;
    await saveSites(sites);
    render();
  };

  return toggle;
}

async function render() {
  const sites = await getSites();
  listEl.innerHTML = "";

  sites.forEach((site, index) => {
    const item = document.createElement("div");
    item.className = "site-item";

    const text = document.createElement("span");
    text.innerText = site.domain;

    const toggle = createToggle(site, index, sites);

    item.appendChild(text);
    item.appendChild(toggle);

    listEl.appendChild(item);
  });
}

addBtn.onclick = async () => {
  const domain = input.value.trim().replace(/^https?:\/\//, "").replace("www.", "");

  if (!domain) return;

  const sites = await getSites();

  sites.push({ domain, enabled: true });

  await saveSites(sites);

  input.value = "";
  render();
};

render();