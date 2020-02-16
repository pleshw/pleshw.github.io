/**
 * Return all elements with the square class.
 */
function getSquares(): HTMLCollectionOf<HTMLElement> {
  return <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('square');
}

/**
 * Sets a shadow div for every element with square class 
 */
function setShadowDivForSquares() {
  const squares = getSquares();

  for (let i = 0; i < squares.length; i++) {
    const square = squares.item(i)!
    setShadowDiv(square);
  }
}
