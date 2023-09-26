import { autobind } from "../data/autobind";

export class Input{
    pressedKeyCodes: string[] = [];
    constructor() {
        addEventListener("keydown", this.onKeyDown);
        addEventListener("keyup", this.onKeyUp);
    }

    @autobind
    private onKeyDown(e: KeyboardEvent) {
        // add key if not present
        if (this.pressedKeyCodes.find((k) => k == e.code) == undefined) {
            this.pressedKeyCodes.push(e.code);
        }
    }

    @autobind
    private onKeyUp(e: KeyboardEvent) {
        // remove key if present
        let index = this.pressedKeyCodes.findIndex((k) => k == e.code);
        if (index == -1) return;
        this.pressedKeyCodes.splice(index, 1);
    }

    isPressed(key: string): boolean {
        return this.pressedKeyCodes.find((k) => k == key) != undefined;
    }    
}