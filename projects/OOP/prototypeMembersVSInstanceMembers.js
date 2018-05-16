function Person(name, a){
    this.name = name;
    // this.speak = function(){
    //     console.log('Hi my name is ' + this.name);
    // };
    let age = a;
}

Person.prototype.speak = function(){
    console.log('Hi my name is ' + this.name + ' and I am ' + age + ' years old.');
};

let p = new Person('Jason', 29);
p.speak();
