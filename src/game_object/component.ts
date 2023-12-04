import GameObject from "./game_object";

export interface ComponentData {
  gameObject: GameObject;
  cx: CanvasRenderingContext2D;
}

export default abstract class Component {
  public readonly gameObject: GameObject;
  public cx: CanvasRenderingContext2D;
  constructor(componentData: ComponentData) {
    this.gameObject = componentData.gameObject;
    this.cx = componentData.cx;
  }

  protected get transform() {
    return this.gameObject.transform;
  }

  protected get engine() {
    return this.gameObject.engine;
  }

  protected get input() {
    return this.engine.input;
  }

  onFirstUpdate() { }

  start() { }

  update() { }

  // @ts-ignore
  onCollisionEnter(other: GameObject) { }

  // @ts-ignore
  onCollisionExit(other?: GameObject) { }

  onDestory() { }
}
