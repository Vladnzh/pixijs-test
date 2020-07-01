import * as PIXI from 'pixi.js';

export default class InteractiveArea extends PIXI.Graphics {
    shapesPerSecond: number;
    gravity: number;
    surfaceAreaOccupied: number;

    constructor() {
        super();
        this.interactive = true;
        this.x = 0;
        this.y = 0;

        this.beginFill(0xe6ffff);
        this.drawRect(0, 0, window.innerWidth, window.innerHeight);
        this.endFill();

        this.shapesPerSecond = 1;
        this.gravity = 1;
        this.surfaceAreaOccupied = 0;
    }
}
