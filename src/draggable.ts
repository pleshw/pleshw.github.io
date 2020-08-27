class Draggable extends MobileElement {

  private holdingAt: { x: number, y: number } = { x: 0, y: 0 };
  public static elements: ZIndexQueue = new ZIndexQueue();

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
    Draggable.elements.add( this.element );
  }

  /**
   * Faz com que quando este elemento for arrastado ele sobreponha todos os outros na lista de arrastáveis
   */
  private override() {
    if ( Draggable.elements.length <= 1 ) return;

    const i = Draggable.elements.indexOf( this.element );
    const last = Draggable.elements.length - 1;
    if ( i === last ) return;

    Draggable.elements.swap( i, last );
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
    this.element.addEventListener( 'mousemove', this.windowMouseMoveEvent, false );
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
    this.element.onmousemove = null;
    this.element.onmousedown = ( evt ) => { this.onHold( evt ) }
    this.element.onmouseup = () => { this.clearEvents(); };
    this.element.onmouseout = () => {
      console.log( 0 );
    };
  }

  clearEvents() {
    this.element.removeEventListener( 'mousemove', this.windowMouseMoveEvent, false );
  }
}

