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
* Retorna a distância vertical, horizontal e a radial de dois elementos.
*/
function getElementDistance( element1: Element, element2: Element ): { horizontal: number, vertical: number, radial: number } {
  const a = getElementPosition( element1 );
  const b = getElementPosition( element2 );

  return {
    horizontal: a.x - b.x,
    vertical: a.y - b.y,
    radial: Math.sqrt( Math.pow( b.x - a.x, 2 ) + Math.pow( b.y - a.y, 2 ) )
  };
}

/**
* Checa se distância vertical, horizontal e a radial de dois elementos está dentro de um range selecionado.
* Usa o tipo @t_metrics para identificar se a distância é menor, maior ou igual ao threshold ( range )
*/
type t_metrics = 'lower' | 'higher' | 'equal';
function checkElementsDistance( element1: Element, element2: Element, threshold: number ): { horizontal: t_metrics, vertical: t_metrics, radial: t_metrics } {
  const dis = getElementDistance( element1, element2 );

  return {
    horizontal:
      ( dis.horizontal < threshold ) ? 'lower' : ( dis.horizontal === threshold ) ? 'equal' : 'higher',
    vertical:
      ( dis.vertical < threshold ) ? 'lower' : ( dis.vertical === threshold ) ? 'equal' : 'higher',
    radial:
      ( dis.radial < threshold ) ? 'lower' : ( dis.radial === threshold ) ? 'equal' : 'higher'
  };
}