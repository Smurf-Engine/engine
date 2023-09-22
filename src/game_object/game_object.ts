import Component from "./component";
import { Transform } from "./components/transform";

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
    public readonly transform;
    constructor(objData : GameObjectData){
        this.canvas = objData.canvas;
        this.cx = objData.canvas.getContext("2d")!;
        this.name = objData.name;
        this.components = objData.components ?? [];
        this.transform = new Transform({
            name: "Transform",
            gameObject: this,
            cx: this.cx
        });
        this.components.push(this.transform);
    }

    update(){
        this.components.forEach(comp => comp.update());
    }

    addComponent(component : Component){
        this.components.push(component);
    }
}