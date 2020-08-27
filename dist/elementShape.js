"use strict";
/**
* Retorna as dimensões em altura e largura dos elementos.
*/
function getElementDimensions(element) {
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height
    };
}
/**
* Faz com que dois elementos fiquem com a mesma altura e largura
* @param base O elemento usado como base.
* @param sub O elemento que vai ter suas dimensões alteradas.
*/
function makeElementsProportional(base, sub) {
    const dimensions = getElementDimensions(base);
    const subElementStyle = sub.style;
    subElementStyle.width = dimensions.width.toString().concat('px');
    subElementStyle.height = dimensions.height.toString().concat('px');
}
/**
* Faz com que dois elementos tenham as mesmas posições.
* @param base O elemento usado como base.
* @param sub O elemento que vai ter sua posição alterada.
*/
function stackElements(base, sub) {
    const position = getElementPosition(base);
    const subElementStyle = sub.style;
    subElementStyle.left = position.x.toString().concat('px');
    subElementStyle.top = position.y.toString().concat('px');
}
/**
* Checa se dois elementos tem a mesma posição e dimensões
*/
function elementsFit(a, b) {
    return hasSameDimensions(a, b) || hasSamePosition(a, b);
}
/**
 * Faz com que dois elementos fiquem na mesma posição e do mesmo tamanho
 */
function coverElement(base, sub) {
    stackElements(base, sub);
    makeElementsProportional(base, sub);
}
