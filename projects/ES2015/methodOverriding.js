class Shape {
    constructor(color) {
        this.color = color;
    }
    move() {
        console.log('moving from shape');
    }
}

class Circle extends Shape {
    constructor(radius, color) {
        super(color);
        this.radius = radius;
    }
    draw() {
        console.log('drawing');
    }
    move() {
        console.log('moving from circle')
    }
}

const c = new Circle(5, 'red');