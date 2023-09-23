import GameObject from "../game_object/game_object";

export class Scene{
    gameObjects : GameObject[] = [];
    constructor(){}

    render(){
        this.gameObjects.forEach(obj => obj.update());
    }

    addGameObject(obj : GameObject){
        this.gameObjects.push(obj);
    }
}