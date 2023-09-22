import Component from "../component";

export class CanvasBoxBoundsCollider extends Component {
    private canvas: HTMLCanvasElement = this.gameObject.canvas;

    update(): void {
        if (this.gameObject.transform.X < 0) {
            this.gameObject.transform.moveTo(0, this.gameObject.transform.Y);
        }
        if (this.gameObject.transform.X + this.gameObject.transform.width > this.canvas.width) {
            this.gameObject.transform.moveTo(this.canvas.width - this.gameObject.transform.width, this.gameObject.transform.Y);
        }
        if (this.gameObject.transform.Y < 0) {
            this.gameObject.transform.moveTo(this.gameObject.transform.X, 0);
        }
        if (this.gameObject.transform.Y + this.gameObject.transform.height > this.canvas.height) {
            this.gameObject.transform.moveTo(this.gameObject.transform.X, this.canvas.height - this.gameObject.transform.height);
        }
    }
}