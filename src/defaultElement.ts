class DefaultElement {
  protected element: HTMLElement;
  protected elementRect: DOMRect;
  protected elementStyle: CSSStyleDeclaration;

  constructor( element: HTMLElement ) {
    this.element = element;
    this.elementStyle = element.style;
    this.elementRect = <DOMRect>element.getBoundingClientRect();
  }
}