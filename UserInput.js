// interaction ui
function toggleAnnotation() {
  if (annotationCanvas.style.display === "none") {
    annotationCanvas.style.display = "block";
  } else {
    annotationCanvas.style.display = "none";
  }
}
function setNumberOfPoints(num) {
  populateCanvasWithRandomPoints(num, scene);
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
}

function createQuadTree() {
  quadTree = new QuadTree({
    points: scene.getPoints(),
    canvasWidth: CANVASWIDTH,
    canvasHeight: CANVASHEIGHT,
    pointDensity: densityGoal,
    color: "black",
    context: scene.annotationContext,
  });
}
function createArea(x = 241, y = 210) {
  area = new Area({ x: x, y: y }, 122, 125, annotationContext);
}
