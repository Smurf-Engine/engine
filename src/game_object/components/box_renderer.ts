import Component from "../component";

export class BoxRenderer extends Component{
    color : string = "black";

    update(): void {
        this.cx.fillStyle = this.color;
        this.cx.fillRect(this.gameObject.transform.X,this.gameObject.transform.Y,this.gameObject.transform.width,this.gameObject.transform.height);
    }
}