import Sprite from "../base/Sprite.js";

export default class Background extends Sprite {
    constructor() {
        
        const img = Sprite.getImage('background');

        super(
            img,
            0, 0,
            img.width, img.height,
            0, 0,
            window.innerWidth, window.innerHeight
        );
    }
}