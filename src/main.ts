
/**
 * Makes hoveredElement be marked with hovered class, whenever the user put the mouse over the target
 * @param selectedElement
 * @param target
 */
function makeHoverable(hoveredElement: HTMLElement, target?: HTMLElement) {
  hoveredElement
    .onmouseover = () => (target || hoveredElement).classList.add('hovered');
  hoveredElement
    .onmouseleave = () => (target || hoveredElement).classList.remove('hovered');
}


/**
 * Makes selectedElement be marked with selected class, whenever the user clicks on target
 * @param selectedElement 
 * @param target 
 */
function makeSelectable(selectedElement: HTMLElement, target?: HTMLElement) {
  selectedElement.onclick = _event => {
    _event.stopPropagation();
    if (!selectedElement.classList.contains('selected'))
      (target || selectedElement).classList.add('selected');
    else
      (target || selectedElement).classList.remove('selected');
  }
}

window.addEventListener('contextmenu', _event => {
  _event.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {
  _main();
});


/**
 * Chamado assim que o conteúdo do DOM é carregado
 */
function _main() {
  const elementList = <HTMLCollectionOf<HTMLElement>>document.body.getElementsByTagName("*");

  // usado para fazer alguma coisa para cada elemento no body
  for (let i = 0; i < elementList.length; i++) {
    elementList[i].style.zIndex = '0';
  }
}