window.addEventListener("load", () => {
  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("mousedown", startpainting);
  window.addEventListener("mouseup", stopPainting);
  window.addEventListener("mousemove", draw);
});

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};

let coord = {
  x: 0,
  y: 0,
};

let lineWidth = 5;
let color = "white";
let painting = false;

const getposition = (e) => {
  coord.x = e.clientX - canvas.offsetLeft;
  coord.y = e.clientY - canvas.offsetTop;
};

const startpainting = (e) => {
  painting = true;
  getposition(e);
};

const stopPainting = () => {
  painting = false;
};

const draw = (e) => {
  if (painting) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.Cap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(coord.x, coord.y);
    getposition(e);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
  }
};

const colors = document.querySelectorAll(".colors .color");
colors.forEach((singleColor) => {
  singleColor.addEventListener("click", () => {
    color = singleColor.getAttribute("color");
  });
});

// function change_color(e){
//     color = e.style.background;
// }

const tools = document.querySelectorAll(".tools .tool");
tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    switch (tool.getAttribute("tool")) {
      case "pencil":
        lineWidth = 5;
        color = "white";
        break;
      case "clear":
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineWidth = 5;
        color = "white";
        break;
      case "eraser":
        lineWidth = 20;
        color = "black";
        break;
      default:
        lineWidth = 5;
        color = "white";
    }
  });
});
