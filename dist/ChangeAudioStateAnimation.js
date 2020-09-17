"use strict";
class ChangeAudioStateAnimation extends ChangeAudioAnimation {
    constructor(src, action) {
        super(src);
        this.action = action;
    }
    animate(element) {
        const info = super.animate(element);
        info.elements
            .forEach(item => (info.mediaAvailable) ? this.action(item) : {});
        return info;
    }
}
