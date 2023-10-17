import Component from "../component";
import { Physics2D } from "./physics2d";

export class CanvasBoxBoundsCollider extends Component {
  private canvas: HTMLCanvasElement = this.gameObject.engine.canvas;
  physics2d?: Physics2D;

  start(): void {
    this.physics2d = this.gameObject.getComponent<Physics2D>(Physics2D);
  }

  update(): void {
    if (this.gameObject.transform.X <= 0) {
      this.gameObject.transform.moveTo(0, this.gameObject.transform.Y);
    }
    if (this.gameObject.transform.X + this.gameObject.transform.size.x >= this.canvas.width) {
      this.gameObject.transform.moveTo(this.canvas.width - this.gameObject.transform.size.x, this.gameObject.transform.Y);
    }
    if (this.gameObject.transform.Y <= 0) {
      this.gameObject.transform.moveTo(this.gameObject.transform.X, 0);
    }
    if (this.gameObject.transform.Y + this.gameObject.transform.size.y >= this.canvas.height) {
      if (this.physics2d) {
        this.physics2d.velocity.y = 0;
      }
      this.gameObject.transform.moveTo(this.gameObject.transform.X, this.canvas.height - this.gameObject.transform.size.y);
    }
  }
}
