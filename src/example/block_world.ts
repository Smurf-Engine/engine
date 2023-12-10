import { engine } from "./setup";
import { Scene } from "../engine/scene";
import GameObject from "../game_object/game_object";
import { Vector2 } from "../data/vector2";
import { BoxRenderer } from "../game_object/components/box_renderer";
import { Physics2D } from "../game_object/components/physics2d";
import Component from "../game_object/component";
import { Camera } from "../game_object/components/camera";
import { BoxCollider } from "../game_object/components/box_collider";
import { SoundSystem } from "../game_object/components/sound_system";
import DOMUILayer from "../game_object/components/dom_ui_layer";

const startGameScene = new Scene();

const startGame = new GameObject({
  name: "UI",
  engine: engine,
});

class StartGame extends Component {
  ui = this.gameObject.getComponent(DOMUILayer)!;
  onFirstUpdate(): void {
    this.createUI();
  }

  createUI(){
    // start button small on left
    let startButton = document.createElement("button");
    startButton.innerText = "Start";
    startButton.style.marginTop = "100px";
    startButton.style.marginLeft = "50px";
    startButton.style.fontSize = "25px";
    startButton.style.backgroundColor = "white";
    startButton.style.color = "black";
    startButton.style.borderRadius = "10px";
    startButton.style.border = "none";
    startButton.style.padding = "10px";
    startButton.style.cursor = "pointer";
    startButton.style.outline = "none";
    startButton.onclick = () => {
      this.engine.scene!.isAllowedToStay = false;
      engine.loadScene(blockWorld);
    }

    // options button small on left
    let optionsButton = document.createElement("button");
    optionsButton.style.display = "block";
    optionsButton.innerText = "Options";
    optionsButton.style.marginTop = "10px";
    optionsButton.style.marginLeft = "50px";
    optionsButton.style.fontSize = "25px";
    optionsButton.style.backgroundColor = "white";
    optionsButton.style.color = "black";
    optionsButton.style.borderRadius = "10px";
    optionsButton.style.border = "none";
    optionsButton.style.padding = "10px";
    optionsButton.style.cursor = "pointer";
    optionsButton.style.outline = "none";
    optionsButton.onclick = () => {
      alert("Options");
    }
    this.ui.addElement(startButton, "opaque");
    this.ui.addElement(optionsButton, "opaque");

    this.ui.setLayerHitBehavior("opaque");
  }

}
startGame.addComponent(DOMUILayer);
startGame.addComponent(StartGame);
startGameScene.addGameObject(startGame);

const gameOverScene = new Scene();

const gameOver = new GameObject({
  name: "UI",
  engine: engine,
});

class GameOver extends Component {
  ui = this.gameObject.getComponent(DOMUILayer)!;
  onFirstUpdate(): void {
    this.createUI();
  }

  createUI(){
    // start button small on left
    let startButton = document.createElement("button");
    startButton.innerText = "Restart";
    startButton.style.marginTop = "100px";
    startButton.style.marginLeft = "50px";
    startButton.style.fontSize = "25px";
    startButton.style.backgroundColor = "white";
    startButton.style.color = "black";
    startButton.style.borderRadius = "10px";
    startButton.style.border = "none";
    startButton.style.padding = "10px";
    startButton.style.cursor = "pointer";
    startButton.style.outline = "none";
    startButton.onclick = () => {
      this.engine.scene!.isAllowedToStay = false;
      engine.loadScene(blockWorld);
    }

    // options button small on left
    let optionsButton = document.createElement("button");
    optionsButton.style.display = "block";
    optionsButton.innerText = "Main Menu";
    optionsButton.style.marginTop = "10px";
    optionsButton.style.marginLeft = "50px";
    optionsButton.style.fontSize = "25px";
    optionsButton.style.backgroundColor = "white";
    optionsButton.style.color = "black";
    optionsButton.style.borderRadius = "10px";
    optionsButton.style.border = "none";
    optionsButton.style.padding = "10px";
    optionsButton.style.cursor = "pointer";
    optionsButton.style.outline = "none";
    optionsButton.onclick = () => {
      console.log(engine.sceneStack);
      console.log(engine.scene);
      console.log(startGameScene);
      this.engine.scene!.isAllowedToStay = false;
      engine.loadScene(startGameScene);
    }
    this.ui.addElement(startButton, "opaque");
    this.ui.addElement(optionsButton, "opaque");

    this.ui.setLayerHitBehavior("opaque");
  }
}

gameOver.addComponent(DOMUILayer);
gameOver.addComponent(GameOver);
gameOverScene.addGameObject(gameOver);

class PlayerMovement extends Component {
  physics2d!: Physics2D;
  start(): void {
    // this.gameObject.getComponent<BoxRenderer>(BoxRenderer)!.color = "white";
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

    if (this.gameObject.transform.position.y > 600) {
      this.engine.scene!.isAllowedToStay = false;
      engine.loadScene(gameOverScene);
    }
  }

  onCollisionEnter(other: GameObject): void {
    this.gameObject.getComponent(SoundSystem)!.play();
    if (other.tag === 'platform') {
      // other.destroy();
      // this.physics2d.onCollisionExit();
    }
  }
}

const blockWorld = new Scene();

const mainCamera = new GameObject({
  name: "Main Camera",
  engine: engine,
});

let cam = mainCamera.addComponent(Camera);

const player = new GameObject({
  name: "Player",
  engine: engine,
});

const platforms: GameObject[] = [];


for (let i = 50; i <= 450; i += 150) {
  let p = new GameObject({
    name: `GameObject ${i}`,
    engine
  });
  p.tag = 'platform';
  p.transform.position.x = i;
  p.transform.position.y = Math.random() * 500
  p.transform.size = new Vector2(100, 10);
  let b = p.addComponent(BoxRenderer);
  b.color = "white";
  p.addComponent(BoxCollider);
  platforms.push(p);
}

player.transform.size = new Vector2(50, 50);
player.transform.position = new Vector2(100, 100);
player.addComponent(Physics2D);
player.addComponent(BoxRenderer);
player.addComponent(BoxCollider);
player.getComponent(BoxCollider)!.drawBounds = true;
player.addComponent(PlayerMovement);
player.addComponent(SoundSystem).source = "https://www.w3schools.com/html/horse.ogg";
player.getComponent(SoundSystem)!.volume = 0.1;

cam.follow = player;

blockWorld.addGameObject(mainCamera, player, ...platforms);

export { startGameScene };
