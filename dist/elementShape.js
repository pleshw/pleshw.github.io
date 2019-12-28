"use strict";
/**
* Get the dimensions of an element.
*/
function getElementDimensions(element) {
    return {
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height
    };
}
/**
* Get the position of an element.
*/
function getElementPosition(element) {
    return {
        x: element.getBoundingClientRect().left,
        y: element.getBoundingClientRect().top
    };
}
/**
* Check if two elements have the same width *and* height.
*/
function hasSameDimensions(element1, element2) {
    var a = getElementDimensions(element1);
    var b = getElementDimensions(element2);
    var sameWidth = (a.width === b.width);
    var sameHeight = (a.height === b.height);
    return sameWidth && sameHeight;
}
/**
* Check if two elements have the same position.
*/
function hasSamePosition(element1, element2) {
    var a = getElementPosition(element1);
    var b = getElementPosition(element2);
    var sameLeft = (a.x === b.x);
    var sameTop = (a.y === b.y);
    return sameLeft && sameTop;
}
/**
* Transform a sub-element so that it has the same width and height as the base element.
* @param base The base element.
* @param sub The element that will be transformed.
*/
function makeElementsProportional(base, sub) {
    var dimensions = getElementDimensions(base);
    sub.style.width = dimensions.width.toString().concat('px');
    sub.style.height = dimensions.height.toString().concat('px');
}
/**
* Transform a sub-element so that it has the same position as the base element.
* @param base The base element.
* @param sub The element that will be transformed.
*/
function stackElements(base, sub) {
    var position = getElementPosition(base);
    sub.style.left = position.x.toString().concat('px');
    sub.style.top = position.y.toString().concat('px');
}
/**
* Checks if two elements have the same size and position
*/
function elementsFit(a, b) {
    return hasSameDimensions(a, b) || hasSamePosition(a, b);
}
/**
 * Transform a sub-element so that it has the same size and position of a base element.
 */
function coverElement(base, sub) {
    stackElements(base, sub);
    makeElementsProportional(base, sub);
}
