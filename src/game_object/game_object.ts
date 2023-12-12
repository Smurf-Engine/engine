import { Type, SmurfEngine } from "../engine/smurf_engine";
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
  private _isFirstUpdate = true;
  private _isActive = true;
  public isStatic = false;
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
    if (!this._isActive) return;
    if (this._isFirstUpdate) {
      this._isFirstUpdate = false;
      this.components.forEach(comp => comp.onFirstUpdate());
    }
    // update all components, called by scene
    this.components.forEach(comp => comp.update());
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public set isActive(value: boolean) {
    this._isActive = value;
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
    // destroy component
    this.getComponent(component)?.onDestory();
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
