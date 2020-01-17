class Draggable extends MobileElement {
  private holdingAt: { x: number, y: number } = { x: 0, y: 0 };

  private static elements: HTMLElement[] = [];

  constructor(element: HTMLElement, stepWidth: number, stepHeight: number) {
    super(element, stepWidth, stepHeight);
    element.classList.add("draggable");

    Draggable.elements.push(this.element);
    this.elementStyle.zIndex = Draggable.elements.length.toString();

    this.initHoldingEvent();
  }

  private override() {
    if (Draggable.elements.length <= 1) return;

    const zindex = +this.elementStyle.zIndex!;
    const greaterZIndex = Draggable.elements.length;
    if (zindex < greaterZIndex)
      for (let i = zindex; i < greaterZIndex; i++) {
        Draggable.elements[i].style.zIndex = i.toString();

        let aux = Draggable.elements[i - 1];
        Draggable.elements[i - 1] = Draggable.elements[i];
        Draggable.elements[i] = aux;
      }

    this.elementStyle.zIndex = (Draggable.elements.length).toString();
  }

  private initMouseMoveEvents() {
    window.onmousemove = (_event: MouseEvent) => {
      this.x = _event.clientX + window.scrollX - this.holdingAt.x;
      this.y = _event.clientY + window.scrollY - this.holdingAt.y;
    };
  }

  private initHoldingEvent() {
    window.onmousemove = null;
    this.element.onmousedown = (_event: MouseEvent) => {
      _event.stopPropagation();
      _event.stopImmediatePropagation();

      this.override();
      this.holdingAt.x = (_event.pageX - this.element.offsetLeft);
      this.holdingAt.y = (_event.pageY - this.element.offsetTop);

      this.initMouseMoveEvents();
    };

    window.onmouseup = (_event: MouseEvent) => {
      this.clearEvents();
    };
  }

  clearEvents() {
    window.onmousemove = null;
  }
}

