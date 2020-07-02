import InteractiveArea from './models/InteractiveArea';
import View from './views/View';
import Shape from './models/Shape';
import PIXI from 'pixi.js';
import InteractiveAreaController from './controllers/InteractiveAreaController';

interface ICoordinates {
    x: number;
    y: number;
}
export type CoordinatesType = ICoordinates | void;
export type ShapeTypeType = string | number;


export type ShapeType = Shape;
export type InteractiveAreaType = InteractiveArea;
export type ViewType = View;
export type TickerType = PIXI.Ticker;
export type InteractionEventType = PIXI.InteractionEvent;
export type InteractiveAreaControllerType = InteractiveAreaController;
