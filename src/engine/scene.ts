import GameObject from "../game_object/game_object";

export class Scene {
    gameObjects: GameObject[] = [];

    render() {
        this.gameObjects.forEach(obj => obj.update());
    }

    addGameObject(obj: GameObject) : void;

    addGameObject(...objs: GameObject[]) : void;

    addGameObject(...objs: GameObject[]) : void {
        objs.forEach((obj) => { this.gameObjects.push(obj); obj.start(); });
    }
}