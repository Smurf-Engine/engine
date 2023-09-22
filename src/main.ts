import { Scene } from "./engine/scene";
import { SmurfEngine } from "./engine/smurf_engine"
import { BoxRenderer } from "./game_object/components/box_renderer";
import GameObject from "./game_object/game_object";

const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;


onload = () => {
    var engine = new SmurfEngine(canvas);
    const gameObjects: GameObject[] = [];
    var scene = new Scene(gameObjects);

    var obj = new GameObject({
        name: "Box",
        canvas: canvas
    });

    gameObjects.push(obj);
    
    obj.addComponent<BoxRenderer>(BoxRenderer);

    engine.loadScene(scene);
}