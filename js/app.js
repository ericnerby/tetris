document.addEventListener('DOMContentLoaded', () => {

const grid = document.querySelector('.grid');

//initialize cells for grid
for (let i=0; i<200; i++) {
  grid.appendChild(document.createElement('div'));
}
for (let i=0; i<10; i++) {
  const div = document.createElement('div');
  div.classList.add('taken');
  grid.appendChild(div);
}
for (let i=0; i<16; i++) {
  document.querySelector('.mini-grid').appendChild(document.createElement('div'));
}
let squares = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
const width = 10;
let nextRandom = 0;
let timerId;
let score = 0;
const colors = [
  '#FF8811',
  '#E0607E',
  '#009FB7',
  '#4357AD',
  '#610F7F',
]

//The Tetrominoes
const lTetromino = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2+2],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2],
];
const zTetromino = [
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1],
];
const tTetromino = [
  [1, width, width+1, width+2],
  [1, width+1, width+2, width*2+1],
  [width, width+1, width+2, width*2+1],
  [1, width, width+1, width*2+1],
];
const oTetromino = [
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1],
];
const iTetromino = [
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
];
const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
    
let currentPosition = 4;
let currentRotation = 0;

let random = Math.floor(Math.random()*theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

//draw the Tetromino
function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino');
    squares[currentPosition + index].style.backgroundColor = colors[random];
  });
}

//undraw the Tetromino
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino');
    squares[currentPosition + index].style.backgroundColor = '';
  });
}

//assign functions to keyCodes
function control(e) {
  if(e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    rotate();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }
}
document.addEventListener('keyup',control);

//move down function
function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

//freeze function
function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'));
    //start a new tetromino falling
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
    addScore();
    gameOver();
  }
}

//move the tetromino left, unless is at the edge or there is a blockage
function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

  if(!isAtLeftEdge) currentPosition -=1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition += 1;
  }

  draw();
}

//move the tetromino right, unless is at the edge or there is a blockage
function moveRight() {
  undraw();
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);

  if(!isAtRightEdge) currentPosition += 1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1;
  }

  draw();
}

//rotate the tetromino
function rotate() {
  undraw();
  currentRotation ++;
  if(currentRotation === current.length) {
    //if the current rotation gets to the end, take it back to 0
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  draw();
}

//show up-next tetromino in mini-grid display
const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0;

//the Tetrominos wiithout rotations
const upNextTetrominoes = [
  [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
  [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
  [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
  [0, 1, displayWidth, displayWidth+1], //oTetromino
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], //iTetromino
]

//display the shape in the mini-grid display
function displayShape() {
  displaySquares.forEach(square => {
    square.classList.remove('tetromino');
    square.style.backgroundColor = '';
  });
  upNextTetrominoes[nextRandom].forEach( index => {
    displaySquares[displayIndex + index].classList.add('tetromino');
    displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];

  });
}

//add functionality to the button
startBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    draw();
    timerId = setInterval(moveDown, 1000);
    nextRandom = Math.floor(Math.random()*theTetrominoes.length);
    displayShape();
  }
});

//add score
function addScore() {
  for (let x=0; x < 199; x+=width) {
    const row = [];
    for (let y=0; y < width; y++) {
      row.push(x+y);
    }
    if(row.every(index => squares[index].classList.contains('taken'))) {
      score += 10;
      scoreDisplay.innerHTML = score;
      row.forEach(index => {
        squares[index].classList.remove('taken');
        squares[index].classList.remove('tetromino');
        squares[index].style.backgroundColor = '';
      });
      const squaresRemoved = squares.splice(x, width);
      squares = squaresRemoved.concat(squares);
      squares.forEach(cell => grid.appendChild(cell));
    }
  }
}

//game over
function gameOver() {
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    scoreDisplay.innerHTML = 'end';
    clearInterval(timerId);
  }
}

});