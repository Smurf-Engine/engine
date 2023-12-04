import Component from "../component";
import GameObject from "../game_object";

export class Camera extends Component {
  public backgroundColor = "black";
  public zoom = 1;
  public follow?: GameObject;
  public viewport = {
    x: 0,
    y: 0,
    width: this.engine.canvas.width,
    height: this.engine.canvas.height
  };

  update() {
    this.clearCanvas();
    // if (this.follow) {
    //   this.viewport.x = this.follow.transform.position.x - this.viewport.width / 2;
    //   this.viewport.y = this.follow.transform.position.y - this.viewport.height / 2;
    // }
    // this.cx.scale(this.zoom, this.zoom);
    // this.cx.translate(-this.viewport.x, -this.viewport.y);
  }


  clearCanvas() {
    // get all current game objects
    let xArray = this.engine.scene!.gameObjects.map(obj => obj.transform.position.x);
    let yArray = this.engine.scene!.gameObjects.map(obj => obj.transform.position.y);
    let widthArray = this.engine.scene!.gameObjects.map(obj => obj.transform.size.x);
    let heightArray = this.engine.scene!.gameObjects.map(obj => obj.transform.size.y);
    let xMin = Math.min(...xArray);
    let yMin = Math.min(...yArray);
    let xMax = Math.max(...xArray);
    let yMax = Math.max(...yArray);

    if (xMin < 0) {
      xMin = 0;
    }
    if (yMin < 0) {
      yMin = 0;
    }
    if (xMax < this.engine.canvas.width) {
      xMax = this.engine.canvas.width;
    }
    if (yMax < this.engine.canvas.height) {
      yMax = this.engine.canvas.height;
    }
    let widthMax = Math.max(...widthArray);
    let heightMax = Math.max(...heightArray);
    // clear canvas from min x and y to max x and y
    this.cx.fillStyle = this.backgroundColor;
    this.cx.fillRect(xMin, yMin, xMax + widthMax, yMax + heightMax);
  }

  onDestory(): void {
    // clear the last frame of the camera before it is destroyed
    this.clearCanvas();
  }
}
