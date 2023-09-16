import { Scene } from "./scene";
import { Settings } from "./settings";

export class SmurfEngine {
    previousTime = Date.now();
    private scene? : Scene;
    private readonly cx : CanvasRenderingContext2D;
    constructor(public canvas: HTMLCanvasElement) {
        this.cx = canvas.getContext("2d")!;
        this.run();
    }

    run = () => {
        let newTime = Date.now();
        Settings.add('dt', (newTime - this.previousTime) / 1000);
        this.previousTime = newTime;

        // clear and redraw
        this.clearCanvas();
        this.scene?.render();


        requestAnimationFrame(this.run);
    }

    clearCanvas(){
        this.cx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    loadScene(scene : Scene){
        this.scene = scene;
    }
}