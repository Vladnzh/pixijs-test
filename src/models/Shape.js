import * as PIXI from 'pixi.js';
import { view } from 'views/View';
import { interactiveArea } from './InteractiveArea';
import { random, get } from 'lodash';
import { generateRandomColor } from '../utils';

export default class Shape extends PIXI.Graphics {
    constructor(shapeType, coordinates) {
        super();

        this.interactive = true;
        this.buttonMode = true;

        this.alpha = random(0.5, 1);
        this.shapeType = shapeType;

        this.generateShape();

        this.x = get(
            coordinates,
            'x',
            random(interactiveArea.x - 200, interactiveArea.x - 350 + interactiveArea.width, true),
        );
        this.y = get(coordinates, 'y', -50);

        view.stage.addChild(this);
        view.ticker.add(() => this.update());

        this.on('mousedown', () => interactiveArea.removeShape(this));
    }

    generateShape() {
        const randomColor = generateRandomColor();

        switch (this.shapeType) {
            case 3:
                this.y -= 55;
                this.beginFill(randomColor);
                this.moveTo(this.x, this.y);
                this.lineTo(this.x + random(45, 55), this.y + random(85, 95));
                this.lineTo(this.x + random(-45, -55), this.y + random(85, 95));
                this.lineTo(this.x, this.y);
                this.endFill();

                break;
            case 4:
                this.beginFill(randomColor);
                this.drawRect(-50, -50, 100, 100);
                this.endFill();
                break;
            case 5:
                this.y -= 55;
                this.beginFill(randomColor);
                this.moveTo(this.x, this.y);
                this.lineTo(this.x + random(55, 65), this.y + random(45, 55));
                this.lineTo(this.x + random(35, 45), this.y + random(105, 115));
                this.lineTo(this.x + random(-35, -45), this.y + random(105, 115));
                this.lineTo(this.x + random(-55, -65), this.y + random(45, 55));
                this.lineTo(this.x, this.y);
                this.endFill();
                break;

            case 6:
                this.y -= 55;
                this.beginFill(randomColor);
                this.moveTo(this.x, this.y);
                this.lineTo(this.x + random(45, 55), this.y + random(25, 35));
                this.lineTo(this.x + random(45, 55), this.y + random(85, 95));
                this.lineTo(this.x + random(-5, 5), this.y + random(115, 125));
                this.lineTo(this.x + random(-45, -55), this.y + random(85, 95));
                this.lineTo(this.x + random(-45, -55), this.y + random(25, 35));
                this.lineTo(this.x, this.y);
                this.endFill();
                break;

            case 'circle':
                this.beginFill(randomColor);
                this.drawCircle(0, 0, 50);
                this.endFill();
                break;

            case 'ellipse':
                this.beginFill(randomColor);
                this.drawEllipse(0, 0, 80, random(35, 45));
                this.endFill();
                break;

            case 'random':
                const difference = 25;
                this.beginFill(randomColor);
                this.moveTo(-25, -70);
                this.bezierCurveTo(
                    random(-5, -15 + difference),
                    random(-135, -145 + difference),
                    random(40, 50 + difference),
                    random(-55, -65 + difference),
                    random(35, 45 + difference),
                    random(-70, -80 + difference),
                );
                this.bezierCurveTo(
                    random(35, 45 + difference),
                    random(-85, -95 + difference),
                    random(95, 105 + difference),
                    random(-95, -105 + difference),
                    random(85, 95 + difference),
                    random(-5, -15 + difference),
                );

                this.bezierCurveTo(
                    random(75, 85 + difference),
                    random(60, 70 + difference),
                    random(40, 50 + difference),
                    random(35, 45 + difference),
                    random(20, 30 + difference),
                    random(50, 60 + difference),
                );

                this.bezierCurveTo(
                    random(-35, -45 + difference),
                    random(90, 100 + difference),
                    random(-25, -35 + difference),
                    random(45, 55 + difference),
                    random(-55, -65 + difference),
                    random(35, 45 + difference),
                );

                this.bezierCurveTo(
                    random(-65, -75 + difference),
                    random(25, 35 + difference),
                    random(-105, -115 + difference),
                    random(-10, difference),
                    random(-70, -80 + difference),
                    random(-15, -25 + difference),
                );
                this.bezierCurveTo(
                    random(-65, -75 + difference),
                    random(-15, -25 + difference),
                    random(-70, -80 + difference),
                    random(-85, -95 + difference),
                    -25,
                    -70,
                );
                this.endFill();

                break;
        }
    }

    update() {
        this.y += interactiveArea.gravity;

        if (this.y > (this.shapeType === 'random' ? 410 : 450) + this.getBounds().height)
            interactiveArea.removeShape(this);
    }
}
