import Component from "../component";

export class SpriteRenderer extends Component{
    sprite? : HTMLImageElement;

    constructSpriteFromSource(source : string){
        this.sprite = new Image();
        this.sprite.src = source;
    }

    update(): void {
        if(!this.sprite) return;
        this.cx.drawImage(this.sprite,this.transform.position.x,this.transform.position.y, this.transform.size.x, this.transform.size.y);
    }
}