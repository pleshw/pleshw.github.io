"use strict";
/**
* Retorna as dimensões em altura e largura dos elementos.
*/
function getDimensions(element) {
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
function makeProportional(base, sub) {
    const dimensions = getDimensions(base);
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
    const position = getPosition(base);
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
function makeCover(base, sub) {
    stackElements(base, sub);
    makeProportional(base, sub);
}
/**
* Retorna a posição do elemento em relação a viewport.
*/
function getPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    };
}
/**
* Retorna a posição e as dimensões do elemento.
*/
let getElementRect = (element) => ({ ...getPosition(element), ...getDimensions(element) });
/**
* Checa se dois elementos tem mesma altura e largura.
*/
function hasSameDimensions(element1, element2) {
    const a = getDimensions(element1);
    const b = getDimensions(element2);
    return (a.width === b.width) && (a.height === b.height);
}
/**
* Checa se dois elementos estão na mesma posição.
*/
function hasSamePosition(element1, element2) {
    const a = getPosition(element1);
    const b = getPosition(element2);
    return (a.x === b.x) && (a.y === b.y);
}
/**
* Retorna a distância vertical, horizontal e a radial de dois elementos.
*/
function getDistance(element1, element2) {
    const a = getPosition(element1);
    const b = getPosition(element2);
    return {
        horizontal: a.x - b.x,
        vertical: a.y - b.y,
        radial: Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
    };
}
function checkDistanceThreshold(element1, element2, threshold) {
    const dis = getDistance(element1, element2);
    return {
        horizontal: (dis.horizontal < threshold) ? 'lower' : (dis.horizontal === threshold) ? 'equal' : 'higher',
        vertical: (dis.vertical < threshold) ? 'lower' : (dis.vertical === threshold) ? 'equal' : 'higher',
        radial: (dis.radial < threshold) ? 'lower' : (dis.radial === threshold) ? 'equal' : 'higher'
    };
}
/**
 * Retorna verdadeiro se dois elementos estão colidindo (sobrepostos)
 */
function collide(element1, element2) {
    const rect1 = getElementRect(element1);
    const rect2 = getElementRect(element2);
    return (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y);
}
