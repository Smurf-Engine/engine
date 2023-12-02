import GameObject from "../game_object/game_object";
import { Input } from "./input_system";
import MadeWithSmurfScreen from "./made_with_smurf";
import { Scene } from "./scene";
import { Settings } from "./settings";

export type Type<T> = { new(...args: any[]): T; };

export class SmurfEngine {
  previousTime = Date.now();
  public scene?: Scene;
  public sceneStack: Scene[] = [];
  // Made with Smurf Screen is the first screen that shows up when the game starts up which enables the user to start the game
  public isGestureReady = false;
  private isRecordingStream = false;
  private recorder?: MediaRecorder;
  // @ts-ignore
  private readonly cx: CanvasRenderingContext2D;
  readonly input: Input;
  // for fps
  lastRun?: number = undefined;
  fps: number = 0;
  constructor(public canvas: HTMLCanvasElement) {
    this.cx = canvas.getContext("2d")!;
    this.input = new Input(canvas);
    this.init();
    this.run();
  }

  init() {
    // set some global settings
    Settings.add("gravity", .15);
    console.log(Settings);

    let startScene = new Scene();
    let madeWithSmurf = new GameObject({
      name: "Made With Smurf",
      engine: this,
    });
    madeWithSmurf.addComponent(MadeWithSmurfScreen);
    startScene.addGameObject(madeWithSmurf);
    this.scene = startScene;
  }

  run = () => {
    if (!this.lastRun) {
      this.lastRun = performance.now();
      requestAnimationFrame(this.run);
      return;
    }
    let delta = (performance.now() - this.lastRun) / 1000;
    this.lastRun = performance.now();
    this.fps = Math.floor(1 / delta);

    let newTime = Date.now();
    Settings.add('dt', (newTime - this.previousTime) / 1000);
    this.previousTime = newTime;

    if (!this.scene?.isAllowedToStay){
      this.scene = this.sceneStack.pop();
    }

    this.scene?.render();


    requestAnimationFrame(this.run);
  }

  loadScene(scene: Scene) {
    this.sceneStack.push(scene);
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
    let stream = this.cx.canvas.captureStream(this.fps || 60);
    // TODO: add audio context in engine and add audio tracks to stream
    // stream.addTrack(this.engine.audioContext.createMediaStreamDestination().stream.getAudioTracks()[0]);
    this.recorder = new MediaRecorder(stream);
    let chunks: Blob[] = [];
    this.recorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    this.recorder.onstop = function () {
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
