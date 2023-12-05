import Component from "../game_object/component";

class MadeWithSmurfScreen extends Component{
    alpha : number = 0;
    fadeStarted : boolean = false;
    start(): void {
        this.transform.position.x = 0;
        this.transform.position.y = 0;
        this.transform.size.x = this.cx.canvas.width;
        this.transform.size.y = this.cx.canvas.height;

        // set UI layer to transparent
        this.engine.UIContainer.style.pointerEvents = "none";
    }

    update(): void {
        this.cx.fillStyle = "black";
        this.cx.fillRect(0, 0, this.cx.canvas.width, this.cx.canvas.height);
        this.cx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        this.cx.font = "30px Segoe UI";
        this.cx.fillText("Made with Smurf Engine", this.cx.canvas.width / 2 - 150, this.cx.canvas.height / 2);

        // click anywhere to start
        this.cx.fillStyle = `rgba(255, 255, 255, ${this.alpha / 2})`;
        this.cx.font = "15px Monospace";
        this.cx.fillText("Click anywhere to start", this.cx.canvas.width / 2 - 75, this.cx.canvas.height - 50);

        if (!this.fadeStarted){
            if (this.input.getMouseKeyDown(0)) {
                this.fadeStarted = true;
            }
            this.alpha += 0.01;
            if (this.alpha >= 1){
                this.alpha = 1;
            }
        }else{
            this.alpha -= 0.01;
            if (this.alpha <= 0){
                this.engine.scene!.isAllowedToStay = false;
            }
        }
    }

    onDestory(): void {
        // set UI layer to visible
        this.engine.UIContainer.style.pointerEvents = "none";
    }
}

export default MadeWithSmurfScreen;