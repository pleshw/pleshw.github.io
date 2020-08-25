
/**
 * Faz com que um elemento se torne selecionável quando o mouse estiver em cima dele
 * Isso aplica a classe 'hovered' no elemento sempre que ele for clicado
 * @param selectedElement
 * @param target
 */
function makeHoverable( hoveredElement: HTMLElement, $class: string, target?: HTMLElement ) {
  hoveredElement
    .onmouseover = () => ( target || hoveredElement ).classList.add( $class );
  hoveredElement
    .onmouseleave = () => ( target || hoveredElement ).classList.remove( $class );
}


/**
 * Faz com que um elemento se torne selecionável quando o mouse clicar nele
 * Isso aplica a classe '@class' no elemento sempre que ele for clicado
 * @param selectedElement 
 * @param target 
 */
function makeSelectable( selectedElement: HTMLElement, $class: string, target?: HTMLElement ) {
  selectedElement.onclick = _event => {
    _event.stopPropagation();
    if ( !selectedElement.classList.contains( $class ) )
      ( target || selectedElement ).classList.add( $class );
    else
      ( target || selectedElement ).classList.remove( $class );
  }
}

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

  // for ( let i = 0; i < 30; i++ ) {
  //   let b = new ElementBuilder( "div" ).addClass( 'square' ).setHeight( 30 ).setWidth( 50 ).build();
  // }
}