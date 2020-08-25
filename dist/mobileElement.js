"use strict";
var MobileElement = /** @class */ (function () {
    function MobileElement(element) {
        this.stepWidth = 1;
        this.stepHeight = 1;
        this.element = element;
        this.elementStyle = element.style;
        this.elementRect = element.getBoundingClientRect();
        this.setAbsolute();
    }
    Object.defineProperty(MobileElement.prototype, "x", {
        get: function () {
            return this.elementRect.left;
        },
        set: function (val) {
            this.elementStyle
                .left = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileElement.prototype, "xScroll", {
        get: function () {
            return this.elementRect.left + window.scrollX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileElement.prototype, "y", {
        get: function () {
            return this.elementRect.top;
        },
        set: function (val) {
            this.elementStyle
                .top = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileElement.prototype, "yScroll", {
        get: function () {
            return this.elementRect.top + window.scrollY;
        },
        enumerable: true,
        configurable: true
    });
    MobileElement.prototype.setAbsolute = function () {
        var prev = { x: this.element.offsetLeft, y: this.element.offsetTop };
        this.elementStyle.position = 'absolute';
        this.x = prev.x;
        this.y = prev.y;
    };
    return MobileElement;
}());
