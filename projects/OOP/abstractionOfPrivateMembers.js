function Circle(radius,x,y){
    // THESE ARE THE OBJECT {} PROPERTIES ASSIGNED WHEN THE NEW KEYWORD IS INVOKED. 
    //BECAUSE OF HOW CLOSURES WORK WE CAN ACCESS THE "Private" functions within the scope this constructor function declared with LET keyword.
    this.radius = radius;
    this.draw = function(){
        showLocation(this.radius);
        console.log('drawing...circle with radius ' + this.radius);
    }

    // THESE ARE VARIABLES LOCAL TO THIS CONSTRUCTOR FUNCTION'S SCOPE. 
    //THEY CAN BE TREATED AS PRIVATE/HELPER VARIABLES DUE TO HOW CLOSURES WORK (closure is an inner function that has access to its outer function's variables even after the outer function returns). Also, WE CAN SIMULATE ABSTRACTION OF AN OBJECT'S PROPERTIES BECAUSE LET VARIABLES BELONG TO THE FUNCTION AND NOT THE OBJECT!!!
    // WE CANNOT ACCESS ANY OF THE OBJECTS PROPERTIES FROM THE SCOPE OF THESE FUNCTIONS BECAUSE THE PROPERTIES ASSIGNED ABOVE USING THIS.PROPERTY BELONG TO THE OBJECT 
    //AND NOT THE FUNCTIONS CLOSURE!!!
    // THIS WITHIN THESE HELPER FUNCTIONS IS THE GLOBAL WINDOW.
    let defaultLocation = {
        x: x,
        y: y
    };

    let showLocation = function() {
        console.log('showing location x: ' + defaultLocation.x + ', location y: ' + defaultLocation.y);
    }
}

let c = new Circle(3,1,2);

c.draw();

let a = [];
console.log(a);