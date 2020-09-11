class ChangeImgAnimation implements IElementAnimator {

  src: string;

  constructor( src: string ) {
    this.src = src;
  }

  animate( element: HTMLElement ) {
    const imgElements = this.getImgElements( element );

    for ( let element of imgElements ) {
      // pega somente o numero de letras que o 'this.src' tem
      const elementSrc = element.src.substr( element.src.length - this.src.length );
      if ( element.classList.contains( 'mutable' ) )
        if ( elementSrc !== this.src ) {
          element.src = this.src;
          console.log( element.src );
        }
    }

  }

  getImgElements( element: HTMLElement ) {
    const imgs = <HTMLImageElement[]>getChildrenWithTag( element, 'img' );
    return imgs;
  }
}