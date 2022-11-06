// canvas init
const CANVASWIDTH = 400;
const CANVASHEIGHT = 400;
const objectCanvas = document.getElementById("object-layer");
const annotationCanvas = document.getElementById("annotation-layer");
const objectContext = objectCanvas.getContext("2d");
const annotationContext = annotationCanvas.getContext("2d");

function clearCanvas() {
  ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
}

// global vars
let scene;

function populateCanvasWithRandomPoints(numPoints, scene) {
  for (let i = 0; i < numPoints; i++) {
    let point = new Point(
      Math.floor(Math.random() * CANVASWIDTH),
      Math.floor(Math.random() * CANVASHEIGHT)
      // Math.floor(Math.random() * CANVASWIDTH * 0.5) + CANVASWIDTH * 0.25,
      // Math.floor(Math.random() * CANVASHEIGHT * 0.5) + CANVASHEIGHT * 0.25
    );
    point.draw(objectContext);
    // point.drawAnnotation(annotationContext);
    scene.addPoint(point);
  }
}

// initialization
function init() {
  scene = new Scene(objectContext, annotationContext);
  populateCanvasWithRandomPoints(250, scene);
}
init();
