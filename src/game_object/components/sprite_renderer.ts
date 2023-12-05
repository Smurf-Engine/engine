import { Vector2 } from "../../data/vector2";
import Component from "../component";

export class SpriteRenderer extends Component {
    sprite?: HTMLImageElement;
    useNaturalSize: boolean = false;
    scale: Vector2 = new Vector2(1, 1);

    constructSpriteFromSource(source: string) {
        this.sprite = new Image();
        this.sprite.src = source;
    }

    update(): void {
        if (!this.sprite) return;
        if (this.useNaturalSize) {
            this.cx.drawImage(this.sprite, this.transform.position.x, this.transform.position.y, this.sprite.naturalWidth * this.scale.x, this.sprite.naturalHeight * this.scale.y);
        } else {
            this.cx.drawImage(this.sprite, this.transform.position.x, this.transform.position.y, this.transform.size.x, this.transform.size.y);
        }
    }
}