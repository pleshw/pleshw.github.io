type ColliderAnimator = { element: HTMLElement, animateIn: IElementAnimator, animateOut: IElementAnimator };


class ColliderElement extends SensitiveElement {
  triggerElements: ColliderAnimator[];
  lastCheck: boolean = false;

  collisionQueue: ColliderAnimator[] = [];
  lastOut: ColliderAnimator | null = null;

  constructor( element: HTMLElement, ...triggerElements: ColliderAnimator[] ) {
    super( element, 50 );
    this.triggerElements = triggerElements;

    this.animators.set( "animateIn", {
      animator:
        () =>
          ( this.collisionQueue.length > 0 )
            ? this.collisionQueue[this.collisionQueue.length - 1].animateIn
            : null,
      trigger: () => {
        this.collide()
        return this.collisionQueue.length > 0
      }
    } )

    this.animators.set( "animateOut", {
      animator:
        () =>
          ( this.collisionQueue.length === 0 && this.lastOut )
            ? this.lastOut.animateOut
            : null,
      trigger: () => this.collisionQueue.length === 0 && this.lastOut !== null
    } );
  }

  private collide() {
    this.triggerElements.forEach( e => {
      if ( this.lastCheck = collide( this.element, e.element ) ) {
        if ( !this.collisionQueue.includes( e ) )
          this.collisionQueue.push( e )
      }
      else {
        if ( this.collisionQueue.includes( e ) ) {
          if ( this.collisionQueue.length === 1 )
            this.lastOut = e;
          this.collisionQueue.splice( this.collisionQueue.indexOf( e ), 1 );
        }
      }
    } );
  }
}