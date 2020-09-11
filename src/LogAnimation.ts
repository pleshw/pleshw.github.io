class LogAnimation implements IElementAnimator {
  animate( element: HTMLElement ) {
    console.log( element.id );
  }
}