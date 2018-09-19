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
  const player1 = new Player(1, "Player1", "#e15258", true);
  const player2 = new Player(2, "Player2", "#e59a13");

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
    this.checkForWin(currentPlayer, targetHole)
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

Game.prototype.checkForWin = function(target){

/*
 const col = this.board.holes[player.columnLocation];
 const owner = player.owner;
 let win = false;
 let sequence = 0;

 for(let y = target.y; y < this.board.colunms; y++){
   if(col[y].token === owner){
      sequence++;
    }
    else{
      break;
    }
 }

 if(sequence === 4){
   win = true;
   console.log('won!');
 }*/
 //for(let x = target)
  //console.log(player.owner === target.token);
  /*const owner = player.owner;
  const col = this.board.holes;
  let win = false;
  let sequence = 0;

  for(let x= 0; x<this.board.rows; x++){
    if(col[x][target.y].token === owner){
      sequence++;

      if(sequence === 4){
        win = true;
        console.log('won!');
        console.log(x);
        break;
      }
    }
    else {
      //continue;

      console.log('x',x);
      sequence = 0;
      //console.log('skipping....',x);
    }
  }*/

  const owner = target.owner;
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

  if(win){
    console.log('win');
  }
}
