import { Game } from "./scripts/game.js";
import { setupUI } from "./scripts/ui.js";


document.addEventListener("DOMContentLoaded", function(event) {
  
  //createCard("Car 104", "https://i.pinimg.com/736x/6f/14/ae/6f14ae022309a28d739a448dba8c8216.jpg", "This is a nice car" );
  //createCard("Car 107", "https://www.homeowner.com/wp-content/uploads/2024/09/orange-cat-sleeping-on-floor-by-window-1.jpg", "This is a nice-er car" );
  //createCard("Car 112", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwukLVAryVcO96FladeE0LC0XO7NMVy2vPyA&s", "This is a the niceerist car" );

  window.game =  new Game();
  game.init();
});
