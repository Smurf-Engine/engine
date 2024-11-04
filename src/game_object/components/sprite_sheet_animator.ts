import Component from "../component";
import { SpriteRenderer } from "./sprite_renderer";

export default class SpriteSheetAnimator extends Component {
    sprites = new Array<string>();
    private spriteRenderer!: SpriteRenderer;
    // animate all sprites in the sprites array at the given fps
    framesPerSecond = 15;
    pauseDurationInSeconds = 1;
    private pauseDurationAfterAnimation = 0;
    private currentSpriteIndex = 0;
    // how many frames have passed since the last sprite change
    private framesSinceLastSpriteChange = 0;
    isPlaying = true;
    loop = true;


    start(): void {
        this.spriteRenderer = this.gameObject.getComponent<SpriteRenderer>(SpriteRenderer)!;
        this.pauseDurationAfterAnimation = this.pauseDurationInSeconds * 100;
    }

    update(): void {
        if (!this.isPlaying) return;
        this.framesSinceLastSpriteChange++;
        if (this.framesSinceLastSpriteChange >= this.framesPerSecond) {
            this.framesSinceLastSpriteChange = 0;
            this.currentSpriteIndex++;
            if (this.currentSpriteIndex >= this.sprites.length) {
                if (!this.loop) {
                    this.isPlaying = false;
                    return;
                }
                this.currentSpriteIndex = 0;
                this.framesSinceLastSpriteChange = -this.pauseDurationAfterAnimation;
            }
            this.spriteRenderer.sprite!.src = this.sprites[this.currentSpriteIndex];
        }
    }

    play() {
        this.isPlaying = true;
    }
}