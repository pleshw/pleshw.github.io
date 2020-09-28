class MobileElement extends DefaultElement {
  offsetParent: HTMLElement | null = <HTMLElement | null>( this.element.offsetParent );

  constructor( element: HTMLElement ) {
    super( element );
  }

  public get x(): number {
    return ( this.offsetParent === null )
      ? this.elementRect.left
      : this.elementRect.left - this.offsetParent.offsetLeft;
  }
  public get y(): number {
    return this.elementRect.top;
    // return ( this.offsetParent === null )
    //   ? this.elementRect.top
    //   : this.elementRect.top - this.offsetParent.offsetTop;
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