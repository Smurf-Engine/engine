import { engine } from "./setup";
import { Scene } from "../engine/scene";
import GameObject from "../game_object/game_object";
import { Vector2 } from "../data/vector2";
import { SpriteRenderer } from "../game_object/components/sprite_renderer";
import { BoxRenderer } from "../game_object/components/box_renderer";
import { Physics2D } from "../game_object/components/physics2d";
import Component from "../game_object/component";

var spriteExample = new Scene();

let background = new GameObject({
  name: "Background",
  engine
});

let sp = background.addComponent<SpriteRenderer>(SpriteRenderer);
background.transform.size = new Vector2(700, 500);
sp.constructSpriteFromSource("https://img.freepik.com/premium-vector/panorama-landscape-with-green-bushes-trees-against-background-mountains-blue-sky_531666-54.jpg");

// box
var cursor = new GameObject({
  name: "Cursor",
  engine
});
cursor.transform.size = new Vector2(10, 10);
cursor.addComponent<BoxRenderer>(BoxRenderer);
var box = cursor.getComponent<BoxRenderer>(BoxRenderer)!;
box.color = "red";

// player
var player = new GameObject({
  name: "Player",
  engine
});
player.transform.size = new Vector2(100, 100);
player.transform.position = new Vector2(100, 100);
player.addComponent<Physics2D>(Physics2D);
let spriteRenderer = player.addComponent<SpriteRenderer>(SpriteRenderer);
spriteRenderer.constructSpriteFromSource("/player.png");


class PlayerMovement extends Component {
  physics2d!: Physics2D;
  spriteLeft = "/player_left.png";
  spriteRight = "/player.png";
  spriteRenderer!: SpriteRenderer;

  start(): void {
    this.physics2d = this.gameObject.getComponent<Physics2D>(Physics2D)!;
    this.spriteRenderer = this.gameObject.getComponent<SpriteRenderer>(SpriteRenderer)!;
  }
  update(): void {
    if (this.input.isPressed("ArrowUp") || this.input.isPressed("Space")) {
      this.physics2d.velocity.y = -5;
    }
    if (this.input.isPressed("ArrowLeft") || this.input.isPressed("KeyA")) {
      this.physics2d.velocity.x = -5;
      this.spriteRenderer.constructSpriteFromSource(this.spriteLeft);
    }
    else if (this.input.isPressed("ArrowRight") || this.input.isPressed("KeyD")) {
      this.physics2d.velocity.x = 5;
      this.spriteRenderer.constructSpriteFromSource(this.spriteRight);
    } else {
      this.physics2d.velocity.x = 0;
    }
  }
}

class MouseFollowingBox extends Component {
  boxRenderer!: BoxRenderer;

  start(): void {
    this.boxRenderer = this.gameObject.getComponent<BoxRenderer>(BoxRenderer)!;
  }
  update(): void {
    this.gameObject.transform.moveTo(this.input.mouseX, this.input.mouseY);

    if (this.input.getMouseKeyDown(0)) {
      this.gameObject.cx.canvas.style.cursor = "none";
      this.boxRenderer.color = "pink";
    } else if (this.input.getMouseKeyDown(2)) {
      this.boxRenderer.color = "green";
    }

  }
}


cursor.addComponent<MouseFollowingBox>(MouseFollowingBox);
player.addComponent<PlayerMovement>(PlayerMovement);

spriteExample.addGameObject(background, cursor, player);

export default spriteExample;
