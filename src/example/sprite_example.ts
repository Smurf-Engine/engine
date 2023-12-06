import { engine } from "./setup";
import { Scene } from "../engine/scene";
import GameObject from "../game_object/game_object";
import { Vector2 } from "../data/vector2";
import { SpriteRenderer } from "../game_object/components/sprite_renderer";
import { BoxRenderer } from "../game_object/components/box_renderer";
import { Physics2D } from "../game_object/components/physics2d";
import Component from "../game_object/component";
import SpriteSheetAnimator from "../game_object/components/sprite_sheet_animator";
import { BoxCollider } from "../game_object/components/box_collider";

engine.assetPipeline.addToLoad(
  "/coin/image 1.png",
  "/coin/image 2.png",
  "/coin/image 3.png",
  "/coin/image 4.png",
  "/coin/image 5.png",
  "/coin/image 6.png",
  "/coin/image 7.png",
  "/coin/image 8.png",
  "/coin/image 9.png",
  "/coin/image 10.png",
  "/coin/image 11.png",
  "/coin/image 12.png",
  "/coin/image 13.png",
  "/coin/image 14.png",
  "/coin/image 15.png",
  "/coin/image 16.png",
  "https://img.freepik.com/premium-vector/panorama-landscape-with-green-bushes-trees-against-background-mountains-blue-sky_531666-54.jpg",
  "/player.png",
  "/water/image 1.png",
  "/water/image 2.png",
  "/water/image 3.png",
  "/water/image 4.png",
  "/water/image 5.png",
  "/water/image 6.png",
  "/water/image 7.png",
  "/water/image 8.png",
  "/water/image 9.png",
  "/water/image 10.png",
  "/water/image 11.png",
  "/water/image 12.png",
  "/water/image 13.png",
  "/water/image 14.png",
  "/water/image 15.png",
  "/water/image 16.png",
  "/water/image 17.png",
);

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
player.addComponent<BoxCollider>(BoxCollider).drawBounds = true;
let spriteRenderer = player.addComponent<SpriteRenderer>(SpriteRenderer);
spriteRenderer.constructSpriteFromSource("/player.png");

const coin = new GameObject({
  name: "Coin",
  engine
});

coin.transform.size = new Vector2(25, 25);
coin.transform.position = new Vector2(400, 100);

let spr = coin.addComponent<SpriteRenderer>(SpriteRenderer);
spr.constructSpriteFromSource("/coin/image 1.png");
spr.useNaturalSize = true;
spr.scale = new Vector2(.1, .1);
coin.addComponent(SpriteSheetAnimator).sprites = [
  "/coin/image 1.png",
  "/coin/image 2.png",
  "/coin/image 3.png",
  "/coin/image 4.png",
  "/coin/image 5.png",
  "/coin/image 6.png",
  "/coin/image 7.png",
  "/coin/image 8.png",
  "/coin/image 9.png",
  "/coin/image 10.png",
  "/coin/image 11.png",
  "/coin/image 12.png",
  "/coin/image 13.png",
  "/coin/image 14.png",
  "/coin/image 15.png",
  "/coin/image 16.png",
];

coin.addComponent(BoxCollider).drawBounds = true;

const water = new GameObject({
  name: "Water",
  engine
});
water.transform.zIndex = 1;

water.transform.size = new Vector2(700, 150);
water.transform.position = new Vector2(0, 350);

water.addComponent<SpriteRenderer>(SpriteRenderer).constructSpriteFromSource("/water/image 1.png");
let animator = water.addComponent(SpriteSheetAnimator);
animator.sprites = [
  "/water/image 1.png",
  "/water/image 2.png",
  "/water/image 3.png",
  "/water/image 4.png",
  "/water/image 5.png",
  "/water/image 6.png",
  "/water/image 7.png",
  "/water/image 8.png",
  "/water/image 9.png",
  "/water/image 10.png",
  "/water/image 11.png",
  "/water/image 12.png",
  "/water/image 13.png",
  "/water/image 14.png",
  "/water/image 15.png",
  "/water/image 16.png",
  "/water/image 17.png",
];
animator.pauseDurationInSeconds = 0;

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

spriteExample.addGameObject(background, cursor, player, coin, water);

export default spriteExample;
