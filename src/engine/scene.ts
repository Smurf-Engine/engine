import { Camera } from "../game_object/components/camera";
import GameObject from "../game_object/game_object";

export class Scene {
  public isAllowedToStay = true;
  readonly gameObjects: GameObject[] = [];
  mainCamera!: Camera;

  render() {
    this.gameObjects.forEach(obj => obj.update());

    if (!this.isAllowedToStay) {
      this.gameObjects.forEach(obj => obj.destroy());
    }
  }

  getGameObjectByName(name: string): GameObject | undefined {
    return this.gameObjects.find(obj => obj.name === name);
  }

  getGameObjectsByName(name: string): GameObject[] {
    return this.gameObjects.filter(obj => obj.name === name);
  }

  getAllGameObjects(): GameObject[] {
    return this.gameObjects;
  }

  addGameObject(obj: GameObject): void;

  addGameObject(...objs: GameObject[]): void;

  addGameObject(...objs: GameObject[]): void {
    if (this.gameObjects.length === 0){
      // add a camera if there is no game object in the scene
      const camera = new GameObject({ name: "Camera", engine: objs[0].engine });
      camera.addComponent(Camera);
      this.gameObjects.push(camera);
      this.mainCamera = camera.getComponent<Camera>(Camera)!;
    }
    objs.forEach((obj) => { this.gameObjects.push(obj); obj.start(); });
    // sort game objects by z index
    this.gameObjects.sort((a, b) => a.transform.zIndex - b.transform.zIndex);
  }

  // CAUTION: only to be called by game object
  removeGameObject(obj: GameObject) {
    this.gameObjects.splice(this.gameObjects.indexOf(obj), 1);
  }
}
