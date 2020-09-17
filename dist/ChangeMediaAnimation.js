"use strict";
class ChangeMediaAnimation {
    constructor(src, tagname) {
        this.iteration = 'alternate';
        this.ready = true;
        this.src = src;
        this.tagname = tagname;
    }
    animate(element) {
        let info = { srcChanged: false, mediaAvailable: false, count: 0, elements: this.getElements(element) };
        for (let element of info.elements) {
            const src = element.src.substr(element.src.length - this.src.length);
            if (element.classList.contains('mutable')) {
                info.count++;
                if (src !== this.src || src === '') {
                    element.src = this.src;
                    info.srcChanged = true;
                }
            }
        }
        if (info.count > 0)
            info.mediaAvailable = true;
        return info;
    }
    getElements(element) {
        const audios = getChildrenWithTag(element, this.tagname);
        return audios;
    }
}
