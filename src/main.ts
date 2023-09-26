import { Vector2 } from "./data/vector2";
import { Scene } from "./engine/scene";
import { SmurfEngine } from "./engine/smurf_engine"
import { CanvasBoxBoundsCollider } from "./game_object/components/box_bounds_collider";
import { BoxRenderer } from "./game_object/components/box_renderer";
import { Physics2D } from "./game_object/components/physics2d";
import { SpriteRenderer } from "./game_object/components/sprite_renderer";
import GameObject from "./game_object/game_object";

const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;


onload = () => {
    var engine = new SmurfEngine(canvas);
    var scene = new Scene();

    let background = new GameObject({
        name: "Background",
        engine
    });

    let sp = background.addComponent<SpriteRenderer>(SpriteRenderer);
    background.transform.size = new Vector2(700, 500);
    sp.constructSpriteFromSource("https://img.freepik.com/premium-vector/panorama-landscape-with-green-bushes-trees-against-background-mountains-blue-sky_531666-54.jpg");

    // box
    var obj = new GameObject({
        name: "Box",
        engine
    });
    obj.transform.size = new Vector2(100, 100);
    obj.addComponent<BoxRenderer>(BoxRenderer);
    obj.addComponent<Physics2D>(Physics2D);
    obj.addComponent<CanvasBoxBoundsCollider>(CanvasBoxBoundsCollider);
    var box = obj.getComponent<BoxRenderer>(BoxRenderer)!;
    box.color = "red";

    // player
    var player = new GameObject({
        name: "Player",
        engine
    });
    player.transform.size = new Vector2(100, 100);
    player.transform.position = new Vector2(100, 100);
    player.addComponent<Physics2D>(Physics2D);
    player.addComponent<CanvasBoxBoundsCollider>(CanvasBoxBoundsCollider);
    let spriteRenderer = player.addComponent<SpriteRenderer>(SpriteRenderer);
    spriteRenderer.constructSpriteFromSource("/player.png");

    scene.addGameObject(background);
    scene.addGameObject(obj);
    scene.addGameObject(player);
    engine.loadScene(scene);

    console.log(player);
}