type ColliderAnimator = { element: HTMLElement, animateIn: IElementAnimator, animateOut: IElementAnimator };


/**
 * Cria um elemento que reage a colisão com outros elementos. 
 * 
 * Ele possui é animado quando os elementos "triggerElements" colidem com ele
 * 
 * @example
    const testCollider1 = new ColliderElement(
      colliderElement, // elemento que é alterado
      {
        element: test1, // elemento gatilho
        animateIn: new ChangeImgAnimation('assets/1.png'), // animação ao entrar em contato
        animateOut: new ChangeImgAnimation('assets/ico.png') // animação ao sair de contato
      },
      {
        element: test2, // elemento gatilho
        animateIn: new ChangeImgAnimation('assets/2.png'), // animação ao entrar em contato
        animateOut: new ChangeImgAnimation('assets/ico.png') // animação ao sair de contato
      },
      {
        element: test3, // elemento gatilho
        animateIn: new ChangeImgAnimation('assets/3.jpg'), // animação ao entrar em contato
        animateOut: new ChangeImgAnimation('assets/ico.png') // animação ao sair de contato
      }
    );
 */

class ColliderElement extends SensitiveElement {
  triggerElements: ColliderAnimator[];

  // controla a fila para saber qual deve ser o animador atual
  innerQueue: ColliderAnimator[] = [];
  outerQueue: ColliderAnimator[] = [];

  // ultimo elemento a sair de contato com o elemento alvo é armazenado nesta variável
  lastOut: ColliderAnimator | null = null;

  /**
   * @param element é o elemento que será animado ao contato
   * @param triggerElements são objetos com um elemento, uma animação de entrada('animateIn') e uma animação de saída('animateOut')
   */
  constructor( element: HTMLElement, ...triggerElements: ColliderAnimator[] ) {
    super( element, 50 );
    this.triggerElements = triggerElements;
    this.collide();

    this.animators.set( "animateIn", {
      animator: () => {
        const animator = this.innerQueue[this.innerQueue.length - 1];
        if ( animator.animateOut.iteration === 'alternate' ) animator.animateOut.ready = true;

        return ( this.innerQueue.length > 0 )
          ? animator.animateIn
          : null
      },
      trigger: () => {
        this.collide();
        return this.innerQueue.length > 0;
      }
    } )

    this.animators.set( "animateOut", {
      animator: () => {
        const animator = this.outerQueue[this.outerQueue.length - 1];
        if ( animator.animateOut.iteration === 'alternate' ) animator.animateIn.ready = true;

        return ( this.outerQueue.length > 0 && this.innerQueue.length === 0 )
          ? animator.animateOut
          : null
      },
      trigger: () => {
        this.collide();
        return this.outerQueue.length > 0;
      }
    } );
  }

  private collide() {
    this.triggerElements.forEach(
      e => {
        if ( elementsCollide( this.element, e.element ) ) {
          if ( !this.innerQueue.includes( e ) )
            this.innerQueue.push( e )
          if ( this.outerQueue.includes( e ) )
            this.outerQueue.splice( this.outerQueue.indexOf( e ), 1 );
        }
        else {
          if ( !this.outerQueue.includes( e ) )
            this.outerQueue.push( e )
          if ( this.innerQueue.includes( e ) )
            this.innerQueue.splice( this.innerQueue.indexOf( e ), 1 );
        }
      }
    );
  }
}