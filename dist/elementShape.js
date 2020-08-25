"use strict";
/**
* Retorna as dimensões em altura e largura dos elementos.
*/
function getElementDimensions(element) {
    var rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height
    };
}
/**
* Retorna a posição do elemento em relação a viewport.
*/
function getElementPosition(element) {
    var rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    };
}
/**
* Checa se dois elementos tem mesma altura e largura.
*/
function hasSameDimensions(element1, element2) {
    var a = getElementDimensions(element1);
    var b = getElementDimensions(element2);
    return (a.width === b.width) && (a.height === b.height);
}
/**
* Checa se dois elementos estão na mesma posição.
*/
function hasSamePosition(element1, element2) {
    var a = getElementPosition(element1);
    var b = getElementPosition(element2);
    return (a.x === b.x) && (a.y === b.y);
}
/**
* Faz com que dois elementos fiquem com a mesma altura e largura
* @param base O elemento usado como base.
* @param sub O elemento que vai ter suas dimensões alteradas.
*/
function makeElementsProportional(base, sub) {
    var dimensions = getElementDimensions(base);
    var subElementStyle = sub.style;
    subElementStyle.width = dimensions.width.toString().concat('px');
    subElementStyle.height = dimensions.height.toString().concat('px');
}
/**
* Faz com que dois elementos tenham as mesmas posições.
* @param base O elemento usado como base.
* @param sub O elemento que vai ter sua posição alterada.
*/
function stackElements(base, sub) {
    var position = getElementPosition(base);
    var subElementStyle = sub.style;
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
