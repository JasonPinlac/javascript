//many forms
// extremly powerfult echnique in object oriented programming

function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Shape(color){
    this.color = color;
}

Shape.prototype.duplicate = function(){
    console.log('duplicating shape');
}

function Square(side, color){
    Shape.call(this, color);
    this.side = side;
}
extend(Square, Shape);

Square.prototype.duplicate = function(){
    console.log('duplicating square')
}




function Circle(radius, color){
    Shape.call(this, color);
    this.radius = radius;
}
extend(Circle, Shape);

Square.prototype.duplicate = function(){
    console.log('duplicating circle')
}


let s = new Square(3, 'green');
let c = new Circle(2, 'yellow');


let shapes = [s, c];

//polymorphism
// for of loop

for (let shape of shapes) {
    shape.duplicate();
}


