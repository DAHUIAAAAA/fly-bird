import DataStore from "./DataStore.js";

export default class Sprite {
    constructor(
        img,            // 图片资源
        srcX, srcY,     // 图片开始剪裁的位置
        srcW, srcH,     // 图片裁剪的宽高
        x, y,           // 图片渲染在canvas上的位置
        width, height   // 图片要缩放到的宽高
    ) {
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(
        img = this.img,
        srcX = this.srcX, srcY = this.srcY,
        srcW = this.srcW, srcH = this.srcH,
        x = this.x, y = this.y,
        width = this.width, height = this.height
    ) {
        this.ctx.drawImage(
            img,
            srcX, srcY,
            srcW, srcH,
            x, y,
            width, height
        )
    }

    static getImage(key) {
        // 静态方法不能访问实例的变量，所以用DataStore.getInstance()
        return DataStore.getInstance().res.get(key);
    }
}