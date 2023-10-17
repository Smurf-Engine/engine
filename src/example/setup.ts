import { SmurfEngine } from "../engine/smurf_engine";

const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;
const engine = new SmurfEngine(canvas);

export { engine };
