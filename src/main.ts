import { SmurfEngine } from "./engine/smurf_engine"

const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;


onload = () => {
    new SmurfEngine(canvas);
}