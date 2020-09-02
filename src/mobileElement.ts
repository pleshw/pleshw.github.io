class MobileElement extends DefaultElement {
  constructor( element: HTMLElement ) {
    super( element );
  }

  public get x(): number {
    return this.elementRect.left;
  }
  public get y(): number {
    return this.elementRect.top;
  }

  /**
   * Acessadores de posição relativo a janela scrollada
   */
  public get xScroll(): number {
    return this.x + window.scrollX;
  }

  public get yScroll(): number {
    return this.y + window.scrollY;
  }

  public set x( val: number ) {
    window.requestAnimationFrame( () => {
      this.elementStyle
        .left = `${val}px`;
    } );
  }

  public set y( val: number ) {
    window.requestAnimationFrame( () => {
      this.elementStyle
        .top = `${val}px`;
    } );
  }

}