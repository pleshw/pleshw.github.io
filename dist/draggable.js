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
    /**
     * Adiciona a classe 'draggable' ao elemento
     * Também adiciona o elemento a lista de elementos arrastáveis
     */
    Draggable.prototype.setDraggable = function () {
        if (!this.element.classList.contains("draggable")) {
            this.element.classList.add("draggable");
        }
        Draggable.elements.push(this.element);
        this.elementStyle.zIndex = Draggable.elements.length.toString();
    };
    /**
     * Checa a prioridade do elemento em relação aos outros, permitindo que o ultimo elemento arrastado da lista seja mostrado em destaque.
     * Também garante que a lista vai permanecer com os elementos ordenados por ordem do ultimo arraste.
     */
    Draggable.prototype.override = function () {
        if (Draggable.elements.length <= 1)
            return;
        var zindex = +this.elementStyle.zIndex;
        var greaterZIndex = Draggable.elements.length;
        if (zindex < greaterZIndex) {
            for (var i = zindex; i < greaterZIndex; i++) {
                Draggable.elements[i].style.zIndex = i.toString();
                var aux = Draggable.elements[i - 1];
                Draggable.elements[i - 1] = Draggable.elements[i];
                Draggable.elements[i] = aux;
            }
        }
        this.elementStyle.zIndex = (Draggable.elements.length).toString();
    };
    /**
     * Calcula e altera a posição do elemento com base na posição do mouse na tela
     * @param mouseEvent Evento como parâmetro
     *
     */
    Draggable.prototype.onMouseMove = function (mouseEvent) {
        this.x = mouseEvent.clientX + window.scrollX - this.holdingAt.x;
        this.y = mouseEvent.clientY + window.scrollY - this.holdingAt.y;
    };
    Draggable.prototype.initMouseMoveEvents = function () {
        window.addEventListener('mousemove', this.windowMouseMoveEvent, false);
    };
    /**
     * Guarda a posição do mouse em relação a tela
     * @param mouseEvent
     */
    Draggable.prototype.trackHolding = function (mouseEvent) {
        this.holdingAt.x = (mouseEvent.pageX - this.element.offsetLeft);
        this.holdingAt.y = (mouseEvent.pageY - this.element.offsetTop);
    };
    /**
     * Inicia os eventos de mouse em relação ao elemento e começa a armazenar a posição do mouse
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
     * Inicia os eventos que ocorrem quando o usuário segura o elemento com o mouse
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
    Draggable.elements = [];
    return Draggable;
}(MobileElement));
