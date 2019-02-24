const startGameButton = document.querySelector('#begin-game');
let game = new Game();

startGameButton.addEventListener('click', function() {
  game.startGame();
  startGameButton.style.display = "none";
  document.querySelector("#play-area").style.opacity = 1;

});
document.addEventListener('keydown', game.handleKeyDown.bind(game));
/**
 * Listen for keyboard presses
 */
