import * as PIXI from 'pixi.js';

export default class View {
    renderer: PIXI.Renderer;
    extract: PIXI.Extract;
    ticker: PIXI.Ticker;
    stage: PIXI.Container;

    constructor() {
        this.renderer = new PIXI.Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            resolution: 3,
        });
        this.extract = new PIXI.Extract(this.renderer);

        document.getElementById('root').appendChild(this.renderer.view);

        this.ticker = new PIXI.Ticker();
        this.stage = new PIXI.Container();
        this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
        this.ticker.start();
    }

    render() {
        this.renderer.render(this.stage);
    }
}
