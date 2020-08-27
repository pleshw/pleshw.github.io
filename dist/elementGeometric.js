"use strict";
/**
* Retorna a posição do elemento em relação a viewport.
*/
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    };
}
/**
* Checa se dois elementos tem mesma altura e largura.
*/
function hasSameDimensions(element1, element2) {
    const a = getElementDimensions(element1);
    const b = getElementDimensions(element2);
    return (a.width === b.width) && (a.height === b.height);
}
/**
* Checa se dois elementos estão na mesma posição.
*/
function hasSamePosition(element1, element2) {
    const a = getElementPosition(element1);
    const b = getElementPosition(element2);
    return (a.x === b.x) && (a.y === b.y);
}
/**
* Retorna a distância vertical, horizontal e a radial de dois elementos.
*/
function getElementDistance(element1, element2) {
    const a = getElementPosition(element1);
    const b = getElementPosition(element2);
    return {
        horizontal: a.x - b.x,
        vertical: a.y - b.y,
        radial: Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
    };
}
function checkElementsDistance(element1, element2, threshold) {
    const dis = getElementDistance(element1, element2);
    return {
        horizontal: (dis.horizontal < threshold) ? 'lower' : (dis.horizontal === threshold) ? 'equal' : 'higher',
        vertical: (dis.vertical < threshold) ? 'lower' : (dis.vertical === threshold) ? 'equal' : 'higher',
        radial: (dis.radial < threshold) ? 'lower' : (dis.radial === threshold) ? 'equal' : 'higher'
    };
}
