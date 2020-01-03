/**
 * Return all elements with the square class.
 */
function getSquares(): HTMLCollectionOf<Element> {
  return document.getElementsByClassName('square');
}



function applyShadowToAllSquares() {
  let square = getSquares();

  for (let i = 0; i < square.length; i++) {
    let shadow = setShadowDivFor(square.item(i)!);
    makeHoverable(square.item(i)!, shadow);
  }
}
