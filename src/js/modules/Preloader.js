export default class Preloader {
  constructor() {
    this.data = null;
    this.callbackLoadedData = null;
    this.callbackLoadedDataAll = null;
    this.countLoaded = 0;
    this.complete = false;
  }
  start(data, callbackLoadedData, callbackLoadedDataAll) {
    this.data = data;
    this.callbackLoadedData = callbackLoadedData;
    this.callbackLoadedDataAll = callbackLoadedDataAll;
    const reg = /(.*)(?:\.([^.]+$))/;
    for (var i = 0; i < this.data.length; i++) {
      const data = this.data[i];
      switch (data.match(reg)[2]) {
        case 'png':
        case 'jpg':
        case 'gif':
          const image = new Image();
          image.onload = () => {
            this.loadedData();
          };
          image.src = data;
          break;
        case 'mp4':
          const video = document.createElement('video');
          video.addEventListener('loadeddata', () => {
            this.loadedData();
          });
          video.src = data;
          video.load();
          break;
        default:
          this.loadedData();
      }
    }
  }
  loadedData() {
    this.countLoaded++;
    if (this.callbackLoadedData) this.callbackLoadedData();
    if (this.countLoaded >= this.data.length) {
      this.loadedDataAll();
    }
  }
  loadedDataAll() {
    this.complete = true;
    if (this.callbackLoadedDataAll) this.callbackLoadedDataAll();
  }
}