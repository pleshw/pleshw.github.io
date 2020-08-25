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

    this.setAbsolute();
  }

  get x(): number {
    return this.elementRect.left;
  }

  get xScroll(): number {
    return this.elementRect.left + window.scrollX;
  }

  get y(): number {
    return this.elementRect.top;
  }

  get yScroll(): number {
    return this.elementRect.top + window.scrollY;
  }

  set x(val: number) {
    this.elementStyle
      .left = `${val}px`;
  }

  set y(val: number) {
    this.elementStyle
      .top = `${val}px`;
  }

  setAbsolute() {
    let prev: { x: number, y: number } = { x: this.element.offsetLeft, y: this.element.offsetTop };
    this.elementStyle.position = 'absolute';
    this.x = prev.x;
    this.y = prev.y;
  }
}