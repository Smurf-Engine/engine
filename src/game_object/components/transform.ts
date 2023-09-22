import { Vector2 } from "../../data/type";
import Component from "../component";

export class Transform extends Component{
    position : Vector2 = new Vector2(0,0);
    width : number = 0;
    height : number = 0;

    update(): void {}

    move(x:number,y:number){
        this.position.x += x;
        this.position.y += y;
    }

    moveTo(x:number,y:number){
        this.position.x = x;
        this.position.y = y;
    }

    get X(){
        return this.position.x;
    }

    get Y(){
        return this.position.y;
    }
}