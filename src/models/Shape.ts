import * as PIXI from 'pixi.js';
import { random, get } from 'lodash';
import { generateRandomColor } from '../utils';
import { CoordinatesType, ShapeTypeType } from '../interfaces';

export default class Shape extends PIXI.Graphics {
    shapeType: ShapeTypeType;

    constructor(shapeType: ShapeTypeType, coordinates: CoordinatesType) {
        super();
        this.shapeType = shapeType;
        this.generateShape();

        this.interactive = true;
        this.buttonMode = true;
        this.alpha = random(0.5, 1);

        this.x = get(coordinates, 'x', random(90, 1100, true));
        this.y = get(coordinates, 'y', this.shapeType === 'random' ? -85 : -50);
    }

    generateShape() {
        const randomColor = generateRandomColor();

        this.beginFill(randomColor);

        switch (this.shapeType) {
            case 3:
                this.y -= 55;
                this.moveTo(this.x, this.y);
                this.lineTo(this.x + random(45, 55), this.y + random(85, 95));
                this.lineTo(this.x + random(-45, -55), this.y + random(85, 95));
                this.lineTo(this.x, this.y);
                this.endFill();

                break;
            case 4:
                this.drawRect(-50, -50, 100, 100);
                this.endFill();
                break;
            case 5:
                this.y -= 55;
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
                this.drawCircle(0, 0, 50);
                this.endFill();
                break;

            case 'ellipse':
                this.drawEllipse(0, 0, 80, random(35, 45));
                this.endFill();
                break;

            case 'random':
                const difference = 25;
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
}
