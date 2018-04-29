// Global DOM Variables
let dispatcherVisualQueue = document.getElementById('dispatcher-visual-queue');
let dispatcherLog = document.getElementById('dispatcher-log');

let tenthFloor = document.getElementById('tenth-floor');
let ninthFloor = document.getElementById('ninth-floor');
let eithFloor = document.getElementById('eith-floor');
let seventhFloor = document.getElementById('seventh-floor');
let sixthFloor = document.getElementById('sixth-floor');
let fifthFloor = document.getElementById('fifth-floor');
let fourthFloor = document.getElementById('fourth-floor');
let thirdFloor = document.getElementById('third-floor');
let secondFloor = document.getElementById('second-floor');
let firstFloor = document.getElementById('first-floor');

let button10 = document.getElementById('button-10');
let button9 = document.getElementById('button-9');
let button8 = document.getElementById('button-8');
let button7 = document.getElementById('button-7');
let button6 = document.getElementById('button-6');
let button5 = document.getElementById('button-5');
let button4 = document.getElementById('button-4');
let button3 = document.getElementById('button-3');
let button2 = document.getElementById('button-2');
let button1 = document.getElementById('button-1');

let downButton10 = document.getElementById('down-button-10');
let downButton9 = document.getElementById('down-button-9');
let downButton8 = document.getElementById('down-button-8');
let downButton7 = document.getElementById('down-button-7');
let downButton6 = document.getElementById('down-button-6');
let downButton5 = document.getElementById('down-button-5');
let downButton4 = document.getElementById('down-button-4');
let downButton3 = document.getElementById('down-button-3');
let downButton2 = document.getElementById('down-button-2');

let upButton9 = document.getElementById('up-button-9');
let upButton8 = document.getElementById('up-button-8');
let upButton7 = document.getElementById('up-button-7');
let upButton6 = document.getElementById('up-button-6');
let upButton5 = document.getElementById('up-button-5');
let upButton4 = document.getElementById('up-button-4');
let upButton3 = document.getElementById('up-button-3');
let upButton2 = document.getElementById('up-button-2');
let upButton1 = document.getElementById('up-button-1');

// Initial Setup
button10.style.display = 'none';
button9.style.display = 'none';
button8.style.display = 'none';
button7.style.display = 'none';
button6.style.display = 'none';
button5.style.display = 'none';
button4.style.display = 'none';
button3.style.display = 'none';
button2.style.display = 'none';
button1.style.display = 'none';

