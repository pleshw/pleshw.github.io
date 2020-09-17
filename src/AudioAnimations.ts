function isPlaying( audio: HTMLAudioElement ) {
  return audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2;
}

function stopAudio( audio: HTMLAudioElement ) {
  audio.pause();
  audio.currentTime = 0;
}

function speedUpAudio( audio: HTMLAudioElement, rate: number ) {
  rate = Math.abs( rate );
  if ( audio.playbackRate < 16 - rate )
    audio.playbackRate = audio.playbackRate + rate;
  else
    audio.playbackRate = 16;
}

function slowDownAudio( audio: HTMLAudioElement, rate: number ) {
  rate = Math.abs( rate );
  if ( audio.playbackRate > 0.65 + rate )
    audio.playbackRate = audio.playbackRate - rate;
  else
    audio.playbackRate = 0.65;
}


class AudioPlayAnimation extends ChangeAudioStateAnimation {
  iteration: t_iteration = 'infinite';
  constructor( src: string ) {
    super( src, audio => audio.play() );
  }
}




class AudioPauseAnimation extends ChangeAudioStateAnimation {
  constructor( src: string ) {
    super( src, audio => audio.pause() );
  }
}



class AudioResetAnimation extends ChangeAudioStateAnimation {
  constructor( src: string ) {
    super( src, audio => audio.currentTime = 0 );
  }
}

class AudioStopAnimation extends ChangeAudioStateAnimation {
  constructor( src: string ) {
    super( src, audio => stopAudio( audio ) );
  }
}

class AudioPauseAndSpeedUpAnimation extends ChangeAudioStateAnimation {
  constructor( src: string ) {
    super( src, audio => {
      audio.pause();
      speedUpAudio( audio, 0.1 );
    } );
  }
}

class AudioStopAndSpeedUpAnimation extends ChangeAudioStateAnimation {
  constructor( src: string ) {
    super( src, audio => {
      stopAudio( audio );
      speedUpAudio( audio, 0.1 );
    } );
  }
}

class AudioStopAndSlowDownAnimation extends ChangeAudioStateAnimation {
  constructor( src: string ) {
    super( src, audio => {
      stopAudio( audio );
      slowDownAudio( audio, 0.1 );
    } );
  }
}

class AudioSpeedUpOnRepeatAnimation extends ChangeAudioStateAnimation {
  iteration: t_iteration = 'infinite';
  constructor( src: string ) {
    super( src, audio => {
      if ( audio.currentTime === audio.duration ) {
        stopAudio( audio );
        speedUpAudio( audio, 0.5 );
      } else {
        audio.play()
      }
    } );
  }
}

class AudioSlowDownOnRepeatAnimation extends ChangeAudioStateAnimation {
  iteration: t_iteration = 'infinite';
  constructor( src: string ) {
    super( src, audio => {
      if ( audio.currentTime === audio.duration ) {
        stopAudio( audio );
        slowDownAudio( audio, 0.5 );
      } else {
        audio.play()
      }
    } );
  }
}


class PlayAudioChangeImgAnimation implements IElementAnimator {
  ready = true;
  iteration: t_iteration = 'alternate';
  playAudio: AudioPlayAnimation;
  changeImg: ChangeImgAnimation;

  constructor( audioSrc: string, imgSrc: string ) {
    this.playAudio = new AudioPlayAnimation( audioSrc );
    this.changeImg = new ChangeImgAnimation( imgSrc );
  }

  public animate( element: HTMLElement ) {
    this.playAudio.animate( element );
    this.changeImg.animate( element );
  }
}


class StopAudioRemoveImgAnimation implements IElementAnimator {
  ready = false;
  iteration: t_iteration = 'alternate';
  changeAudio: ChangeAudioAnimation;
  changeImg: ChangeImgAnimation;

  constructor() {
    this.changeAudio = new ChangeAudioAnimation( '' );
    this.changeImg = new ChangeImgAnimation( '' );
  }

  public animate( element: HTMLElement ) {
    this.changeAudio.animate( element );
    this.changeImg.animate( element );
  }
}