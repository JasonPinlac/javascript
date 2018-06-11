function Shape(){

}

Shape.prototype.duplicate = function(){
    console.log('duplicate from shapeBase object');
}


function Circle(radius){
    this.radius = radius;
}

let s = new Shape();
let c = new Circle(2);


//set up proto inheritance so that circle inherits from shape base
// c-> circleBase -> shapebase -> objectbase

// let newCircleBase = Object.create(Shape.prototype);
// Circle.prototype = newCircleBase;

// or we can say

Circle.prototype = Object.create(Shape.prototype);

// DON'T FORGET TO RE-ASSIGN THE CONSTRUCTOR FUNCTION FOR THE NEWBASE OBJECT!! ex. NEWCIRCLEBASE.constructor = Circle.
// this allows us to create objects dynamically in our program using the Circle.prototype.constructor(5) which is the same as saying new Circle(5);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function(){
    console.log('draw fromthe newCircleBase object')
}

//c.duplicate();

let c2 = new Circle(2);

c2.duplicate();
c2.draw();