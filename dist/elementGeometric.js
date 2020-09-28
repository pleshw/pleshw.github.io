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
* Retorna as dimensões em altura e largura dos elementos.
*/
function getElementShape(element) {
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height
    };
}
function resizeElement(el, shape) {
    const style = el.style;
    style.width = shape.width.toString().concat('px');
    style.height = shape.height.toString().concat('px');
}
/**
* Faz com que dois elementos fiquem na mesma posição, caso tenham position: absolute.
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
 * Faz com que dois elementos fiquem na mesma posição e do mesmo tamanho
 */
function makeCover(base, sub) {
    stackElements(base, sub);
    makeElementsFit(base, sub);
}
/**
* Checa se dois elementos tem mesma altura e largura.
*/
function elementsSameShape(element1, element2) {
    const a = getElementShape(element1);
    const b = getElementShape(element2);
    return (a.width === b.width) && (a.height === b.height);
}
/**
* Retorna a posição e as dimensões do elemento.
*/
const getElementRect = (e) => ({ ...getElementPosition(e), ...getElementShape(e) });
/**
* Retorna a distância vertical, horizontal e a radial de dois elementos.
*/
const getElementsDistance = (a, b) => getDistance(getElementPosition(a), getElementPosition(b));
/**
* Checa se dois elementos estão na mesma posição.
*/
const elementsSamePosition = (a, b) => getElementsDistance(a, b).radial === 0;
/**
* Checa se dois elementos tem a mesma posição e dimensões
*/
const elementsFit = (a, b) => elementsSameShape(a, b) || elementsSamePosition(a, b);
/**
 * Retorna verdadeiro se dois elementos estão colidindo (sobrepostos)
 */
const elementsCollide = (a, b) => collide(getElementRect(a), getElementRect(b));
/**
* Faz com que dois elementos fiquem com a mesma altura e largura
* @param base O elemento usado como base.
* @param sub O elemento que vai ter suas dimensões alteradas.
*/
const makeElementsFit = (base, sub) => resizeElement(sub, getElementShape(base));
