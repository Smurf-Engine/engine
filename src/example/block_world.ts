import { engine } from "./setup";
import { Scene } from "../engine/scene";
import GameObject from "../game_object/game_object";
import { Vector2 } from "../data/vector2";
import { BoxRenderer } from "../game_object/components/box_renderer";
import { Physics2D } from "../game_object/components/physics2d";
import { CanvasBoxBoundsCollider } from "../game_object/components/box_bounds_collider";
import Component from "../game_object/component";

class PlayerMovement extends Component {
  physics2d!: Physics2D;
  start(): void {
    this.gameObject.getComponent<BoxRenderer>(BoxRenderer)!.color = "white";
    this.physics2d = this.gameObject.getComponent<Physics2D>(Physics2D)!;
  }
  update(): void {
    if (this.input.isPressed("ArrowUp") || this.input.isPressed("Space")) {
      this.physics2d.velocity.y = -5;
    }
    if (this.input.isPressed("ArrowLeft") || this.input.isPressed("KeyA")) {
      this.physics2d.velocity.x = -5;
    }
    else if (this.input.isPressed("ArrowRight") || this.input.isPressed("KeyD")) {
      this.physics2d.velocity.x = 5;
    } else {
      this.physics2d.velocity.x = 0;
    }

    console.log(this.physics2d.velocity);
  }
}

const blockWorld = new Scene();

const background = new GameObject({
  name: "Background",
  engine: engine,
});
background.transform.size = new Vector2(engine.canvas.width, engine.canvas.height);
background.addComponent<BoxRenderer>(BoxRenderer).color = "magenta";

const player = new GameObject({
  name: "Player",
  engine: engine,
});

player.transform.size = new Vector2(50, 50);
player.transform.position = new Vector2(100, 100);
player.addComponent(Physics2D);
player.addComponent(BoxRenderer);
player.addComponent(CanvasBoxBoundsCollider);
player.addComponent(PlayerMovement);

blockWorld.addGameObject(background, player);

export { blockWorld };