var originalImageData,
    originalData,
    workerIndex;

self.onmessage = (e) => {
  var eventData = e.data;

  switch(eventData.type){
  case 'init':
    originalImageData = eventData.imageData;
    originalData = originalImageData.data;
    workerIndex = eventData.workerIndex;
    break;

  case 'render':
    console.log('start', Date.now());
    let newImageData = new ImageData(originalImageData.width, originalImageData.height),
        newData = newImageData.data,
        length = newData.length,
        map = eventData.map;

    for(let i = 0; i<length; i+=4){
      // R, G, B and A
      newData[i] = map[originalData[i]];
      newData[i+1] = map[originalData[i+1]];
      newData[i+2] = map[originalData[i+2]];
      newData[i+3] = 255;
    }

    self.postMessage({
      imageData: newImageData,
      renderId: eventData.renderId,
      workerIndex
    });

    console.log('end', Date.now());
  }
}