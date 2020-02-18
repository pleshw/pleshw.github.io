class Draggable extends MobileElement {

  private holdingAt: { x: number, y: number } = { x: 0, y: 0 };

  private static elements: HTMLElement[] = [];

  windowMouseMoveEvent: (event: MouseEvent) => void;

  constructor(element: HTMLElement) {
    super(element);

    this.setDraggable();

    this.windowMouseMoveEvent = (evt: MouseEvent) => { this.onMouseMove(evt) }


    this.initHoldingEvent();
  }

  private setDraggable() {
    if (!this.element.classList.contains("draggable")) {
      this.element.classList.add("draggable");
    }
    Draggable.elements.push(this.element);
    this.elementStyle.zIndex = Draggable.elements.length.toString();
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

  /**
   * Calculate the mouse position in reference to the page
   * @param mouseEvent 
   * 
   * Problem: It says that holdingAt is undefined
   */
  private onMouseMove(mouseEvent: MouseEvent) {
    this.x = mouseEvent.clientX + window.scrollX - this.holdingAt.x;
    this.y = mouseEvent.clientY + window.scrollY - this.holdingAt.y;
  }

  private initMouseMoveEvents() {
    window.addEventListener('mousemove', this.windowMouseMoveEvent, false);
  }

  /**
   * Store the mouse position of an event in reference to the page
   * @param mouseEvent 
   */
  private trackHolding(mouseEvent: MouseEvent): void {
    this.holdingAt.x = (mouseEvent.pageX - this.element.offsetLeft);
    this.holdingAt.y = (mouseEvent.pageY - this.element.offsetTop);
  }

  /**
   * Init the drag events, and set the last dragged element over other elements
   * @param mouseEvent 
   */
  private onHold(mouseEvent: MouseEvent) {
    mouseEvent.stopPropagation();
    mouseEvent.stopImmediatePropagation();

    this.override();
    this.trackHolding(mouseEvent);

    this.initMouseMoveEvents();
  }

  /**
   * Starts the onHold events when mouse is dragging this element, and clear the event when it drops
   */
  private initHoldingEvent() {
    window.onmousemove = null;
    this.element.onmousedown = (evt) => { this.onHold(evt) }

    window.onmouseup = () => { this.clearEvents(); };
  }

  clearEvents() {
    window.removeEventListener('mousemove', this.windowMouseMoveEvent, false);
  }

  pin() {
    let prev: { x: number, y: number } = { x: this.x, y: this.y };
    if (!this.element.classList.contains('pinned')) {
      this.element.classList.add('pinned')
      this.x = prev.x;
      this.y = prev.y;
    }
  }

  unpin() {
    let prev: { x: number, y: number } = { x: this.x, y: this.y };
    if (this.element.classList.contains('pinned')) {
      this.element.classList.remove('pinned')
      this.x = prev.x;
      this.y = prev.y;
    }
  }
}

