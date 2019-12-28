/**
* Get the dimensions of an element.
*/
function getElementDimensions(element: Element): { width: number, height: number } {
  return {
    width: element.getBoundingClientRect().width,
    height: element.getBoundingClientRect().height
  }
}

/**
* Get the position of an element.
*/
function getElementPosition(element: Element): { x: number, y: number } {
  return {
    x: element.getBoundingClientRect().left,
    y: element.getBoundingClientRect().top
  }
}

/**
* Check if two elements have the same width *and* height.
*/
function hasSameDimensions(element1: Element, element2: Element): boolean {
  let a = getElementDimensions(element1);
  let b = getElementDimensions(element2);

  let sameWidth = (a.width === b.width);
  let sameHeight = (a.height === b.height);

  return sameWidth && sameHeight;
}

/**
* Check if two elements have the same position.
*/
function hasSamePosition(element1: Element, element2: Element): boolean {
  let a = getElementPosition(element1);
  let b = getElementPosition(element2);

  let sameLeft = (a.x === b.x);
  let sameTop = (a.y === b.y);

  return sameLeft && sameTop;
}

/**
* Transform a sub-element so that it has the same width and height as the base element.
* @param base The base element.
* @param sub The element that will be transformed.
*/
function makeElementsProportional(base: Element, sub: HTMLDivElement): void {
  let dimensions = getElementDimensions(base);
  sub.style.width = dimensions.width.toString().concat('px');
  sub.style.height = dimensions.height.toString().concat('px');
}

/**
* Transform a sub-element so that it has the same position as the base element.
* @param base The base element.
* @param sub The element that will be transformed.
*/
function stackElements(base: Element, sub: HTMLDivElement): void {
  let position = getElementPosition(base);
  sub.style.left = position.x.toString().concat('px');
  sub.style.top = position.y.toString().concat('px');
}

/**
* Checks if two elements have the same size and position
*/
function elementsFit(a: Element, b: Element): boolean {
  return hasSameDimensions(a, b) || hasSamePosition(a, b);
}

/**
 * Transform a sub-element so that it has the same size and position of a base element.
 */
function coverElement(base: Element, sub: HTMLDivElement) {
  stackElements(base, sub);
  makeElementsProportional(base, sub);
}
