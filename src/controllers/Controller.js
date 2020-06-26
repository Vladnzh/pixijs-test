import { interactiveArea } from 'models/InteractiveArea';

class Controller {
    constructor() {
        this.speedListener();
        this.gravityListener();

        interactiveArea.on('mousedown', e => {
            interactiveArea.addShape({
                x: e.data.global.x - interactiveArea.x,
                y: e.data.global.y - interactiveArea.y,
            });
        });

    }

    gravityListener() {
        const increaseGravityCounter = document.getElementById('increase-gravity-counter');
        const decreaseGravityCounter = document.getElementById('decrease-gravity-counter');
        increaseGravityCounter.addEventListener('mousedown', () => {
            interactiveArea.updateGravityCounter('increase');
        });
        decreaseGravityCounter.addEventListener('mousedown', () => {
            interactiveArea.updateGravityCounter('decrease');
        });
    }

    speedListener() {
        const increaseSpeedCounter = document.getElementById('increase-speed-counter');
        const decreaseSpeedCounter = document.getElementById('decrease-speed-counter');
        increaseSpeedCounter.addEventListener('mousedown', () => {
            interactiveArea.updateSpeedCounter('increase');
        });
        decreaseSpeedCounter.addEventListener('mousedown', () => {
            interactiveArea.updateSpeedCounter('decrease');
        });
    }
}

new Controller();
