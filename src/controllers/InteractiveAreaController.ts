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

        // adds shape by mousedown coordinates
        this.model.on('mousedown', (event: InteractionEventType) => {
            this.addShape({
                x: event.data.global.x - this.model.x,
                y: event.data.global.y - this.model.y,
            });
        });
    }

    // called when user clicks on the shape
    changeColorShapeByType(shape: ShapeType) {
        this.model.children.map((item: ShapeType) => {
            if (item.shapeType === shape.shapeType) {
                item.filters = [new ColorOverlayFilter(0x81f542)];
                item.alpha = 1;
            }
        });
    }

    //  create a shape and adds the shape, updates the counter and calculates the area
    addShape(coordinates: CoordinatesType) {
        const shapesTypes = [3, 4, 5, 6, 'circle', 'ellipse', 'random'];
        const randomShapeType = shapesTypes[random(0, shapesTypes.length - 1, false)];

        const shape = new Shape(randomShapeType, coordinates);
        const shapeController = new ShapeController(shape, this);

        shapeController.render();

        this.updateShapesCounter();
        this.updateSurfaceAreaOccupiedCounter('increase', shape);
    }

    //  remove the shape, updates the shapes counter and calculates the area
    removeShape(shape: ShapeType) {
        this.model.removeChild(shape);
        this.updateShapesCounter();
        this.updateSurfaceAreaOccupiedCounter('decrease', shape);
    }

    // updates the shapes counter
    updateShapesCounter() {
        const quantityShapes = String(this.model.children.length);

        const shapesCounter = document.getElementById('shapes-counter');
        shapesCounter.innerHTML = quantityShapes;
    }

    // updates the gravity counter
    updateGravityCounter(value: string) {
        if (value === 'increase' && this.model.gravity < 10) {
            this.model.gravity += 1;
        }
        if (value === 'decrease' && this.model.gravity > 1) {
            this.model.gravity -= 1;
        }
        const quantityValue = String(this.model.gravity);

        const gravityCounter = document.getElementById('gravity-counter');
        gravityCounter.innerHTML = quantityValue;
    }

    // updates the surface area occupied counter
    updateSurfaceAreaOccupiedCounter(value: string, shape: ShapeType) {
        // const shapeArea = Math.ceil(shape.getBounds().width) * Math.ceil(shape.getBounds().height);
        const shapeArea = this.view.extract.pixels(shape).length / 4;

        if (value === 'increase') {
            this.model.surfaceAreaOccupied += shapeArea;
        }
        if (value === 'decrease') {
            this.model.surfaceAreaOccupied -= shapeArea;
        }

        const quantitySurfaceAreaOccupied = String(this.model.surfaceAreaOccupied);

        const surfaceAreaCounter = document.getElementById('surface-area-counter');
        surfaceAreaCounter.innerHTML = quantitySurfaceAreaOccupied;
    }

    // updates the speed counter
    updateSpeedCounter(value: string) {

        if (value === 'increase' && this.model.shapesPerSecond < 10) {
            this.model.shapesPerSecond += 1;
        }
        if (value === 'decrease' && this.model.shapesPerSecond > 1) {
            this.model.shapesPerSecond -= 1;
        }
        const quantityShapesPerSecond = String(this.model.shapesPerSecond);

        const speedCounter = document.getElementById('speed-counter');
        speedCounter.innerHTML = quantityShapesPerSecond;
    }

    // listening the gravity controller
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

    // listening the speed controller
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

    // called 'shapesPerSecond' second
    update() {
        this.addShape();
        this.ticker.maxFPS = this.model.shapesPerSecond;
    }

    startGame() {
        this.view.stage.addChild(this.model);
    }
}
