/**
* Retorna a posição do elemento em relação a viewport.
*/
function getElementPosition( element: HTMLElement ): Point2D {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top
  }
}

/**
* Retorna as dimensões em altura e largura dos elementos.
*/
function getElementShape( element: HTMLElement ): Shape {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height
  }
}

function resizeElement( el: HTMLElement, shape: Shape ) {
  const style = el.style;
  style.width = shape.width.toString().concat( 'px' );
  style.height = shape.height.toString().concat( 'px' );
}




/**
* Faz com que dois elementos fiquem na mesma posição, caso tenham position: absolute.
* @param base O elemento usado como base.
* @param sub O elemento que vai ter sua posição alterada.
*/
function stackElements( base: HTMLElement, sub: HTMLDivElement ): void {
  const position = getElementPosition( base );
  const subElementStyle = sub.style;
  subElementStyle.left = position.x.toString().concat( 'px' );
  subElementStyle.top = position.y.toString().concat( 'px' );
}

/**
 * Faz com que dois elementos fiquem na mesma posição e do mesmo tamanho
 */
function makeCover( base: HTMLElement, sub: HTMLDivElement ) {
  stackElements( base, sub );
  makeElementsFit( base, sub );
}

/**
* Checa se dois elementos tem mesma altura e largura.
*/
function elementsSameShape( element1: HTMLElement, element2: HTMLElement ): boolean {
  const a = getElementShape( element1 );
  const b = getElementShape( element2 );

  return ( a.width === b.width ) && ( a.height === b.height );
}

/**
* Retorna a posição e as dimensões do elemento.
*/
const getElementRect =
  ( e: HTMLElement ) => ( { ...getElementPosition( e ), ...getElementShape( e ) } );

/**
* Retorna a distância vertical, horizontal e a radial de dois elementos.
*/
const getElementsDistance =
  ( a: HTMLElement, b: HTMLElement ): Distance2DConstraints => getDistance( getElementPosition( a ), getElementPosition( b ) );

/**
* Checa se dois elementos estão na mesma posição.
*/
const elementsSamePosition =
  ( a: HTMLElement, b: HTMLElement ) => getElementsDistance( a, b ).radial === 0;

/**
* Checa se dois elementos tem a mesma posição e dimensões
*/
const elementsFit =
  ( a: HTMLElement, b: HTMLElement ): boolean => elementsSameShape( a, b ) || elementsSamePosition( a, b );

/**
 * Retorna verdadeiro se dois elementos estão colidindo (sobrepostos)
 */
const elementsCollide =
  ( a: HTMLElement, b: HTMLElement ): boolean => collide( getElementRect( a ), getElementRect( b ) );

/**
* Faz com que dois elementos fiquem com a mesma altura e largura
* @param base O elemento usado como base.
* @param sub O elemento que vai ter suas dimensões alteradas.
*/
const makeElementsFit =
  ( base: HTMLElement, sub: HTMLDivElement ) => resizeElement( sub, getElementShape( base ) );