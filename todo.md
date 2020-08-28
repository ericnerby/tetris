# Refactoring Project for Tetris Game

## Problems with current version:

1. Code is difficult to read and not at all modular. Should be refactored to be object-oriented and modular.
1. Bugs:
    * Rotate function doesn't check boundaries so tetrominoes get stuck when rotated past the edge of the play area
    * Sometimes tetrominoes don't undraw consistently when multiple rows are cleared at the same time leaving pieces of the tetromino drawn near the top of the play area
1. Enhancement Opportunities:
    * Add levels by increasing speed (and possibly points?)
    * Currently, score disappears as soon as Game Over is reached so the user can't see their result
    * Persistent storage could be used to track high scores on a leaderboard
    * An option should be available at Game Over to start a New Game

## To-Dos for New Version

1. Convert draw (undraw) and move functions to use x and y coordinates
1. Add isPreview boolean parameter to Draw and Undraw functions and get rid of `displayShape()` function in app.js
1. Possibly change down method so the button can be held (or explore alternatives)
