/**
 * Return all elements with the square class.
 */
function getSquares(): HTMLCollectionOf<Element> {
  return document.getElementsByClassName('square');
}

/**
 * Return a shadow div to a specific square.
 * @param square The element square to be shadowed.
 * @param color the color for shadow.
 */
function getShadowDiv(square: Element, color: number): Element {
  let shadow = document.createElement("div");

  setInterval(() => window.requestAnimationFrame(() => {
    if (!elementsFit(square, shadow))
      coverElement(square, shadow);
  }), 300)

  makeHoverable(square, shadow);
  coverElement(square, shadow);

  shadow.classList.add(`${getColorFromCode(color)}-shadow-6`);
  shadow.classList.add('slave-4');

  return shadow;
}

function applyShadowToAllSquares() {
  let square = getSquares();

  for (let i = 0; i < square.length; i++) {
    square.item(i)!.insertAdjacentElement('beforebegin', getShadowDiv(square.item(i)!, i));
  }
}
