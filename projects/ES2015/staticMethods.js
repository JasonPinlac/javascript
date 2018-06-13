class Person {
    constructor(name, age) {
        //properties
        this.name = name;
        this.age = age;
    }

    // method
    speak() {
        console.log(`Hi, my name is ${this.name}`)
    }

    //static method
    //use static methods to create utility methods that are not tied to a particular object
    static parse(str) {
        let aName = JSON.parse(str).name;
        let aAge = JSON.parse(str).age;
        return new Person(aName, aAge);
    }
}

let me = new Person('Jason', 29);

let you = Person.parse('{"name":"mike", "age":"30"}');
console.log(you);