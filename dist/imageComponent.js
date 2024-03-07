

window.addEventListener('load', async () => {
  const imgSrcLoremPicsum = document.getElementById('imageInputUrl').value;
  const imageFromURL = await ImageTools.getImageByURL(imgSrcLoremPicsum);

  const parentParentElement = document.getElementById('imageFromURL').parentElement;
  parentParentElement.style.backgroundImage = `linear-gradient(45deg, ${ await ImageTools.getGradientByImageURL(imgSrcLoremPicsum) })`;

  ImageTools.previewImage({
    defaultImageSrc: imageFromURL.src,
    previewImageElementId: 'imageFromURL'
  });

  const imageFromURLResize = await ImageTools
    .resizeImage(imageFromURL, { height: imageFromURL.height > 200 ? 200 : -1 })
    .then(blob => ImageTools.getImageByBlob(blob));

  ImageTools.previewImage({ defaultImageSrc: imageFromURLResize.src, previewImageElementId: 'imageFromURLResize' });
})

async function changePreviewFromURL(textInput) {
  if (!textInput.value) return;

  const imageFromURL = await ImageTools.getImageByURL(textInput.value);

  const parentParentElement = document.getElementById('imageFromURL').parentElement;

  let palette = (await ImageTools.getImagePaletteByURL(textInput.value));

  console.log(palette);

  // var gradientFromImage = await ImageTools.getGradientByImageURL(textInput.value)
  parentParentElement.style.backgroundImage = `linear-gradient(45deg, ${ ImageTools.getGradientFromPalette(palette) })`;

  ImageTools.previewImage({
    defaultImageSrc: imageFromURL.src,
    previewImageElementId: 'imageFromURL'
  });

  const imageFromURLResize = await ImageTools
    .resizeImage(imageFromURL, { height: imageFromURL.height > 140 ? 140 : -1 })
    .then(blob => ImageTools.getImageByBlob(blob));

  ImageTools.previewImage({ defaultImageSrc: imageFromURLResize.src, previewImageElementId: 'imageFromURLResize' });

}

async function previewFromInputFile(inputElement) {
  const imgFromInput = await ImageTools.getImageByInputId(inputElement.id);
  ImageTools.previewImage({ defaultImageSrc: imgFromInput.src, previewImageElementId: 'imageFromInput' });

  const parentParentElement = document.getElementById('imageFromInput').parentElement.parentElement;

  let palette = (await ImageTools.getImagePaletteByInputId(inputElement.id));

  console.log(palette);

  // var gradientFromImage = await ImageTools.getGradientByImageInputId(inputElement.id);
  parentParentElement.style.backgroundImage = `linear-gradient(45deg, ${ ImageTools.getGradientFromPalette(palette) })`;

  const imgFromInputResize = await ImageTools
    .resizeImage(imgFromInput, { height: imgFromInput.height > 140 ? 140 : -1 })
    .then(blob => ImageTools.getImageByBlob(blob));

  ImageTools.previewImage({
    defaultImageSrc: imgFromInputResize.src,
    previewImageElementId: 'imageFromInputResize'
  });
}