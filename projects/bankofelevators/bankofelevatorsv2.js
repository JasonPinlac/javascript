// Classes
function Dispatcher(){
    this.queue = [];
    this.elevators = [];

    this.assignJobs = function(){
        
        if(this.queue.length > 0){

            this.queue = removeDuplicateJobs(this.queue);

            // iterate through all jobs in the queue and hand off any if possible
            for(let i = 0; i < this.queue.length; i++){
                let job = this.queue[i];
                let isJobAssigned = false
             
                // checkout each elevator one at a time to see if it can take the job
                // an idle elevator takes priority
                for(let j = 0; j < this.elevators.length; j++){
                    let elevator = this.elevators[j];
                    if (elevator.isIdle)//elevator.destinationFloors.length === 0)
                    {
                        dispatcherLog.innerText += "The dispatcher hands off job [" + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + '] to elevator ' + elevator.name + '. ' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
                        elevator.queue.push(job);
                        elevator.startJob();
                        isJobAssigned = true;
                        this.queue.splice(i,1); // queue length will be -1. jobs will shift over and for loop condition is affected. We decrement i-- to account for this side effect of splicing.
                        i--;
                        break;
                    }
                }

                if(isJobAssigned){
                    continue;
                }

                // if there are no idle elevators to pick up the job checkout each elevator one at a time to see if it can take the job
                for(let j = 0; j < this.elevators.length; j++){
                    // Dispatcher hands out a job to an elevator currently moving the same direction and hasn't missed the floor yet
                    let elevator = this.elevators[j];
                    
                    // get the elevators min or max floor depending on the direction its currently heading. This is the last index in its current destinationFloors
                    let floorLimit = elevator.destinationFloors[elevator.destinationFloors.length-1];

                    if (!elevator.isIdle && job.direction === 'up' && elevator.direction === job.direction && elevator.currentFloor <= job.pickUpFloorNumber && job.pickUpFloorNumber <= floorLimit){
                        dispatcherLog.innerText += "The dispatcher hands off job [" + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + '] to elevator ' + elevator.name + '. ' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
                        elevator.queue.push(job);
                        this.queue.splice(i,1); // queue length will be -1. jobs will shift over and for loop condition is affected. We decrement i-- to account for this side effect of splicing.
						i--;
                        break;
                    }
                    else if (!elevator.isIdle && job.direction === 'down' && elevator.direction === job.direction && elevator.currentFloor >= job.pickUpFloorNumber && job.pickUpFloorNumber >= floorLimit){
                        dispatcherLog.innerText += "The dispatcher hands off job [" + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + '] to elevator ' + elevator.name + '. ' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
                        elevator.queue.push(job);
                        this.queue.splice(i,1); // queue length will be -1. jobs will shift over and for loop condition is affected. We decrement i-- to account for this side effect of splicing.
						i--;
                        break;
                    }
                }
            }
        }
    }

    let removeDuplicateJobs = function(arr){
        let uniqueArrString = [];
        let uniqueArrObj = []
        // stringify objects of the dispatcher queue and if duplicate don't insert into uniqueArray
        for(let i = 0; i < arr.length; i++){
            let currentToString = JSON.stringify(arr[i]);
            if(uniqueArrString.indexOf(currentToString) < 0){
                uniqueArrString.push(currentToString);
            }
        }
        // convert uniqueArray strings back to objects
        for(let j = 0; j < uniqueArrString.length; j++){
            uniqueArrObj.push(JSON.parse(uniqueArrString[j]));
        }
        return uniqueArrObj;
    }
}

