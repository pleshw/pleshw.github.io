class ColliderElement extends SensitiveElement {
  triggerElement: HTMLElement;

  constructor( element: HTMLElement, triggerElement: HTMLElement, animator: IElementAnimator ) {
    super( element, animator, () => collide( this.element, triggerElement ), 50 );
    this.triggerElement = triggerElement;
  }

  animate() {
    this.animator.animate( this.element );
  }
}