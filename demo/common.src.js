var slider = document.getElementById('slider'),
    inputCanvas = document.getElementById('input'),
    outputCanvas = document.getElementById('output'),
    loaderImg = new Image();


loaderImg.onload = () => {
  // Put <img> pixels into inputCanvas
  //
  var {width, height} = loaderImg;
  inputCanvas.width = width;
  inputCanvas.height = height;
  inputCanvas.getContext('2d').drawImage(loaderImg, 0, 0);

  // Setup outputCanvas
  //
  outputCanvas.width = width;
  outputCanvas.height = height;

  // Initilaize renderer and do render
  window.renderInit(inputCanvas, outputCanvas);

  var map = new Uint8Array(256);
  for(let i = 0; i<256; i+=1){
    map[i] = i;
  }
  window.renderFn(map);
};

loaderImg.src = './demo.jpg';

slider.addEventListener('input', () => {
  var sliderValue = +slider.value,
      map = new Uint8Array(256),
      outputIncrement = 255/(255 - 2*sliderValue);

  console.log('slider changed to', sliderValue);

  for(let i = 0; i<255-2*sliderValue; i+=1){
    map[i+sliderValue] = Math.round(i * outputIncrement);
  }
  for(let i = 255-sliderValue; i<=255; i+=1){
    map[i] = 255;
  }

  console.time('RenderFn');
  window.renderFn(map);
  console.timeEnd('RenderFn');
});
