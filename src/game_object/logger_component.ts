import Component from "./component";

export class LoggerComponent extends Component{
    update(): void {
        console.log(`Hello from ${this.name}`);
    }
}