import Director from "../Director.js";
import DataStore from "../base/DataStore.js";

export default class Score {

    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.score = 0;
        this.isScore = true;
    }

    draw() {
        
        const director = Director.getInstance();

        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffcbeb';
        this.ctx.fillText(
            this.score,
            director.canvasWidth / 2,
            director.canvasHeight / 18,
            1000
        )
    }
}