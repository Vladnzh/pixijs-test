import { random } from 'lodash';
import Shape from 'models/Shape';
import ShapeController from 'controllers/ShapeController';
import { ColorOverlayFilter } from '@pixi/filter-color-overlay';
import * as PIXI from 'pixi.js';
import {
    CoordinatesType,
    InteractionEventType,
    InteractiveAreaType,
    ShapeType,
    TickerType,
    ViewType,
} from '../interfaces';

export default class InteractiveAreaController {
    model: InteractiveAreaType;
    view: ViewType;
    ticker: TickerType;

    constructor(model: InteractiveAreaType, view: ViewType) {
        this.view = view;
        this.model = model;

        this.speedListener();
        this.gravityListener();

        this.ticker = new PIXI.Ticker();

        this.ticker.minFPS = 1;
        this.ticker.maxFPS = 1;
        this.ticker.add(() => this.update());
        this.ticker.start();

        this.model.on('mousedown', (event: InteractionEventType) => {
            this.addShape({
                x: event.data.global.x - this.model.x,
                y: event.data.global.y - this.model.y,
            });
        });
    }

    changeColorShapeByType(shape: ShapeType) {
        this.model.children.map((item: ShapeType) => {
            if (item.shapeType === shape.shapeType) {
                item.filters = [new ColorOverlayFilter(0x81f542)];
                item.alpha = 1;
            }
        });
    }

    addShape(coordinates: CoordinatesType) {
        const shapesTypes = [3, 4, 5, 6, 'circle', 'ellipse', 'random'];
        const randomShapeType = shapesTypes[random(0, shapesTypes.length - 1, false)];

        const shape = new Shape(randomShapeType, coordinates);
        const shapeController = new ShapeController(shape, this);

        shapeController.render();

        this.updateShapesCounter();
        this.updateSurfaceAreaOccupiedCounter('increase', shape);
    }

    removeShape(shape: ShapeType) {
        this.model.removeChild(shape);
        this.updateShapesCounter();
        this.updateSurfaceAreaOccupiedCounter('decrease', shape);
    }

    updateShapesCounter() {
        const shapesCounter = document.getElementById('shapes-counter');
        shapesCounter.innerHTML = String(this.model.children.length);
    }

    updateGravityCounter(value: string) {
        if (value === 'increase' && this.model.gravity < 10) {
            this.model.gravity += 1;
        }
        if (value === 'decrease' && this.model.gravity > 1) {
            this.model.gravity -= 1;
        }

        const gravityCounter = document.getElementById('gravity-counter');
        gravityCounter.innerHTML = String(this.model.gravity);
    }

    updateSurfaceAreaOccupiedCounter(value: string, shape: ShapeType) {
        // const shapeArea = Math.ceil(shape.getBounds().width) * Math.ceil(shape.getBounds().height);
        const shapeArea = this.view.extract.pixels(shape).length / 4;

        const surfaceAreaCounter = document.getElementById('surface-area-counter');

        if (value === 'increase') {
            this.model.surfaceAreaOccupied += shapeArea;

            surfaceAreaCounter.innerHTML = String(this.model.surfaceAreaOccupied);
            return;
        }
        if (value === 'decrease') {
            this.model.surfaceAreaOccupied -= shapeArea;

            surfaceAreaCounter.innerHTML = String(this.model.surfaceAreaOccupied);
            return;
        }
    }

    updateSpeedCounter(value: string) {
        if (value === 'increase' && this.model.shapesPerSecond < 10) {
            this.model.shapesPerSecond += 1;
        }
        if (value === 'decrease' && this.model.shapesPerSecond > 1) {
            this.model.shapesPerSecond -= 1;
        }

        const speedCounter = document.getElementById('speed-counter');
        speedCounter.innerHTML = String(this.model.shapesPerSecond);
    }

    gravityListener() {
        const increaseGravityCounter = document.getElementById('increase-gravity-counter');
        const decreaseGravityCounter = document.getElementById('decrease-gravity-counter');
        increaseGravityCounter.addEventListener('mousedown', () => {
            this.updateGravityCounter('increase');
        });
        decreaseGravityCounter.addEventListener('mousedown', () => {
            this.updateGravityCounter('decrease');
        });
    }

    speedListener() {
        const increaseSpeedCounter = document.getElementById('increase-speed-counter');
        const decreaseSpeedCounter = document.getElementById('decrease-speed-counter');
        increaseSpeedCounter.addEventListener('mousedown', () => {
            this.updateSpeedCounter('increase');
        });
        decreaseSpeedCounter.addEventListener('mousedown', () => {
            this.updateSpeedCounter('decrease');
        });
    }

    update() {
        this.addShape();
        this.ticker.maxFPS = this.model.shapesPerSecond;
    }

    startGame() {
        this.view.stage.addChild(this.model);
    }
}
