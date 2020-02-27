import Sprite from "../base/Sprite.js";
import Director from "../Director.js";

export default class Land extends Sprite {

    constructor() {
        const img = Sprite.getImage('land');

        super(
            img,
            0, 0,
            img.width, img.height,
            0, Director.getInstance().canvasHeight - img.height,
            img.width, img.height
        )

        this.landX = 0;
        this.landSpeed = 2;
    }

    draw() {

        const director = Director.getInstance();

        this.landX = this.landX + director.moveSpeed;

        if (this.landX > (this.img.width - director.canvasWidth)) this.landX = 0;

        super.draw(
            this.img,
            this.srcX, this.srcY,
            this.srcW, this.srcH,
            - this.landX, this.y,
            this.width, this.height
        )
    }
}