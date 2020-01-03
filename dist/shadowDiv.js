"use strict";
/**
 * Return a shadow div to a specific square.
 * A shadow div is a div that fits an element
 */
function setShadowDivFor(element) {
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
