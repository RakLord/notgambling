import { Game } from "./scripts/game.js";
import { setupUI } from "./scripts/ui.js";


document.addEventListener("DOMContentLoaded", function(event) {
  window.game = new Game();
  game.init();
});
