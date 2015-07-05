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
  var sliderValue = +slider.value,
      map = new Uint8ClampedArray(256),
      outputIncrement = 255/(255 - 2*sliderValue);

  console.log('slider changed to', sliderValue);

  for(let i = 0; i<255-2*sliderValue; i+=1){
    map[i+sliderValue] = Math.round(i * outputIncrement);
  }
  for(let i = 255-sliderValue; i<=255; i+=1){
    map[i] = 255;
  }

  console.time('RenderFn');
  window.renderFn(loaderImg, canvas, map);
  console.timeEnd('RenderFn');
});
