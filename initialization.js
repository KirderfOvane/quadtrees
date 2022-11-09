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
  clearCanvas(objectContext);
  //clearCanvas(annotationContext);
  populateCanvasWithRandomPoints(e.target.value, scene);
});
const densityInput = document.getElementById("pointDensity");
densityInput.addEventListener("change", (e) => {
  densityGoal = e.target.value;
  clearCanvas(annotationContext);
  area = null;
  quadTree = null;
  createQuadTree();
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
  quadTree.getPointsWithinArea(area);
});

// global vars
let scene;
let densityGoal = 2;
let quadTree;
let area;

function populateCanvasWithRandomPoints(numPoints, scene) {
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
  quadTree.getPointsWithinArea(area);
}
init();
