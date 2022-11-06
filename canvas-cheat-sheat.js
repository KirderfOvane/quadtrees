// canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
/* ctx.beginPath();
ctx.moveTo(100, 300);
ctx.lineTo(300, 300);
ctx.lineTo(300, 100);
ctx.lineTo(200, 50);
ctx.lineTo(100, 100);
ctx.lineTo(100, 300);
ctx.stroke();

ctx.beginPath();
ctx.arc(200, 200, 50, 0, 2 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.rect(100, 300, 200, 20);
ctx.lineWidth = 10;
ctx.strokeStyle = "green";
ctx.fillStyle = "red";
ctx.fillStyle = "#FF9900";
ctx.fillStyle = "rgb(50,228,202)";
ctx.fill();
ctx.stroke(); */

//ctx.fillRect(10,10,1,1)

// draw text
//ctx.font = "48px serif";
//ctx.fillText("Hello world", 10, 50);

// Use below drawpixel if you want to optimise small pixel size drawings
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

// That's how you define the value of a pixel
function drawPixel(x, y, r, g, b, a) {
  const index = (x + y * canvasWidth) * 4;

  canvasData.data[index + 0] = r;
  canvasData.data[index + 1] = g;
  canvasData.data[index + 2] = b;
  canvasData.data[index + 3] = a;
}

// That's how you update the canvas, so that your
// modification are taken in consideration
function updateCanvas() {
  ctx.putImageData(canvasData, 0, 0);
}

// Usage of drawpixel:
/* drawPixel(10, 100, 200, 255, 0, 255);
drawPixel(10, 200, 200, 255, 0, 255);
drawPixel(10, 200, 200, 0, 0, 255);
updateCanvas(); */

// button
function doSomething() {
  alert("hello");
}
