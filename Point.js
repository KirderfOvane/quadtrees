class Point {
  _pointSize = 5;
  _annotation = {};
  constructor(x, y, color = "black") {
    (this.x = x),
      (this.y = y),
      (this._annotation = {
        text: `x:${this.x},y:${this.y}`,
        xPos: this.x + 15,
        yPos: this.y + 10,
      });
    this.color = color;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this._pointSize, this._pointSize);
  }
  drawAnnotation(context) {
    context.font = "14px serif";
    const { text, xPos, yPos } = this._annotation;
    context.fillStyle = "#0000FF";
    context.fillText(text, xPos, yPos);
  }
}
