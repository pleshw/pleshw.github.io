"use strict";
class SensitiveElement extends DefaultElement {
    constructor(element, ticksPerSecond = 1) {
        super(element);
        // Dicionário que se espera que separe os containers de animadores por nome da função
        this.animators = new Map();
        /**
         * Se houverem containers não nulos, verifica-se então se existem animadores não nulos
         * então verifica-se se os seus gatilhos devem ser acionados.
         * Se foram acionados então a classe chama a função de animação para aquele gatilho
        */
        this.init = () => setInterval(() => this.animators.forEach(container => container
            ? container.trigger()
                ? container.animator() !== null
                    ? container.animator().animate(this.element)
                    : {}
                : {}
            : {}), this.tickRate);
        this.tickRate = Math.floor(1000 / ticksPerSecond);
        this.init();
    }
}
