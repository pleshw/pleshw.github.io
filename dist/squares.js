"use strict";
/**
 * Return all elements with the square class.
 */
function getSquares() {
    return document.getElementsByClassName('square');
}
function applyShadowToAllSquares() {
    var square = getSquares();
    for (var i = 0; i < square.length; i++) {
        var shadow = setShadowDivFor(square.item(i));
        makeHoverable(square.item(i), shadow);
    }
}
