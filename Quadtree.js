// organise points in hierarchial quad-tree
let nodeNumber = 0;
class Node {
  constructor({ start, width, height, points, pointDensity, color, context }) {
    // Node Values
    this.context = context;
    this.nodeNumber = nodeNumber++;
    this.start = start;
    this.width = width;
    this.height = height;
    this.points = points;
    // Node Hierarchy
    this.topLeft = null;
    this.topRight = null;
    this.bottomLeft = null;
    this.bottomRight = null;
    this.pointDensity = pointDensity;
    this.divideUntil(pointDensity);

    // Visual Display of Node
    this.color = color;
    this.drawNode(context);
  }

  subDivide() {
    // new rectangle size
    const newWidth = this.width / 2;
    const newHeight = this.height / 2;

    // top left rectangle start and end coordinate
    const topLeftStart = { x: this.start.x, y: this.start.y };

    // top right
    const topRightStart = { x: newWidth + this.start.x, y: this.start.y };

    // bottom left
    const bottomLeftStart = { x: this.start.x, y: newHeight + this.start.y };

    // bottom right
    const bottomRightStart = { x: newWidth + this.start.x, y: newHeight + this.start.y };
    //start, width, height, points, pointDensity, color, context
    this.topLeft = new Node({
      start: topLeftStart,
      width: newWidth,
      height: newHeight,
      points: this.findPointsInRectangle(topLeftStart, newWidth, newHeight),
      pointDensity: this.pointDensity,
      color: "green",
      context: this.context,
    });

    this.topRight = new Node({
      start: topRightStart,
      width: newWidth,
      height: newHeight,
      points: this.findPointsInRectangle(topRightStart, newWidth, newHeight),
      pointDensity: this.pointDensity,
      color: "red",
      context: this.context,
    });
    this.bottomLeft = new Node({
      start: bottomLeftStart,
      width: newWidth,
      height: newHeight,
      points: this.findPointsInRectangle(bottomLeftStart, newWidth, newHeight),
      pointDensity: this.pointDensity,
      color: "blue",
      context: this.context,
    });

    this.bottomRight = new Node({
      start: bottomRightStart,
      width: newWidth,
      height: newHeight,
      points: this.findPointsInRectangle(bottomRightStart, newWidth, newHeight),
      pointDensity: this.pointDensity,
      color: "orange",
      context: this.context,
    });
  }
  divideUntil(numOfPoint) {
    if (this.points.length > numOfPoint) this.subDivide();
  }
  findPointsInRectangle(start, width, height) {
    const pointArray = [];

    for (let i = 0; i < this.points.length; i++) {
      if (
        this.points[i].x < start.x + width &&
        this.points[i].x > start.x &&
        this.points[i].y > start.y &&
        this.points[i].y < start.y + height
      ) {
        // We can optimize space and some time if we cull this.points array here
        pointArray.push(this.points[i]);
      }
    }

    return pointArray;
  }
  drawNode(ctx) {
    ctx.beginPath();
    ctx.rect(this.start.x, this.start.y, this.width, this.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

// start & end is rectangle point coordinates
// pointDensity is max allowed points in one node
// color is quadtree color
class QuadTree {
  constructor({ points, canvasWidth, canvasHeight, pointDensity, color, context }) {
    this.points = points;
    this.root = new Node({
      start: { x: 0, y: 0 },
      width: canvasWidth,
      height: canvasHeight,
      points: points,
      pointDensity,
      color,
      context,
    });
  }
  getPointsWithinArea(area) {
    if (!area) return console.log("No area class provided");
    // clear annotations and redraw area
    clearCanvas(annotationContext);
    area.draw(annotationContext);
    let current = this.root;
    /* console.log("current.x-half", current.start.x + current.width / 2);
    console.log("current.y-half", current.start.y + current.height / 2);
    console.log("area.startPosX ", area.startPos.x);
    console.log("area.startPosY ", area.startPos.y); */

    function traverse(current) {
      //  if (current.nodeNumber !== 0) current.drawNode(current.context);
      console.log("traversing node: ", current.nodeNumber);
      // top left
      if (
        area.startPos.x < current.start.x + current.width / 2 &&
        area.startPos.y < current.start.y + current.height / 2
      ) {
        if (current.topLeft) {
          console.log(current.nodeNumber, "top left ", current.topLeft.nodeNumber);
          traverse(current.topLeft);
        } else {
          console.log("FOUND LEAF: ", current);
          //  current.drawNode(current.context);
          //return current;
        }
      }
      // top right
      if (
        area.startPos.x > current.start.x + current.width / 2 &&
        area.startPos.y < current.start.y + current.height / 2
      ) {
        if (current.topRight) {
          console.log(current.nodeNumber, "top right ", current.topRight.nodeNumber);
          traverse(current.topRight);
        } else {
          console.log("FOUND LEAF: ", current);
          //current.drawNode(current.context);
          // return current;
        }
      }
      // bottom left
      if (
        area.startPos.x < current.start.x + current.width / 2 &&
        area.startPos.y < current.start.y + current.height / 2
      ) {
        if (current.bottomLeft) {
          console.log(current.nodeNumber, "bottom left ", current.bottomLeft.nodeNumber);
          traverse(current.bottomLeft);
        } else {
          console.log("FOUND LEAF: ", current);
          //  current.drawNode(current.context);
          // return current;
        }
      }
      // bottom right
      if (
        area.startPos.x > current.start.x + current.width / 2 &&
        area.startPos.y > current.start.y + current.height / 2
      ) {
        if (current.bottomRight) {
          console.log(current.nodeNumber, "bottom right ", current.bottomRight.nodeNumber);
          traverse(current.bottomRight);
        } else {
          console.log("FOUND LEAF: ", current);
          //  current.drawNode(current.context);
          // return current;
        }
      }
      console.log("DEAD END----------------------------------------", current.nodeNumber);
      if (!first) {
        current.drawNode(current.context);
        first = true;
      }
    }
    let first = false;
    traverse(current);
  }
}
