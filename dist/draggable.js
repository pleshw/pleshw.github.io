"use strict";
class Draggable extends MobileElement {
    constructor(element) {
        super(element);
        this.holdingAt = { x: 0, y: 0 };
        /**
         * Inicia os eventos que ocorrem quando o usuário segura o elemento com o mouse
         * PROBLEMA: Preciso limpar os eventos assim que o mouse sair de cima do elemento
         */
        this.isMouseDown = false;
        this.setDraggable();
        this.windowMouseMoveEvent = (evt) => { this.mouseMove(evt); };
        this.initHoldingEvent();
    }
    /**
     * Adiciona a classe 'draggable' ao elemento
     * Também adiciona o elemento a lista de elementos arrastáveis
     */
    setDraggable() {
        if (!this.element.classList.contains("draggable")) {
            this.element.classList.add("draggable");
        }
        Draggable.elements.add(this.element);
    }
    /**
     * Faz com que quando este elemento for arrastado ele sobreponha todos os outros na lista de arrastáveis
     */
    override() {
        if (Draggable.elements.length <= 1)
            return;
        const i = Draggable.elements.indexOf(this.element);
        const last = Draggable.elements.length - 1;
        if (i === last)
            return;
        Draggable.elements.swap(i, last);
    }
    /**
     * Calcula e altera a posição do elemento com base na posição do mouse na tela
     * @param mouseEvent Evento como parâmetro
     *
     */
    mouseMove(mouseEvent) {
        this.x = mouseEvent.clientX + window.scrollX - this.holdingAt.x;
        this.y = mouseEvent.clientY + window.scrollY - this.holdingAt.y;
    }
    initMouseMoveEvents() {
        this.element.addEventListener('mousemove', this.windowMouseMoveEvent, false);
    }
    /**
     * Guarda a posição do mouse em relação a tela
     * @param mouseEvent
     */
    trackHolding(mouseEvent) {
        this.holdingAt.x = (mouseEvent.pageX - this.element.offsetLeft);
        this.holdingAt.y = (mouseEvent.pageY - this.element.offsetTop);
    }
    /**
     * Inicia os eventos de mouse em relação ao elemento e começa a armazenar a posição do mouse
     * @param mouseEvent
     */
    onHold(mouseEvent) {
        mouseEvent.stopPropagation();
        mouseEvent.stopImmediatePropagation();
        this.override();
        this.trackHolding(mouseEvent);
        this.initMouseMoveEvents();
    }
    initHoldingEvent() {
        this.element.onmousemove = null;
        this.element.addEventListener("mousedown", (evt) => {
            this.isMouseDown = true;
            this.onHold(evt);
        });
        window.addEventListener("mouseup", () => {
            this.isMouseDown = false;
            this.clearEvents();
        });
        this.element.onmouseout = (evt) => {
            if (this.isMouseDown)
                this.mouseMove(evt);
        };
    }
    clearEvents() {
        this.element.removeEventListener('mousemove', this.windowMouseMoveEvent, false);
    }
}
Draggable.elements = new ZIndexQueue();
