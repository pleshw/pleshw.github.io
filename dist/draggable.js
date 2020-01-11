"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Draggable = /** @class */ (function (_super) {
    __extends(Draggable, _super);
    function Draggable(element, stepWidth, stepHeight) {
        var _this = _super.call(this, element, stepWidth, stepHeight) || this;
        _this.holding = false;
        _this.holdingPosition = { x: 0, y: 0 };
        _this.htmlElement = _this.element;
        Draggable.instances.push(_this);
        _this.setHoldingEvents();
        return _this;
    }
    Draggable.prototype.getGreaterZIndex = function () {
        /// Converting the list to a list of htmlElements, then i can get style property
        var elementList = document.body.getElementsByTagName("*");
        var greaterZIndex = 0;
        /// Get the greater z-index of elements to element that is dragged stay over all elements
        for (var i = 0; i < elementList.length; i++) {
            if (elementList[i].style.zIndex !== "") {
                if (+elementList[i].style.zIndex > greaterZIndex) {
                    greaterZIndex = (+elementList[i].style.zIndex) || 0;
                }
            }
            else {
                elementList[i].style.zIndex = "0";
            }
        }
        return greaterZIndex;
    };
    Draggable.prototype.overrideElements = function () {
        this.htmlElement.style.zIndex =
            (this.getGreaterZIndex() + Draggable.instances.length).toString();
    };
    Draggable.prototype.setMouseMoveEvents = function () {
        var _this = this;
        window.onmousemove = function (_event) {
            _this.x = _event.clientX + window.scrollX - _this.holdingPosition.x;
            _this.y = _event.clientY + window.scrollY - _this.holdingPosition.y;
        };
    };
    Draggable.prototype.setHoldingEvents = function () {
        var _this = this;
        window.onmousemove = null;
        this.htmlElement.onmousedown = function (_event) {
            _event.stopPropagation();
            _event.stopImmediatePropagation();
            _this.holding = true;
            _this.overrideElements();
            _this.holdingPosition.x = (_event.pageX - _this.htmlElement.offsetLeft);
            _this.holdingPosition.y = (_event.pageY - _this.htmlElement.offsetTop);
            _this.setMouseMoveEvents();
        };
        window.onmouseup = function (_event) {
            _this.clearEvents();
        };
    };
    Draggable.prototype.clearEvents = function () {
        window.onmousemove = null;
    };
    Draggable.instances = [];
    return Draggable;
}(MobileElement));
