window.addEventListener('load', async () => {
  const audioStatus = document.getElementById('audioStatus');
  const pausedMessage = 'Paused - Press <code>["Space Bar"]</code> to toggle';
  const audioURL = 'http://theemon.com/t/transport-wp/PlaceHolder/wp-content/uploads/2015/09/BlueDucks_FourFlossFiveSix.wav';
  audioStatus.innerHTML = pausedMessage;

  AudioTools.createAudioComponent(audioURL).then((component) => {
    DOMTools.addActionKey({
      key: 'Space',
      keydown: () => {
        component.toggle();
        if (component.paused) {
          audioStatus.innerHTML = pausedMessage;
        } else {
          audioStatus.innerHTML = `Now Playing: <code>[<small><a href="${ component.fileName }" target="_blank">${ component.fileName }</a></small>]</code>`
        }
      },
      keyup: () => {
      },
      executeOnlyOnce: true
    });
  });
});