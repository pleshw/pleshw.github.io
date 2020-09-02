"use strict";
/**
 * Cria e retorna uma div que funciona como uma sombra para um elemento
 * Essa div sempre vai ter a mesma posição e as mesmas dimensões do elemento base
 */
function setShadowDiv(element) {
    const shadow = document.createElement("div");
    shadow.setAttribute('shadow-of', element.id);
    setInterval(() => window.requestAnimationFrame(() => {
        if (!elementsFit(element, shadow))
            makeCover(element, shadow);
    }), 100);
    makeCover(element, shadow);
    shadow.classList.add('slave-1');
    element.insertAdjacentElement('beforebegin', shadow);
    return shadow;
}
