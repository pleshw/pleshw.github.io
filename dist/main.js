"use strict";
function makeHoverable(hoveredElement, target) {
    hoveredElement
        .onmouseover = function () { return (target || hoveredElement).classList.add('hovered'); };
    hoveredElement
        .onmouseleave = function () { return (target || hoveredElement).classList.remove('hovered'); };
}
function makeSelectable(selectedElement, target) {
    selectedElement.onclick = function (_event) {
        _event.stopPropagation();
        if (!selectedElement.classList.contains('selected'))
            (target || selectedElement).classList.add('selected');
        else
            (target || selectedElement).classList.remove('selected');
    };
}
window.addEventListener('contextmenu', function (_event) {
    _event.preventDefault();
});
document.addEventListener("DOMContentLoaded", function () {
    var elementList = document.body.getElementsByTagName("*");
    for (var i = 0; i < elementList.length; i++) {
    }
});
