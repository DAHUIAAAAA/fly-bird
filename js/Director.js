import DataStore from './base/DataStore.js';
import UpPencil from './runtime/UpPencil.js';
import DownPencil from './runtime/DownPencil.js';

export default class Director {

    constructor(canvasWidth, canvasHeight) {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    static getInstance(canvasWidth, canvasHeight) {
        if (!Director.instance) {
            Director.instance = new Director(canvasWidth, canvasHeight);
        }
        return Director.instance;
    }

    createPencil() {
        const minTop = this.canvasHeight / 5,
            maxTop = this.canvasHeight / 3,
            randomTop = minTop + Math.random() * (maxTop - minTop);

        this.dataStore
            .get('pencils')
            .push(new UpPencil(randomTop));

        this.dataStore
            .get('pencils')
            .push(new DownPencil(randomTop));
    }

    initEvent() {
        const birdsInstance = this.dataStore.get('birds');
        birdsInstance.lastY = birdsInstance.y;
        birdsInstance.time = 0;
    }

    checkBoom() {
        const birds = this.dataStore.get('birds'),
            land = this.dataStore.get('land');

        // 检测是否碰到地面
        if (Math.floor(birds.y + birds.clipHeight) >= land.y) {
            this.isGameOver = true;
            this.drawToCanvas();
            return;
        }

        // 检测是否碰撞到铅笔
        const birdBorder = {    //建立小鸟的边框模型
            left: birds.x,
            right: birds.x + birds.clipWidth,
            top: birds.y,
            bottom: birds.y + birds.clipHeight
        }

        const pencils = this.dataStore.get('pencils');

        for (let i = 0; i < pencils.length; i++) {

            const pencil = pencils[i];
            const pencilBorder = {
                left: pencil.x,
                right: pencil.x + pencil.width,
                top: pencil.y,
                bottom: pencil.y + pencil.height
            }

            if (i % 2 === 0) {
                if (birdBorder['right'] >= pencilBorder['left'] + 20 &&
                    birdBorder['left'] <= pencilBorder['right'] - 20 &&
                    birdBorder['top'] <= pencilBorder['bottom']) {
                    this.isGameOver = true;
                    this.drawToCanvas();
                }
            } else {
                if (birdBorder['right'] >= pencilBorder['left'] + 20 &&
                    birdBorder['left'] <= pencilBorder['right'] - 20 &&
                    birdBorder['bottom'] >= pencilBorder['top']) {
                    this.isGameOver = true;
                    this.drawToCanvas();
                }
            }

        }

    }

    addScore() {

        const score = this.dataStore.get('score'),
            birds = this.dataStore.get('birds'),
            pencil = this.dataStore.get('pencils')[0];

        score.draw();

        if ((birds.x + birds.clipWidth >= pencil.x + pencil.width) &&
            score.isScore) {
            score.isScore = false;
            score.score++;
        }

    }

    drawToCanvas() {
        // 绘制背景图、铅笔、地面
        this.dataStore.get('background').draw();

        const pencils = this.dataStore.get('pencils');
        // 等铅笔消失在屏幕时删除铅笔
        if (pencils[0].x < - pencils[0].width &&
            pencils.length === 4) {
            pencils.shift();
            pencils.shift();
            this.dataStore.get('score').isScore = true;
        }

        if (pencils[0].x <= (this.canvasWidth - pencils[0].width) / 2
            && pencils.length === 2) {
            this.createPencil();
        }
        pencils.forEach(pencil => {
            pencil.draw();
        });

        this.dataStore.get('land').draw();
        this.dataStore.get('birds').draw();
        this.addScore();

        if (this.isGameOver) this.dataStore.get('startButton').draw();
    }

    run() {

        this.checkBoom();

        if (!this.isGameOver) {
            this.drawToCanvas();
            cancelAnimationFrame(this.dataStore.get('timer'));
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);

        } else {

            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destory();
        }

    }
}