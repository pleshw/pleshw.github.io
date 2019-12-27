"use strict";
function getSquares() {
    return document.getElementsByClassName('square');
}
function getElementPosition(element) {
    return {
        x: element.getBoundingClientRect().left,
        y: element.getBoundingClientRect().top
    };
}
function getElementDimensions(element) {
    return {
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height
    };
}
function setupShadow(shadow, base) {
    var position = getElementPosition(base);
    var dimensions = getElementDimensions(base);
    shadow.style.left = position.x.toString().concat('px');
    shadow.style.top = position.y.toString().concat('px');
    shadow.style.width = dimensions.width.toString().concat('px');
    shadow.style.height = dimensions.height.toString().concat('px');
}
function hasSameDimensions(element, base) {
    var base_dimensions = getElementDimensions(base);
    var element_dimensions = getElementDimensions(element);
    var sameWidth = (element_dimensions.width === base_dimensions.width);
    var sameHeight = (element_dimensions.height === base_dimensions.height);
    return sameWidth && sameHeight;
}
function getColorFromCode(colorCode) {
    switch (colorCode) {
        case 0:
            return 'orange';
        default:
            return 'red';
    }
}
function getShadowDiv(to, color) {
    var shadow = document.createElement("div");
    setInterval(function () { return window.requestAnimationFrame(function () {
        if (!hasSameDimensions(shadow, to))
            setupShadow(shadow, to);
    }); }, 300);
    to.addEventListener('mouseover', function () { return shadow.classList.add('hovered'); });
    to.addEventListener('mouseleave', function () { return shadow.classList.remove('hovered'); });
    shadow.classList.add(getColorFromCode(color) + "-shadow-6");
    shadow.classList.add('slave-4');
    setupShadow(shadow, to);
    return shadow;
}
function applyShadow() {
    var square = getSquares();
    for (var i = 0; i < square.length; i++) {
        square.item(i).insertAdjacentElement('beforebegin', getShadowDiv(square.item(i), i));
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    applyShadow();
});
