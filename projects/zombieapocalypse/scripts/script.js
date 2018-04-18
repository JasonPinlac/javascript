var weapon;
var randomNumber;

alert("It is the zombie apocalypse. You are looting a store a suddenly a zombie bursts through the door!");
weapon = prompt("You sear around frantically for a weapon! What do you choose?");
alert("You attack the zombie with your " + weapon + "!");
randomNumber = Math.trunc(Math.random() * 100);
console.log(randomNumber);
if(randomNumber % 2 === 0){
    alert("The zombie bites you. You lose!");
}else{
    alert("You killed the zombie with your " + weapon + "! You win!");
}