document.addEventListener('DOMContentLoaded', () => {

  /* ------------------ SETUP --------------------------------- */

  // select DOM elements and initialize new Game object
  const grid = document.querySelector('.grid');
  const miniGrid = document.querySelector('.mini-grid');
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const game = new Game(grid,miniGrid,scoreDisplay,startBtn,tetrominoList);

  // get game ready
  game.newGame();

  /* ------------------ EVENT LISTENERS --------------------------------- */

  //add listener to keys
  document.addEventListener('keyup', game.control);

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