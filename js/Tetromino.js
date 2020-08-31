class Tetromino {
  /**
   * @param {string} color  - a hexidecimal value for the color of the tetromino
   * @param {array}  shapes - a three-dimensional array with the shapes for the tetromino
   */
  constructor(color, shapes) {
    this.shapes = shapes;
    this.color = color;
  }

  //draw the Tetromino
  draw(position, preview) {
    this.shapes.forEach(index => {
      squares[position + index].classList.add('tetromino');
      squares[position + index].style.backgroundColor = this.color;
    });
  }

  //undraw the Tetromino
  undraw(preview, position) {
    this.shapes.forEach(index => {
      squares[position + index].classList.remove('tetromino');
      squares[position + index].style.backgroundColor = '';
    });
  }

  //move the tetromino left, unless is at the edge or there is a blockage
  moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

    if(!isAtLeftEdge) currentPosition -=1;

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }

    draw();
  }

  //move the tetromino right, unless is at the edge or there is a blockage
  moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);

    if(!isAtRightEdge) currentPosition += 1;

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }

    draw();
  }

  //rotate the tetromino
  rotate() {
    undraw();
    currentRotation ++;
    if(currentRotation === current.length) {
      //if the current rotation gets to the end, take it back to 0
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  //move down function
  moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }
}