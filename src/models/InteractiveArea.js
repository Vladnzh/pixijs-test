import * as PIXI from 'pixi.js';
import { view } from 'views/View';
import Shape from './Shape';
import { random } from 'lodash';

class InteractiveArea extends PIXI.Graphics {
    constructor() {
        super();
        this.interactive = true;
        this.x = view.screen.width / 2 - 500;
        this.y = view.screen.height / 2 - 250;

        this.beginFill(0xe6ffff);
        this.drawRect(0, 0, 1000, 500);
        this.endFill();

        this.shapesPerSecond = 1;
        this.gravity = 1;
        this.timerId = this.refreshIntervalId();

        view.stage.addChild(this);
    }

    refreshIntervalId() {
        return setInterval(() => this.addShape(), 1000 / this.shapesPerSecond);
    }

    updateGravityCounter(value) {
        if (value === 'increase' && this.gravity < 10) {
            this.gravity += 1;
        }
        if (value === 'decrease' && this.gravity > 1) {
            this.gravity -= 1;
        }

        const gravityCounter = document.getElementById('gravity-counter');
        gravityCounter.innerHTML = this.gravity;
    }

    updateSpeedCounter(value) {
        if (value === 'increase' && this.shapesPerSecond < 10) {
            this.shapesPerSecond += 1;
        }
        if (value === 'decrease' && this.shapesPerSecond > 1) {
            this.shapesPerSecond -= 1;
        }

        clearInterval(this.timerId);
        this.timerId = this.refreshIntervalId();

        const speedCounter = document.getElementById('speed-counter');
        speedCounter.innerHTML = this.shapesPerSecond;
    }

    updateShapesCounter() {
        const shapesCounter = document.getElementById('shapes-counter');
        shapesCounter.innerHTML = this.children.length;
    }

    addShape(coordinates) {
        const shapesTypes = [3, 4, 5, 6, 'circle', 'ellipse', 'random'];
        const randomShapeType = shapesTypes[random(0, shapesTypes.length - 1, false)];

        const shape = new Shape(randomShapeType, coordinates);

        this.addChild(shape);
        this.updateShapesCounter();
    }

    removeShape(Shape) {
        this.removeChild(Shape);
        this.updateShapesCounter();
    }
}

export const interactiveArea = new InteractiveArea();
