import { Vector2 } from "../../data/vector2";
import Component from "../component";

export class Physics2D extends Component{
    public velocity = new Vector2(0,0);
    public gravity = .15;
    public friction = .9;
    public useGravity = true;
    public useFriction = true;

    update(): void {
        if(this.useGravity){
            this.addGravity();
        }
        this.gameObject.transform.move(this.velocity.x,this.velocity.y);
        if(this.useFriction){
            this.addFriction();
        }
    }

    private addGravity(){
        this.velocity.y += this.gravity;
    }

    private addFriction(){
        this.velocity.x *= this.friction;
    }
}