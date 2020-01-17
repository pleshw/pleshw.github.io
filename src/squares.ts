/**
 * Return all elements with the square class.
 */
function getSquares(): HTMLCollectionOf<HTMLElement> {
  return <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('square');
}

function applyShadowDivToSquares() {
  const squares = getSquares();

  for (let i = 0; i < squares.length; i++) {
    const square = squares.item(i)!
    const shadow = getShadowDivFor(square);
    makeHoverable(square, shadow);
  }
}
