import { SmurfEngine } from "../engine/smurf_engine";
import Component from "./component";
import { Transform } from "./components/transform";

export interface GameObjectData {
    engine: SmurfEngine;
    name: string;
    components?: Component[];
}

export default class GameObject {
    public readonly engine: SmurfEngine;
    public cx: CanvasRenderingContext2D;
    public name: string;
    private readonly components: Component[];
    public readonly transform : Transform;
    constructor(objData: GameObjectData) {
        this.engine = objData.engine;
        this.cx = this.engine.canvas.getContext("2d")!;
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

    getComponent<T extends Component>(component: typeof Component) : T | undefined{
        // @ts-ignore
        return this.components.find(comp => comp instanceof component);
    }
}