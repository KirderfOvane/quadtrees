class Scene {
  _points = [];

  constructor(objectContext, annotationContext) {
    this.objectContext = objectContext;
    this.annotationContext = annotationContext;
  }
  addPoint(point) {
    this._points.push(point);
  }
  getPoints() {
    return this._points;
  }
  getPoint(index) {
    if (this._points[index]) {
      return this._points[index];
    } else {
      console.log(index, " does not exist");
      return;
    }
  }
}