function Elevator(name){
    this.name = name;
    this.isIdle = true;
    this.queue = [];
    this.currentFloor = 1;
    this.targetFloor = 0;
    this.destinationFloors = [];
    this.direction = 'up';

    this.startJob = function(){

        // if idle pick up a job from the queue
        if(this.isIdle && this.queue.length > 0){
            let job = this.queue.shift();
            this.isIdle = false;
            this.direction = job.direction;
            this.destinationFloors.push(job.pickUpFloorNumber);
            this.destinationFloors.push(job.destinationFloorNumber);
            elevatorLog.innerText += 'Elevator ' + this.name + ' has started job [' + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + ']. ' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
        }
    }

    this.adjustFloorDestinations = function(){

        if(!this.isIdle && this.queue.length > 0){
            
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
                    elevatorLog.innerText += 'Elevator ' + this.name + ' has queued up a new job [' + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + ']. ' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
                } 
                else if(this.direction === 'down' && this.currentFloor >= job.pickUpFloorNumber){
                    this.destinationFloors.push(job.pickUpFloorNumber);
                    this.destinationFloors.push(job.destinationFloorNumber);
                    this.queue.splice(index, 1);
                    hasBeenAdjusted = true;
                    elevatorLog.innerText += 'Elevator ' + this.name + ' has queued up a new job [' + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + ']. ' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
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
                elevatorLog.innerText += 'Elevator ' + this.name + " has adjusted it's destinationFloors [ " + this.destinationFloors.toString() + ' ] to this order.' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
            }
        }
    }

    this.realTimeMove = function(){

        if(this.targetFloor === 0){
            this.targetFloor = this.destinationFloors.shift();
        }

        if(!this.isIdle && this.currentFloor < this.targetFloor){
            this.currentFloor++;
            elevatorLog.innerText += 'Elevator ' + this.name + ' has moved up to floor ' + this.currentFloor + ". " + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
        }
        else if(!this.isIdle && this.currentFloor > this.targetFloor){
            this.currentFloor--;
            elevatorLog.innerText += 'Elevator ' + this.name + ' has moved down to floor ' + this.currentFloor + ". " + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
        }
        else if (!this.isIdle && this.currentFloor === this.targetFloor){

            if(this.destinationFloors.length === 0)
            {
                this.isIdle = true;
                elevatorLog.innerText += 'Elevator ' + this.name + ' has opened on its final floor destination ' + this.currentFloor + '. It is now idle. ' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
            }
            else
            {
                this.targetFloor = this.destinationFloors.shift();
                elevatorLog.innerText += 'Elevator ' + this.name + ' has opened on floor ' + this.currentFloor + ". " + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
            }
        }
    }

    this.move = function(){
        // if not idle it must have a have a job, move the elevator
        if (!this.isIdle && this.destinationFloors.length > 0){

            this.currentFloor = this.destinationFloors.shift();
            
            elevatorLog.innerText += 'Elevator ' + this.name + ' has opened on floor ' + this.currentFloor + ". " + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
        
            // depending on its direction if the elevator.currentFloor reaches(===) the 10th floor or 1st floor or its destinationFloors.length === 0
            // then set the elevator to idle
            if((this.direction === 'up' && this.currentFloor === 10) || this.destinationFloors.length === 0)
            {
                this.isIdle = true;
                elevatorLog.innerText += 'Elevator ' + this.name + ' has reached its final floor destination ' + this.currentFloor + '. It is now idle. ' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
            }
            else if((this.direction === 'down' && this.currentFloor === 1) || this.destinationFloors.length === 0){
                this.isIdle = true;
                elevatorLog.innerText += 'Elevator ' + this.name + ' has reached its final floor destination ' + this.currentFloor + '. It is now idle. ' + '(' +new Date().toTimeString().substring(0,8) + ')' + '\n';
            }
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
TheDispatcher.elevators.push(new Elevator('A'));
TheDispatcher.elevators.push(new Elevator('B'));
TheDispatcher.elevators.push(new Elevator('C'));
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

let dispatchJobMoveElevatorsInterval = setInterval(dispatchJobMoveElevators, 3000);
let updateTheUIInterval = setInterval(updateTheUI, 100);

function dispatchJobMoveElevators(){

    TheDispatcher.assignJobs();
    for(let index = 0; index < TheDispatcher.elevators.length; index++){
        let elevator = TheDispatcher.elevators[index];
        elevator.adjustFloorDestinations();
        elevator.move();
        //elevator.realTimeMove();
    }
}

function updateTheUI(){

     // Refresh the dispatcher queue
     let stringOfQueuedUpJobs = '';
     for(let index  = 0; index < TheDispatcher.queue.length; index++){
         let job = TheDispatcher.queue[index];
         stringOfQueuedUpJobs += ' [' + job.pickUpFloorNumber.toString() + ' to ' + job.destinationFloorNumber.toString() + '],';
     }
     dispatcherQueue.innerText = stringOfQueuedUpJobs.substring(0, stringOfQueuedUpJobs.length-1);

    // Refresh the elevator UI
    if(TheDispatcher.elevators[0].currentFloor === 10 && TheDispatcher.elevators[1].currentFloor === 10 && TheDispatcher.elevators[2].currentFloor === 10){
        tenthFloor.innerText = '10th floor  |__|A|__|__|B|__|__|C|__|';
        ninthFloor.innerText = '9th floor  |_______|_______|_______|';
        eithFloor.innerText = '8th floor  |_______|_______|_______|';
        seventhFloor.innerText = '7th floor  |_______|_______|_______|';
        sixthFloor.innerText = '6th floor  |_______|_______|_______|';
        fifthFloor.innerHTML = ' 5th floor  |_______|_______|_______|';
        fourthFloor.innerText = '4th floor  |_______|_______|_______|';
        thirdFloor.innerText = '3th floor  |_______|_______|_______|';
        secondFloor.innerText = '2nd floor  |_______|_______|_______|';
        firstFloor.innerText = '1st floor  |_______|_______|_______|';
    }
}