import Sprite from "../base/Sprite.js";
import Director from "../Director.js";

export default class Pencil extends Sprite {

    constructor(img, top) {
        
        super(
            img,
            0, 0,
            img.width, img.height,
            Director.getInstance().canvasWidth, 0,
            img.width, img.height
        );

        this.top = top;
        this.director = Director.getInstance();
    }

    draw() {

        this.x = this.x - this.director.moveSpeed;

        super.draw(
            this.img,
            this.srcX, this.srcY,
            this.srcW, this.srcH,
            this.x, this.y,
            this.width, this.height
        )
    }    
}