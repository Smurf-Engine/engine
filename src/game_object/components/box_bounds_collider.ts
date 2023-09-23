import Component from "../component";

export class CanvasBoxBoundsCollider extends Component {
    private canvas: HTMLCanvasElement = this.gameObject.engine.canvas;

    update(): void {
        if (this.gameObject.transform.X < 0) {
            this.gameObject.transform.moveTo(0, this.gameObject.transform.Y);
        }
        if (this.gameObject.transform.X + this.gameObject.transform.size.x > this.canvas.width) {
            this.gameObject.transform.moveTo(this.canvas.width - this.gameObject.transform.size.x, this.gameObject.transform.Y);
        }
        if (this.gameObject.transform.Y < 0) {
            this.gameObject.transform.moveTo(this.gameObject.transform.X, 0);
        }
        if (this.gameObject.transform.Y + this.gameObject.transform.size.y > this.canvas.height) {
            this.gameObject.transform.moveTo(this.gameObject.transform.X, this.canvas.height - this.gameObject.transform.size.y);
        }
    }
}