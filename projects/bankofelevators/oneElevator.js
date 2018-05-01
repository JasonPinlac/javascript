// Classes
function Dispatcher(){

    this.queue = [];
    this.elevators = [];

    this.assignJob = function(){
        
        let timeStamp = '(' +new Date().toTimeString().substring(0,8) + ')';

        if(this.queue.length > 0){

            // iterate through all jobs in the queue and hand off any if possible
            for(let i = 0; i < this.queue.length; i++){

                let job = this.queue[i];

                // checkout each elevator one at a time to see if it can take the job
                for(let j  = 0; j < this.elevators.length; j++){
                    
                    // Dispatcher hands out a job to an elevator if its idle or currently moving the same direction and hasn't missed the floor yet
                    let elevator = this.elevators[j];

                    if (elevator.isIdle){
                        dispatcherLog.innerText += "The dispatcher hands off job [" + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + '] to elevator ' + elevator.name + '. ' + timeStamp + '\n';
                        elevator.queue.push(job);
                        this.queue.splice(i,1);
                        break;
                    }
                    else if (!elevator.isIdle && job.direction === 'up' && elevator.direction === job.direction && elevator.currentFloor <= job.pickUpFloorNumber){
                        dispatcherLog.innerText += "The dispatcher hands off job [" + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + '] to elevator ' + elevator.name + '. ' + timeStamp + '\n';
                        elevator.queue.push(job);
                        this.queue.splice(i,1);
                        break;
                    }
                    else if (!elevator.isIdle && job.direction === 'down' && elevator.direction === job.direction && elevator.currentFloor >= job.pickUpFloorNumber){
                        dispatcherLog.innerText += "The dispatcher hands off job [" + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + '] to elevator ' + elevator.name + '. ' + timeStamp + '\n';
                        elevator.queue.push(job);
                        this.queue.splice(i,1);
                        break;
                    }
                }
            }
        }
    }
}

function Elevator(name){
    this.name = name;
    this.isIdle = true;
    this.queue = [];
    this.currentFloor = 1;
    this.destinationFloors = [];
    this.direction = 'up';

    this.startJob = function(){
        let timeStamp = '(' +new Date().toTimeString().substring(0,8) + ')';
        // if idle pick up a job from the queue
        if(this.isIdle && this.queue.length > 0){
            let job = this.queue.shift();
            this.isIdle = false;
            this.direction = job.direction;
            this.destinationFloors.push(job.pickUpFloorNumber);
            this.destinationFloors.push(job.destinationFloorNumber);
            elevatorLog.innerText += 'Elevator ' + this.name + ' has started job [' + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + ']. ' + timeStamp + '\n';
        }
    }

    this.adjustFloorDestinations = function(){

        if(!this.isIdle && this.queue.length > 0){
            
            let timeStamp = '(' +new Date().toTimeString().substring(0,8) + ')';
            let hasBeenAdjusted = false;

            // iterate through all jobs in the elevator queue
            for(let index = 0; index < this.queue.length; index++){

                let job = this.queue[index];
                

                // check if this job is compatible meaning the current floor hasnt passed the pickup floor
                if(this.direction === 'up' && this.currentFloor <= job.pickUpFloorNumber){
                    this.destinationFloors.push(job.pickUpFloorNumber);
                    this.destinationFloors.push(job.destinationFloorNumber);
                    this.queue.splice(index, 1);
                    hasBeenAdjusted = true;
                } 
                else if(this.direction === 'down' && this.currentFloor >= job.pickUpFloorNumber){
                    this.destinationFloors.push(job.pickUpFloorNumber);
                    this.destinationFloors.push(job.destinationFloorNumber);
                    this.queue.splice(index, 1);
                    hasBeenAdjusted = true;
                }
            }

            if(this.destinationFloors.length > 0 && hasBeenAdjusted){
                // remove all duplicate floors
                this.destinationFloors = removeDuplicates(this.destinationFloors);
                
                // re-adjust order of destination floors by sorting low to high (up direction) or high to low (down direction) 
                if(this.direction === 'up')
                {
                    this.destinationFloors.sort(lowToHigh);
                }
                else if(this.direction === 'down')
                {
                    this.destinationFloors.sort(highToLow);
                }
                elevatorLog.innerText += 'Elevator ' + this.name + " has adjusted it's destinationFloors [ " + this.destinationFloors.toString() + ' ] to this order.' + timeStamp + '\n';
            }
        }
    }

    this.move = function(){
        
        
        // if not idle it must have a have a job, move the elevator to jobAtHand.destinationFloors[0]
        if (!this.isIdle && this.destinationFloors.length > 0){
            // sort destinationFloors based on elevator direction. If going up sort smallest to largest. If going down sort largest to smallest.

            // check to see if the elevator has any jobs in its queue that we can complete while going up to its jobAtHand.destination

            //if the elevator.currentFloor reaches(===) the elevator.jobAtHand.destinationFloor then set the elevator to idle and reset any properties necessary i.E job at hand.
        }
    }

    let lowToHigh = function(a, b){
        return a - b;
    }

    let highToLow = function(a, b){
        return b - a;
    }

    let removeDuplicates = function(arr){
        let uniqueArray = [];
        for(let i = 0;i < arr.length; i++){
            if(uniqueArray.indexOf(arr[i]) == -1){
                uniqueArray.push(arr[i])
            }
        }
        return uniqueArray;
    }
}

