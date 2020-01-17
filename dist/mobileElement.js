"use strict";
var MobileElement = /** @class */ (function () {
    function MobileElement(element, stepWidth, stepHeight) {
        this.element = element;
        this.elementRect = element.getBoundingClientRect();
        this.elementStyle = this.element.style;
        this.elementStyle.position = "absolute";
        this.stepWidth = stepWidth;
        this.stepHeight = stepHeight;
    }
    Object.defineProperty(MobileElement.prototype, "x", {
        get: function () {
            return this.elementRect.left;
        },
        set: function (val) {
            this.elementStyle
                .left = val * this.stepWidth + "px";
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
                .top = val * this.stepHeight + "px";
        },
        enumerable: true,
        configurable: true
    });
    return MobileElement;
}());
