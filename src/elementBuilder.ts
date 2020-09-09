class ElementBuilder {
  element: HTMLElement;
  parent: HTMLElement = document.body;
  children: Map<string, HTMLElement> = new Map();
  adjacentElement: HTMLElement | null = null;
  adjacentPosition: InsertPosition = 'beforebegin';

  constructor( tag: string ) {
    this.element = document.createElement( tag );
  }

  public setAttribute( attrName: string, value: string ): ElementBuilder {
    this.element.setAttribute( attrName, value );
    return this;
  }

  public setClass( ...value: string[] ): ElementBuilder {
    this.element.classList.add( ...value );
    return this;
  }

  public setWidth( value: string ): ElementBuilder;
  public setWidth( value: number ): ElementBuilder;
  public setWidth( value: number | string ): ElementBuilder {
    return this.setStyle( 'width', value );
  }

  public setHeight( value: string ): ElementBuilder;
  public setHeight( value: number ): ElementBuilder;
  public setHeight( value: number | string ): ElementBuilder {
    return this.setStyle( 'height', value );
  }

  public setMargin( value: string ): ElementBuilder;
  public setMargin( value: number ): ElementBuilder;
  public setMargin( value: number | string ): ElementBuilder {
    return this.setStyle( 'margin', value );
  }

  public setMaxWidth( value: string ): ElementBuilder;
  public setMaxWidth( value: number ): ElementBuilder;
  public setMaxWidth( value: number | string ): ElementBuilder {
    return this.setStyle( 'max-width', value );
  }

  public setFlex( value: string ): ElementBuilder;
  public setFlex( value: number ): ElementBuilder;
  public setFlex( value: number | string ): ElementBuilder {
    return this.setStyle( 'flex', value );
  }

  public setParent( element: HTMLElement ): ElementBuilder {
    this.parent = element;
    return this;
  }

  public setChildren( id: string, element: HTMLElement ): ElementBuilder {
    this.children.set( id, element );
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

  /**
   * Adiciona um estilo CSS ao elemento
   * @param property A propriedade que será adicionada
   * @param value O valor da propriedade
   */
  private setStyle( property: string, value: string ): ElementBuilder;
  private setStyle( property: string, value: number ): ElementBuilder;
  private setStyle( property: string, value: number | string ): ElementBuilder;
  private setStyle( property: string, value: any ): ElementBuilder {
    console.log( property, value );
    this.element.style.setProperty(
      property,
      ( typeof value === 'string' ) ? value : value.toString().concat( 'px' )
    );
    return this;
  }

  public build(): HTMLElement {
    if ( this.adjacentElement !== null )
      this.adjacentElement.insertAdjacentElement( this.adjacentPosition, this.element );
    else
      this.parent.appendChild( this.element );

    this.children.forEach( ( c ) => { this.element.appendChild( c ) } )

    return this.element;
  }
}