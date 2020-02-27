import Sprite from "../base/Sprite.js";
import Director from "../Director.js";

export default class Birds extends Sprite {
    constructor() {
        const img = Sprite.getImage('birds');
        super(
            img,
            0, 0,
            img.width, img.height,
            0, 0,
            img.width, img.height
        );

        this.director = Director.getInstance();
        this.clipX = [
            9,
            61,     // 9+34+18
            113    // 9+34+18+34+18
        ];
        this.clipY = 10;
        this.clipWidth = 34;
        this.clipHeight = 24;
        this.x = this.director.canvasWidth / 4;
        this.y = this.director.canvasHeight / 2;
        this.lastY = this.director.canvasHeight / 2;
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw() {

        this.count++;

        if (this.index === 3) this.index = 0;

        // 重力加速度
        const g = 0.98 / 2.4;
        // 向上的偏移量
        const offsetUp = window.wx ? 15 : 20;
        this.y = this.lastY + g * this.time * (this.time - offsetUp);
        this.time++;

        super.draw(
            this.img,
            this.clipX[this.index], this.clipY,
            this.clipWidth, this.clipHeight,
            this.x, this.y,
            this.clipWidth, this.clipHeight
        );

        // 小鸟煽动翅膀的速度
        const speed = 5;

        if (this.count === speed) {
            this.count = 0;
            this.index++;
        }
    }

}