// uma função que será analisada a cada interação dos objetos relacionados ao SensitiveElement
type trigger_func = () => boolean;

class SensitiveElement extends DefaultElement {
  //relatedElements: Map<trigger_func, ElementAnimator> = new Map();


  constructor( element: HTMLElement ) {
    super( element );
  }
}