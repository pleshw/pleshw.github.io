/**
* Get the dimensions of an element.
*/
function getElementDimensions(element: Element): { width: number, height: number } {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height
  }
}

/**
* Get the position of an element.
*/
function getElementPosition(element: Element): { x: number, y: number } {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top
  }
}

/**
* Check if two elements have the same width *and* height.
*/
function hasSameDimensions(element1: Element, element2: Element): boolean {
  const a = getElementDimensions(element1);
  const b = getElementDimensions(element2);

  return (a.width === b.width) && (a.height === b.height);
}

/**
* Check if two elements have the same position.
*/
function hasSamePosition(element1: Element, element2: Element): boolean {
  const a = getElementPosition(element1);
  const b = getElementPosition(element2);

  return (a.x === b.x) && (a.y === b.y);
}

/**
* Transform a sub-element so that it has the same width and height as the base element.
* @param base The base element.
* @param sub The element that will be transformed.
*/
function makeElementsProportional(base: Element, sub: HTMLDivElement): void {
  const dimensions = getElementDimensions(base);
  const subElementStyle = sub.style;
  subElementStyle.width = dimensions.width.toString().concat('px');
  subElementStyle.height = dimensions.height.toString().concat('px');
}

/**
* Transform a sub-element so that it has the same position as the base element.
* @param base The base element.
* @param sub The element that will be transformed.
*/
function stackElements(base: Element, sub: HTMLDivElement): void {
  const position = getElementPosition(base);
  const subElementStyle = sub.style;
  subElementStyle.left = position.x.toString().concat('px');
  subElementStyle.top = position.y.toString().concat('px');
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
