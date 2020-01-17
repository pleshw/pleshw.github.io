function makeHoverable(hoveredElement: HTMLElement, target?: HTMLElement) {
  hoveredElement
    .onmouseover = () => (target || hoveredElement).classList.add('hovered');

  hoveredElement
    .onmouseleave = () => (target || hoveredElement).classList.remove('hovered');
}

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
  const elementList = <HTMLCollectionOf<HTMLElement>>document.body.getElementsByTagName("*");

  for (let i = 0; i < elementList.length; i++) {

  }
});