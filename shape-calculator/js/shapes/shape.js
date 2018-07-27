/**
 * Shape Class
 */
export class Shape {
    // var inputs;
    constructor(inputs) {
        this.inputs = inputs;
    }
}

/**
 * Circle
 */
export class Circle extends Shape {
    constructor(inputs) {
        super(arguments[0]);
    }

    getInputTexts() {
        return ['Diameter'];
    }

    calculateArea() {
        return parseFloat(Math.PI * Math.pow( (this.inputs[0] / 2) , 2 )).toFixed(2);
    }
}

/**
 * Ellipse
 */
export class Ellipse extends Shape {
    constructor(inputs) {
        super(arguments[0]);
    }

    getInputTexts() {
        return ['Outer Radius', 'Inner Radius'];
    }

    calculateArea() {
        return parseFloat( Math.PI * parseInt(this.inputs[0]) * parseInt(this.inputs[1]) ).toFixed(2);
    }
}

/**
 * Rectange
 */
export class Rectangle extends Shape {
    constructor(inputs) {
        super(arguments[0]);
    }

    getInputTexts() {
        return ['Length', 'Height'];
    }

    calculateArea() {
        return parseFloat(this.inputs[0] * this.inputs[1]).toFixed(2);;
    }
}

/** 
 * Square 
 */
export class Square extends Shape {
    constructor(inputs) {
        super(arguments[0]);
    }

    getInputTexts() {
        return ['Side'];
    }

    calculateArea() {
        return parseFloat(Math.pow( this.inputs[0] , 2 )).toFixed(2);
    }
}