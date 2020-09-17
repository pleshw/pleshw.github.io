"use strict";
class SensitiveElement extends DefaultElement {
    constructor(element, ticksPerSecond = 1) {
        super(element);
        // Dicionário que se espera que separe os containers de animadores por nome da função
        this.animators = new Map();
        /**
         * Se houverem containers não nulos, verifica se os seus gatilhos devem ser acionados,
         * verifica se existem animadores não nulos então anima o elemento caso haja um disponível.
         * Se foram acionados então a classe chama a função de animação para aquele gatilho
        */
        this.init = () => setInterval(() => this.animators.forEach(container => {
            if (container)
                if (container.trigger() && container.animator()) {
                    if (container.animator().ready)
                        switch (container.animator().iteration) {
                            case 'infinite':
                                container.animator().animate(this.element);
                                break;
                            default:
                                container.animator().animate(this.element);
                                container.animator().ready = false;
                                break;
                        }
                }
        }), this.tickRate);
        this.tickRate = Math.floor(1000 / ticksPerSecond);
        this.init();
    }
}
