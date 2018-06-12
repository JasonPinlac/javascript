// classes in javascript are syntactic sugar over prototypical inheritance.


// function Circle(radius){
//     this.radius = radius;
   
//     this.draw = function(){
//         console.log('draw');
//     }
// }


// a special method called constructor used to initialize object just like the constructor function above.
// to define a method we define it in the body of the class(which is really a function)
// these members defined in the body of the class will end up on the prototype/base object
// If you want a member to be part of the object being constructed, move its declaration/definition on the constructor method.
class Circle {
    constructor(radius){
        this.radius = radius;
        this.drawFromObject = function(){
            console.log('drawing from object');
        }
    }

    drawFromPrototype() {
        console.log('drawing from prototype');
    }
}

// Classes in ES6 enforce the use of the new operator. You will get an exception if you dont provide the new keyword
let c = new Circle(5);

console.log(c);
console.log(typeof Circle);


