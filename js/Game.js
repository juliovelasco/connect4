function Game(){
  this.board = new Board();
  this.players = this.createPlayers();
  this.isGameReady = false;
  this.reload = false;
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
  return [new Player(1, "Player1", "#e15258", true), new Player(2, "Player2", "#e59a13")];
}

/**
 * Initializes game.
 */

Game.prototype.startGame = function() {

  if(!this.reload) {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.isGameReady = true;
    this.reload = true;
  }
  else{
    window.location.reload(true);
  }
}

/**
 * Branches code, depending on what key player presses
 * @param   {Object}  e - Keydown event object
 */

Game.prototype.handleKeyDown = function(keydown) {
  const key = keydown.key;
  const playerToken = this.activePlayer.activeToken;

  if(this.isGameReady){
    if(key === "ArrowLeft") {
      playerToken.moveLeft();
    }

    else if(key === 'ArrowRight') {
      playerToken.moveRight();
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
    this.isGameReady = false;
    currentPlayer.dropToken(targetHole,function() {
       this.updateGameStatus(targetHole);
    }.bind(this));
    // this.checkForWin(currentPlayer, targetHole)
  }
}

Game.prototype.switchPlayers = function() {
  for(player of this.players){
    player.isPlayersTurn = player.isPlayersTurn ? false : true;
  }
}

Game.prototype.updateGameStatus = function(target) {
  const win = this.checkForWin(target);
  const player = this.activePlayer;

  // console.log('player1', this.players[0].unusedTokens.length);
  // console.log('player2', this.players[1].unusedTokens);

  if(win) {
    this.isGameReady = false;
    this.gameOver(`${player.playerName} wins!`);
  }

  else if(this.players[0].unusedTokens.length === 0 && this.players[1].unusedTokens.length === 0){
    this.isGameReady = false;
    this.gameOver("Draw!");
  }
  else {
    this.switchPlayers();
    this.activePlayer.activeToken.drawHTMLToken();
    this.isGameReady = true;
  }
}

Game.prototype.checkForWin = function(target){
  const verticalWin = this.checkForVerticalWin(target);
  const horizontalWin = this.checkForHorizontalWin(target);
  const diagonalWin = this.checkForDiagonalWin(target);

  if(verticalWin || horizontalWin || diagonalWin){
    return true;
  }

  else {
    return false;
  }
}

Game.prototype.checkForVerticalWin = function(target) {
  const col = this.board.holes;
  const owner = target.token;
  const rows = this.board.rows;
  const x = target.x;
  let win = false;
  let sequence = 0;

  if(target.y >= rows - 3){
    return false;
  }
  else {
    for(let y = target.y; y < rows; y++){
      if(col[x][y].token === owner){
       sequence++;
      }
      else{
        break;
      }
    }
  }

  if(sequence === 4){
    win = true;
  }

  return win;
}

Game.prototype.checkForHorizontalWin = function(target) {
  const owner = target.token;
  const col = this.board.holes;
  const y = target.y;
  let win = false;
  let sequence = 0;
  for(let x= 0; x<this.board.columns; x++){
    if(col[x][y].token === owner){
      sequence++;

      if(sequence === 4){
        win = true;
        break;
      }
    }
    else {
      sequence = 0;
    }
  }
  return win;
}

Game.prototype.checkForDiagonalWin = function(target) {
  const owner = target.token;
  let win = false;

  //diagonal
  for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
          if (this.board.holes[x][y].token === owner &&
        this.board.holes[x-1][y+1].token === owner &&
        this.board.holes[x-2][y+2].token === owner &&
        this.board.holes[x-3][y+3].token === owner) {
                  win = true;
            }
        }
    }

  // diagonal
  for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 3; y < this.board.rows; y++){
            if (this.board.holes[x][y].token === owner &&
        this.board.holes[x-1][y-1].token === owner &&
        this.board.holes[x-2][y-2].token === owner &&
        this.board.holes[x-3][y-3].token === owner) {
                  win = true;
            }
        }
    }
  return win;
}

Game.prototype.gameOver = function(message){

  document.querySelector("#game-over").style.display = "block";
  document.querySelector("#game-over").textContent = message;
  document.querySelector("#begin-game").textContent = "Play Again";
  document.querySelector("#begin-game").style.display = "block";
}
