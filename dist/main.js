"use strict";
function getColorFromCode(colorCode) {
    switch (colorCode) {
        case 0:
            return 'orange';
        default:
            return 'red';
    }
}
function makeHoverable(hoveredElement, target) {
    hoveredElement.addEventListener('mouseover', function () { return (target || hoveredElement).classList.add('hovered'); });
    hoveredElement.addEventListener('mouseleave', function () { return (target || hoveredElement).classList.remove('hovered'); });
}
document.addEventListener("DOMContentLoaded", function (event) {
    applyShadowToAllSquares();
});
