/**
* Retorna as dimensões em altura e largura dos elementos.
*/
function getElementDimensions( element: Element ): { width: number, height: number } {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height
  }
}

/**
* Retorna a posição do elemento em relação a viewport.
*/
function getElementPosition( element: Element ): { x: number, y: number } {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top
  }
}

/**
* Checa se dois elementos tem mesma altura e largura.
*/
function hasSameDimensions( element1: Element, element2: Element ): boolean {
  const a = getElementDimensions( element1 );
  const b = getElementDimensions( element2 );

  return ( a.width === b.width ) && ( a.height === b.height );
}

/**
* Checa se dois elementos estão na mesma posição.
*/
function hasSamePosition( element1: Element, element2: Element ): boolean {
  const a = getElementPosition( element1 );
  const b = getElementPosition( element2 );

  return ( a.x === b.x ) && ( a.y === b.y );
}

/**
* Faz com que dois elementos fiquem com a mesma altura e largura
* @param base O elemento usado como base.
* @param sub O elemento que vai ter suas dimensões alteradas.
*/
function makeElementsProportional( base: Element, sub: HTMLDivElement ): void {
  const dimensions = getElementDimensions( base );
  const subElementStyle = sub.style;
  subElementStyle.width = dimensions.width.toString().concat( 'px' );
  subElementStyle.height = dimensions.height.toString().concat( 'px' );
}

/**
* Faz com que dois elementos tenham as mesmas posições.
* @param base O elemento usado como base.
* @param sub O elemento que vai ter sua posição alterada.
*/
function stackElements( base: Element, sub: HTMLDivElement ): void {
  const position = getElementPosition( base );
  const subElementStyle = sub.style;
  subElementStyle.left = position.x.toString().concat( 'px' );
  subElementStyle.top = position.y.toString().concat( 'px' );
}

/**
* Checa se dois elementos tem a mesma posição e dimensões
*/
function elementsFit( a: Element, b: Element ): boolean {
  return hasSameDimensions( a, b ) || hasSamePosition( a, b );
}

/**
 * Faz com que dois elementos fiquem na mesma posição e do mesmo tamanho
 */
function coverElement( base: Element, sub: HTMLDivElement ) {
  stackElements( base, sub );
  makeElementsProportional( base, sub );
}