function Job(direction, pickUpFloorNumber, destinationFloorNumber){
    this.direction = direction;
    this.pickUpFloorNumber = pickUpFloorNumber;
    this.destinationFloorNumber = destinationFloorNumber;
}

// Global DOM Variables
let dispatcherQueue = document.getElementById('dispatcher-queue');
let dispatcherLog = document.getElementById('dispatcher-log');
let elevatorLog = document.getElementById('elevator-log');

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

// Global Variables
let TheDispatcher = new Dispatcher();
let Direction = '';
let PickUpFloorNumber = 0;

// Initial Setup
TheDispatcher.elevators.push(new Elevator('E'));
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

    Direction = 'down';
    PickUpFloorNumber = 10;
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

    Direction = 'down';
    PickUpFloorNumber = 9;
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

    Direction = 'down';
    PickUpFloorNumber = 8;
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

    Direction = 'down';
    PickUpFloorNumber = 7;
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

    Direction = 'down';
    PickUpFloorNumber = 6;
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

    Direction = 'down';
    PickUpFloorNumber = 5;
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

    Direction = 'down';
    PickUpFloorNumber = 4;
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

    Direction = 'down';
    PickUpFloorNumber = 3;
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

    Direction = 'down';
    PickUpFloorNumber = 2;
});
upButton9.addEventListener('click', function(){
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
    button10.style.display = 'inline';

    Direction = 'up';
    PickUpFloorNumber = 9;
});
upButton8.addEventListener('click', function(){
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
    button10.style.display = 'inline';
    button9.style.display = 'inline';

    Direction = 'up';
    PickUpFloorNumber = 8;
});
upButton7.addEventListener('click', function(){
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
    button10.style.display = 'inline';
    button9.style.display = 'inline';
    button8.style.display = 'inline';

    Direction = 'up';
    PickUpFloorNumber = 7;
});
upButton6.addEventListener('click', function(){
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
    button10.style.display = 'inline';
    button9.style.display = 'inline';
    button8.style.display = 'inline';
    button7.style.display = 'inline';

    Direction = 'up';
    PickUpFloorNumber = 6;
});
upButton5.addEventListener('click', function(){
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
    button10.style.display = 'inline';
    button9.style.display = 'inline';
    button8.style.display = 'inline';
    button7.style.display = 'inline';
    button6.style.display = 'inline';

    Direction = 'up';
    PickUpFloorNumber = 5;
});
upButton4.addEventListener('click', function(){
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
    button10.style.display = 'inline';
    button9.style.display = 'inline';
    button8.style.display = 'inline';
    button7.style.display = 'inline';
    button6.style.display = 'inline';
    button5.style.display = 'inline';

    Direction = 'up';
    PickUpFloorNumber = 4;
});
upButton3.addEventListener('click', function(){
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
    button10.style.display = 'inline';
    button9.style.display = 'inline';
    button8.style.display = 'inline';
    button7.style.display = 'inline';
    button6.style.display = 'inline';
    button5.style.display = 'inline';
    button4.style.display = 'inline';

    Direction = 'up';
    PickUpFloorNumber = 3;
});
upButton2.addEventListener('click', function(){
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
    button10.style.display = 'inline';
    button9.style.display = 'inline';
    button8.style.display = 'inline';
    button7.style.display = 'inline';
    button6.style.display = 'inline';
    button5.style.display = 'inline';
    button4.style.display = 'inline';
    button3.style.display = 'inline';

    Direction = 'up';
    PickUpFloorNumber = 2;
});
upButton1.addEventListener('click', function(){
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
    button10.style.display = 'inline';
    button9.style.display = 'inline';
    button8.style.display = 'inline';
    button7.style.display = 'inline';
    button6.style.display = 'inline';
    button5.style.display = 'inline';
    button4.style.display = 'inline';
    button3.style.display = 'inline';
    button2.style.display = 'inline';

    Direction = 'up';
    PickUpFloorNumber = 1;
});

