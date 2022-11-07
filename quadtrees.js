// give me all neighbor points within a range
// organise points in hierarchial quad-tree

// hypothesis:
// leaf is subdivision needed for reaching density point goal inside an area
const densityGoal = 2;
const areaSize = 25;

let nodeNumber = 0;

class Node {
  constructor(start, width, height, points, pointDensity, color) {
    // Node Values
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
    this.drawNode(scene.annotationContext);
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

    this.topLeft = new Node(
      topLeftStart,
      newWidth,
      newHeight,
      this.findPointsInRectangle(topLeftStart, newWidth, newHeight),
      this.pointDensity,
      "green"
    );

    this.topRight = new Node(
      topRightStart,
      newWidth,
      newHeight,
      this.findPointsInRectangle(topRightStart, newWidth, newHeight),
      this.pointDensity,
      "red"
    );
    this.bottomLeft = new Node(
      bottomLeftStart,
      newWidth,
      newHeight,
      this.findPointsInRectangle(bottomLeftStart, newWidth, newHeight),
      this.pointDensity,
      "blue"
    );

    this.bottomRight = new Node(
      bottomRightStart,
      newWidth,
      newHeight,
      this.findPointsInRectangle(bottomRightStart, newWidth, newHeight),
      this.pointDensity,
      "orange"
    );
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
  constructor(points, canvasWidth, canvasHeight, pointDensity, color) {
    this.points = points;
    this.root = new Node({ x: 0, y: 0 }, canvasWidth, canvasHeight, points, pointDensity, "black");
  }
}

const quadTree = new QuadTree(scene.getPoints(), CANVASWIDTH, CANVASHEIGHT, densityGoal, "black");
