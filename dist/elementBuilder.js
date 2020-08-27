"use strict";
class ElementBuilder {
    constructor(tag) {
        this.parent = document.body;
        this.adjacentElement = null;
        this.adjacentPosition = 'beforebegin';
        this.element = document.createElement(tag);
    }
    setAttribute(attrName, value) {
        this.element.setAttribute(attrName, value);
        return this;
    }
    addClass(value) {
        this.element.classList.add(value);
        return this;
    }
    setWidth(value) {
        this.element.style.width = value.toString().concat('px');
        return this;
    }
    setHeight(value) {
        this.element.style.height = value.toString().concat('px');
        return this;
    }
    setParent(element) {
        this.parent = element;
        return this;
    }
    insertBefore(element) {
        this.adjacentPosition = 'beforebegin';
        this.adjacentElement = element;
        return this;
    }
    insertInnerBefore(element) {
        this.adjacentPosition = 'afterbegin';
        this.adjacentElement = element;
        return this;
    }
    insertInnerAfter(element) {
        this.adjacentPosition = 'beforeend';
        this.adjacentElement = element;
        return this;
    }
    insertAfter(element) {
        this.adjacentPosition = 'afterend';
        this.adjacentElement = element;
        return this;
    }
    setPosition(pos) {
        this.element.style.left = pos.x.toString().concat('px');
        this.element.style.top = pos.y.toString().concat('px');
        return this;
    }
    build() {
        if (this.adjacentElement !== null)
            this.adjacentElement.insertAdjacentElement(this.adjacentPosition, this.element);
        else
            this.parent.appendChild(this.element);
        return this.element;
    }
}
