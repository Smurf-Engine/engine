import { autobind } from "../data/autobind";
import { Vector2 } from "../data/vector2";

export class Input {
  private pressedKeyCodes: string[] = [];
  // mouse
  boundingClientRect: DOMRect = new DOMRect(0, 0, 0, 0);
  private mousePosition: Vector2 = Vector2.zero;
  private downMouseButtons: number[] = [];
  constructor(canvas: HTMLCanvasElement) {
    addEventListener("keydown", this.onKeyDown);
    addEventListener("keyup", this.onKeyUp);
    // mouse events
    canvas.addEventListener("mousemove", this.onMouseMove);
    // get bounding client rect for relative mouse position
    this.boundingClientRect = canvas.getBoundingClientRect();
    canvas.addEventListener("mousedown", this.onMouseDown);
    canvas.addEventListener("mouseup", this.onMouseUp);
    // prevent right click context menu
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  @autobind
  private onKeyDown(e: KeyboardEvent) {
    // add key if not present
    if (this.pressedKeyCodes.find((k) => k == e.code) == undefined) {
      this.pressedKeyCodes.push(e.code);
    }
  }

  @autobind
  private onKeyUp(e: KeyboardEvent) {
    // remove key if present
    let index = this.pressedKeyCodes.findIndex((k) => k == e.code);
    if (index == -1) return;
    this.pressedKeyCodes.splice(index, 1);
  }

  isPressed(key: string): boolean {
    return this.pressedKeyCodes.find((k) => k == key) != undefined;
  }

  @autobind
  private onMouseMove(e: MouseEvent) {
    this.mousePosition = new Vector2(e.clientX - this.boundingClientRect.left, e.clientY - this.boundingClientRect.top);
  }

  getMousePosition(): Vector2 {
    return this.mousePosition;
  }

  get mouseX(): number {
    return this.mousePosition.x;
  }

  get mouseY(): number {
    return this.mousePosition.y;
  }

  @autobind
  private onMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.downMouseButtons.push(e.button);
  }

  @autobind
  private onMouseUp(e: MouseEvent) {
    let index = this.downMouseButtons.findIndex((b) => b == e.button);
    if (index == -1) return;
    this.downMouseButtons.splice(index, 1);
  }

  getMouseKeyDown(button: number): boolean {
    return this.downMouseButtons.find((b) => b == button) != undefined;
  }
}
