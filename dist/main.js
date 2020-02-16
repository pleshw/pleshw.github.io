"use strict";
/**
 * Makes hoveredElement be marked with hovered class, whenever the user put the mouse over the target
 * @param selectedElement
 * @param target
 */
function makeHoverable(hoveredElement, target) {
    hoveredElement
        .onmouseover = function () { return (target || hoveredElement).classList.add('hovered'); };
    hoveredElement
        .onmouseleave = function () { return (target || hoveredElement).classList.remove('hovered'); };
}
/**
 * Makes selectedElement be marked with selected class, whenever the user clicks on target
 * @param selectedElement
 * @param target
 */
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
    _main();
});
/**
 * Chamado assim que o conteúdo do DOM é carregado
 */
function _main() {
    var elementList = document.body.getElementsByTagName("*");
    // usado para fazer alguma coisa para cada elemento no body
    for (var i = 0; i < elementList.length; i++) {
        elementList[i].style.zIndex = '0';
    }
}
