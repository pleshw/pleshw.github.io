"use strict";
/**
* Get the dimensions of an element.
*/
function getElementDimensions(element) {
    var rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height
    };
}
/**
* Get the position of an element.
*/
function getElementPosition(element) {
    var rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    };
}
/**
* Check if two elements have the same width *and* height.
*/
function hasSameDimensions(element1, element2) {
    var a = getElementDimensions(element1);
    var b = getElementDimensions(element2);
    return (a.width === b.width) && (a.height === b.height);
}
/**
* Check if two elements have the same position.
*/
function hasSamePosition(element1, element2) {
    var a = getElementPosition(element1);
    var b = getElementPosition(element2);
    return (a.x === b.x) && (a.y === b.y);
}
/**
* Transform a sub-element so that it has the same width and height as the base element.
* @param base The base element.
* @param sub The element that will be transformed.
*/
function makeElementsProportional(base, sub) {
    var dimensions = getElementDimensions(base);
    var subElementStyle = sub.style;
    subElementStyle.width = dimensions.width.toString().concat('px');
    subElementStyle.height = dimensions.height.toString().concat('px');
}
/**
* Transform a sub-element so that it has the same position as the base element.
* @param base The base element.
* @param sub The element that will be transformed.
*/
function stackElements(base, sub) {
    var position = getElementPosition(base);
    var subElementStyle = sub.style;
    subElementStyle.left = position.x.toString().concat('px');
    subElementStyle.top = position.y.toString().concat('px');
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
