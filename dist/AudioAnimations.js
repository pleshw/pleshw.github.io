"use strict";
function isPlaying(audio) {
    return audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2;
}
function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}
function speedUpAudio(audio, rate) {
    rate = Math.abs(rate);
    if (audio.playbackRate < 16 - rate)
        audio.playbackRate = audio.playbackRate + rate;
    else
        audio.playbackRate = 16;
}
function slowDownAudio(audio, rate) {
    rate = Math.abs(rate);
    if (audio.playbackRate > 0.65 + rate)
        audio.playbackRate = audio.playbackRate - rate;
    else
        audio.playbackRate = 0.65;
}
class AudioPlayAnimation extends ChangeAudioStateAnimation {
    constructor(src) {
        super(src, audio => audio.play());
        this.iteration = 'infinite';
    }
}
class AudioPauseAnimation extends ChangeAudioStateAnimation {
    constructor(src) {
        super(src, audio => audio.pause());
    }
}
class AudioResetAnimation extends ChangeAudioStateAnimation {
    constructor(src) {
        super(src, audio => audio.currentTime = 0);
    }
}
class AudioStopAnimation extends ChangeAudioStateAnimation {
    constructor(src) {
        super(src, audio => stopAudio(audio));
    }
}
class AudioPauseAndSpeedUpAnimation extends ChangeAudioStateAnimation {
    constructor(src) {
        super(src, audio => {
            audio.pause();
            speedUpAudio(audio, 0.1);
        });
    }
}
class AudioStopAndSpeedUpAnimation extends ChangeAudioStateAnimation {
    constructor(src) {
        super(src, audio => {
            stopAudio(audio);
            speedUpAudio(audio, 0.1);
        });
    }
}
class AudioStopAndSlowDownAnimation extends ChangeAudioStateAnimation {
    constructor(src) {
        super(src, audio => {
            stopAudio(audio);
            slowDownAudio(audio, 0.1);
        });
    }
}
class AudioSpeedUpOnRepeatAnimation extends ChangeAudioStateAnimation {
    constructor(src) {
        super(src, audio => {
            if (audio.currentTime === audio.duration) {
                stopAudio(audio);
                speedUpAudio(audio, 0.5);
            }
            else {
                audio.play();
            }
        });
        this.iteration = 'infinite';
    }
}
class AudioSlowDownOnRepeatAnimation extends ChangeAudioStateAnimation {
    constructor(src) {
        super(src, audio => {
            if (audio.currentTime === audio.duration) {
                stopAudio(audio);
                slowDownAudio(audio, 0.5);
            }
            else {
                audio.play();
            }
        });
        this.iteration = 'infinite';
    }
}
