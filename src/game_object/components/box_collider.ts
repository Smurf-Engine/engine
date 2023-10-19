import { Vector2 } from "../../main";
import Component from "../component";

export class BoxCollider extends Component {
  position!: Vector2;
  size!: Vector2;
  isTrigger: boolean = false;
  public drawBounds: boolean = false;

  start(): void {
    this.position = this.gameObject.transform.position;
    this.size = this.gameObject.transform.size;
  }

  update(): void {
    if (this.drawBounds) {
      this.cx.beginPath();
      this.cx.strokeStyle = "red";
      this.cx.lineWidth = 2;
      this.cx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
      this.cx.stroke();
    }
    this.collisionLoop();
  }

  checkCollisionWith(other: BoxCollider): boolean {
    if (this.position.x < other.position.x + other.size.x &&
      this.position.x + this.size.x > other.position.x &&
      this.position.y < other.position.y + other.size.y &&
      this.position.y + this.size.y > other.position.y) {
      return true;
    }
    return false;
  }

  collisionLoop() {
    this.engine.scene!.gameObjects.forEach(obj => {
      if (obj.hasComponent(BoxCollider) && obj !== this.gameObject) {
        let other = obj.getComponent(BoxCollider)!;
        if (this.checkCollisionWith(other)) {
          console.log("Colliding");
        }
      }
    });
  }
}
