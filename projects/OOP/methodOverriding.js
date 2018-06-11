// override the implementation of a method defined in the base object for the dervied object.
// all we have to do is redefine the opbject in the child object. 
// the overriding implementation has to come after we extend our child object so our new implementation doesn't dissapear.
// this works because when we access a member of an object, javascript will walk up the prototype chain until it finds the memmber.

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

Shape.prototype.duplicate = function(){
    console.log('duplicating for shape base.');
}



// Child classes
function Circle(radius, color){
    Shape.call(this, color);
    this.radius = radius;
}
extend(Circle, Shape);
//override the duplicate method
Circle.prototype.duplicate = function(){
    console.log('duplcating from the circle base.');
}



function Square(length, color){
    Shape.call(this, color);
    this.length = length;
}
extend(Square, Shape);
//override the duplicate method
Square.prototype.duplicate = function(){
    console.log('duplcating from the square base.');
}


let c = new Circle(2, 'red');
let s = new Square(3, 'blue');


