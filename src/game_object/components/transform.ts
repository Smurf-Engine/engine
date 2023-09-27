import { Vector2 } from "../../data/vector2";
import Component from "../component";

export class Transform extends Component{
    position : Vector2 = new Vector2(0,0);
    size : Vector2 = new Vector2(0,0);
    zIndex : number = 0;

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