require('./common.src.js');

var originalImageData,
    originalData,
    outputCtx;

window.renderInit = (inputCanvas, outputCanvas) => {
  var {width, height} = inputCanvas;

  originalImageData = inputCanvas.getContext('2d').getImageData(0, 0, width, height);
  originalData = originalImageData.data;

  outputCtx = outputCanvas.getContext('2d');
};

window.renderFn = (map) => {
  var newImageData = outputCtx.createImageData(originalImageData),
      newData = newImageData.data,
      length = newData.length;

  for(let i = 0; i<length; i+=4){
    // R, G, B and A
    newData[i] = map[originalData[i]];
    newData[i+1] = map[originalData[i+1]];
    newData[i+2] = map[originalData[i+2]];
    newData[i+3] = 255;
  }

  outputCtx.putImageData(newImageData, 0, 0);
};