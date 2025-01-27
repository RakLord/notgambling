import { Game } from "./game.js";


export function setupUI() {
  console.log("UI Setup");
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

