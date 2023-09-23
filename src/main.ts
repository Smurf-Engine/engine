import { Vector2 } from "./data/vector2";
import { Scene } from "./engine/scene";
import { SmurfEngine } from "./engine/smurf_engine"
import { CanvasBoxBoundsCollider } from "./game_object/components/box_bounds_collider";
import { BoxRenderer } from "./game_object/components/box_renderer";
import { Physics2D } from "./game_object/components/physics2d";
import GameObject from "./game_object/game_object";

const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;


onload = () => {
    var engine = new SmurfEngine(canvas);
    var scene = new Scene();

    var obj = new GameObject({
        name: "Box",
        engine
    });
    obj.transform.size = new Vector2(100,100);
    obj.addComponent<BoxRenderer>(BoxRenderer);
    obj.addComponent<Physics2D>(Physics2D);
    obj.addComponent<CanvasBoxBoundsCollider>(CanvasBoxBoundsCollider);

    var box = obj.getComponent<BoxRenderer>(BoxRenderer)!;
    box.color = "red";

    scene.addGameObject(obj);
    engine.loadScene(scene);

    console.log(obj);
}