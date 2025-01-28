import { Cards } from "./card.js";
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
    this.points = 10;
    this.intervalDelay = 1000; // MS for setInterval
    this.loopInterval = null; // game loop setInterval
    this.tabs = new Tabs();
  }

  init() {
    setupUI();

    this.points = 10;
    
    this.addCardToOwned("metaCard");

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
    }
    console.log(`Added ${cardID} to owned cards:`, this.ownedCards[cardID]);
  }


  calculateCardsPerPack() {
    return this.ownedCards["metaCard"].quantity;
  }

  openPack() {
    const cardsToGenerate = this.calculateCardsPerPack();
    const generatedCards = [];

    for (let i=0; i < cardsToGenerate; i++) {
      generatedCards.push(Cards["metaCard"]);
    }

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

