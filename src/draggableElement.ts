class DraggableElement extends MobileElement {

  private holdingAt: { x: number, y: number } = { x: 0, y: 0 };
  public static elements: ZIndexQueue = new ZIndexQueue();
  public isDragging: boolean = false;

  mouseMoveEvent: ( event: MouseEvent ) => void;

  constructor( element: HTMLElement ) {
    super( element );

    this.setDraggable();
    this.mouseMoveEvent = ( evt: MouseEvent ) => this.mouseMove( evt );
    this.initHoldingEvent();

    // set timeout para zero porque assim a função é chamada somente após o elemento renderizar
    setTimeout( () => this.setAbsolute(), 0 );
  }



  protected setAbsolute() {
    let prev: { x: number, y: number } = { x: this.x, y: this.y };
    this.element.style.position = 'absolute', "important";
    this.x = prev.x;
    this.y = prev.y;
    this.flexAdjust();
  }

  private flexAdjust() {
    if ( this.element.parentElement !== null ) {
      this.element.parentElement.style.height = "100%";
      this.element.parentElement.style.overflow = "visible";
    }
  }


  /**
   * Adiciona a classe 'draggable' ao elemento 
   * Também adiciona o elemento a lista de elementos arrastáveis
   */
  private setDraggable() {
    if ( !this.element.classList.contains( "draggable" ) )
      this.element.classList.add( "draggable" );
    DraggableElement.elements.add( this.element );
  }

  /**
   * Faz com que quando este elemento for arrastado ele sobreponha todos os outros na lista de arrastáveis
   */
  private override() {
    if ( DraggableElement.elements.length <= 1 ) return;

    const i = DraggableElement.elements.indexOf( this.element );
    const last = DraggableElement.elements.length - 1;
    if ( i === last ) return;

    DraggableElement.elements.swap( i, last );
  }

  /**
   * Calcula e altera a posição do elemento com base na posição do mouse na tela
   * @param mouseEvent Evento como parâmetro 
   * 
   */
  private mouseMove( mouseEvent: MouseEvent ) {
    this.x = mouseEvent.clientX + window.scrollX - this.holdingAt.x;
    this.y = mouseEvent.clientY + window.scrollY - this.holdingAt.y;
  }

  private addMoveListener =
    () => window.addEventListener( 'mousemove', this.mouseMoveEvent, false );


  /**
   * Guarda a posição do mouse em relação a tela
   * @param mouseEvent 
   */
  private trackHolding( mouseEvent: MouseEvent ) {
    this.holdingAt.x = ( mouseEvent.pageX - this.element.offsetLeft );
    this.holdingAt.y = ( mouseEvent.pageY - this.element.offsetTop );
  }

  /**
   * Inicia os eventos de mouse em relação ao elemento e começa a armazenar a posição do mouse
   * @param mouseEvent 
   */
  private onClick( mouseEvent: MouseEvent ) {
    mouseEvent.stopPropagation();
    mouseEvent.stopImmediatePropagation();

    this.override();
    this.trackHolding( mouseEvent );
    this.addMoveListener();
  }

  /**
   * Inicia os eventos que ocorrem quando o usuário segura o elemento com o mouse
   */
  private initHoldingEvent() {
    this.element.onmousedown = ( evt ) => this.onClick( evt );
    window.addEventListener( "mouseup", () => this.clearEvents() );
  }

  clearEvents =
    () => window.removeEventListener( 'mousemove', this.mouseMoveEvent );

}

