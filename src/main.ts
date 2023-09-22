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
    var scene = new Scene(canvas);

    var obj = new GameObject({
        name: "Box",
        canvas: canvas
    });
    obj.transform.width = 100;
    obj.transform.height = 100;
    obj.addComponent<BoxRenderer>(BoxRenderer);
    obj.addComponent<Physics2D>(Physics2D);
    obj.addComponent<CanvasBoxBoundsCollider>(CanvasBoxBoundsCollider);

    scene.addGameObject(obj);
    engine.loadScene(scene);

    console.log(obj);
}