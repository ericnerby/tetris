class Game {
  constructor(grid,preview,scoreDisplay,startBtn,tetrominoes) {
    //DOM elements
    this.grid = grid;
    this.preview = preview;
    this.scoreDisplay = scoreDisplay;
    this.startBtn = startBtn;

    //constants
    this.width = 10;
    this.rows = 20;

    //trackers
    this.active = false;
    this.cells = [];
    this.prevCells = [];
    this.timerId = null;
    this.score = 0;
    
    //game elements
    this.tetrominoes = this.initializeTetrominoes(tetrominoes);
  }

  newGame() {
    this.drawBoard();
  }

  drawBoard() {
    //initialize cells for grid
    for (let y = 0; y < this.rows; y++) {
      const newRow = [];
      for (let x = 0; x < this.width; x++) {
        const newCell = document.createElement('div');
        newCell.dataset.id = `${x}-${y}`;
        this.grid.appendChild(newCell);
        newRow.push(newCell);
      }
      this.cells.push(newRow);
    }
    for (let i=0; i<10; i++) {
      const div = document.createElement('div');
      div.classList.add('taken');
      this.grid.appendChild(div);
    }
    for (let i=0; i<16; i++) {
      this.preview.appendChild(document.createElement('div'));
    }
  }

  startStop() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      this.active = false;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random()*theTetrominoes.length);
      displayShape();
      this.active = true;
    }
  }

  control(e) {
    if(this.active) {
      if(e.keyCode === 37) {
        // moveLeft();
      } else if (e.keyCode === 38) {
        // rotate();
      } else if (e.keyCode === 39) {
        // moveRight();
      } else if (e.keyCode === 40) {
        // moveDown();
      }
    }
  }

  //game over
  gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'end';
      clearInterval(timerId);
    }
  }

  //add score
  addScore() {
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

  //freeze function
  freeze() {
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

  initializeTetrominoes(tetrominoList) {
    let newTetrominoes = [];
    tetrominoList.map( tetromino => {
      const { color, shapes } = tetromino;
      const newTetromino = new Tetromino( color, shapes )
      newTetrominoes.push(newTetromino);
    });
    return newTetrominoes;
  }
}