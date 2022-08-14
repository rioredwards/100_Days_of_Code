"using strict";

let grid = document.getElementById(`pixel-container`);

// let pixelArray = [
//   { name: `1`, color: `white` },
//   { name: `2`, color: `black` },
//   { name: `3`, color: `black` },
//   { name: `4`, color: `black` },
//   { name: `5`, color: `black` },
//   { name: `6`, color: `white` },
//   { name: `7`, color: `black` },
//   { name: `8`, color: `black` },
//   { name: `9`, color: `black` },
// ];

// let pixelArray;
// for (let i = 0; i < 81; i++) {
//   pixelArray[i] = { name: `${i}`, color: `white` };
// }

buildGrid()

function buildGrid() {
  for (let i = 0; i < 81; i++) {
    let pixel = `<div id="pixel-${i}" class="pixel" style="background-color: black; box-shadow: none;"></div>`;
    grid.innerHTML += pixel;
  };
};

// Get the parent DIV, add click listener...
grid.addEventListener("mousedown", function (pixel) {
  // pixel.target was the clicked element
  if (pixel.target && pixel.target.matches("div.pixel")) {
    const pixelColorCurr = pixel.target.style.backgroundColor;
    console.log(pixelColorCurr);
    console.log("Pixel element: " + pixel.target.id);
    if (pixel.target.style.backgroundColor == "black") {
      pixel.target.style.backgroundColor = 'white';
    }
    else if (pixel.target.style.backgroundColor == "white") {
      pixel.target.style.backgroundColor = 'black';
    }
  }
});

grid.addEventListener("mouseover", function (pixel) {
  // pixel.target was the clicked element
  if (pixel.target && pixel.target.matches("div.pixel")) {
    const boxShadow = `0 0 6px 2px rgba(255, 255, 255, .2) inset`;
    pixel.target.style.boxShadow = boxShadow;
  }
});

grid.addEventListener("mouseout", function (pixel) {
  // pixel.target was the clicked element
  if (pixel.target && pixel.target.matches("div.pixel")) {
    pixel.target.style.boxShadow = "none";
  }
});

// background-color: aqua;