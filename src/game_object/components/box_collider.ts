import { Vector2 } from "../../main";
import Component from "../component";

export class BoxCollider extends Component {
  position!: Vector2;
  size!: Vector2;
  isTrigger: boolean = false;

  start(): void {
    this.position = this.gameObject.transform.position;
    this.size = this.gameObject.transform.size;
  }
}
