class Person {
    constructor(name, age){
    this.name = name;
    this.age = age;
    this._location = {x:0,y:0};
    }
    speak(){
    // use this. to call other methods within the class
        this._randomizeLocation();
        console.log(`Hi my name is ${this.name}. I'm ${this.age} years old and I'm at location ${this._location.x}, ${this._location.y}.`);
    }

    // to show that a class member is private, use an underscore. This is not the best solution but this standard convention keeps code looking cleaner.
    _randomizeLocation(){
        this._location.x = Math.ceil(Math.random() * 10);
        this._location.y = Math.ceil(Math.random() * 10);
    }
    
    // special keyword 'get' in front of the method allows location() to be accessed like me.location
    get location(){
        return this._location;
    }
    
    // special keyword 'set' in front of the method allows location(value) to be accessed like me.location = value;
    
    set location(value){
        this._location = value;
    }
    
}

let me = new Person('Jason', 29);
me.speak();
console.log(me.location);
me.location = 99;
console.log(me.location);
