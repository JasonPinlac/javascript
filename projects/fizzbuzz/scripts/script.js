console.log("Welcome to FIZZ BUZZ!");
console.log("Generating a number...");

var randomNumber = Math.trunc(Math.random() * 101);

console.log("Random number: " + randomNumber);

if(randomNumber === 0){
    console.log(randomNumer);
}
else if(randomNumber % 3 === 0 && randomNumber % 5 === 0){
    console.log("FizzBuzz");
}else if(randomNumber % 3 === 0){
    console.log("Fizz");
}else if(randomNumber %  5 === 0){
    console.log("Buzz");
}else{
    console.log(randomNumber);
}