"use strict";
/**
 * Return all elements with the square class.
 */
function getSquares() {
    return document.getElementsByClassName('square');
}
/**
 * Sets a shadow div for every element with square class
 */
function setShadowDivForSquares() {
    var squares = getSquares();
    for (var i = 0; i < squares.length; i++) {
        var square = squares.item(i);
        setShadowDiv(square);
    }
}
