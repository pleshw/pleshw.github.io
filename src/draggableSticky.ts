class DraggableStickyElement extends DraggableElement {
  containers: HTMLElement[];


  constructor( element: HTMLElement, containers: HTMLElement[] ) {
    super( element );
    this.containers = containers;
  }
}