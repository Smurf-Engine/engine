import GameObject from "./game_object";

export interface ComponentData{
    name : string;
    gameObject : GameObject;
    cx : CanvasRenderingContext2D;
}

export default abstract class Component{
    public name : string;
    public gameObject : GameObject;
    public cx : CanvasRenderingContext2D;
    constructor(componentData : ComponentData){
        this.name = componentData.name;
        this.gameObject = componentData.gameObject;
        this.cx = componentData.cx;
    }

    abstract update() : void;
}