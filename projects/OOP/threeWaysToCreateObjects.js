/*jslint es6 */
'use strict';

// Object literal syntax
let firstCirle = {
    radius: 10,
    draw: function(){
        console.log('draw');
    }
}

// Factory function
function createCircle(radius, location){
    return {
        radius : radius,
        location : location,
        draw : function(){
            console.log("draw at position [" + location.x + ", " + location.y + "]");
        }
    };
}

// Constructor function
function Location(x, y) {
    this.x = x;
    this.y = y;
}
// Constructor function
function Circle(radius, location) {
    this.radius = radius;
    this.location = location;
    this.draw = function(){
        console.log("draw at position [" + this.location.x + ", " + this.location.y + "]");
    }
}

let myCircle = new Circle(5, new Location(3, 7));
let yourCircle = createCircle(12, new Location(1,2));

console.log(myCircle);
console.log(myCircle.radius);
console.log(myCircle.location.x);
console.log(myCircle.location.y);
myCircle.draw();

console.log(yourCircle);
console.log(yourCircle.radius);
console.log(yourCircle.location.x);
console.log(yourCircle.location.y);
yourCircle.draw();




