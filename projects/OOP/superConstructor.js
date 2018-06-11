
// we need to set 'this' so that it points to the new circle object created when the 'new' keyword is invoked
// or else this.color = color when invoked will assign the color property to the global window object referenced by this.
function Shape(color){
    this.color = color;
}


Shape.prototype.duplicate = function(){
    console.log('duplicating');
}

function Circle(radius, color) {
    Shape.call(this, color); // here we are pointing the invokation of Shape function to point to 'this' being the new circle object created by the 'new' keyword
    this.radius = radius;
}

// set up the inheritance
Circle.prototype = Object.create(Shape.prototype);
// dont forget about reassigning the new base object's constructor property
Circle.prototype.constructor = Circle;

// we put methods on the prototype because we want to save memory space. if you put it on the constrcutor function, all the objects created will have there own copy and object of these methods.
Circle.prototype.draw = function(){
    console.log('drawing');
}


let myCircle = new Circle(5, 'red');