"use strict";
class DraggableStickyElement extends DraggableElement {
    constructor(element, containers) {
        super(element);
        this.containers = containers;
    }
}
