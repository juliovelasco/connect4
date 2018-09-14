const game = new Game();
const startGameButton = document.querySelector('#begin-game');

startGameButton.addEventListener('click', function() {
  game.startGame();
  startGameButton.style.display = "none";
  document.querySelector("#play-area").style.opacity = 1;
});

/**
 * Listen for keyboard presses
 */

document.addEventListener('keydown', game.handleKeyDown.bind(game));
