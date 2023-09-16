import GameObject from "../game_object/game_object";

export class Scene{
    constructor(public gameObjects : GameObject[]){}

    render(){
        this.gameObjects.forEach(obj => obj.update());
    }
}