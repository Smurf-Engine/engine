interface vec2{
    x : number;
    y : number;
}

export class Vector2 implements vec2{
    x: number;
    y: number;

    constructor(X:number,Y:number){
        this.x = X;
        this.y = Y;
    }
}