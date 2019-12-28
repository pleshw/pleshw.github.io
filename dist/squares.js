"use strict";
/**
 * Return all elements with the square class.
 */
function getSquares() {
    return document.getElementsByClassName('square');
}
/**
 * Return a shadow div to a specific square.
 * @param square The element square to be shadowed.
 * @param color the color for shadow.
 */
function getShadowDiv(square, color) {
    var shadow = document.createElement("div");
    setInterval(function () { return window.requestAnimationFrame(function () {
        if (!elementsFit(square, shadow))
            coverElement(square, shadow);
    }); }, 300);
    makeHoverable(square, shadow);
    coverElement(square, shadow);
    shadow.classList.add(getColorFromCode(color) + "-shadow-6");
    shadow.classList.add('slave-4');
    return shadow;
}
function applyShadowToAllSquares() {
    var square = getSquares();
    for (var i = 0; i < square.length; i++) {
        square.item(i).insertAdjacentElement('beforebegin', getShadowDiv(square.item(i), i));
    }
}
