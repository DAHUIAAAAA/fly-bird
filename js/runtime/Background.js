import Sprite from "../base/Sprite.js";
import Director from "../Director.js";

export default class Background extends Sprite {
    constructor() {
        
        const img = Sprite.getImage('background');
        const director = Director.getInstance();

        super(
            img,
            0, 0,
            img.width, img.height,
            0, 0,
            director.canvasWidth, director.canvasHeight
        );
    }
}