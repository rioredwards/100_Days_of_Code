"using strict";

let grid = document.getElementById(`pixel-container`);
let clearBtn = document.getElementById("clearBtn");

buildGrid()

function buildGrid() {
  for (let i = 0; i < 81; i++) {
    let pixel = `<div id="pixel-${i}" class="pixel" style="background-color: white; box-shadow: none;"></div>`;
    grid.innerHTML += pixel;
  };
};

// Get the parent DIV, add click listener...
grid.addEventListener("mousedown", function (e) {
  let chosenColor = document.getElementById("colorPicker").value;
  // pixel.target was the clicked element
  console.log(chosenColor);

  let pixel = e.target;
  if (pixel && pixel.matches("div.pixel")) {
    const pixelColorCurr = pixel.style.backgroundColor;
    console.log(pixelColorCurr);
    console.log("Pixel element: " + pixel.id);
    pixel.style.backgroundColor = chosenColor;
  }
});

clearBtn.addEventListener("click", function () {
  // array1.forEach(element => console.log(element));
  for (let i = 0; i < 81; i++) {
    let pixel = document.getElementById(`pixel-${i}`);
    pixel.style.backgroundColor = `white`;
  }
});

grid.addEventListener("mouseover", function (e) {
  let pixel = e.target;
  // pixel.target was the clicked element
  if (pixel && pixel.matches("div.pixel")) {
    const boxShadow = `0 0 6px 2px rgba(255, 255, 255, .2) inset`;
    pixel.style.boxShadow = boxShadow;
  }
});

grid.addEventListener("mouseout", function (e) {
  let pixel = e.target;
  // pixel.target was the clicked element
  if (pixel && pixel.matches("div.pixel")) {
    pixel.style.boxShadow = "none";
  }
});
