"use strict";
var MobileElement = /** @class */ (function () {
    function MobileElement(element) {
        this.stepWidth = 1;
        this.stepHeight = 1;
        this.element = element;
        this.elementStyle = element.style;
        this.elementRect = element.getBoundingClientRect();
        this.setElementPosition('absolute');
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
    MobileElement.prototype.setElementPosition = function (position) {
        var prev = { x: this.element.offsetLeft, y: this.element.offsetLeft };
        this.elementStyle.position = position;
        this.x = prev.x;
        this.y = prev.y;
    };
    return MobileElement;
}());
