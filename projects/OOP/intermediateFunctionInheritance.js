
// This function encapsulates the code used for setting up inheritance.
// The parameters are capitalized meaning it takes in Constructor Functions
function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

// Parent class
function Shape(color){
    this.color = color;
}

// Child classes
function Circle(radius, color){
    Shape.call(this, color);
    this.radius = radius;
}
extend(Circle, Shape);

function Square(length, color){
    Shape.call(this, color);
    this.length = length;
}
extend(Square, Shape);

let c = new Circle(2, 'red');
let s = new Square(3, 'blue');


