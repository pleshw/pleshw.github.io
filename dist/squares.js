"use strict";
/**
 * Return all elements with the square class.
 */
function getSquares() {
    return document.getElementsByClassName('square');
}
function applyShadowDivToSquares() {
    var squares = getSquares();
    for (var i = 0; i < squares.length; i++) {
        var square = squares.item(i);
        var shadow = getShadowDivFor(square);
        makeHoverable(square, shadow);
    }
}
