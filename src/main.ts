window.addEventListener( 'contextmenu', _event => _event.preventDefault() );
document.addEventListener( "DOMContentLoaded", () => _main() );


/**
 * Chamado assim que o conteúdo do DOM é carregado
 */
function _main() {
  // const elementList = <HTMLCollectionOf<HTMLElement>>document.body.getElementsByTagName( "*" );
  const test1 = document.getElementById( 'square-drag-1' )
  const test2 = document.getElementById( 'square-drag-2' )

  setInterval( () => {
    if ( collide( test1!, test2! ) )
      console.log( "!!!" );
  }, 500 )

  // for ( let i = 0; i < elementList.length; i++ ) {

  // }
}