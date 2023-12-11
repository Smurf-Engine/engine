interface vec2 {
    x: number;
    y: number;
}

/**
 * Represents a 2D vector with x and y components.
 */
export class Vector2 implements vec2 {
    x: number;
    y: number;

    /**
     * Creates a new Vector2 instance.
     * @param X - The x component of the vector.
     * @param Y - The y component of the vector.
     */
    constructor(X: number, Y: number) {
        this.x = X;
        this.y = Y;
    }

    /**
     * Linearly interpolates between this vector and another vector by a specified amount.
     * @param vec - The vector to interpolate towards.
     * @param amount - The amount to interpolate by.
     */
    lerp(vec: vec2, amount: number) {
        this.x += (vec.x - this.x) * amount;
        this.y += (vec.y - this.y) * amount;
    }

    /**
     * Returns the zero vector.
     */
    static get zero() { return new Vector2(0, 0); }

    get array(): [number, number] { return [this.x, this.y]; }

    add(other: vec2): void {
        this.x += other.x;
        this.y += other.y;
    }

    subtract(other: vec2): void {
        this.x -= other.x;
        this.y -= other.y;
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}