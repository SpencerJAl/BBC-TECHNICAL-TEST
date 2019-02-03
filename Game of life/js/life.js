// Javascript for the BBC technical test - game of life 
// Developed by Alexander Spencer 

// setting up variables used in the functions.
//sets up the canvas height, width and resolution
let canH;
let canW;
let resolution;
// sets up the 2d arrays colomns and rows.
let grid;
let cols;
let rows;
// a boolean variable to determine whether the game of life is running or not.
let life=true;
// creates the arrays for the colomns and rows for the grid.
 function makeArray(cols, rows) {
	let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
// sets up the grid using the canvas size and the resolution
function setup() {
  console.log("starting a new iteration");
  canH = document.getElementById("canH").value;
  canW = document.getElementById("canW").value;
  resolution = document.getElementById("resolution").value;
  createCanvas(canW, canH);
  cols = width / resolution;
  rows = height / resolution;
  grid = makeArray(cols, rows);
  
  // enters in random 1 and 0 to determine if cells are alive or dead
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}
// function draws the background and fills in the cells that are alive with white.
function draw() {
  background(0);
  stroke(0);
  resolution = document.getElementById("resolution").value;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  // the if statements determines wheter or not make new generations if the game is paused or not.
  if(life == true){
  let next = makeArray(cols, rows);
  // determines next iteration of the game of life based on the current generation of the game.
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // counts the current live neighbours of the cell of each cycle of the loop.
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);
// if else statement for scenarios 0, 1, 2, 3, 4, 5 and 6. 
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }

    }
  }
// updates the grid with the next iteration of the game of life.
grid = next;
  }
}
// count neighbours checks the neighbours of the current cell and puts the current state into an array.
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
// pauses the game of life when the pause button is clicked.
function stop(){
	life=false;
	return life;
}
//resumes the game of life when the resume button is clicked.
function newest(){
	life=true;
	return life;
}