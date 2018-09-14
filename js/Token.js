function Token(index, owner) {
  this.owner = owner;
  this.id = `token-${index}-${owner.id}`;
  this.isTokenDropped = false;
  this.columnLocation = 0;
}

/**
 * Gets left offset of html element.
 * @return  {number}   Left offset of token object's htmlToken.
*/

Token.prototype = Object.defineProperties(this, {
  "offsetLeft": {
    "get":function() {
      return this.htmlToken.offsetLeft;
    }
  },
  "htmlToken": {
    "get": function() {
      return document.querySelector(`#${this.id}`);
    }
  }
});

Token.prototype.drawHTMLToken = function() {
  const token = document.createElement("div");
  token.setAttribute("id",this.id);
  token.setAttribute("class","token");
  token.style.backgroundColor = this.owner.color;
  document.querySelector("#game-board-underlay").append(token);

}

/**
  Moves html token one column to the left.
*/

Token.prototype.moveLeft = function() {

  if(this.columnLocation > 0){
    this.htmlToken.style.left = this.offsetLeft - 76;
    this.columnLocation -= 1;
  }
}

/**
  Moves html token one column to the right.
*/

Token.prototype.moveRight = function() {

  if(this.columnLocation < 6){
    this.htmlToken.style.left = this.offsetLeft + 76;
    this.columnLocation += 1;
  }
}

/**
 * Drops html token into targeted board space.
 * @param   {Object}   target - Targeted space for dropped token.
 * @param   {function} reset  - The reset function to call after the drop animation has completed.
 */

Token.prototype.dropToken = function(hole) {
  //add the bounce animation for each token.
  $(this.htmlToken).animate({
      top: (hole.y * hole.diameter)
  }, 750, 'easeOutBounce');

  this.isTokenDropped = true;
  hole.token = true;
}
