"use strict";
function makeHoverable(hoveredElement, target) {
    hoveredElement.addEventListener('mouseover', function (_event) { return (target || hoveredElement).classList.add('hovered'); });
    hoveredElement.addEventListener('mouseleave', function (_event) { return (target || hoveredElement).classList.remove('hovered'); });
}
function makeSelectable(hoveredElement, target) {
    hoveredElement.addEventListener('click', function (_event) {
        _event.stopPropagation();
        if (!hoveredElement.classList.contains('selected'))
            (target || hoveredElement).classList.add('selected');
        else
            (target || hoveredElement).classList.remove('selected');
    });
}
document.addEventListener("DOMContentLoaded", function (event) {
    var elementList = document.body.getElementsByTagName("*");
    setShadowDivFor(elementList[3]);
    for (var i = 0; i < elementList.length; i++) {
        // makeHoverable(elementList[i]);
        // makeSelectable(elementList[i])
    }
});
