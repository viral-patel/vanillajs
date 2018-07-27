import * as Shapes from './shapes/shape.js';

export const listOfShapes = ['Circle','Square','Rectangle','Ellipse'];
const listClasses = {
    'Circle':Shapes.Circle, 
    'Square': Shapes.Square, 
    'Rectangle':Shapes.Rectangle,
    'Ellipse':Shapes.Ellipse
};

export function getInputList(shape) {
    let shapeClass = new listClasses[shape]();
    return shapeClass.getInputTexts();
}

export function getArea(shape, listFeatures) {
    let shapeClass = new listClasses[shape](listFeatures);
    return shapeClass.calculateArea();
}