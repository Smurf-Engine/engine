// @ts-ignore
import PreJS from 'prejs';

export class AssetPipeline {
    private readonly resources : string[] = [];
    loader = new PreJS();
    progress = 0;

    addToLoad(...path: string[]) {
        path.forEach(p => this.resources.push(p));
    }

    startLoad() {
        this.loader.load(this.resources);
        this.loader.on('progress', (p: number) => {
            this.progress = p;
        });
    }
}