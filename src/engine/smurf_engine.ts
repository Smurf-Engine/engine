import { Input } from "./input_system";
import { Scene } from "./scene";
import { Settings } from "./settings";

export type Type<T> = { new(...args: any[]): T; };

export class SmurfEngine {
  previousTime = Date.now();
  private scene?: Scene;
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

    // clear and redraw
    this.clearCanvas();
    this.scene?.render();


    requestAnimationFrame(this.run);
  }

  clearCanvas() {
    // get all current game objects
    if (this.scene) {
      let xArray = this.scene.gameObjects.map(obj => obj.transform.position.x);
      let yArray = this.scene.gameObjects.map(obj => obj.transform.position.y);
      let widthArray = this.scene.gameObjects.map(obj => obj.transform.size.x);
      let heightArray = this.scene.gameObjects.map(obj => obj.transform.size.y);
      let xMin = Math.min(...xArray);
      let yMin = Math.min(...yArray);
      let xMax = Math.max(...xArray);
      let yMax = Math.max(...yArray);
      let widthMax = Math.max(...widthArray);
      let heightMax = Math.max(...heightArray);
      // clear canvas from min x and y to max x and y
      this.cx.clearRect(xMin, yMin, xMax + widthMax, yMax + heightMax);
    } else {
      this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  loadScene(scene: Scene) {
    this.scene = scene;
  }
}
