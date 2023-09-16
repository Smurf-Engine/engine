import Component from "./component";

export interface GameObjectData{
    canvas : HTMLCanvasElement;
    name : string;
    components? : Component[];
}

export default class GameObject{
    private canvas : HTMLCanvasElement;
    private cx : CanvasRenderingContext2D;
    public name : string;
    public readonly components : Component[];
    constructor(objData : GameObjectData){
        this.canvas = objData.canvas;
        this.cx = objData.canvas.getContext("2d")!;
        this.name = objData.name;
        this.components = objData.components ?? [];
    }

    update(){
        this.components.forEach(comp => comp.update());
    }

    addComponent(component : Component){
        this.components.push(component);
    }
}