class Draggable extends MobileElement {
  private htmlElement: HTMLElement;
  private holding: boolean = false;
  private holdingPosition: { x: number, y: number } = { x: 0, y: 0 };

  private static instances: Draggable[] = [];

  constructor(element: Element, stepWidth: number, stepHeight: number) {
    super(element, stepWidth, stepHeight);

    this.htmlElement = <HTMLElement>this.element;

    Draggable.instances.push(this);

    this.setHoldingEvents();
    this.setMouseMoveEvents();
  }

  private overrideElements() {
    this.htmlElement.style.zIndex =
      (this.getGreaterZIndex() + Draggable.instances.length).toString();
  }


  private setMouseMoveEvents() {
    window.addEventListener('mousemove', _event => {
      if (this.holding === true) {
        this.x = _event.clientX + window.scrollX - this.holdingPosition.x;
        this.y = _event.clientY + window.scrollY - this.holdingPosition.y;
      }
    });
  }


  private getGreaterZIndex(): number {
    /// Converting the list to a list of htmlElements, then i can get style property
    let elementList = <HTMLCollectionOf<HTMLElement>>document.body.getElementsByTagName("*");
    let greaterZIndex = 0;

    /// Get the greater z-index of elements to element that is dragged stay over all elements
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].style.zIndex !== "") {
        if (+elementList[i].style.zIndex! > greaterZIndex) {
          greaterZIndex = (+elementList[i].style.zIndex!) || 0;
        }
      } else {
        elementList[i].style.zIndex = "0";
      }
    }
    return greaterZIndex;
  }

  private setHoldingEvents() {

    this.htmlElement.addEventListener('mousedown', _event => {
      // _event.preventDefault();
      _event.stopPropagation();
      _event.stopImmediatePropagation();

      this.holding = true;
      this.overrideElements();
      this.holdingPosition.x = (_event.pageX - this.htmlElement.offsetLeft);
      this.holdingPosition.y = (_event.pageY - this.htmlElement.offsetTop);
    });

    window.addEventListener('mouseup', _event => {
      this.holding = false;
    });
  }

}

