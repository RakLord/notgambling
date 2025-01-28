import { Game } from "./game.js";


export function setupUI() {
  console.log("UI Setup");
  game.tabs.addTab("collectionTab", "Collection");
  game.tabs.addTab("packsTab", "Packs");
  game.tabs.addTab("shopTab", "Shop");
  game.tabs.addTab("settingsTab", "Settings");
  
  // Important - builds the tab contents. May need to have a loading screen until this is built on launch.
  tabSetup();

  game.tabs.unlockTab("collectionTab");
  game.tabs.unlockTab("packsTab");

  game.tabs.unlockTab("settingsTab");

  game.tabs.switchTab("packsTab");
}

export function updateUI() {
  const pointsElement = document.getElementById("scoreText");
  pointsElement.innerText = `Points: ${game.points}`;
}

export function createCard(cardData) {
  console.log(cardData);
  const container = document.getElementById("cardContainer");
  const card = document.createElement("div");
  card.id = cardData.id;
  card.classList.add("card");
  const img = `/notgambling/assets/cards/${cardData.id}.jpg`
  card.innerHTML = `
    <img src="${img}" alt="${cardData.name}" />
    <h2>${cardData.name}</h2>
    <p>${cardData.description}</p>
  `;
  container.appendChild(card);
}

// Sets up all tab content
export function tabSetup() {
  console.log("Setting up tabs");
  
  // Packs Tab
  const packsTab = document.getElementById("packsTab");
  if (packsTab) {
    const currentPackDiv = document.createElement("div");
    currentPackDiv.id = "currentPackContainer";
    packsTab.appendChild(currentPackDiv);

    const packSelectionDiv = document.createElement("div");
    packSelectionDiv.id = "packSelectionContainer";
    packsTab.appendChild(packSelectionDiv);

    const openPackButton = document.createElement("button");
    openPackButton.id = "openPackButton";
    openPackButton.innerText = "Open Pack";
    openPackButton.addEventListener("click", () => game.openPack());
    currentPackDiv.appendChild(openPackButton);
  }
  
  // Not exactly a "tab", but goes alongside the packsTab so I put here, WHAT YOU GUNNA DO ABOUT IT HUH?!?!
  const modal = document.createElement("div");
  modal.id = "packModal";
  modal.classList.add("hidden");
  modal.innerHTML = `
    <div id="packContent">
      <div id="cardDisplay"></div>
      <div id="packControls">
        <button id="keepCardButton">Keep</button>
        <button id="sellCardButton">Sell</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  //Collection Tab
  const collectionTab = document.getElementById("collectionTab");
  if (collectionTab) {
    const cardContainerDiv = document.createElement("div");
    cardContainerDiv.id = "cardContainer";
    collectionTab.appendChild(cardContainerDiv);
  }


}
