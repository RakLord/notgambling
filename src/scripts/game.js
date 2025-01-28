import { RarityTiers, Cards } from "./card.js";
import { setupUI, updateUI, createCard } from "./ui.js";
import { Tabs } from "./tabs.js";

class Card {
  constructor(id, name, rarity, description, tooltip, quantity = 1) {
    this.id = id;
    this.name = name;
    this.rarity = rarity;
    this.description = description;
    this.tooltip = tooltip;
    this.quantity = quantity;
  }
}

export class Game {
  constructor() {
    this.ownedCards = {},
    this.intervalDelay = 1000; // MS for setInterval
    this.loopInterval = null; // game loop setInterval
    this.tabs = new Tabs();
  
    // Should probs add these to the left tab 
    this.playerPoints = 0;
    this.playerCardsPerPack = 0;
    this.playerLuckFactor = 0;
  }

  init() {
    setupUI();
    //this.addCardToOwned("metaCard");

    this.startGameLoop(); 
  }
  
  startGameLoop(){
    this.loopInterval = setInterval(() => {
      this.update();
    }, this.intervalDelay);
  }

  stopGameLoop() {
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
    }
  }

  update() {
    updateUI();
  }


  addCardToOwned(cardID) {
    if (!this.ownedCards[cardID]) {
      const cardData = Cards[cardID];
      this.ownedCards[cardID] = new Card(
        cardData.id,
        cardData.name,
        cardData.rarity,
        cardData.description,
        cardData.tooltip,
        1
      );
      createCard(this.ownedCards[cardID]);
    } else {
      this.ownedCards[cardID].quantity++;
      const cardElement = document.getElementById(cardID);
      if (cardElement) {
        const quantityOverlay = cardElement.querySelector(".quantity-overlay");
        if (quantityOverlay) {
          quantityOverlay.innerText = this.ownedCards[cardID].quantity;
        }
      }
    }
    console.log(`Added ${cardID} to owned cards:`, this.ownedCards[cardID]);
  }


  calculateCardsPerPack() {
    let cards = 1;
    let metaCardCount = this.ownedCards["metaCard"]?.quantity || 0;
    if (metaCardCount > 0) {
      cards += (Math.log(metaCardCount)) //some later upgrade will raise this to a power (something between ^1.01-^2) 
    }
    return cards;
  }

  calculateLuck() {
    const baseLuck = 0;
    const powerLuck = this.ownedCards["powerCard"]?.quantity || 0;
    return baseLuck + powerLuck;
  }

  rollForRarity() {
    const roll = Math.random() * (1 + this.playerLuckFactor);
    for (let tier of RarityTiers) {
      if (roll >= tier.min && roll <= tier.max) {
        return tier.name;
      }
    }
    
    return "normal";
  }

  getRandomCardByRarity(rarityName) {
    const cards = Object.values(Cards).filter((card) => {
      const rarityTier = RarityTiers.find(
        (tier) => card.rarity >= tier.min && card.rarity <= tier.max
      );
      return rarityTier?.name === rarityName;
    });

    if (cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      return cards[randomIndex];
    }
    
    return null;
  }

  generatePack() {
    console.log("generating pack")
    // Recalc the players stats from collection cards

    this.playerCardsPerPack = this.calculateCardsPerPack();
    this.playerLuckFactor = this.calculateLuck();
    
    // call the func to update the UI for player stats

    const generatedCards = [];

    for (let i=0; i < this.playerCardsPerPack; i++) {
      const cardRarity = this.rollForRarity();
      const card = this.getRandomCardByRarity(cardRarity);
      if (card) {
        generatedCards.push(card);
      }
    }
    return generatedCards;
  }


  openPack() {
    console.log("opening pack")
    //recalc the players stats
    const generatedCards = this.generatePack();
    this.displayPackModal(generatedCards);
  }

  displayPackModal(cards) {
    const modal = document.getElementById("packModal");
    const cardDisplay = document.getElementById("cardDisplay");
    const keepButton = document.getElementById("keepCardButton");
    const sellButton = document.getElementById("sellCardButton");

    let currentCardIndex = 0;

    modal.classList.remove("hidden");
    
    const showCard = () => {
      const card = cards[currentCardIndex];
      cardDisplay.innerHTML = `
        <div class="card">
          <img src="/notgambling/assets/cards/${card.id}.jpg" alt="${card.name}" />
          <h2>${card.name}</h2>
          <p>${card.description}</p>
        </div>
      `;
    };

    showCard();

    keepButton.onclick = () => {
      this.addCardToOwned(cards[currentCardIndex].id);
      nextCard();
    };

    sellButton.onclick = () => {
      this.points += 10;
      nextCard();
    };

    const nextCard = () => {
      currentCardIndex++;
      if (currentCardIndex < cards.length) {
        showCard();
      } else {
        closeModal();
      }
    }

    const closeModal = () => {
      modal.classList.add("hidden");
      cardDisplay.innerHTML = "";
    }
  }
}

