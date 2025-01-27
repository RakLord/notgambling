import { Cards } from "./card.js";
import { updateUI, createCard } from "./ui.js";


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
  }

  init() {
    this.points = 10;
    
    this.addCardToOwned("metaCard");

    document.getElementById("packBtn").addEventListener("click", this.openPack.bind(this));
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
    this.addCardToOwned("metaCard");

  }
}

