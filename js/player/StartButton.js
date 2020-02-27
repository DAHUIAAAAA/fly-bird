import Sprite from "../base/Sprite.js";
import Director from "../Director.js";

export default class SatrtButton extends Sprite {
    constructor() {
        const img = Sprite.getImage('startButton');
        const director = Director.getInstance();
        super(
            img,
            0, 0,
            img.width, img.height,
            (director.canvasWidth - img.width) / 2,
            (director.canvasHeight - img.height) / 2,
            img.width, img.height
        );
    }
    draw() {
        super.draw();
    }
}