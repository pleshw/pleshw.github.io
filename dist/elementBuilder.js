"use strict";
class ElementBuilder {
    constructor(tag) {
        this.parent = document.body;
        this.children = new Map();
        this.adjacentElement = null;
        this.adjacentPosition = 'beforebegin';
        this.element = document.createElement(tag);
    }
    setAttribute(attrName, value) {
        this.element.setAttribute(attrName, value);
        return this;
    }
    setClass(...value) {
        this.element.classList.add(...value);
        return this;
    }
    setWidth(value) {
        return this.setStyle('width', value);
    }
    setHeight(value) {
        return this.setStyle('height', value);
    }
    setMargin(value) {
        return this.setStyle('margin', value);
    }
    setMaxWidth(value) {
        return this.setStyle('max-width', value);
    }
    setFlex(value) {
        return this.setStyle('flex', value);
    }
    setParent(element) {
        this.parent = element;
        return this;
    }
    setChildren(id, element) {
        this.children.set(id, element);
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
    setStyle(property, value) {
        console.log(property, value);
        this.element.style.setProperty(property, (typeof value === 'string') ? value : value.toString().concat('px'));
        return this;
    }
    build() {
        if (this.adjacentElement !== null)
            this.adjacentElement.insertAdjacentElement(this.adjacentPosition, this.element);
        else
            this.parent.appendChild(this.element);
        this.children.forEach((c) => { this.element.appendChild(c); });
        return this.element;
    }
}
