// uma função que será analisada a cada interação dos objetos relacionados ao SensitiveElement
type trigger_func = () => boolean;

abstract class SensitiveElement extends DefaultElement {
  animator: IElementAnimator;
  trigger: trigger_func;

  // Número de vezes, por segundo, em que se é checado se o elemento deve ser alterado
  tickRate: number;

  constructor( element: HTMLElement, animator: IElementAnimator, trigger: trigger_func, ticksPerSecond: number = 1 ) {
    super( element );
    this.trigger = trigger;
    this.animator = animator;
    this.tickRate = Math.floor( 1000 / ticksPerSecond );
    this.init();
  }

  abstract animate(): void;

  init = () => setInterval( () => this.trigger() ? this.animate() : {}, this.tickRate )
}