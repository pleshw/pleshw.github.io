"use strict";
class MobileElement {
    constructor(element) {
        this.stepWidth = 1;
        this.stepHeight = 1;
        this.element = element;
        this.elementStyle = element.style;
        this.elementRect = element.getBoundingClientRect();
        this.setAbsolute();
    }
    /**
     * Acessadores de posição
     */
    get x() {
        return this.elementRect.left;
    }
    get y() {
        return this.elementRect.top;
    }
    /**
     * Acessadores de posição relativo a janela scrollada
     */
    get xScroll() {
        return this.x + window.scrollX;
    }
    get yScroll() {
        return this.y + window.scrollY;
    }
    set x(val) {
        window.requestAnimationFrame(() => {
            this.elementStyle
                .left = `${val}px`;
        });
    }
    set y(val) {
        window.requestAnimationFrame(() => {
            this.elementStyle
                .top = `${val}px`;
        });
    }
    setAbsolute() {
        let prev = { x: this.element.offsetLeft, y: this.element.offsetTop };
        this.elementStyle.position = 'absolute';
        this.x = prev.x;
        this.y = prev.y;
    }
}
