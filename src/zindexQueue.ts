class ZIndexContainer {
  private _level: number;
  private _element: HTMLElement;
  constructor( element: HTMLElement, level: number ) {
    this._element = element;
    this._level = level;
    this.update();
  }

  public get level() { return this._level; }
  public get element() { return this._element; }

  public set element( v: HTMLElement ) {
    this._element = v;
    this.update();
  }
  public set level( v: number ) {
    this._level = v;
    this.update();
  }

  private update(): void {
    if ( this._element.style.zIndex === undefined ) this._element.style.zIndex = "0"
    this._element.style.zIndex = this._level.toString();
  }
}

class ZIndexQueue {
  private arr: ZIndexContainer[] = new Array();

  public add( value: HTMLElement ): void {
    this.arr.push( new ZIndexContainer( value, this.arr.length ) );
  }

  get length(): number { return this.arr.length }

  indexOf = ( value: HTMLElement ) => this.arr.map( ( { element } ) => element ).indexOf( value );

  public remove( index: number ): void;
  public remove( value: HTMLElement ): void;
  public remove( selector: number | HTMLElement ): void {
    if ( this.length < 1 ) return;
    let i = ( typeof selector === 'number' ) ? selector : this.indexOf( selector );
    this.arr.splice( i, 1 );
    for ( let j = i; j < this.arr.length; j++ )
      this.arr[j].level -= 1;
  }

  public swap( a: number, b: number ): void {
    let aux = this.arr[a].element;
    this.arr[a].element = this.arr[b].element;
    this.arr[b].element = aux;
  }
}