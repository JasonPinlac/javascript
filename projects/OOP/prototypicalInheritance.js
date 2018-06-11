// In javacript we do not have classes. We only have objects!
// a prototype is a parent of an object

let x = {}; // protoype of this object is Object base.

// this OBJECT BASE prototype object is a single object in memory that everything inhereits from. ROOT OF ALL OBEJCT AND DOES NOT HAVE A PROTOTYPE/PARENT


let y = {}; 


// to get the protoype of an object we call

let xProto = Object.getPrototypeOf(x);
let yProto = Object.getPrototypeOf(y);

console.log(xProto);
console.log(yProto);

// when we access a member of an obejct (method or property) javascript will first look at the object and then move up its prototype chain to find that target member.
// a prototype is jsut a regular object in memory. ev ery object has a prototype/ parent object except the root object.



let myArray = [];

// the prototype of myArray is the ARRAY BASE object which its prototype is the OBJECT BASE object.
