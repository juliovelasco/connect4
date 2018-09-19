function Board() {
  this.columns = 7;
  this.rows = 6;
  this.holes = this.createHoles();
}

/**
 * Generates 2D array of spaces.
 * @return  {Array}     An array of space objects
 */

Board.prototype.createHoles = function() {

  const holes = [];
  for(let x = 0; x < this.columns; x++){
    let columns = [];
    for(let y = 0; y < this.rows; y++){
      const hole = new Hole(x,y);
      columns.push(hole);
    }
    holes.push(columns);
  }
  return holes;
}

Board.prototype.drawHTMLBoard = function() {

  for(let x = 0; x < this.columns; x++){
    for(let y = 0; y < this.rows; y++){
      this.holes[x][y].drawSVGHoles();
    }
  }
}
