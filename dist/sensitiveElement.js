"use strict";
class SensitiveElement extends DefaultElement {
    constructor(element, animator, trigger, ticksPerSecond = 1) {
        super(element);
        this.init = () => setInterval(() => this.trigger() ? this.animate() : {}, this.tickRate);
        this.trigger = trigger;
        this.animator = animator;
        this.tickRate = Math.floor(1000 / ticksPerSecond);
        this.init();
    }
}
