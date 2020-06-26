import * as PIXI from 'pixi.js';
import { view } from 'views/View';
import { interactiveArea } from './InteractiveArea';

class BoundsOfInteractiveArea extends PIXI.Graphics {
    constructor() {
        super();
        
        this.x = interactiveArea.x;
        this.y = interactiveArea.y;
        this.lineStyle(300, 0x4db86a, 1);
        this.drawRect(-150, -150, 1300, 800);

        view.stage.addChild(this);
    }
}

new BoundsOfInteractiveArea();
