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
    function Draggable(element) {
        var _this = _super.call(this, element) || this;
        _this.holdingAt = { x: 0, y: 0 };
        _this.setDraggable();
        _this.windowMouseMoveEvent = function (evt) { _this.onMouseMove(evt); };
        _this.initHoldingEvent();
        return _this;
    }
    Draggable.prototype.setDraggable = function () {
        if (!this.element.classList.contains("draggable")) {
            this.element.classList.add("draggable");
        }
        Draggable.elements.push(this.element);
        this.elementStyle.zIndex = Draggable.elements.length.toString();
    };
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
    /**
     * Calculate the mouse position in reference to the page
     * @param mouseEvent
     *
     * Problem: It says that holdingAt is undefined
     */
    Draggable.prototype.onMouseMove = function (mouseEvent) {
        this.x = mouseEvent.clientX + window.scrollX - this.holdingAt.x;
        this.y = mouseEvent.clientY + window.scrollY - this.holdingAt.y;
    };
    Draggable.prototype.initMouseMoveEvents = function () {
        window.addEventListener('mousemove', this.windowMouseMoveEvent, false);
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
        window.removeEventListener('mousemove', this.windowMouseMoveEvent, false);
    };
    Draggable.prototype.pin = function () {
        var prev = { x: this.x + this.element.offsetLeft, y: this.y };
        if (!this.element.classList.contains('pinned')) {
            this.element.classList.add('pinned');
            this.x = prev.x;
            this.y = prev.y;
        }
    };
    Draggable.prototype.unpin = function () {
        var prev = { x: this.x, y: this.y };
        if (this.element.classList.contains('pinned')) {
            this.element.classList.remove('pinned');
            this.x = prev.x;
            this.y = prev.y;
        }
    };
    Draggable.elements = [];
    return Draggable;
}(MobileElement));
