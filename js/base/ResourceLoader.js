// 资源文件加载器，确保canvas在图片加载完成后才开始渲染
import { Resources } from './Resources.js';

export default class ResourceLoader {

    constructor() {
        this.map = new Map(Resources);
        for (let [key, value] of this.map) {
            const image = window.wx ? wx.createImage() : new Image();
            image.src = value;
            this.map.set(key, image);
        }
    }

    // 等所有图片资源加载完执行回调
    onloaded(callback) {
        let loadCounter = 0;
        for (let value of this.map.values()) {
            value.onload = () => {
                loadCounter++;
                if (loadCounter >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }

    // 创建图片资源加载器实例
    static create() {
        return new ResourceLoader();
    }
} 