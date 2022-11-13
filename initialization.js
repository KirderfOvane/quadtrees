// canvas init
const CANVASWIDTH = 400;
const CANVASHEIGHT = 400;
const objectCanvas = document.getElementById("object-layer");
const annotationCanvas = document.getElementById("annotation-layer");
const objectContext = objectCanvas.getContext("2d");
const annotationContext = annotationCanvas.getContext("2d");

// ui init
const pointsNumInput = document.getElementById("numPoints");
pointsNumInput.addEventListener("change", (e) => {
  console.log(e.target.value);
  clearCanvas(objectContext);
  clearCanvas(annotationContext);
  area.draw(annotationContext);
  populateCanvasWithRandomPoints(e.target.value, scene);
  quadTree = null;
  createQuadTree();
  const { points, nodes } = quadTree.getPointsWithinArea(area);
  statsElement.innerHTML = `<p>Num of points found: ${points.length}</p><p>Had to traverse ${
    Object.keys(nodes).length
  } number of nodes</p>`;
});
const densityInput = document.getElementById("pointDensity");
densityInput.addEventListener("change", (e) => {
  densityGoal = e.target.value;
  clearCanvas(annotationContext);
  clearCanvas(objectContext);

  area.draw(annotationContext);
  quadTree = null;
  createQuadTree();
  quadTree.points.map((p) => {
    p.color = "black";
    p.draw(objectContext);
  });
  const { points, nodes } = quadTree.getPointsWithinArea(area);
  statsElement.innerHTML = `<p>Num of points found: ${points.length}</p><p>Had to traverse ${
    Object.keys(nodes).length
  } number of nodes</p>`;
});
annotationCanvas.addEventListener("click", (e) => {
  clearCanvas(annotationContext);
  clearCanvas(objectContext);
  area = null;
  createArea(e.offsetX, e.offsetY);
  quadTree.points.map((p) => {
    p.color = "black";
    p.draw(objectContext);
  });
  const { points, nodes } = quadTree.getPointsWithinArea(area);
  statsElement.innerHTML = `<p>Num of points found: ${points.length}</p><p>Had to traverse ${
    Object.keys(nodes).length
  } number of nodes</p>`;
});
const statsElement = document.getElementById("stats");

// global vars
let scene;
let densityGoal = 2;
let quadTree;
let area;

function populateCanvasWithRandomPoints(numPoints, scene) {
  scene.clearPoints();
  for (let i = 0; i < numPoints; i++) {
    const fiftyFiftyChance = Math.random() < 0.5;

    let point = new Point(
      fiftyFiftyChance
        ? Math.floor(Math.random() * CANVASWIDTH)
        : Math.floor(Math.random() * CANVASWIDTH * 0.5) + CANVASWIDTH * 0.25,
      fiftyFiftyChance
        ? Math.floor(Math.random() * CANVASHEIGHT)
        : Math.floor(Math.random() * CANVASHEIGHT * 0.5) + CANVASHEIGHT * 0.25
    );
    point.draw(objectContext);
    //  point.drawAnnotation(annotationContext);
    scene.addPoint(point);
  }
}

// initialization
function init() {
  scene = new Scene(objectContext, annotationContext);
  populateCanvasWithRandomPoints(250, scene);
  createArea();
  createQuadTree();
  const { points, nodes } = quadTree.getPointsWithinArea(area);

  statsElement.innerHTML = `<p>Num of points found: ${points.length}</p><p>Had to traverse ${
    Object.keys(nodes).length
  } number of nodes</p>`;
}
init();
