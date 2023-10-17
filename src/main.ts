import { autobind } from "./data/autobind";
import { Vector2 } from "./data/vector2";
import { Input } from "./engine/input_system";
import { Scene } from "./engine/scene";
import { Settings } from "./engine/settings";
import { SmurfEngine } from "./engine/smurf_engine"
import { blockWorld } from "./example/block_world";
import { engine } from "./example/setup";
import spriteExample from "./example/sprite_example";
import Component from "./game_object/component";
import { CanvasBoxBoundsCollider } from "./game_object/components/box_bounds_collider";
import { BoxRenderer } from "./game_object/components/box_renderer";
import { Physics2D } from "./game_object/components/physics2d";
import { SpriteRenderer } from "./game_object/components/sprite_renderer";
import { Transform } from "./game_object/components/transform";
import GameObject from "./game_object/game_object";




onload = () => {
  engine.loadScene(blockWorld);
}


// library export

export {
  SmurfEngine,
  Scene,
  GameObject,
  Component,
  Settings,
  Input,
  Transform,
  Physics2D,
  BoxRenderer,
  SpriteRenderer,
  CanvasBoxBoundsCollider,
  autobind,
  Vector2,
};
