import InteractiveArea from 'models/InteractiveArea';
import View from 'views/View';
import InteractiveAreaController from 'controllers/InteractiveAreaController';
import './styles.css';

const main = () => {
    const interactiveAreaModel = new InteractiveArea();
    const view = new View();

    const interactiveAreaController = new InteractiveAreaController(interactiveAreaModel, view);

    interactiveAreaController.startGame();
};

window.onload = main;
