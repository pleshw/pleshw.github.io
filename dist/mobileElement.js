"use strict";
class MobileElement extends DefaultElement {
    constructor(element) {
        super(element);
        this.offsetParent = (this.element.offsetParent);
    }
    get x() {
        return (this.offsetParent === null)
            ? this.elementRect.left
            : this.elementRect.left - this.offsetParent.offsetLeft;
    }
    get y() {
        return (this.offsetParent === null)
            ? this.elementRect.top
            : this.elementRect.top;
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
