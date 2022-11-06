// interaction ui
function toggleAnnotation() {
  console.log(annotationCanvas.style.display === "none");
  if (annotationCanvas.style.display === "none") {
    annotationCanvas.style.display = "block";
  } else {
    annotationCanvas.style.display = "none";
  }
}
