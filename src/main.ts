import { Scene } from "./engine/scene";
import { SmurfEngine } from "./engine/smurf_engine"
import GameObject from "./game_object/game_object";
import { LoggerComponent } from "./game_object/logger_component";

const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;


onload = () => {
    var engine = new SmurfEngine(canvas);
    const gameObjects: GameObject[] = [];
    var scene = new Scene(gameObjects);

    engine.loadScene(scene);

    var obj = new GameObject({
        name: "Box",
        canvas: canvas
    });

    var component = new LoggerComponent({
        name: "Logger Component",
        gameObject: obj,
        cx: canvas.getContext("2d")!,
    });

    obj.components.push(component);
    gameObjects.push(obj);
}