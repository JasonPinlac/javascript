'use strict';
// Global DOM variables
const timeArea = document.getElementById('time-area');
const feedbackArea = document.getElementById('feedback-area');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

// Initial setup
feedbackArea.style.display = 'none';

// Global Variables
let stopwatch = new Stopwatch();

// Events
startButton.addEventListener('click', function(){
    feedbackArea.innerText = 'Starting the stopwatch.';
    feedbackArea.style.display = 'block';
    stopwatch.start();
});

stopButton.addEventListener('click', function(){
    feedbackArea.innerText = 'Stoping the stopwatch.';
    feedbackArea.style.display = 'block';
    stopwatch.stop();
});

resetButton.addEventListener('click', function(){
    feedbackArea.innerText = 'Resetting the stopwatch.';
    feedbackArea.style.display = 'block';
    stopwatch.reset();
});

// Constructor Function
function Stopwatch(){
    // private properties
    let _startTime = null, _stopTime = null, _timeElapsed = 0, _totalTimeElapsed = 0, _isRunning = false;

    // public methods
    this.start = function(){
        if(!_isRunning){
            _isRunning = true;
            _startTime = new Date();
            _startTime = _startTime.valueOf();
        }else{
            feedbackArea.innerText = 'Stopwatch has arleady been started.';
            feedbackArea.style.display = 'block';
        }
    }

    this.stop = function(){
        if(_isRunning){
            _isRunning = false;
            _stopTime = new Date();
            _stopTime = _stopTime.valueOf();
            _timeElapsed = _stopTime - _startTime;
            _totalTimeElapsed += _timeElapsed;
            calculateTimeAndDisplayFormatted(_totalTimeElapsed);
        }else{
            feedbackArea.innerText = 'Stopwatch has arleady been stopped.';
            feedbackArea.style.display = 'block';
        }
    }

    this.reset = function(){
        if(!_isRunning){
            _isRunning = false;
            _startTime = null;
            _stopTime = null;
            _timeElapsed = 0;
            _totalTimeElapsed = 0;
            calculateTimeAndDisplayFormatted(_totalTimeElapsed);
        }else{
            feedbackArea.innerText = 'Stopwatch has to be stopped in order to reset.';
            feedbackArea.style.display = 'block';
        }
    }

    // private methods
    let calculateTimeAndDisplayFormatted = function(totalMilliseconds){
        let millisecondsRemaining = totalMilliseconds % 1000;
        let seconds = Math.floor(totalMilliseconds / 1000);
        let secondsRemaining = seconds % 60;
        let minutes = Math.floor(seconds / 60);
        timeArea.innerText = leftFillZeros(2, minutes.toString()) + " : " + leftFillZeros(2, secondsRemaining.toString()) + " : " + leftFillZeros(3, millisecondsRemaining.toString());
    }
}

// Global utility functions
function leftFillZeros(maxLength, str){
    while(str.length < maxLength){
        str = "0" + str;
    }
    return str;
}



