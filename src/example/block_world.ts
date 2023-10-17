import { engine } from "./setup";
import { Scene } from "../engine/scene";
import GameObject from "../game_object/game_object";
import { Vector2 } from "../data/vector2";
import { SpriteRenderer } from "../game_object/components/sprite_renderer";
import { BoxRenderer } from "../game_object/components/box_renderer";
import { Physics2D } from "../game_object/components/physics2d";
import { CanvasBoxBoundsCollider } from "../game_object/components/box_bounds_collider";
import Component from "../game_object/component";

const blockWorld = new Scene();

let background = new GameObject({
  name: "Background",
  engine: engine,
});

background.transform.size = new Vector2(engine.canvas.width, engine.canvas.height);

let renderer = background.addComponent<BoxRenderer>(BoxRenderer);
renderer.color = "magenta";

blockWorld.addGameObject(background);

export { blockWorld };
