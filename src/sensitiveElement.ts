// uma função que será analisada a cada interação dos objetos relacionados ao SensitiveElement
type trigger_func = () => boolean;

type AnimatorContainer = { animator: () => IElementAnimator | null, trigger: trigger_func | ( () => true ) }

class SensitiveElement extends DefaultElement {
  // Dicionário que se espera que separe os containers de animadores por nome da função
  animators: Map<string, AnimatorContainer | null> = new Map();

  // Número de vezes, por segundo, em que se é checado se o elemento deve ser alterado
  tickRate: number;

  constructor( element: HTMLElement, ticksPerSecond: number = 1 ) {
    super( element );
    this.tickRate = Math.floor( 1000 / ticksPerSecond );
    this.init();
  }

  /**  
   * Se houverem containers não nulos, verifica-se então se existem animadores não nulos
   * então verifica-se se os seus gatilhos devem ser acionados. 
   * Se foram acionados então a classe chama a função de animação para aquele gatilho
  */
  init =
    () => setInterval(
      () => this.animators.forEach(
        container =>
          container
            ? container.trigger()
              ? container.animator() !== null
                ? container.animator()!.animate( this.element )
                : {}
              : {}
            : {} ),
      this.tickRate )

}