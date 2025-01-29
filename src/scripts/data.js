import { Game, Card } from "./game.js";
import { createCard } from "./ui.js";

export function saveGame(game) {
  try {
    const saveData = { 
      ownedCards: game.ownedCards,
      playerPoints: game.playerPoints,
    };

    localStorage.setItem("notgambling-save", JSON.stringify(saveData));
    console.log("Game saved");
  } catch (error) {
    console.error("Save no save: ", error);
  }
} 

export function loadGame(game) {
  try {
    const saveData =  JSON.parse(localStorage.getItem("notgambling-save"));
    if (!saveData) {
      console.log("No save found");
      return;
    }

    game.ownedCards = {};
    for (let cardID in saveData.ownedCards) {
      let cardData = saveData.ownedCards[cardID];
      game.ownedCards[cardID] = new Card(
        cardData.id,
        cardData.name,
        cardData.rarity,
        cardData.description,
        cardData.tooltip,
        cardData.quantity
      );
      createCard(game.ownedCards[cardID]);
    }
  
    game.playerPoints = saveData.playerPoints;

    game.calculatePlayerStats();

    console.log("Save loaded");
  } catch (error) {
    console.error("Oh no, save no loady: ", error);
  }
}

export function resetGame(game) {
  try {
    const save = localStorage.getItem("notgambling-save");
    if (save) {
      localStorage.removeItem("notgambling-save");
      window.location.reload();
    }
  } catch (error) {
    console.error("How have you managed to fail to delete a save?!?!\nError: ", error);
  }
}
