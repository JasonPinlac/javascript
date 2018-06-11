function Circle(r){
    // instance members
    this.radius = r;
    // this.draw = function(){
    //     console.log('drawing...');
    // };
}

// prototype members
Circle.prototype.draw = function(){
    console.log('drawing from the prototype');
}

let c = new Circle(3);

let protoOfCircle = Object.getPrototypeOf(c);
protoOfCircle.draw();

// because javascript looks for members up the prototype chain. if we want to 
// override a method all we have to do is redefine it in whichever object we want.
// for exmaple, toString comes from the OBJECT BASE but lets get it into the CIRCLE BASE to say something.


Circle.prototype.toString = function() {
    console.log('Circle with radius ' + this.radius );
}

c.toString();