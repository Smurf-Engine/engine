import Component from "./component";
import { Transform } from "./components/transform";

export interface GameObjectData {
    canvas: HTMLCanvasElement;
    name: string;
    components?: Component[];
}

export default class GameObject {
    private canvas: HTMLCanvasElement;
    private cx: CanvasRenderingContext2D;
    public name: string;
    public readonly components: Component[];
    public readonly transform : Transform;
    constructor(objData: GameObjectData) {
        this.canvas = objData.canvas;
        this.cx = this.canvas.getContext("2d")!;
        this.name = objData.name;
        this.components = objData.components ?? [];
        this.transform = this.addComponent<Transform>(Transform);
    }

    update() {
        this.components.forEach(comp => comp.update());
    }

    addComponent<T extends Component>(component: typeof Component) : T{
        // @ts-ignore
        var comp = new component({
            gameObject: this,
            cx: this.cx
        });
        this.components.push(comp);
        return comp;
    }
}