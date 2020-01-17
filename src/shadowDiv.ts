/**
 * Return a shadow div to a specific square.
 * A shadow div is a div that fits an element
 */
function getShadowDivFor(element: HTMLElement): HTMLElement {
  const shadow = document.createElement("div");
  shadow.setAttribute('shadow-of', element.id)

  setInterval(() => window.requestAnimationFrame(() => {
    if (!elementsFit(element, shadow))
      coverElement(element, shadow);
  }), 100);

  coverElement(element, shadow);

  shadow.classList.add('slave-1');

  element.insertAdjacentElement('beforebegin', shadow);

  return shadow;
}