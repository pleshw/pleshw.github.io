interface MediaChangeInfo {
  mediaAvailable: boolean;
  srcChanged: boolean;
  count: number;
  elements: HTMLMediaElement[];
}

class ChangeMediaAnimation implements IElementAnimator {
  iteration: t_iteration = 'alternate';
  ready: boolean = true;
  src: string;
  tagname: string;

  constructor( src: string, tagname: string ) {
    this.src = src;
    this.tagname = tagname;
  }

  public animate( element: HTMLElement ) {
    let info: MediaChangeInfo = { srcChanged: false, mediaAvailable: false, count: 0, elements: this.getElements( element ) };

    for ( let element of info.elements ) {
      const src = element.src.substr( element.src.length - this.src.length );
      if ( element.classList.contains( 'mutable' ) ) {
        info.count++;
        if ( src !== this.src || src === '' ) {
          element.src = this.src;
          info.srcChanged = true;
        }
      }
    }

    if ( info.count > 0 )
      info.mediaAvailable = true;

    return info;
  }

  protected getElements( element: HTMLElement ) {
    const audios = <HTMLMediaElement[]>getChildrenWithTag( element, this.tagname );
    return audios;
  }
}