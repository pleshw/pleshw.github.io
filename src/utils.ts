interface Point2D { x: number; y: number };
interface Shape { width: number; height: number; }
interface Rect extends Point2D, Shape { }

type Distance2DConstraints = { horizontal: number; vertical: number; radial: number; }

type t_metrics = 'lower' | 'equal' | 'higher';

type Distance2DThresholdMetrics = { horizontal: t_metrics; vertical: t_metrics; radial: t_metrics; }

const clamp =
  ( value: number, min = 0, max = 1 ) => Math.min( max, Math.max( min, value ) );

const lerp =
  ( a: number, b: number, t: number ) => ( 1 - t ) * a + t * b;

const inverseLerp =
  ( a: number, b: number, value: number ) => clamp( ( value - a ) / ( b - a ) );

const remap =
  ( iMin: number, iMax: number, oMin: number, oMax: number, value: number ) =>
    lerp( oMin, oMax, inverseLerp( iMin, iMax, value ) );

const collide =
  ( a: Rect, b: Rect ) =>
    ( a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y );


const getDistance =
  ( a: Point2D, b: Point2D ): Distance2DConstraints =>
    ( {
      horizontal: Math.abs( b.x - a.x ),
      vertical: Math.abs( b.y - a.y ),
      radial: Math.sqrt( Math.pow( b.x - a.x, 2 ) + Math.pow( b.y - a.y, 2 ) )
    } );


const overlap =
  ( a: Point2D, b: Point2D ) => getDistance( a, b ).radial === 0;

const fit =
  ( a: Shape, b: Shape ) => a.width === b.width && a.height === b.height;


/**
 * Checa a relação de um número para um threshold
 * @param a 
 * @param threshold threshold a ser verificado 
 */
const evalThreshold =
  ( a: number, threshold: number ): t_metrics =>
    ( a < threshold ) ? 'lower' : ( a === threshold ) ? 'equal' : 'higher';

/**
* Checa se distância vertical, horizontal e a radial de dois elementos está dentro de um range selecionado.
* Usa o tipo @t_metrics para identificar se a distância é menor, maior ou igual ao threshold ( range )
*/
const evalDistanceThreshold =
  ( a: Point2D, b: Point2D, threshold: number ): Distance2DThresholdMetrics => {
    const { horizontal, vertical, radial } = getDistance( a, b );
    return {
      horizontal:
        ( horizontal < threshold ) ? 'lower' : ( horizontal === threshold ) ? 'equal' : 'higher',
      vertical:
        ( vertical < threshold ) ? 'lower' : ( vertical === threshold ) ? 'equal' : 'higher',
      radial:
        ( radial < threshold ) ? 'lower' : ( radial === threshold ) ? 'equal' : 'higher'
    };
  }
