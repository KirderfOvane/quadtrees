class Area {
  constructor(startPos, width, height, context) {
    this.startPos = startPos;
    this.width = width;
    this.height = height;
    this.context = context;
    this.draw(context);
  }
  draw(context) {
    context.beginPath();
    context.rect(this.startPos.x, this.startPos.y, this.width, this.height);
    context.lineWidth = 3;
    context.strokeStyle = "green";
    context.stroke();
  }
}
