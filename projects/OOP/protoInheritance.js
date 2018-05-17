
function Shape(){
}

Shape.prototype.duplicate = function(){
    console.log('duplicating...');
}

function Circle(radius){
    this.radius = radius;
}
Circle.prototype = Object.create(Shape.prototype);


Circle.prototype.draw = function(){
    console.log('drawing...');
}
let s = new Shape();
let c = new Circle(3);

//s.duplicate();
//c.draw();

