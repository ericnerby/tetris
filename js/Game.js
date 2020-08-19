class Game {
  constructor(board,preview) {
    this.active = false;
    this.width = 10;
    this.rows = 20;
    this.board = board;
    this.preview = preview;
  }

  drawBoard() {
    
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
}