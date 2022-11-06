// give me all neighbor points within a range
// organise points in hierarchial quad-tree

// hypothesis:
// leaf is subdivision needed for reaching density point goal inside an area
const densityGoal = 5;
const areaSize = 25;

let nodeNumber = 0;

class Node {
  constructor(start, end, color = "white") {
    // Node Values
    this.nodeNumber = nodeNumber++;
    this.start = start;
    this.end = end;

    // Node Hierarchy
    this.one = null;
    this.two = null;
    this.three = null;
    this.four = null;

    // Visual Display of Node
    this.color = color;
    this.drawNode(scene.annotationContext);
  }
  drawNode(ctx) {
    ctx.beginPath();
    ctx.rect(this.start.x, this.start.y, this.end.x, this.end.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

/* class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
    this.leftChild = null;
    this.rightChild = null;
  }
  addNode(node) {
    if (!this.root) return (this.root = node);
  }
  subDivide() {
    this.addNode;
  }
} */

class QuadTree {
  constructor(points, divideUntilnum, root) {
    this.points = points;
    this.root = root;

    this.divideUntilnum = divideUntilnum;
    this.divideUntil(divideUntilnum);
  }
  subDivide() {
    const xDivLine = (this.root.end.x - this.root.start.x) / 2;
    const yDivLine = (this.root.end.y - this.root.start.y) / 2;

    const startOne = { x: this.root.start.x, y: this.root.start.y };
    const endOne = { x: xDivLine, y: yDivLine };
    this.one = new QuadTree(
      this.findPointsInRectangle(startOne, endOne),
      this.divideUntilnum,
      new Node(startOne, endOne, "red")
    );

    const startTwo = { x: xDivLine, y: this.root.start.y };
    const endTwo = { x: this.root.end.x, y: yDivLine };
    this.two = new QuadTree(
      this.findPointsInRectangle(startTwo, { x: endTwo.x, y: endTwo.y }),
      this.divideUntilnum,
      new Node(startTwo, endTwo, "blue")
    );

    const startThree = { x: this.root.start.x, y: yDivLine };
    const endThree = { x: xDivLine, y: yDivLine };
    this.three = new QuadTree(
      this.findPointsInRectangle(startThree, { x: endThree.x, y: endThree.y * 2 }),
      this.divideUntilnum,
      new Node({ x: this.root.start.x, y: yDivLine }, { x: xDivLine, y: yDivLine }, "green")
    );

    const startFour = { x: xDivLine, y: yDivLine };
    const endFour = { x: xDivLine, y: yDivLine };
    this.four = new QuadTree(
      this.findPointsInRectangle(startFour, { x: xDivLine * 2, y: yDivLine * 2 }),
      this.divideUntilnum,
      new Node({ x: xDivLine, y: yDivLine }, { x: xDivLine, y: yDivLine }, "magenta")
    );
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
  divideUntil(numOfPoint) {
    //  console.log("dividing?", this.points.length > numOfPoint, this.points.length);
    const depth = ["-", "-"];
    console.log(
      this.root.nodeNumber,
      `${depth.toString()}x:`,
      this.root.start.x,
      this.root.end.x,
      "y: ",
      this.root.start.y,
      this.root.end.y,
      "color:",
      this.color
    );
    depth.push["-"];

    if (this.points.length > numOfPoint) this.subDivide();
  }
}

const root = new Node({ x: 0, y: 0 }, { x: CANVASWIDTH, y: CANVASHEIGHT });
const quadTree = new QuadTree(scene.getPoints(), 2, root);
