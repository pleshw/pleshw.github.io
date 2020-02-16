"use strict";
/**
 * Create and return a shadow div for 'element'.
 * A shadow div is a div that will always fit an element
 */
function setShadowDiv(element) {
    var shadow = document.createElement("div");
    shadow.setAttribute('shadow-of', element.id);
    setInterval(function () { return window.requestAnimationFrame(function () {
        if (!elementsFit(element, shadow))
            coverElement(element, shadow);
    }); }, 100);
    coverElement(element, shadow);
    shadow.classList.add('slave-1');
    element.insertAdjacentElement('beforebegin', shadow);
    return shadow;
}
