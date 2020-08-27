"use strict";
class ZIndexContainer {
    constructor(element, level) {
        this._element = element;
        this._level = level;
        this.update();
    }
    get level() { return this._level; }
    get element() { return this._element; }
    set element(v) {
        this._element = v;
        this.update();
    }
    set level(v) {
        this._level = v;
        this.update();
    }
    update() {
        if (this._element.style.zIndex === undefined)
            this._element.style.zIndex = "0";
        this._element.style.zIndex = this._level.toString();
    }
}
class ZIndexQueue {
    constructor() {
        this.arr = new Array();
        this.indexOf = (value) => this.arr.map(({ element }) => element).indexOf(value);
    }
    add(value) {
        this.arr.push(new ZIndexContainer(value, this.arr.length));
    }
    get length() { return this.arr.length; }
    remove(selector) {
        if (this.length < 1)
            return;
        let i = (typeof selector === 'number') ? selector : this.indexOf(selector);
        this.arr.splice(i, 1);
        for (let j = i; j < this.arr.length; j++)
            this.arr[j].level -= 1;
    }
    swap(a, b) {
        let aux = this.arr[a].element;
        this.arr[a].element = this.arr[b].element;
        this.arr[b].element = aux;
    }
}
