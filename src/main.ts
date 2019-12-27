function getSquares(): HTMLCollectionOf<Element> {
  return document.getElementsByClassName('square');
}

function getElementPosition(element: Element): { x: number, y: number } {
  return {
    x: element.getBoundingClientRect().left,
    y: element.getBoundingClientRect().top
  }
}

function getElementDimensions(element: Element): { width: number, height: number } {
  return {
    width: element.getBoundingClientRect().width,
    height: element.getBoundingClientRect().height
  }
}

function setupShadow(shadow: HTMLDivElement, base: Element) {
  let position = getElementPosition(base);
  let dimensions = getElementDimensions(base);

  shadow.style.left = position.x.toString().concat('px');
  shadow.style.top = position.y.toString().concat('px');

  shadow.style.width = dimensions.width.toString().concat('px');
  shadow.style.height = dimensions.height.toString().concat('px');
}

function hasSameDimensions(element: Element, base: Element) {
  let base_dimensions = getElementDimensions(base);
  let element_dimensions = getElementDimensions(element);

  let sameWidth = (element_dimensions.width === base_dimensions.width);
  let sameHeight = (element_dimensions.height === base_dimensions.height);

  return sameWidth && sameHeight;
}

function getColorFromCode(colorCode: number): string {
  switch (colorCode) {
    case 0:
      return 'orange'
    default:
      return 'red';
  }
}

function getShadowDiv(to: Element, color: number): Element {
  let shadow = document.createElement("div");

  setInterval(() => window.requestAnimationFrame(() => {
    if (!hasSameDimensions(shadow, to))
      setupShadow(shadow, to);
  }), 300)

  to.addEventListener('mouseover', () => shadow.classList.add('hovered'));
  to.addEventListener('mouseleave', () => shadow.classList.remove('hovered'));

  shadow.classList.add(`${getColorFromCode(color)}-shadow-6`);

  shadow.classList.add('slave-4');

  setupShadow(shadow, to);

  return shadow;
}

function applyShadow() {
  let square = getSquares();

  for (let i = 0; i < square.length; i++) {
    square.item(i)!.insertAdjacentElement('beforebegin', getShadowDiv(square.item(i)!, i));
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  applyShadow();
});