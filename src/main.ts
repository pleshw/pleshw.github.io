function getColorFromCode(colorCode: number): string {
  switch (colorCode) {
    case 0:
      return 'orange'
    default:
      return 'red';
  }
}

function makeHoverable(hoveredElement: Element, target?: Element) {
  hoveredElement.addEventListener('mouseover', () => (target || hoveredElement).classList.add('hovered'));
  hoveredElement.addEventListener('mouseleave', () => (target || hoveredElement).classList.remove('hovered'));
}

document.addEventListener("DOMContentLoaded", function (event) {
  applyShadowToAllSquares();
});