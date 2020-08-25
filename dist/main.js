"use strict";
/**
 * Faz com que um elemento se torne selecionável quando o mouse estiver em cima dele
 * Isso aplica a classe 'hovered' no elemento sempre que ele for clicado
 * @param selectedElement
 * @param target
 */
function makeHoverable(hoveredElement, $class, target) {
    hoveredElement
        .onmouseover = function () { return (target || hoveredElement).classList.add($class); };
    hoveredElement
        .onmouseleave = function () { return (target || hoveredElement).classList.remove($class); };
}
/**
 * Faz com que um elemento se torne selecionável quando o mouse clicar nele
 * Isso aplica a classe '@class' no elemento sempre que ele for clicado
 * @param selectedElement
 * @param target
 */
function makeSelectable(selectedElement, $class, target) {
    selectedElement.onclick = function (_event) {
        _event.stopPropagation();
        if (!selectedElement.classList.contains($class))
            (target || selectedElement).classList.add($class);
        else
            (target || selectedElement).classList.remove($class);
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
    for (var i = 0; i < elementList.length; i++) {
        elementList[i].style.zIndex = '0';
    }
    for (var i = 0; i < 30; i++) {
        var b = new ElementBuilder("div").addClass('square').setHeight(30).setWidth(50).build();
    }
}
