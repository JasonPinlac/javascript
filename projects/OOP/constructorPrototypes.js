
// function Circle(radius) {
//     this.radius = radius;
// }

// let myCircle = new Circle(3);
// let prototypeOfCircle = Object.getPrototypeOf(myCircle);
// console.log(prototypeOfCircle);


// let prototypeOfCircle2 = Circle.prototype;
// console.log(prototypeOfCircle2);


function createCircle(radius){
    return {
        radius : radius,
    };
}

function Circle(radius){
    this.radius = radius;
}

let functionCircle = createCircle(3);
let constructorCircle = new Circle(5);

console.log(functionCircle);
console.log(constructorCircle)

console.log(functionCircle.constructor);
console.log(constructorCircle.constructor);