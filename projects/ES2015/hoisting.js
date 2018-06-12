// in javascript two of the ways we can define/declare functions is

// Regular function declarations get hoisted to the top of there scope
// where as funcExpressions do not. So that means that if we try to use the variable referencing our function expression object
// before the declaration, we will get an error.

console.log(regularFunc);
console.log(funcExpression); // this line causes an error


function regularFunc() {

}


let funcExpression = function() {

};


// function expressions must be terminated with a semi colon just like every other expression

let number = 5;

// when it comes to classes we can define them using either a class declaration or a class expression
// unlike functions, class declarations and class expressions are not hoisted. SO you must declare your classes at the top of your scope.
// Also, there really isn't a use for doing the class expression way. Just stick with class declaration.

let c = new Circle(5); // this will error as well


// class declaration
class Circle {
    constructor(radius){
        this.radius = 5;
    }
}

// class expressions
const Square = class {

}