// interaction ui
function toggleAnnotation() {
  if (annotationCanvas.style.display === "none") {
    annotationCanvas.style.display = "block";
  } else {
    annotationCanvas.style.display = "none";
  }
}

// divide quadtree until densityGoal
const densityGoal = 2;

const quadTree = new QuadTree({
  points: scene.getPoints(),
  canvasWidth: CANVASWIDTH,
  canvasHeight: CANVASHEIGHT,
  pointDensity: densityGoal,
  color: "black",
  context: scene.annotationContext,
});

// given area:
const area = new Area({ x: 222, y: 44 }, 122, 125, annotationContext);
// give me all points within that area:
