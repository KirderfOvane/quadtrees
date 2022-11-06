// give me all neighbor points within a range
// organise points in hierarchial quad-tree

// hypothesis:
// leaf is subdivision needed for reaching density point goal inside an area
const densityGoal = 5;
const areaSize = 25;

let nodeNumber = 0;

class Node {
  depth = "-";
  constructor(start, end, points, pointDensity, color) {
    // Node Values
    this.nodeNumber = nodeNumber++;
    this.start = start;
    this.end = end;
    this.points = points;

    // Node Hierarchy
    this.one = null;
    this.two = null;
    this.three = null;
    this.four = null;
    this.pointDensity = pointDensity;
    this.divideUntil(pointDensity);

    // Visual Display of Node

    this.color = color;
    this.drawNode(scene.annotationContext);
  }
  subDivide() {
    const xDivLine = (this.end.x - this.start.x) / 2;
    const yDivLine = (this.end.y - this.start.y) / 2;

    const startOne = { x: this.start.x, y: this.start.y };
    const endOne = { x: xDivLine, y: yDivLine };
    this.one = new Node(
      startOne,
      endOne,
      this.findPointsInRectangle(startOne, endOne),
      this.pointDensity,
      "red"
    );

    /*  const startTwo = { x: xDivLine, y: this.start.y };
    const endTwo = { x: this.end.x, y: yDivLine };
    this.two = new QuadTree(
      this.findPointsInRectangle(startTwo, { x: endTwo.x, y: endTwo.y }),
      this.pointDensity,
      new Node(startTwo, endTwo, "blue")
    );

    const startThree = { x: this.root.start.x, y: yDivLine };
    const endThree = { x: xDivLine, y: yDivLine };
    this.three = new QuadTree(
      this.findPointsInRectangle(startThree, { x: endThree.x, y: endThree.y * 2 }),
      this.pointDensity,
      new Node({ x: this.root.start.x, y: yDivLine }, { x: xDivLine, y: yDivLine }, "green")
    );

    const startFour = { x: xDivLine, y: yDivLine };
    const endFour = { x: xDivLine, y: yDivLine };
    this.four = new QuadTree(
      this.findPointsInRectangle(startFour, { x: xDivLine * 2, y: yDivLine * 2 }),
      this.pointDensity,
      new Node({ x: xDivLine, y: yDivLine }, { x: xDivLine, y: yDivLine }, "magenta")
    ); */
  }
  divideUntil(numOfPoint) {
    console.log("dividing?", this.points.length > numOfPoint, this.points.length);

    this.depth = this.depth.concat("-");

    console.log(
      this.nodeNumber,
      `${this.depth}x:`,
      this.start.x,
      this.end.x,
      "y: ",
      this.start.y,
      this.end.y,
      "color:",
      this.color
    );

    if (this.points.length > numOfPoint) this.subDivide();
  }
  findPointsInRectangle(start, end) {
    const pointArray = [];

    for (let i = 0; i < this.points.length; i++) {
      if (
        this.points[i].x < end.x &&
        this.points[i].x > start.x &&
        this.points[i].y > start.y &&
        this.points[i].y < end.y
      ) {
        // We can optimize space and some time if we cull this.points array here
        pointArray.push(this.points[i]);
      }
    }
    // console.log(pointArray.length);
    return pointArray;
  }
  drawNode(ctx) {
    ctx.beginPath();
    ctx.rect(this.start.x, this.start.y, this.end.x, this.end.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

// start & end is rectangle point coordinates
// pointDensity is max allowed points in one node
// color is quadtree color
class QuadTree {
  constructor(points, start, end, pointDensity, color) {
    this.points = points;
    this.root = new Node(start, end, points, pointDensity, "black");
  }
}

const quadTree = new QuadTree(
  scene.getPoints(),
  { x: 0, y: 0 },
  { x: CANVASWIDTH, y: CANVASHEIGHT },
  2,
  "black"
);
