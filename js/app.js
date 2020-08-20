document.addEventListener('DOMContentLoaded', () => {

  /* ------------------ SETUP --------------------------------- */

  // select DOM elements and initialize new Game object
  const grid = document.querySelector('.grid');
  const miniGrid = document.querySelector('.mini-grid');
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const game = new Game(grid,miniGrid,scoreDisplay,startBtn,tetrominoList);

  // get game ready
  let random = Math.floor(Math.random()*theTetrominoes.length);

  /* ------------------ EVENT LISTENERS --------------------------------- */

  //assign functions to keyCodes
  function control(e) {
    if(activeGame) {
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
  }
  //add listener to keys
  document.addEventListener('keyup',control);

  //add listener to play/pause button
  startBtn.addEventListener('click', game.startStop);

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

});