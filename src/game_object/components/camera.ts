import Component from "../component";
import GameObject from "../game_object";

export class Camera extends Component {
  public backgroundColor = "black";
  public zoom = 1;
  public follow?: GameObject;
  private isRecordingStream = false;
  private recorder?: MediaRecorder;
  public viewport = {
    x: 0,
    y: 0,
    width: this.engine.canvas.width,
    height: this.engine.canvas.height
  };

  start(): void {
    console.log(this);
  }

  update() {
    this.clearCanvas();
    // if (this.follow) {
    //   this.viewport.x = this.follow.transform.position.x - this.viewport.width / 2;
    //   this.viewport.y = this.follow.transform.position.y - this.viewport.height / 2;
    // }
    // this.cx.scale(this.zoom, this.zoom);
    // this.cx.translate(-this.viewport.x, -this.viewport.y);
  }


  clearCanvas() {
    // get all current game objects
    let xArray = this.engine.scene!.gameObjects.map(obj => obj.transform.position.x);
    let yArray = this.engine.scene!.gameObjects.map(obj => obj.transform.position.y);
    let widthArray = this.engine.scene!.gameObjects.map(obj => obj.transform.size.x);
    let heightArray = this.engine.scene!.gameObjects.map(obj => obj.transform.size.y);
    let xMin = Math.min(...xArray);
    let yMin = Math.min(...yArray);
    let xMax = Math.max(...xArray);
    let yMax = Math.max(...yArray);

    if (xMin < 0) {
      xMin = 0;
    }
    if (yMin < 0) {
      yMin = 0;
    }
    if (xMax < this.engine.canvas.width) {
      xMax = this.engine.canvas.width;
    }
    if (yMax < this.engine.canvas.height) {
      yMax = this.engine.canvas.height;
    }
    let widthMax = Math.max(...widthArray);
    let heightMax = Math.max(...heightArray);
    // clear canvas from min x and y to max x and y
    this.cx.fillStyle = this.backgroundColor;
    this.cx.fillRect(xMin, yMin, xMax + widthMax, yMax + heightMax);
  }

  currentFrameAsURL(callback: (url: string) => void) {
    this.cx.canvas.toBlob(function (blob) {
      if (blob) {
        let url = URL.createObjectURL(blob);
        callback(url);
      }
    }, "image/png", 1.0);
  }

  startRecordingStream(callback: (url: string) => void) {
    if (this.isRecordingStream) {
      return;
    }
    this.isRecordingStream = true;
    let stream = this.cx.canvas.captureStream(60);
    // TODO: add audio context in engine and add audio tracks to stream
    // stream.addTrack(this.engine.audioContext.createMediaStreamDestination().stream.getAudioTracks()[0]);
    this.recorder = new MediaRecorder(stream);
    let chunks: Blob[] = [];
    this.recorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    this.recorder.onstop = function (e) {
      let blob = new Blob(chunks, { type: "video/mp4" });
      let url = URL.createObjectURL(blob);
      callback(url);
    };
    this.recorder.start();
  }

  stopRecordingStream() {
    if (!this.isRecordingStream) {
      return;
    }
    this.isRecordingStream = false;
    this.recorder!.stop();
  }
}
