import { autobind } from "./data/autobind";
import { Vector2 } from "./data/vector2";
import { AssetPipeline } from "./engine/asset_pipeline";
import { Input } from "./engine/input_system";
import MadeWithSmurfScreen from "./engine/made_with_smurf";
import { Scene } from "./engine/scene";
import { Settings } from "./engine/settings";
import { SmurfEngine, Type } from "./engine/smurf_engine"
import { UniqueIdGenerator } from "./engine/uid";
// import { startGameScene } from "./example/block_world";
// import { engine } from "./example/setup";
// import spriteExample from "./example/sprite_example";
import Component from "./game_object/component";
import { BoxCollider } from "./game_object/components/box_collider";
import { BoxRenderer } from "./game_object/components/box_renderer";
import { Camera } from "./game_object/components/camera";
import DOMUILayer from "./game_object/components/dom_ui_layer";
import { Physics2D } from "./game_object/components/physics2d";
import { SoundSystem } from "./game_object/components/sound_system";
import { SpriteRenderer } from "./game_object/components/sprite_renderer";
import SpriteSheetAnimator from "./game_object/components/sprite_sheet_animator";
import { Transform } from "./game_object/components/transform";
import GameObject from "./game_object/game_object";




// onload = () => {
//   engine.loadScene(spriteExample);
// }

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
  autobind,
  Vector2,
  BoxCollider,
  Camera,
  SoundSystem,
  MadeWithSmurfScreen,
  UniqueIdGenerator,
  AssetPipeline,
  SpriteSheetAnimator,
  DOMUILayer,
};

export type {
  Type,
}