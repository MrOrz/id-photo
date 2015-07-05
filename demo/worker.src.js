require('./common.src.js');

const workerCount = 4;

var workers = [],
    outputCtx,
    sectorHeight,
    currentRenderId;

window.renderInit = (inputCanvas, outputCanvas) => {
  var {width, height} = inputCanvas;

  sectorHeight = Math.ceil(height / workerCount);

  for(let i = 0; i<workerCount; i+=1){
    workers.push(new Worker('workerprocess.js'));
    workers[i].postMessage({
      type: 'init',
      imageData: inputCanvas.getContext('2d').getImageData(0, sectorHeight*i, width, sectorHeight),
      workerIndex: i
    });
    workers[i].onmessage = onProcessMessage;
  }

  outputCtx = outputCanvas.getContext('2d');
};

window.renderFn = (map) => {
  currentRenderId = Date.now();

  // Just trigger workers.
  for(let i = 0; i<workerCount; i+=1){
    workers[i].postMessage({
      type: 'render',
      renderId: currentRenderId,
      map
    });
  }
};

function onProcessMessage(e) {
  var eventData = e.data;

  // Skip out-dated render result.
  //
  if(eventData.renderId !== currentRenderId) return;

  // Renders the result from the worker.
  //
  outputCtx.putImageData(eventData.imageData, 0, eventData.workerIndex*sectorHeight);
}