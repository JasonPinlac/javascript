class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    draw() {
        console.log(`drawing circle with a radius ${this._radius}`);
    }
}

class Square {
    constructor(length) {
        this._length = length;
    }

    draw() {
        console.log(`drawing square of side length ${this._length}`);
    }
}


// everything that we define in moduile is considered private. It is not accessible to the outside unless we explicitly export it.
// to explicitly export this code

// the way we export code in CommonJS format
// module is this circle.js file and it has an object called exports which in put anything we want to be public within it.
// then we can import this circle.js module and access the code that is exported here in other modules.

module.exports.Circle = Circle;
module.exports.Square = Square;

// here we are adding a circle property to this export object and assigning the Circle class to it.

// another way to do this is..
// the difference is we assign a single class to be the exports object
// so when we import it we are importing only and exactly the Circle class.

//module.exports = Circle;