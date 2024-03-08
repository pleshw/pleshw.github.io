function templatePresentationVideo(iframeId) {
  return `
    <div id="${ iframeId }SmallScreen" class="mx-5 col-5 video-small-screen overflow-hidden position-relative border border-2 shadow p-0 m-0" style="width: 15%; height: 15%; z-index: 999;">

      <div id="${ iframeId }ProgressBar" class="progress-bar position-absolute rounded-0 border-0 top-0 p-0 m-0" style="height:  120%;">
      </div>

      <span class="position-absolute rounded-0 border-0 top-0 p-0 m-0"></span>
    </div>
  `;
}

const mapYTIframeControllersByIframeId = new Map();
const setYTIframeSmallScreenController = new Set();
const setYTIframeFullScreenController = new Set();

function createYTIframeComponent(iframeId, videoId, startsAt = 0) {
  const presentationVideoElement = DOMTools.getElementFromHTML(templatePresentationVideo(iframeId));

  const videoPresentationsContainer = document.getElementById('ytIframeSmallScreenContainer');
  videoPresentationsContainer.insertAdjacentElement('beforeend', presentationVideoElement);

  const smallScreenController = new YoutubeIframe.YoutubeIframe({
    iframeId: iframeId,
    videoId: videoId,
    parentElement: presentationVideoElement,
    startsAt: startsAt,
    classList: ['yt-iframe-container-small'],
    startMuted: true,
    blockInteraction: true
  });

  smallScreenController.addEventListener('onclickinteractionblocked', () => {
    smallScreenController.toggle();
  });

  const fullScreenController = new YoutubeIframe.YoutubeIframe({
    iframeId: `${ iframeId }FullScreen`,
    videoId: videoId,
    parentElement: document.getElementById('ytIframeFullScreenContainer'),
    startsAt: startsAt,
    classList: ['yt-iframe-container-fullscreen'],
    blockInteraction: true
  });

  fullScreenController.addEventListener('oniframeready', () => {
    const firsFSController = setYTIframeFullScreenController.values().next().value;
    if (firsFSController && firsFSController === fullScreenController) {
      fullScreenController.iframeElement.style.opacity = '1';
    } else {
      fullScreenController.iframeElement.style.opacity = '0';
    }
  });

  const syncIframesController = new YoutubeIframe.YoutubeIframeSync({
    mainIframe: fullScreenController,
    subIframes: [smallScreenController]
  });

  if (mapYTIframeControllersByIframeId.has(iframeId)) {
    throw new Error('Invalid iframe. Iframe id already exists.');
  }

  const ytIframeComponent = {
    smallScreenController: smallScreenController,
    fullScreenController: fullScreenController,
    syncController: syncIframesController,
    elements: {
      smallScreenElement: document.getElementById(`${ iframeId }SmallScreen`),
      progressBar: document.getElementById(`${ iframeId }ProgressBar`),
    }
  };

  mapYTIframeControllersByIframeId.set(iframeId, ytIframeComponent);
  setYTIframeSmallScreenController.add(smallScreenController);
  setYTIframeFullScreenController.add(fullScreenController);

  return ytIframeComponent;
}

let sectionScroller;

window.addEventListener('load', () => {
  createYTIframeComponents();

  const ytIframeSwitcher = new YoutubeIframe.YoutubeIframeSwitcher({
    switchBetween: Array.from(setYTIframeFullScreenController)
  });

  ytIframeSwitcher.addEventListener('onalternate', (switcher, iframeToPlay, iframesToPause) => {
    iframesToPause.forEach(i => i.iframeElement.style.opacity = '0');
    iframeToPlay.iframeElement.style.opacity = '1';
  });

  mapYTIframeControllersByIframeId.forEach((iframeComponent, iframeId) => {
    iframeComponent.smallScreenController.addEventListener('onplaying', evt => {
      if (iframeComponent.elements.progressBar) {
        iframeComponent.elements.progressBar.style.width = `${ (evt.progressPercent * 100).toString() }%`;
      }
    });
  });

  YoutubeIframe.YoutubeIframe.buildIframes();
});

function createYTIframeComponents() {
  createYTIframeComponent('Full DaSH', '5VMMeQ94ij8', 11);
  createYTIframeComponent('Colours', 'yTJiKjZy5Xo', 13);
}