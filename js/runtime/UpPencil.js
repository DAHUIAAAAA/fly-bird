import Pencil from "./Pencil.js";
import Sprite from "../base/Sprite.js";

export default class UpPencil extends Pencil {
    constructor(top) {
        const img = Sprite.getImage('pencliUp');
        super(img, top);
    }

    draw() {
        this.y = - this.top;
        super.draw();
    }
}