class Shape {
    constructor(color) {
        this.color = color;
    }
    move() {
        console.log('moving');
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
}

const c = new Circle(5, 'red');