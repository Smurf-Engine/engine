import Component from "../component";

export class BoxRenderer extends Component{
    width : number = 100;
    height : number = 100;
    color : string = "black";

    update(): void {
        this.cx.fillStyle = this.color;
        this.cx.fillRect(this.gameObject.transform.X,this.gameObject.transform.Y,this.width,this.height);
    }
}