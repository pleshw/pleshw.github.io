window.addEventListener( 'contextmenu', _event => {
  _event.preventDefault();
} );

document.addEventListener( "DOMContentLoaded", function () {
  _main();
} );


/**
 * Chamado assim que o conteúdo do DOM é carregado
 */
function _main() {
  const elementList = <HTMLCollectionOf<HTMLElement>>document.body.getElementsByTagName( "*" );

  for ( let i = 0; i < elementList.length; i++ ) {
    elementList[i].style.zIndex = '0';
  }
}