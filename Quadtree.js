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
        this.points[i].x <= start.x + width &&
        this.points[i].x >= start.x &&
        this.points[i].y >= start.y &&
        this.points[i].y <= start.y + height
      ) {
        // We can optimize space and some time if we cull this.points array here
        // Also solves tests where points is exactly on borders
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
    // clearCanvas(annotationContext);
    //area.draw(annotationContext);

    let current = this.root;
    const nodesWithinArea = {};
    const areaX = { start: area.startPos.x, end: area.startPos.x + area.width };
    const areaY = { start: area.startPos.y, end: area.startPos.y + area.height };

    // traverse tree to find all nodes within area.
    // we know we found a node within area when next node we try to reach is null
    function traverse(current) {
      let x = current.start.x + current.width / 2;
      let y = current.start.y + current.height / 2;

      // top left
      if (x > areaX.start && y > areaY.start) {
        if (current.topLeft) {
          traverse(current.topLeft);
        } else {
          nodesWithinArea[current.nodeNumber] = current;
          current.color = "purple";
          current.drawNode(current.context);
        }
      }
      // top right
      if (areaX.end > x && y > areaY.start) {
        if (current.topRight) {
          traverse(current.topRight);
        } else {
          nodesWithinArea[current.nodeNumber] = current;
          current.color = "blue";
          current.drawNode(current.context);
        }
      }
      // bottom left
      if (x > areaX.start && areaY.end > y) {
        if (current.bottomLeft) {
          traverse(current.bottomLeft);
        } else {
          nodesWithinArea[current.nodeNumber] = current;
          current.color = "red";
          current.drawNode(current.context);
        }
      }
      // bottom right
      if (areaX.end > x && areaY.end > y) {
        if (current.bottomRight) {
          traverse(current.bottomRight);
        } else {
          nodesWithinArea[current.nodeNumber] = current;
          current.color = "black";
          current.drawNode(current.context);
        }
      }
    }
    traverse(current);

    function isWithinArea(point) {
      return (
        areaX.start < point.x && areaX.end > point.x && point.y > areaY.start && point.y < areaY.end
      );
    }

    function collectPointsFromNodes(nodesWithinArea) {
      const points = [];
      for (const node in nodesWithinArea) {
        nodesWithinArea[node].points.forEach((p) => {
          if (isWithinArea(p)) {
            p.color = "green";
            p.draw(objectContext);
            points.push(p);
          } else {
            p.color = "red";
            p.draw(objectContext);
          }
        });
      }
      return points;
    }
    const points = collectPointsFromNodes(nodesWithinArea);
    return { points, nodes: nodesWithinArea };
  }
}
