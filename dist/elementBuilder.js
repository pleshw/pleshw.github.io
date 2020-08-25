"use strict";
var ElementBuilder = /** @class */ (function () {
    function ElementBuilder(tag) {
        this.parent = document.body;
        this.adjacentElement = null;
        this.adjacentPosition = 'beforebegin';
        this.element = document.createElement(tag);
    }
    ElementBuilder.prototype.setAttribute = function (attrName, value) {
        this.element.setAttribute(attrName, value);
        return this;
    };
    ElementBuilder.prototype.addClass = function (value) {
        this.element.classList.add(value);
        return this;
    };
    ElementBuilder.prototype.setWidth = function (value) {
        this.element.style.width = value.toString().concat('px');
        return this;
    };
    ElementBuilder.prototype.setHeight = function (value) {
        this.element.style.height = value.toString().concat('px');
        return this;
    };
    ElementBuilder.prototype.setParent = function (element) {
        this.parent = element;
        return this;
    };
    ElementBuilder.prototype.insertBefore = function (element) {
        this.adjacentPosition = 'beforebegin';
        this.adjacentElement = element;
        return this;
    };
    ElementBuilder.prototype.insertInnerBefore = function (element) {
        this.adjacentPosition = 'afterbegin';
        this.adjacentElement = element;
        return this;
    };
    ElementBuilder.prototype.insertInnerAfter = function (element) {
        this.adjacentPosition = 'beforeend';
        this.adjacentElement = element;
        return this;
    };
    ElementBuilder.prototype.insertAfter = function (element) {
        this.adjacentPosition = 'afterend';
        this.adjacentElement = element;
        return this;
    };
    ElementBuilder.prototype.setPosition = function (pos) {
        this.element.style.left = pos.x.toString().concat('px');
        this.element.style.top = pos.y.toString().concat('px');
        return this;
    };
    ElementBuilder.prototype.build = function () {
        if (this.adjacentElement !== null)
            this.adjacentElement.insertAdjacentElement(this.adjacentPosition, this.element);
        else
            this.parent.appendChild(this.element);
        return this.element;
    };
    return ElementBuilder;
}());
