// Global DOM Variables
let timeArea = document.getElementById('time-area');



let refreshClock = setInterval(getCurrentTime, 1000);

function getCurrentTime(){
    let now = new Date();
    timeArea.innerText = now;
}




