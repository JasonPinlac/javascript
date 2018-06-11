const canEat = {
    eat: function(){
        this.hunger--; // this keyword inside of an object literal refers to the object literal.
        console.log('eating');
    },
};

const canWalk = {
    walk: function() {
        console.log('walking')
    },
};

const canSwim = {
    swim: function(){
        console.log('swimming');
    },
}

function Person(name, age){
    this.name = name;
    this.age = age;
}

function Goldfish(color){
    this.color = color;
}


let person = new Person('Jason', 29);
let goldfish = new Goldfish('gold');


// Generic Mixin function
function mixin(target, ...sources){
    Object.assign(target, ...sources);
}


// copy the properties of one object to another
// the first parameter is the source object that will get a copy of all the members of the second argument objects
mixin(Person.prototype, canEat, canWalk);
mixin(Goldfish.prototype, canEat, canSwim);
console.log(person);
console.log(goldfish);
