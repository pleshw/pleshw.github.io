"use strict";
class ColliderElement extends SensitiveElement {
    constructor(element, triggerElement, animator) {
        super(element, animator, () => collide(this.element, triggerElement), 50);
        this.triggerElement = triggerElement;
    }
    animate() {
        this.animator.animate(this.element);
    }
}
