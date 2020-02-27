import Pencil from "./Pencil.js";
import Sprite from "../base/Sprite.js";
import Director from "../Director.js";


export default class DownPencil extends Pencil {
    constructor(top) {
        const img = Sprite.getImage('pencliDown');
        super(img, top);
    }

    draw() {
        const gap = Director.getInstance().canvasHeight / 5;
        this.y = this.height - this.top + gap;
        super.draw();
    }
}