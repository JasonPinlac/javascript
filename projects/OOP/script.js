/*jslint es6 */
'use strict';

function Location(x, y) {
    this.x = x;
    this.y = y;
}

function Circle(radius, location) {
    this.radius = radius;
    this.location = location;
    function draw(){
        console.log("draw at position " + this.location.x + " " + this.location.y);
    }
}

let myCircle = new Circle(5, new Location(3, 7));

console.log(myCircle);
console.log(myCircle.radius);
console.log(myCircle.location.x);
console.log(myCircle.location.y);
