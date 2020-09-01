"use strict";
class DefaultElement {
    constructor(element) {
        this.element = element;
        this.elementStyle = element.style;
        this.elementRect = element.getBoundingClientRect();
    }
}
