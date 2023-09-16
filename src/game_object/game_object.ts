interface GameObjectData{
    canvas : HTMLCanvasElement;
    name : string;
}

export abstract class GameObject{
    private canvas : HTMLCanvasElement;
    private cx : CanvasRenderingContext2D;
    public name : string;
    constructor(objData : GameObjectData){
        this.canvas = objData.canvas;
        this.cx = objData.canvas.getContext("2d")!;
        this.name = objData.name;
    }
}