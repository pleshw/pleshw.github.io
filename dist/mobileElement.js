"use strict";
var MobileElement = /** @class */ (function () {
    function MobileElement(element, stepWidth, stepHeight) {
        this.element = element;
        this.element.style.position = "absolute";
        this.stepWidth = stepWidth;
        this.stepHeight = stepHeight;
    }
    Object.defineProperty(MobileElement.prototype, "x", {
        get: function () {
            return this.element.getBoundingClientRect().left;
        },
        set: function (val) {
            var _this = this;
            window.requestAnimationFrame(function () {
                _this.element
                    .style
                    .left = (val * _this.stepWidth).toString() + 'px';
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileElement.prototype, "y", {
        get: function () {
            return this.element.getBoundingClientRect().top;
        },
        set: function (val) {
            var _this = this;
            window.requestAnimationFrame(function () {
                _this.element
                    .style
                    .top = (val * _this.stepHeight).toString() + 'px';
            });
        },
        enumerable: true,
        configurable: true
    });
    return MobileElement;
}());
