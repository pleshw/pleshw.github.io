class ElementBuilder {
  element: HTMLElement;
  parent: HTMLElement = document.body;
  adjacentElement: HTMLElement | null = null;
  adjacentPosition: InsertPosition = 'beforebegin';

  constructor( tag: string ) {
    this.element = document.createElement( tag );
  }

  public setAttribute( attrName: string, value: string ): ElementBuilder {
    this.element.setAttribute( attrName, value );
    return this;
  }

  public addClass( value: string ): ElementBuilder {
    this.element.classList.add( value );
    return this;
  }

  public setWidth( value: number ): ElementBuilder {
    this.element.style.width = value.toString().concat( 'px' );
    return this;
  }

  public setHeight( value: number ): ElementBuilder {
    this.element.style.height = value.toString().concat( 'px' );
    return this;
  }

  public setParent( element: HTMLElement ): ElementBuilder {
    this.parent = element;
    return this;
  }

  public insertBefore( element: HTMLElement ): ElementBuilder {
    this.adjacentPosition = 'beforebegin';
    this.adjacentElement = element;
    return this;
  }

  public insertInnerBefore( element: HTMLElement ): ElementBuilder {
    this.adjacentPosition = 'afterbegin';
    this.adjacentElement = element;
    return this;
  }

  public insertInnerAfter( element: HTMLElement ): ElementBuilder {
    this.adjacentPosition = 'beforeend';
    this.adjacentElement = element;
    return this;
  }

  public insertAfter( element: HTMLElement ): ElementBuilder {
    this.adjacentPosition = 'afterend';
    this.adjacentElement = element;
    return this;
  }

  public setPosition( pos: { x: number, y: number } ): ElementBuilder {
    this.element.style.left = pos.x.toString().concat( 'px' );
    this.element.style.top = pos.y.toString().concat( 'px' );
    return this;
  }

  public build(): HTMLElement {
    if ( this.adjacentElement !== null )
      this.adjacentElement.insertAdjacentElement( this.adjacentPosition, this.element );
    else
      this.parent.appendChild( this.element );

    return this.element;
  }
}