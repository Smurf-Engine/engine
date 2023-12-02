import { Vector2 } from "../../data/vector2";
import { Settings } from "../../engine/settings";
import Component from "../component";
import GameObject from "../game_object";

export class Physics2D extends Component {
  public velocity = new Vector2(0, 0);
  public gravity = Settings.get("gravity");
  public useGravity = true;

  update(): void {
    if (this.useGravity) {
      this.addGravity();
    }
    this.gameObject.transform.move(this.velocity.x, this.velocity.y);
  }

  private addGravity() {
    this.velocity.y += this.gravity;
  }

  onCollisionEnter(other: GameObject): void {
    this.transform.position.y = other.transform.position.y - this.transform.size.y;
    this.velocity.y = 0;
    this.useGravity = false;
  }

  onCollisionExit(): void {
    this.useGravity = true;
  }
}
