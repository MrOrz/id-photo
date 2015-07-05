var slider = document.getElementById('slider'),
    canvas = document.getElementById('canvas'),
    loaderImg = new Image();


loaderImg.onload = () => {
  canvas.width = loaderImg.width;
  canvas.height = loaderImg.height;
  canvas.getContext('2d').drawImage(loaderImg, 0, 0);
};

loaderImg.src = './demo.jpg';

slider.addEventListener('input', () => {
  var sliderValue = slider.value;
  console.log('slider changed to', sliderValue);
  console.time('RenderFn');
  window.renderFn(sliderValue);
  console.timeEnd('RenderFn');
});
