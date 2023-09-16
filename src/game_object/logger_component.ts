import Component from "./component";

export class LoggerComponent extends Component{
    startXY = 10;
    update(): void {
        this.cx.fillStyle = "red";
        this.cx.fillRect(this.startXY,this.startXY,10,10);
        this.startXY++;
        console.log(`X , Y moved to ${this.startXY} - by ${this.name}`);
    }
}