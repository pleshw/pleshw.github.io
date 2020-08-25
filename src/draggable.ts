class Draggable extends MobileElement {

  private holdingAt: { x: number, y: number } = { x: 0, y: 0 };
  private static elements: HTMLElement[] = [];

  windowMouseMoveEvent: ( event: MouseEvent ) => void;

  constructor( element: HTMLElement ) {
    super( element );

    this.setDraggable();
    this.windowMouseMoveEvent = ( evt: MouseEvent ) => { this.onMouseMove( evt ) }
    this.initHoldingEvent();
  }

  /**
   * Adiciona a classe 'draggable' ao elemento 
   * Também adiciona o elemento a lista de elementos arrastáveis
   */
  private setDraggable() {
    if ( !this.element.classList.contains( "draggable" ) ) {
      this.element.classList.add( "draggable" );
    }
    Draggable.elements.push( this.element );
    this.elementStyle.zIndex = Draggable.elements.length.toString();
  }

  /**
   * Checa a prioridade do elemento em relação aos outros, permitindo que o ultimo elemento arrastado da lista seja mostrado em destaque. 
   * Também garante que a lista vai permanecer com os elementos ordenados por ordem do ultimo arraste.
   */
  private override() {
    if ( Draggable.elements.length <= 1 ) return;
    const zindex = +this.elementStyle.zIndex!;
    const greaterZIndex = Draggable.elements.length;
    if ( zindex < greaterZIndex ) {
      for ( let i = zindex; i < greaterZIndex; i++ ) {
        Draggable.elements[i].style.zIndex = i.toString();
        let aux = Draggable.elements[i - 1];
        Draggable.elements[i - 1] = Draggable.elements[i];
        Draggable.elements[i] = aux;
      }
    }
    this.elementStyle.zIndex = ( Draggable.elements.length ).toString();
  }

  /**
   * Calcula e altera a posição do elemento com base na posição do mouse na tela
   * @param mouseEvent Evento como parâmetro 
   * 
   */
  private onMouseMove( mouseEvent: MouseEvent ) {
    this.x = mouseEvent.clientX + window.scrollX - this.holdingAt.x;
    this.y = mouseEvent.clientY + window.scrollY - this.holdingAt.y;
  }

  private initMouseMoveEvents() {
    window.addEventListener( 'mousemove', this.windowMouseMoveEvent, false );
  }

  /**
   * Guarda a posição do mouse em relação a tela
   * @param mouseEvent 
   */
  private trackHolding( mouseEvent: MouseEvent ): void {
    this.holdingAt.x = ( mouseEvent.pageX - this.element.offsetLeft );
    this.holdingAt.y = ( mouseEvent.pageY - this.element.offsetTop );
  }

  /**
   * Inicia os eventos de mouse em relação ao elemento e começa a armazenar a posição do mouse
   * @param mouseEvent 
   */
  private onHold( mouseEvent: MouseEvent ) {
    mouseEvent.stopPropagation();
    mouseEvent.stopImmediatePropagation();

    this.override();
    this.trackHolding( mouseEvent );
    this.initMouseMoveEvents();
  }

  /**
   * Inicia os eventos que ocorrem quando o usuário segura o elemento com o mouse
   */
  private initHoldingEvent() {
    window.onmousemove = null;
    this.element.onmousedown = ( evt ) => { this.onHold( evt ) }
    window.onmouseup = () => { this.clearEvents(); };
  }

  clearEvents() {
    window.removeEventListener( 'mousemove', this.windowMouseMoveEvent, false );
  }
}

