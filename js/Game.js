function Game(){
  this.board = new Board();
  this.players = this.createPlayers();
  this.isGameReady = false;
}

Game.prototype = Object.defineProperties(this,{
  "activePlayer": {
    "get": function() {
      return this.players.find(player => player.isPlayersTurn === true);
    }
  }
});

/**
 * Creates two player objects
 * @return  {Array}    An array of two Player objects.
 */

Game.prototype.createPlayers = function() {
  const player1 = new Player(1, "Player1", "#e15258");
  const player2 = new Player(2, "Player2", "#e59a13", true);

  return [player1,player2];
}

/**
 * Initializes game.
 */

Game.prototype.startGame = function() {
  this.board.drawHTMLBoard();
  this.activePlayer.activeToken.drawHTMLToken();
  this.isGameReady = true;
}

/**
 * Branches code, depending on what key player presses
 * @param   {Object}    e - Keydown event object
 */

Game.prototype.handleKeyDown = function(keydown) {
  const key = keydown.key;

  if(this.isGameReady){
    if(key === "ArrowLeft") {
      this.activePlayer.activeToken.moveLeft();
    }

    else if(key === 'ArrowRight') {
      this.activePlayer.activeToken.moveRight();
    }

    else if(key === "ArrowDown") {
      this.playToken();
    }
  }
}

Game.prototype.playToken = function() {

  let currentPlayer = this.activePlayer.activeToken;
  let hole = this.board.holes;
  let targetColumn = hole[currentPlayer.columnLocation];
  let targetHole = null;

  for(holePosition of targetColumn){
    if(holePosition.token === null){
      targetHole = holePosition;
     }
  }
  
  //check to see if there is an avaliable hole in the current column.
  if(targetHole){
    currentPlayer.dropToken(targetHole);
    this.switchPlayers();
    currentPlayer = this.activePlayer.activeToken;
    currentPlayer.drawHTMLToken();
  }

}

Game.prototype.switchPlayers = function() {
  for(player of this.players){
    player.isPlayersTurn = player.isPlayersTurn ? false : true;
  }
}
