function makeHoverable(hoveredElement: Element, target?: Element) {
  hoveredElement.addEventListener('mouseover', _event => (target || hoveredElement).classList.add('hovered'));
  hoveredElement.addEventListener('mouseleave', _event => (target || hoveredElement).classList.remove('hovered'));
}

function makeSelectable(hoveredElement: Element, target?: Element) {
  hoveredElement.addEventListener('click', _event => {
    _event.stopPropagation();
    if (!hoveredElement.classList.contains('selected'))
      (target || hoveredElement).classList.add('selected');
    else
      (target || hoveredElement).classList.remove('selected');
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  let elementList = document.body.getElementsByTagName("*");

  setShadowDivFor(elementList[3])

  for (let i = 0; i < elementList.length; i++) {
    // makeHoverable(elementList[i]);
    // makeSelectable(elementList[i])

  }
});