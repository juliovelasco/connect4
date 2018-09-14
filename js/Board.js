function Board() {
  this.colunms = 6;
  this.rows = 7;
  this.holes = this.createHoles();
}

/**
 * Generates 2D array of spaces.
 * @return  {Array}     An array of space objects
 */

Board.prototype.createHoles = function() {

  const holes = [];
  for(let x = 0; x < this.rows; x++){
    let rows = [];
    for(let y = 0; y < this.colunms; y++){
      const hole = new Hole(x,y);
      rows.push(hole);
    }
    holes.push(rows);
  }
  return holes;
}

Board.prototype.drawHTMLBoard = function() {

  for(let x = 0; x < this.rows; x++){
    for(let y = 0; y < this.colunms; y++){
      this.holes[x][y].drawSVGHoles();
    }
  }
}
