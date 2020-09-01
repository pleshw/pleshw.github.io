"use strict";
class MobileElement extends DefaultElement {
    constructor(element) {
        super(element);
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
}
