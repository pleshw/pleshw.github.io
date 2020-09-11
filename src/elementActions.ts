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



