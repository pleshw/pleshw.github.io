class MobileElement {
  element: Element;

  stepWidth: number;
  stepHeight: number;

  constructor(element: Element, stepWidth: number, stepHeight: number) {
    this.element = element;
    (<HTMLElement>this.element).style.position = "absolute";

    this.stepWidth = stepWidth;
    this.stepHeight = stepHeight;
  }

  get x(): number {
    return this.element.getBoundingClientRect().left;
  }
  get y(): number {
    return this.element.getBoundingClientRect().top;
  }

  set x(val: number) {
    window.requestAnimationFrame(() => {
      (<HTMLElement>this.element)
        .style
        .left = (val * this.stepWidth).toString() + 'px';
    });
  }
  set y(val: number) {
    window.requestAnimationFrame(() => {
      (<HTMLElement>this.element)
        .style
        .top = (val * this.stepHeight).toString() + 'px';
    });
  }
}