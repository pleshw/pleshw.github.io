class LogAnimation implements IElementAnimator {
  iteration: t_iteration = 'infinite';
  ready = true;

  animate( element: HTMLElement ) {
    console.log( element.id );
  }
}