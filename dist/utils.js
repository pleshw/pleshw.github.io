"use strict";
;
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => (1 - t) * a + t * b;
const inverseLerp = (a, b, value) => clamp((value - a) / (b - a));
const remap = (iMin, iMax, oMin, oMax, value) => lerp(oMin, oMax, inverseLerp(iMin, iMax, value));
const collide = (a, b) => (a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y);
const getDistance = (a, b) => ({
    horizontal: Math.abs(b.x - a.x),
    vertical: Math.abs(b.y - a.y),
    radial: Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
});
const overlap = (a, b) => getDistance(a, b).radial === 0;
const fit = (a, b) => a.width === b.width && a.height === b.height;
/**
 * Checa a relação de um número para um threshold
 * @param a
 * @param threshold threshold a ser verificado
 */
const evalThreshold = (a, threshold) => (a < threshold) ? 'lower' : (a === threshold) ? 'equal' : 'higher';
/**
* Checa se distância vertical, horizontal e a radial de dois elementos está dentro de um range selecionado.
* Usa o tipo @t_metrics para identificar se a distância é menor, maior ou igual ao threshold ( range )
*/
const evalDistanceThreshold = (a, b, threshold) => {
    const { horizontal, vertical, radial } = getDistance(a, b);
    return {
        horizontal: (horizontal < threshold) ? 'lower' : (horizontal === threshold) ? 'equal' : 'higher',
        vertical: (vertical < threshold) ? 'lower' : (vertical === threshold) ? 'equal' : 'higher',
        radial: (radial < threshold) ? 'lower' : (radial === threshold) ? 'equal' : 'higher'
    };
};
