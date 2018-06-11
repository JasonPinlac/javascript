// let person = {
//     name: 'Jason',
//     age: 29
// };
// console.log(person);

// // enumerate an objects properties as keys
// for(let key in person){
//     console.log(key);
// }

// let arrayOfKeys = Object.keys(person);
// console.log(arrayOfKeys);

// // return a property descriptor object for an objects properties
// let descriptorObj = Object.getOwnPropertyDescriptor(person, 'name');
// console.log(descriptorObj);

// // return a property descriptor object for an objects prototype properties
// let objectProto = Object.getPrototypeOf(person);
// let descriptorObj2 = Object.getOwnPropertyDescriptor(objectProto, 'toString');
// console.log(descriptorObj2)

let person = {
    name: 'Jason',
}
console.log(person.name);

// if we want to define a properties descriptors (attributes of a property)
Object.defineProperty(person, 'name', {
    writable: false, // change the value
    enumerable: false, // able to enumerated by the for in loop or Object.keys
    configurable: true, // able to delete the property
});

person.name = 'mike';
console.log(person.name);

for (eachProperty in person){
    console.log(eachProperty);
}

let personProperties = Object.keys(person);
console.log(personProperties);

// In javascript properties have attributes attached to them
// for example we don't see toString method of the person property

let personPrototype = Object.getPrototypeOf(person);
console.log(personPrototype);

let descriptorObject = Object.getOwnPropertyDescriptor(personPrototype, 'toString');
console.log(descriptorObject);


console.log(personProperties);