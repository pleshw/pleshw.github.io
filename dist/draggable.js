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
        _this.holdingAt = { x: 0, y: 0 };
        element.classList.add("draggable");
        Draggable.elements.push(_this.element);
        _this.elementStyle.zIndex = Draggable.elements.length.toString();
        _this.initHoldingEvent();
        return _this;
    }
    Draggable.prototype.override = function () {
        if (Draggable.elements.length <= 1)
            return;
        var zindex = +this.elementStyle.zIndex;
        var greaterZIndex = Draggable.elements.length;
        if (zindex < greaterZIndex)
            for (var i = zindex; i < greaterZIndex; i++) {
                Draggable.elements[i].style.zIndex = i.toString();
                var aux = Draggable.elements[i - 1];
                Draggable.elements[i - 1] = Draggable.elements[i];
                Draggable.elements[i] = aux;
            }
        this.elementStyle.zIndex = (Draggable.elements.length).toString();
    };
    Draggable.prototype.initMouseMoveEvents = function () {
        var _this = this;
        window.onmousemove = function (_event) {
            _this.x = _event.clientX + window.scrollX - _this.holdingAt.x;
            _this.y = _event.clientY + window.scrollY - _this.holdingAt.y;
        };
    };
    /**
     * Store the mouse position of an event in reference to the page
     * @param mouseEvent
     */
    Draggable.prototype.trackHolding = function (mouseEvent) {
        this.holdingAt.x = (mouseEvent.pageX - this.element.offsetLeft);
        this.holdingAt.y = (mouseEvent.pageY - this.element.offsetTop);
    };
    /**
     * Init the drag events, and set the last dragged element over other elements
     * @param mouseEvent
     */
    Draggable.prototype.onHold = function (mouseEvent) {
        mouseEvent.stopPropagation();
        mouseEvent.stopImmediatePropagation();
        this.override();
        this.trackHolding(mouseEvent);
        this.initMouseMoveEvents();
    };
    /**
     * Starts the onHold events when mouse is dragging this element, and clear the event when it drops
     */
    Draggable.prototype.initHoldingEvent = function () {
        var _this = this;
        window.onmousemove = null;
        this.element.onmousedown = function (evt) { _this.onHold(evt); };
        window.onmouseup = function () { _this.clearEvents(); };
    };
    Draggable.prototype.clearEvents = function () {
        window.onmousemove = null;
    };
    Draggable.prototype.pin = function () {
        if (!this.element.classList.contains('pinned'))
            this.element.classList.add('pinned');
    };
    Draggable.prototype.unpin = function () {
        if (this.element.classList.contains('pinned'))
            this.element.classList.remove('pinned');
    };
    Draggable.elements = [];
    return Draggable;
}(MobileElement));
