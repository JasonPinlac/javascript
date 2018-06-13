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


//---------------------

class Person {
    constructor(name, age) {
        //properties
        this.name = name;
        this.age = age;
    }

    // method
    speak() {
        console.log(`Hi, my name is ${this.name}`)
    }

    //static method
    //use static methods to create utility methods that are not tied to a particular object
    static parse(str) {
        let aName = JSON.parse(str).name;
        let aAge = JSON.parse(str).age;
        return new Person(aName, aAge);
    }
}

let me = new Person('Jason', 29);

let you = Person.parse('{"name":"mike", "age":"30"}');
console.log(you);