import ResourceLoader from './js/base/ResourceLoader.js';
import Director from './js/Director.js';
import Background from './js/runtime/Background.js'
import DataStore from './js/base/DataStore.js';
import Land from './js/runtime/Land.js';
import Birds from './js/player/Birds.js';
import SatrtButton from './js/player/StartButton.js';
import Score from './js/player/Score.js';

// 开启微信debug工具
// if (typeof wx !== 'undefined') {
//     wx.setEnableDebug({
//         enableDebug: true
//     });
// }


export default class App {

    constructor() {
        this.canvas = typeof wx === "undefined" ? document.getElementById('game') : wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.director = Director.getInstance(this.canvas.width, this.canvas.height);

        // 加载图片资源
        const loader = ResourceLoader.create();
        loader.onloaded(map => this.onResourceFirstLoaded(map));

        // 加载数据仓库
        this.dataStore = DataStore.getInstance();

    }

    onResourceFirstLoaded(map) {

        // 把canvas上下文和图片永久存入数据仓库
        // map就是图片资源的数据集合
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;

        // 初始化游戏
        this.init();
    }

    initEvent() {

        const event = e => {
            if (this.director.isGameOver) {
                this.init();
            } else {
                this.director.initEvent();
            }
        }

        // 兼容h5
        typeof wx === "undefined" && ['keydown', 'click'].forEach(eventName => {
            window.addEventListener(eventName, e => {
                if (eventName === 'keydown' && e.keyCode === 32) {
                    event(e);
                }
                if (eventName === 'click') {
                    event(e);
                }
            });
        });

        // 兼容微信
        if (typeof wx !== "undefined") {
            wx.onTouchStart(e => {
                event(e);
            })
        }
    }

    init() {

        this.director.isGameOver = false;

        // 交给导演类去绘制地图
        this.dataStore
            .put('background', new Background())
            .put('land', new Land())
            .put('birds', new Birds())
            .put('pencils', [])    // 用于存放每一组铅笔
            .put('startButton', new SatrtButton())
            .put('score', new Score());

        this.director.createPencil();

        this.initEvent();

        // 导演开始游戏
        this.director.run();
    }
}