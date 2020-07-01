import * as PIXI from 'pixi.js';
import Shape from 'models/Shape';
import InteractiveAreaController from 'controllers/InteractiveAreaController';

export default class ShapeController {
    model: Shape;
    parent: InteractiveAreaController;
    ticker: PIXI.Ticker;

    constructor(model: Shape, parent: InteractiveAreaController) {
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

    update() {
        this.model.y += this.parent.model.gravity;

        if (this.model.y > (this.model.shapeType === 'random' ? 515 : 558) + this.model.getBounds().height) {
            this.parent.removeShape(this.model);
            this.ticker.stop();
        }
    }

    render() {
        this.parent.model.addChild(this.model);
    }
}
