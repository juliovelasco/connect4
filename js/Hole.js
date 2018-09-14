function Hole(x, y) {
  this.x = x;
  this.y = y;
  this.id = `hole-${x}-${y}`;
  this.token = null;
  this.diameter = 76;
  this.radius = this.diameter / 2;
}

Hole.prototype.drawSVGHoles = function() {
  const svgHole = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  svgHole.setAttributeNS(null, "id", this.id);
  svgHole.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
  svgHole.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
  svgHole.setAttributeNS(null, "r", this.radius - 8);
  svgHole.setAttributeNS(null, "fill", "black");
  svgHole.setAttributeNS(null, "stroke", "none");

  document.querySelector("#mask").appendChild(svgHole);
}
