"use strict";
class ChangeImgAnimation extends ChangeMediaAnimation {
    constructor(src) {
        super(src, 'img');
        this.iteration = 'infinite';
    }
}
