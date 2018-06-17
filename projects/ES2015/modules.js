
// split our code into multiple files

// increase maintainability because code is better organized

// code reuse

// code gets abstracted. hide complexity within these modules and opnly expose the essentials


class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    draw() {
        console.log(`drawing circle with radius {$this.radius}`);
    }
}


// there are three popular module formats for es5
// amd - browser
// commonJs - node.js
// UMD - browser/node.js

// for es6 javascript natively supports with es6 modules
// es6 modules


// going forward we will only focus on...

// commonJS for node.js
// ES6 modules for browser