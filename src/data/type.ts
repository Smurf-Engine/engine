interface vec2{
    x : number;
    y : number;
}

export class Vector2 implements vec2{
    x: number;
    y: number;

    constructor(vec : vec2){
        this.x = vec.x;
        this.y = vec.y;
    }
}