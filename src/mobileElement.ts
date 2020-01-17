class MobileElement {
  element: HTMLElement;
  elementRect: DOMRect;
  elementStyle: CSSStyleDeclaration;

  stepWidth: number;
  stepHeight: number;


  constructor(element: Element, stepWidth: number, stepHeight: number) {
    this.element = <HTMLElement>element;
    this.elementRect = <DOMRect>element.getBoundingClientRect();
    this.elementStyle = this.element.style;

    this.elementStyle.position = "absolute";

    this.stepWidth = stepWidth;
    this.stepHeight = stepHeight;
  }

  get x(): number {
    return this.elementRect.left;
  }

  get y(): number {
    return this.elementRect.top;
  }

  set x(val: number) {
    this.elementStyle
      .left = `${val * this.stepWidth}px`;
  }

  set y(val: number) {
    this.elementStyle
      .top = `${val * this.stepHeight}px`;
  }
}