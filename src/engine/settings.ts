export class Settings {
    static #props: any = {};

    static get = (prop: string) => this.#props[prop];

    static add(prop: string, value: any) {
        if (!Object.getOwnPropertyDescriptors(this)[prop]) {
            Object.defineProperty(this, prop, {
                configurable: true,
                enumerable: true,
                get: () => this.#props[prop],
                set: (val) => this.#props[prop] = val,
            });
        }
        this.#props[prop] = value;
    }

    static remove(prop: string) { delete this.#props[prop]; }
}