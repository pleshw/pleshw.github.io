class MobileElement {
  element: HTMLElement;
  elementRect: DOMRect;
  elementStyle: CSSStyleDeclaration;

  stepWidth: number = 1;
  stepHeight: number = 1;


  constructor(element: HTMLElement) {
    this.element = element;
    this.elementStyle = element.style;
    this.elementRect = <DOMRect>element.getBoundingClientRect();

    this.setElementPosition('absolute')
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

  setElementPosition(position: string) {
    let prev: { x: number, y: number } = { x: this.element.offsetLeft, y: this.element.offsetLeft };
    this.elementStyle.position = position;
    this.x = prev.x;
    this.y = prev.y;
  }
}