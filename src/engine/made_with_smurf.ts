import Component from "../game_object/component";
import DOMUILayer from "../game_object/components/dom_ui_layer";

class MadeWithSmurfScreen extends Component {
    alpha: number = 0;
    fadeStarted: boolean = false;
    assetsLoaded: boolean = false;
    uiLayer!: DOMUILayer;
    progressElement = document.createElement("progress");
    start(): void {
        this.transform.position.x = 0;
        this.transform.position.y = 0;
        this.transform.size.x = this.cx.canvas.width;
        this.transform.size.y = this.cx.canvas.height;

        // set UI layer to transparent
        this.engine.UIContainer.style.pointerEvents = "none";

        this.uiLayer = this.gameObject.getComponent<DOMUILayer>(DOMUILayer)!;
        this.progressElement.style.position = "absolute";
        this.progressElement.style.left = "50%";
        this.progressElement.style.bottom = "5%";
        this.progressElement.style.transform = "translateX(-50%)";
        this.progressElement.style.width = "50%";
        this.progressElement.style.height = "5px";
        // style colors and border
        this.progressElement.style.backgroundColor = "black";
        this.progressElement.style.border = "none";
        this.progressElement.style.borderRadius = "50px";
        this.progressElement.style.overflow = "hidden";
        // style progress bar
        this.progressElement.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.25) inset";
        this.uiLayer.addElement(this.progressElement);
        this.uiLayer.setLayerHitBehavior("transparent");
    }

    onFirstUpdate(): void {
        setTimeout(() => {
            this.engine.assetPipeline.startLoad();
        }, 1000);
    }

    update(): void {
        this.cx.fillStyle = "black";
        this.cx.fillRect(0, 0, this.cx.canvas.width, this.cx.canvas.height);
        this.cx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        this.cx.font = "30px Segoe UI";
        this.cx.fillText("Made with Smurf Engine", this.cx.canvas.width / 2 - 150, this.cx.canvas.height / 2);

        if (this.assetsLoaded) {
            // click anywhere to start
            this.cx.fillStyle = `rgba(255, 255, 255, ${this.alpha / 2})`;
            this.cx.font = "15px Monospace";
            this.cx.fillText("Click anywhere to start", this.cx.canvas.width / 2 - 75, this.cx.canvas.height - 50);

            if (!this.fadeStarted) {
                if (this.input.getMouseKeyDown(0)) {
                    this.fadeStarted = true;
                }
                this.alpha += 0.01;
                if (this.alpha >= 1) {
                    this.alpha = 1;
                }
            } else {
                this.alpha -= 0.01;
                if (this.alpha <= 0) {
                    // TODO: bug this particular scene's game objects are not being destroyed (i.e) on destory is not being called
                    this.gameObject.destroy();
                    this.engine.scene!.isAllowedToStay = false;
                }
            }
        }else{
            this.progressElement.value = this.engine.assetPipeline.progress;
            if (this.engine.assetPipeline.progress >= 1) {
                this.assetsLoaded = true;
                this.progressElement.style.display = "none";
            }
        }
    }

    onDestory(): void {
        // set UI layer to visible
        this.engine.UIContainer.style.pointerEvents = "none";
    }
}

export default MadeWithSmurfScreen;