button10.addEventListener('click', function(){
    // Hide floor # buttons
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
    // Show directional buttons
    downButton10.style.display = 'inline';
    downButton9.style.display = 'inline';
    downButton8.style.display = 'inline';
    downButton7.style.display = 'inline';
    downButton6.style.display = 'inline';
    downButton5.style.display = 'inline';
    downButton4.style.display = 'inline';
    downButton3.style.display = 'inline';
    downButton2.style.display = 'inline';
    upButton9.style.display = 'inline';
    upButton8.style.display = 'inline';
    upButton7.style.display = 'inline';
    upButton6.style.display = 'inline';
    upButton5.style.display = 'inline';
    upButton4.style.display = 'inline';
    upButton3.style.display = 'inline';
    upButton2.style.display = 'inline';
    upButton1.style.display = 'inline';

    // Create a job and send it to the dispatcher 
    dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 10].\n';
    TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 10));
});
button9.addEventListener('click', function(){
        // Hide floor # buttons
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
        // Show directional buttons
        downButton10.style.display = 'inline';
        downButton9.style.display = 'inline';
        downButton8.style.display = 'inline';
        downButton7.style.display = 'inline';
        downButton6.style.display = 'inline';
        downButton5.style.display = 'inline';
        downButton4.style.display = 'inline';
        downButton3.style.display = 'inline';
        downButton2.style.display = 'inline';
        upButton9.style.display = 'inline';
        upButton8.style.display = 'inline';
        upButton7.style.display = 'inline';
        upButton6.style.display = 'inline';
        upButton5.style.display = 'inline';
        upButton4.style.display = 'inline';
        upButton3.style.display = 'inline';
        upButton2.style.display = 'inline';
        upButton1.style.display = 'inline';
    
        // Create a job and send it to the dispatcher
        dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 9].\n';
        TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 9));
});
button8.addEventListener('click', function(){
        // Hide floor # buttons
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
        // Show directional buttons
        downButton10.style.display = 'inline';
        downButton9.style.display = 'inline';
        downButton8.style.display = 'inline';
        downButton7.style.display = 'inline';
        downButton6.style.display = 'inline';
        downButton5.style.display = 'inline';
        downButton4.style.display = 'inline';
        downButton3.style.display = 'inline';
        downButton2.style.display = 'inline';
        upButton9.style.display = 'inline';
        upButton8.style.display = 'inline';
        upButton7.style.display = 'inline';
        upButton6.style.display = 'inline';
        upButton5.style.display = 'inline';
        upButton4.style.display = 'inline';
        upButton3.style.display = 'inline';
        upButton2.style.display = 'inline';
        upButton1.style.display = 'inline';
    
        // Create a job and send it to the dispatcher
        dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 8].\n';
        TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 8));
});
button7.addEventListener('click', function(){
        // Hide floor # buttons
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
        // Show directional buttons
        downButton10.style.display = 'inline';
        downButton9.style.display = 'inline';
        downButton8.style.display = 'inline';
        downButton7.style.display = 'inline';
        downButton6.style.display = 'inline';
        downButton5.style.display = 'inline';
        downButton4.style.display = 'inline';
        downButton3.style.display = 'inline';
        downButton2.style.display = 'inline';
        upButton9.style.display = 'inline';
        upButton8.style.display = 'inline';
        upButton7.style.display = 'inline';
        upButton6.style.display = 'inline';
        upButton5.style.display = 'inline';
        upButton4.style.display = 'inline';
        upButton3.style.display = 'inline';
        upButton2.style.display = 'inline';
        upButton1.style.display = 'inline';
    
        // Create a job and send it to the dispatcher
        dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 7].\n';
        TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 7));
});
button6.addEventListener('click', function(){
        // Hide floor # buttons
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
        // Show directional buttons
        downButton10.style.display = 'inline';
        downButton9.style.display = 'inline';
        downButton8.style.display = 'inline';
        downButton7.style.display = 'inline';
        downButton6.style.display = 'inline';
        downButton5.style.display = 'inline';
        downButton4.style.display = 'inline';
        downButton3.style.display = 'inline';
        downButton2.style.display = 'inline';
        upButton9.style.display = 'inline';
        upButton8.style.display = 'inline';
        upButton7.style.display = 'inline';
        upButton6.style.display = 'inline';
        upButton5.style.display = 'inline';
        upButton4.style.display = 'inline';
        upButton3.style.display = 'inline';
        upButton2.style.display = 'inline';
        upButton1.style.display = 'inline';
    
        // Create a job and send it to the dispatcher
        dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 6].\n';
        TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 6));
});
button5.addEventListener('click', function(){
        // Hide floor # buttons
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
    // Show directional buttons
    downButton10.style.display = 'inline';
    downButton9.style.display = 'inline';
    downButton8.style.display = 'inline';
    downButton7.style.display = 'inline';
    downButton6.style.display = 'inline';
    downButton5.style.display = 'inline';
    downButton4.style.display = 'inline';
    downButton3.style.display = 'inline';
    downButton2.style.display = 'inline';
    upButton9.style.display = 'inline';
    upButton8.style.display = 'inline';
    upButton7.style.display = 'inline';
    upButton6.style.display = 'inline';
    upButton5.style.display = 'inline';
    upButton4.style.display = 'inline';
    upButton3.style.display = 'inline';
    upButton2.style.display = 'inline';
    upButton1.style.display = 'inline';

    // Create a job and send it to the dispatcher
    dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 5].\n';
    TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 5));
});
button4.addEventListener('click', function(){
    // Hide floor # buttons
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
    // Show directional buttons
    downButton10.style.display = 'inline';
    downButton9.style.display = 'inline';
    downButton8.style.display = 'inline';
    downButton7.style.display = 'inline';
    downButton6.style.display = 'inline';
    downButton5.style.display = 'inline';
    downButton4.style.display = 'inline';
    downButton3.style.display = 'inline';
    downButton2.style.display = 'inline';
    upButton9.style.display = 'inline';
    upButton8.style.display = 'inline';
    upButton7.style.display = 'inline';
    upButton6.style.display = 'inline';
    upButton5.style.display = 'inline';
    upButton4.style.display = 'inline';
    upButton3.style.display = 'inline';
    upButton2.style.display = 'inline';
    upButton1.style.display = 'inline';

    // Create a job and send it to the dispatcher
    dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 4].\n';
    TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 4));
});
button3.addEventListener('click', function(){
    // Hide floor # buttons
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
    // Show directional buttons
    downButton10.style.display = 'inline';
    downButton9.style.display = 'inline';
    downButton8.style.display = 'inline';
    downButton7.style.display = 'inline';
    downButton6.style.display = 'inline';
    downButton5.style.display = 'inline';
    downButton4.style.display = 'inline';
    downButton3.style.display = 'inline';
    downButton2.style.display = 'inline';
    upButton9.style.display = 'inline';
    upButton8.style.display = 'inline';
    upButton7.style.display = 'inline';
    upButton6.style.display = 'inline';
    upButton5.style.display = 'inline';
    upButton4.style.display = 'inline';
    upButton3.style.display = 'inline';
    upButton2.style.display = 'inline';
    upButton1.style.display = 'inline';

    // Create a job and send it to the dispatcher
    dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 3].\n';
    TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 3));
});
button2.addEventListener('click', function(){
    // Hide floor # buttons
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
    // Show directional buttons
    downButton10.style.display = 'inline';
    downButton9.style.display = 'inline';
    downButton8.style.display = 'inline';
    downButton7.style.display = 'inline';
    downButton6.style.display = 'inline';
    downButton5.style.display = 'inline';
    downButton4.style.display = 'inline';
    downButton3.style.display = 'inline';
    downButton2.style.display = 'inline';
    upButton9.style.display = 'inline';
    upButton8.style.display = 'inline';
    upButton7.style.display = 'inline';
    upButton6.style.display = 'inline';
    upButton5.style.display = 'inline';
    upButton4.style.display = 'inline';
    upButton3.style.display = 'inline';
    upButton2.style.display = 'inline';
    upButton1.style.display = 'inline';

    // Create a job and send it to the dispatcher
    dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 2].\n';
    TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 2));
});
button1.addEventListener('click', function(){
    // Hide floor # buttons
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
    // Show directional buttons
    downButton10.style.display = 'inline';
    downButton9.style.display = 'inline';
    downButton8.style.display = 'inline';
    downButton7.style.display = 'inline';
    downButton6.style.display = 'inline';
    downButton5.style.display = 'inline';
    downButton4.style.display = 'inline';
    downButton3.style.display = 'inline';
    downButton2.style.display = 'inline';
    upButton9.style.display = 'inline';
    upButton8.style.display = 'inline';
    upButton7.style.display = 'inline';
    upButton6.style.display = 'inline';
    upButton5.style.display = 'inline';
    upButton4.style.display = 'inline';
    upButton3.style.display = 'inline';
    upButton2.style.display = 'inline';
    upButton1.style.display = 'inline';

    // Create a job and send it to the dispatcher
    dispatcherLog.innerText += 'The dispatcher has queued up a new job [' + PickUpFloorNumber.toString() + ' to 1].\n';
    TheDispatcher.queue.push(new Job(Direction, PickUpFloorNumber, 1));
});

let refresher = setInterval(dispatchJobMoveElevatorsAndRefreshTheUI, 1000);

function dispatchJobMoveElevatorsAndRefreshTheUI(){
   TheDispatcher.assignJob();
   for(let index = 0; index < TheDispatcher.elevators.length; index++){
        let elevator = TheDispatcher.elevators[index];
        elevator.startJob();
        elevator.adjustFloorDestinations();
        elevator.move();
   }
   updateTheUI();
}

function updateTheUI(){
     // Refresh the dispatcher queue
     let stringOfQueuedUpJobs = '';
     for(let index  = 0; index < TheDispatcher.queue.length; index++){
         let job = TheDispatcher.queue[index];
         stringOfQueuedUpJobs += ' [' + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + '],';
     }
     dispatcherQueue.innerText = stringOfQueuedUpJobs.substring(0, stringOfQueuedUpJobs.length-1);
}