import { Scene } from "./engine/scene";
import { SmurfEngine } from "./engine/smurf_engine"
import GameObject from "./game_object/game_object";

const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;


onload = () => {
    var engine = new SmurfEngine(canvas);
    const gameObjects : GameObject[] = [];
    var scene = new Scene(gameObjects);

    gameObjects.push(new GameObject({
        name : "Box",
        canvas : canvas,
        components : [],
    }));
}