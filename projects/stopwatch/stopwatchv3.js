'use strict';
// Global DOM variables
const timeArea = document.getElementById('time-area');
const feedbackArea = document.getElementById('feedback-area');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

// Global Variables
let stopwatch = new Stopwatch();

// Initial setup
feedbackArea.style.display = 'none';

// Events
startButton.addEventListener('click', function(){
    feedbackArea.innerText = 'Started the stopwatch.';
    feedbackArea.style.display = 'block';
    stopwatch.start();
});

stopButton.addEventListener('click', function(){
    feedbackArea.innerText = 'Stopped the stopwatch.';
    feedbackArea.style.display = 'block';
    stopwatch.stop();
});

resetButton.addEventListener('click', function(){
    feedbackArea.innerText = 'Resetted the stopwatch.';
    feedbackArea.style.display = 'block';
    stopwatch.reset();
});

// Constructor Function
function Stopwatch(){
    // private properties
    let _isRunning = false;
    let _refresh = null;
    let _totalTime = 0;

    // public methods
    this.start = function(){
        if(!_isRunning){
            _isRunning = true;
            _refresh = setInterval(incrementAndDisplayTime, 10);
        }else{
            feedbackArea.innerText = 'Stopwatch has arleady been started.';
            feedbackArea.style.display = 'block';
        }
    }

    this.stop = function(){
        if(_isRunning){
            _isRunning = false;
            clearInterval(_refresh);
        }else{
            feedbackArea.innerText = 'Stopwatch has arleady been stopped.';
            feedbackArea.style.display = 'block';
        }
    }

    this.reset = function(){
        if(!_isRunning){
            _isRunning = false;
            _totalTime = 0;
            timeArea.innerText = '00 : 00 : 00 : 00';
        }else{
            feedbackArea.innerText = 'Stopwatch has to be stopped in order to reset.';
            feedbackArea.style.display = 'block';
        }
    }

    // private methods
    let incrementAndDisplayTime = function(){
        _totalTime += 10;
        timeArea.innerText = formatTimeAmount(_totalTime);
    }

    let formatTimeAmount = function(totalMilliseconds){
        let milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
        let totalSeconds = Math.floor(totalMilliseconds / 1000);
        let seconds = totalSeconds % 60;
        let totalMinutes = Math.floor(totalSeconds / 60);
        let minutes = totalMinutes % 60;
        let totalHours = Math.floor(totalMinutes / 60);
        let hours = totalHours % 24;
        
        return leftFillZeros(2, hours.toString()) + ' : ' + leftFillZeros(2, minutes.toString()) + ' : ' + leftFillZeros(2, seconds.toString()) + ' : ' + leftFillZeros(2, milliseconds.toString())
    }
}

// global utility functions
function leftFillZeros(lengthDesired, aString){
    while(aString.length < lengthDesired){
        aString = '0' + aString;
    }
    return aString;
}