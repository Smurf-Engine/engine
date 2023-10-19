import { Type, SmurfEngine } from "../engine/smurf_engine";
import { Vector2 } from "../main";
import Component from "./component";
import { Transform } from "./components/transform";

export interface GameObjectData {
  engine: SmurfEngine;
  name: string;
  components?: Component[];
}

export default class GameObject {
  public readonly engine: SmurfEngine;
  public cx: CanvasRenderingContext2D;
  public name: string;
  public tag: string = '';
  private readonly components: Component[];
  public readonly transform: Transform;
  constructor(objData: GameObjectData) {
    this.engine = objData.engine;
    this.cx = this.engine.canvas.getContext("2d")!;
    this.name = objData.name;
    this.components = objData.components ?? [];
    this.transform = this.addComponent<Transform>(Transform);
  }

  start() {
    // start all components, called by scene
    this.components.forEach(comp => comp.start());
  }

  update() {
    this.components.forEach(comp => comp.update());
  }

  get center(): Vector2 {
    // calculate center of game object
    return new Vector2(this.transform.position.x + this.transform.size.x / 2, this.transform.position.y + this.transform.size.y / 2);
  }

  addComponent<T extends Component>(component: Type<T>): T {
    // @ts-ignore
    var comp = new component({
      gameObject: this,
      cx: this.cx
    });
    this.components.push(comp);
    return comp;
  }

  removeComponent<T extends Component>(component: Type<T>): void {
    // @ts-ignore
    this.components = this.components.filter(comp => !(comp instanceof component));
  }

  getComponent<T extends Component>(component: Type<T>): T | undefined {
    // @ts-ignore
    return this.components.find(comp => comp instanceof component);
  }

  hasComponent<T extends Component>(component: Type<T>): boolean {
    // @ts-ignore
    return this.components.some(comp => comp instanceof component);
  }

  getAllComponents(): Component[] {
    return this.components;
  }

  destroy() {
    this.components.forEach(comp => comp.onDestory());
    this.engine.scene?.removeGameObject(this);
  }
}
