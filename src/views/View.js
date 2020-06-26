import * as PIXI from 'pixi.js';

class Application {
    constructor() {
        this.renderer = new PIXI.Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            resolution: 3,
        });

        document.getElementById('root').appendChild(this.renderer.view);

        this.ticker = new PIXI.Ticker();
        this.stage = new PIXI.Container();

        this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
        this.ticker.start();
    }

    get screen() {
        return this.renderer.screen;
    }

    render() {
        this.renderer.render(this.stage);
    }
}
export const view = new Application();
