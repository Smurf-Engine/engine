import { Settings } from "./settings";

export class SmurfEngine {
    previousTime = Date.now();
    constructor(public canvas: HTMLCanvasElement) {
        this.run();
    }

    run = () => {
        let newTime = Date.now();
        Settings.add('dt', (newTime - this.previousTime) / 1000);
        this.previousTime = newTime;

        requestAnimationFrame(this.run);
    }
}