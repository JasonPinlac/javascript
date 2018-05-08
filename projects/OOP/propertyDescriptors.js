let person = {
    name: 'Jason',
    age: 29
};
console.log(person);

// enumerate an objects properties as keys
for(let key in person){
    console.log(key);
}

let arrayOfKeys = Object.keys(person);
console.log(arrayOfKeys);

// return a property descriptor object for an objects properties
let descriptorObj = Object.getOwnPropertyDescriptor(person, 'name');
console.log(descriptorObj);

// return a property descriptor object for an objects prototype properties
let objectProto = Object.getPrototypeOf(person);
let descriptorObj2 = Object.getOwnPropertyDescriptor(objectProto, 'toString');
console.log(descriptorObj2)




