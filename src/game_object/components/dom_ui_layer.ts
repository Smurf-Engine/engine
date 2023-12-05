import Component from "../component";

export default class DOMUILayer extends Component {
    public readonly layerId: string = this.engine.uid.create();
    readonly layer = document.createElement("div");

    start(): void {
        this.layer.id = this.layerId;
        this.layer.style.width = "100%";
        this.layer.style.height = "100%";
        this.layer.style.pointerEvents = "auto";
        this.engine.UIContainer.appendChild(this.layer);
    }

    addElement<T extends HTMLElement>(element: T, hitBehavior: "transparent" | "opaque" = "transparent") : T{
        if (hitBehavior === "transparent") {
            element.style.pointerEvents = "none";
        } else if (hitBehavior === "opaque") {
            element.style.pointerEvents = "auto";
        }
        this.layer.appendChild(element);
        return element;
    }

    setLayerHitBehavior(hitBehavior: "transparent" | "opaque") {
        if (hitBehavior === "transparent") {
            this.layer.style.pointerEvents = "none";
        } else if (hitBehavior === "opaque") {
            this.layer.style.pointerEvents = "auto";
        }
    }

    onDestory(): void {
        this.layer.remove();
    }
}