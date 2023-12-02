import Component from "../component";

export class BoxRenderer extends Component {
  color: string = "black";
  enableShadow: boolean = true;

  update(): void {
    this.cx.fillStyle = this.color;
    this.cx.fillRect(this.gameObject.transform.X, this.gameObject.transform.Y, this.gameObject.transform.size.x, this.gameObject.transform.size.y);

    if (this.enableShadow) {
      this.cx.shadowColor = this.color;
      this.cx.shadowBlur = 100;
    }
  }
}
