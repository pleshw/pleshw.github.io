class MobileElement {
  element: HTMLElement;
  elementRect: DOMRect;
  elementStyle: CSSStyleDeclaration;

  stepWidth: number = 1;
  stepHeight: number = 1;


  constructor( element: HTMLElement ) {
    this.element = element;
    this.elementStyle = element.style;
    this.elementRect = <DOMRect>element.getBoundingClientRect();

    this.setAbsolute();
  }

  /**
   * Acessadores de posição
   */
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

  private setAbsolute() {
    let prev: { x: number, y: number } = { x: this.element.offsetLeft, y: this.element.offsetTop };
    this.elementStyle.position = 'absolute';
    this.x = prev.x;
    this.y = prev.y;
  }
}