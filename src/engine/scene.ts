import GameObject from "../game_object/game_object";

export class Scene {
  public isAllowedToStay = true;
  readonly gameObjects: GameObject[] = [];

  render() {
    this.gameObjects.forEach(obj => obj.update());

    if (!this.isAllowedToStay) {
      console.log("destroying scene");
      this.gameObjects.forEach(obj => obj.destroy());
    }
  }

  addGameObject(obj: GameObject): void;

  addGameObject(...objs: GameObject[]): void;

  addGameObject(...objs: GameObject[]): void {
    objs.forEach((obj) => { this.gameObjects.push(obj); obj.start(); });
    // sort game objects by z index
    this.gameObjects.sort((a, b) => a.transform.zIndex - b.transform.zIndex);
  }

  // CAUTION: only to be called by game object
  removeGameObject(obj: GameObject) {
    this.gameObjects.splice(this.gameObjects.indexOf(obj), 1);
  }
}
