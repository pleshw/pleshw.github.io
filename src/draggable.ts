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

  private trackHolding(mouseEvent: MouseEvent): void {
    this.holdingAt.x = (mouseEvent.pageX - this.element.offsetLeft);
    this.holdingAt.y = (mouseEvent.pageY - this.element.offsetTop);
  }

  private onHold(mouseEvent: MouseEvent) {
    mouseEvent.stopPropagation();
    mouseEvent.stopImmediatePropagation();

    this.override();
    this.trackHolding(mouseEvent);

    this.initMouseMoveEvents();
  }

  private initHoldingEvent() {
    window.onmousemove = null;
    this.element.onmousedown = (evt) => { this.onHold(evt) }

    window.onmouseup = () => { this.clearEvents(); };
  }

  clearEvents() {
    window.onmousemove = null;
  }

  pin() {
    if (!this.element.classList.contains('pinned'))
      this.element.classList.add('pinned')
  }

  unpin() {
    if (this.element.classList.contains('pinned'))
      this.element.classList.remove('pinned')
  }
}