// Events
downButton10.addEventListener('click', function(){
    // Hide all direction buttons
    downButton10.style.display = 'none';
    downButton9.style.display = 'none';
    downButton8.style.display = 'none';
    downButton7.style.display = 'none';
    downButton6.style.display = 'none';
    downButton5.style.display = 'none';
    downButton4.style.display = 'none';
    downButton3.style.display = 'none';
    downButton2.style.display = 'none';

    upButton9.style.display = 'none';
    upButton8.style.display = 'none';
    upButton7.style.display = 'none';
    upButton6.style.display = 'none';
    upButton5.style.display = 'none';
    upButton4.style.display = 'none';
    upButton3.style.display = 'none';
    upButton2.style.display = 'none';
    upButton1.style.display = 'none';

    // Show floor buttons
    button9.style.display = 'inline';
    button8.style.display = 'inline';
    button7.style.display = 'inline';
    button6.style.display = 'inline';
    button5.style.display = 'inline';
    button4.style.display = 'inline';
    button3.style.display = 'inline';
    button2.style.display = 'inline';
    button1.style.display = 'inline';
});
downButton9.addEventListener('click', function(){
    // Hide all direction buttons
    downButton10.style.display = 'none';
    downButton9.style.display = 'none';
    downButton8.style.display = 'none';
    downButton7.style.display = 'none';
    downButton6.style.display = 'none';
    downButton5.style.display = 'none';
    downButton4.style.display = 'none';
    downButton3.style.display = 'none';
    downButton2.style.display = 'none';
    upButton9.style.display = 'none';
    upButton8.style.display = 'none';
    upButton7.style.display = 'none';
    upButton6.style.display = 'none';
    upButton5.style.display = 'none';
    upButton4.style.display = 'none';
    upButton3.style.display = 'none';
    upButton2.style.display = 'none';
    upButton1.style.display = 'none';

    // Show floor buttons
    button8.style.display = 'inline';
    button7.style.display = 'inline';
    button6.style.display = 'inline';
    button5.style.display = 'inline';
    button4.style.display = 'inline';
    button3.style.display = 'inline';
    button2.style.display = 'inline';
    button1.style.display = 'inline';
});
downButton8.addEventListener('click', function(){
    // Hide all direction buttons
    downButton10.style.display = 'none';
    downButton9.style.display = 'none';
    downButton8.style.display = 'none';
    downButton7.style.display = 'none';
    downButton6.style.display = 'none';
    downButton5.style.display = 'none';
    downButton4.style.display = 'none';
    downButton3.style.display = 'none';
    downButton2.style.display = 'none';
    upButton9.style.display = 'none';
    upButton8.style.display = 'none';
    upButton7.style.display = 'none';
    upButton6.style.display = 'none';
    upButton5.style.display = 'none';
    upButton4.style.display = 'none';
    upButton3.style.display = 'none';
    upButton2.style.display = 'none';
    upButton1.style.display = 'none';

    // Show floor buttons
    button7.style.display = 'inline';
    button6.style.display = 'inline';
    button5.style.display = 'inline';
    button4.style.display = 'inline';
    button3.style.display = 'inline';
    button2.style.display = 'inline';
    button1.style.display = 'inline';
});
downButton7.addEventListener('click', function(){
    // Hide all direction buttons
    downButton10.style.display = 'none';
    downButton9.style.display = 'none';
    downButton8.style.display = 'none';
    downButton7.style.display = 'none';
    downButton6.style.display = 'none';
    downButton5.style.display = 'none';
    downButton4.style.display = 'none';
    downButton3.style.display = 'none';
    downButton2.style.display = 'none';
    upButton9.style.display = 'none';
    upButton8.style.display = 'none';
    upButton7.style.display = 'none';
    upButton6.style.display = 'none';
    upButton5.style.display = 'none';
    upButton4.style.display = 'none';
    upButton3.style.display = 'none';
    upButton2.style.display = 'none';
    upButton1.style.display = 'none';

    // Show floor buttons
    button6.style.display = 'inline';
    button5.style.display = 'inline';
    button4.style.display = 'inline';
    button3.style.display = 'inline';
    button2.style.display = 'inline';
    button1.style.display = 'inline';
});
downButton6.addEventListener('click', function(){
    // Hide all direction buttons
    downButton10.style.display = 'none';
    downButton9.style.display = 'none';
    downButton8.style.display = 'none';
    downButton7.style.display = 'none';
    downButton6.style.display = 'none';
    downButton5.style.display = 'none';
    downButton4.style.display = 'none';
    downButton3.style.display = 'none';
    downButton2.style.display = 'none';
    upButton9.style.display = 'none';
    upButton8.style.display = 'none';
    upButton7.style.display = 'none';
    upButton6.style.display = 'none';
    upButton5.style.display = 'none';
    upButton4.style.display = 'none';
    upButton3.style.display = 'none';
    upButton2.style.display = 'none';
    upButton1.style.display = 'none';

    // Show floor buttons
    button5.style.display = 'inline';
    button4.style.display = 'inline';
    button3.style.display = 'inline';
    button2.style.display = 'inline';
    button1.style.display = 'inline';
});
downButton5.addEventListener('click', function(){
    // Hide all direction buttons
    downButton10.style.display = 'none';
    downButton9.style.display = 'none';
    downButton8.style.display = 'none';
    downButton7.style.display = 'none';
    downButton6.style.display = 'none';
    downButton5.style.display = 'none';
    downButton4.style.display = 'none';
    downButton3.style.display = 'none';
    downButton2.style.display = 'none';
    upButton9.style.display = 'none';
    upButton8.style.display = 'none';
    upButton7.style.display = 'none';
    upButton6.style.display = 'none';
    upButton5.style.display = 'none';
    upButton4.style.display = 'none';
    upButton3.style.display = 'none';
    upButton2.style.display = 'none';
    upButton1.style.display = 'none';

    // Show floor buttons
    button4.style.display = 'inline';
    button3.style.display = 'inline';
    button2.style.display = 'inline';
    button1.style.display = 'inline';
});
downButton4.addEventListener('click', function(){
    // Hide all direction buttons
    downButton10.style.display = 'none';
    downButton9.style.display = 'none';
    downButton8.style.display = 'none';
    downButton7.style.display = 'none';
    downButton6.style.display = 'none';
    downButton5.style.display = 'none';
    downButton4.style.display = 'none';
    downButton3.style.display = 'none';
    downButton2.style.display = 'none';
    upButton9.style.display = 'none';
    upButton8.style.display = 'none';
    upButton7.style.display = 'none';
    upButton6.style.display = 'none';
    upButton5.style.display = 'none';
    upButton4.style.display = 'none';
    upButton3.style.display = 'none';
    upButton2.style.display = 'none';
    upButton1.style.display = 'none';

    // Show floor buttons
    button3.style.display = 'inline';
    button2.style.display = 'inline';
    button1.style.display = 'inline';
});
downButton3.addEventListener('click', function(){
    // Hide all direction buttons
    downButton10.style.display = 'none';
    downButton9.style.display = 'none';
    downButton8.style.display = 'none';
    downButton7.style.display = 'none';
    downButton6.style.display = 'none';
    downButton5.style.display = 'none';
    downButton4.style.display = 'none';
    downButton3.style.display = 'none';
    downButton2.style.display = 'none';
    upButton9.style.display = 'none';
    upButton8.style.display = 'none';
    upButton7.style.display = 'none';
    upButton6.style.display = 'none';
    upButton5.style.display = 'none';
    upButton4.style.display = 'none';
    upButton3.style.display = 'none';
    upButton2.style.display = 'none';
    upButton1.style.display = 'none';

    // Show floor buttons
    button2.style.display = 'inline';
    button1.style.display = 'inline';
});
downButton2.addEventListener('click', function(){
    // Hide all direction buttons
    downButton10.style.display = 'none';
    downButton9.style.display = 'none';
    downButton8.style.display = 'none';
    downButton7.style.display = 'none';
    downButton6.style.display = 'none';
    downButton5.style.display = 'none';
    downButton4.style.display = 'none';
    downButton3.style.display = 'none';
    downButton2.style.display = 'none';
    upButton9.style.display = 'none';
    upButton8.style.display = 'none';
    upButton7.style.display = 'none';
    upButton6.style.display = 'none';
    upButton5.style.display = 'none';
    upButton4.style.display = 'none';
    upButton3.style.display = 'none';
    upButton2.style.display = 'none';
    upButton1.style.display = 'none';

    // Show floor buttons
    button1.style.display = 'inline';
});
upButton9.addEventListener('click', function(){

});

// Classes
function Dispatcher(){
    this.queue = [];
}

function Elevator(){
    this.queue = [];
}

function Job(direction, floorNumber){
    this.direction = directions;
    this.floorNumber = floorNumber;
}