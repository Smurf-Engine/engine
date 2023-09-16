import { Scene } from "./scene";
import { Settings } from "./settings";

export class SmurfEngine {
    previousTime = Date.now();
    private scene? : Scene;
    constructor(public canvas: HTMLCanvasElement) {
        this.run();
    }

    run = () => {
        let newTime = Date.now();
        Settings.add('dt', (newTime - this.previousTime) / 1000);
        this.previousTime = newTime;
        this.scene?.render();
        requestAnimationFrame(this.run);
    }

    loadScene(scene : Scene){
        this.scene = scene;
    }
}