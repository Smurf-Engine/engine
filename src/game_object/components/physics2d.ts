import { Vector2 } from "../../data/type";
import Component from "../component";

export class Physics2D extends Component{
    public velocity = new Vector2(0,0);
    public gravity = .15;
    public friction = .9;

    update(): void {
        this.velocity.y += this.gravity;
        this.gameObject.transform.move(this.velocity.x,this.velocity.y);
        this.velocity.x *= this.friction;
    }
}