function Player(id, name, color, isPlayersTurn = false) {
  this.id = id;
  this.playerName = name;
  this.color = color;
  this.tokens = this.createTokens(21);
  this.isPlayersTurn = isPlayersTurn;
}

Player.prototype = Object.defineProperties(this,{
  "unusedTokens": {
    "get":function() {
      return this.tokens.filter(token => token.isTokenDropped === false);
    }
  },
  "activeToken": {
    "get":function() {
      return this.unusedTokens[0];
    }
  }
});

/**
 * Creates token objects for player
 * @param     {number}    num - Number of token objects to be created
 * @returns   {Array}     An array of the newly created token objects
 */
Player.prototype.createTokens = function(numOfTokens) {
  const tokens = [];

  for(let i = 0; i < numOfTokens; i++) {
    let token = new Token(i,this);
    tokens.push(token);
  }

  return tokens;
}
