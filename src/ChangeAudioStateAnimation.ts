class ChangeAudioStateAnimation extends ChangeAudioAnimation {
  private action: ( element: HTMLAudioElement ) => void;

  constructor( src: string, action: ( element: HTMLAudioElement ) => void ) {
    super( src )
    this.action = action;
  }

  animate( element: HTMLElement ) {
    const info = super.animate( element );

    ( <HTMLAudioElement[]>info.elements )
      .forEach( item => ( info.mediaAvailable ) ? this.action( item ) : {} )

    return info;
  }
}