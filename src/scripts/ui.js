import { Game } from "./game.js";


export function updateStatText(id, value) {
  const infoContainerDiv = document.getElementById("infoContainer");
  infoContainerDiv.querySelector(`#${id}`).querySelector(".value").innerText = value;
}

export function setupUI() {
  console.log("UI Setup");
  const leftPane = document.getElementById("leftPane");

  const infoContainerDiv = document.createElement("div");
  infoContainerDiv.id = "infoContainer";
  leftPane.appendChild(infoContainerDiv);

  // Utility function to create player stat text easier
  function createInfoContainerItem(id, kText, vText="0") {
    const item = document.createElement("div");
    item.classList.add("infoContainerItem");
    item.id = id;

    const key = document.createElement("p");
    key.classList.add("key");
    key.innerText = kText;
    item.appendChild(key);
    
    const value = document.createElement("p");
    value.classList.add("value");
    value.innerText = vText;
    item.appendChild(value);

    return item;
  }

  // Create the player stats in DOM
  infoContainerDiv.appendChild(createInfoContainerItem("statPoints", "Points: "))
  infoContainerDiv.appendChild(createInfoContainerItem("statLuck", "Luck: "))
  
 // Setup the nav on the leftPane
 const navContainerDiv = document.createElement("div");
 navContainerDiv.id = "sideNavContainer";
 leftPane.appendChild(navContainerDiv);
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
  updateStatText("statPoints", game.playerPoints);
  updateStatText("statLuck", game.playerLuckFactor);
}

// Creates the card display for the collection
export function createCard(cardData) {
  console.log(cardData);
  const container = document.getElementById("cardContainer");
  
  let card = document.getElementById(cardData.id);
  if (!card) {
    card = document.createElement("div");
    card.id = cardData.id;
    card.classList.add("card");

    const img = `/notgambling/assets/cards/${cardData.id}.jpg`

    card.innerHTML = `
      <div class="quantity-overlay">${cardData.quantity}</div>
      <img src="${img}" alt="${cardData.name}" />
      <h2>${cardData.name}</h2>
      <p>${cardData.description}</p>
    `;

    container.appendChild(card);
  } else {
    const quantityOverlay = card.querySelector(".quantity-overlay");
    if (quantityOverlay) {
      quantityOverlay.innerText = cardData.quantity;
    }
  }
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

  const settingsTab = document.getElementById("settingsTab");
  if (settingsTab) {
    const settingsButtonsDiv = document.createElement("div");
    settingsButtonsDiv.id = "settingsButtonsContainer";
    
    const saveButton = document.createElement("button");
    const loadButton = document.createElement("button");
    const resetButton = document.createElement("button");
    saveButton.innerText = "Save Game";
    loadButton.innerText = "Load Game";
    resetButton.innerText = "Hard Reset";
    saveButton.id = "saveButton";
    loadButton.id = "loadButton";
    resetButton.id = "resetButton";
    saveButton.addEventListener("click", () => game.save());
    loadButton.addEventListener("click", () => game.load());
    resetButton.addEventListener("click", () => game.reset());

    settingsButtonsDiv.appendChild(saveButton);
    settingsButtonsDiv.appendChild(loadButton);
    settingsButtonsDiv.appendChild(resetButton);
    
    settingsTab.appendChild(settingsButtonsDiv);
  }
}
