import { Input } from "./input_system";
import { Scene } from "./scene";
import { Settings } from "./settings";

export class SmurfEngine {
    previousTime = Date.now();
    private scene? : Scene;
    private readonly cx : CanvasRenderingContext2D;
    readonly input = new Input();
    constructor(public canvas: HTMLCanvasElement) {
        this.cx = canvas.getContext("2d")!;
        this.init();
        this.run();
    }

    init(){
        // set some global settings
        Settings.add("gravity",.15);
        console.log(Settings);
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