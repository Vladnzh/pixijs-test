import * as PIXI from 'pixi.js';
import { InteractiveAreaControllerType, ShapeType, TickerType } from '../interfaces';

export default class ShapeController {
    model: ShapeType;
    parent: InteractiveAreaControllerType;
    ticker: TickerType;

    constructor(model: ShapeType, parent: InteractiveAreaControllerType) {
        this.parent = parent;
        this.model = model;

        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => this.update());
        this.ticker.start();

        this.model.on('mousedown', () => {
            this.ticker.stop();
            this.parent.removeShape(this.model);
            this.parent.changeColorShapeByType(this.model);
        });

    }

    // updates every time
    update() {
        this.model.y += this.parent.model.gravity;

        // the shape deleted when it goes beyond the boundaries of 'interactiveArea' and stops thicker
        if (this.model.y > (this.model.shapeType === 'random' ? 515 : 558) + this.model.getBounds().height) {
            this.parent.removeShape(this.model);
            this.ticker.stop();
        }
    }

    render() {
        this.parent.model.addChild(this.model);
    }
}
