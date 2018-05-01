// global DOM variables

let nut1 = document.getElementById('nut1');
let nut2 = document.getElementById('nut2');
let nut3 = document.getElementById('nut3');
let nut4 = document.getElementById('nut4');
let rollButton = document.getElementById('roll-button');
let statsArea = document.getElementById('stats-area');

rollButton.addEventListener('click', function(){
    rollNuts();
});



let numberOfHeadsCount = 0;
let numberOfEvens = 0;
let numberOfRolls = 0;

function rollNuts(){
    for(let i = 1; i <=4 ; i++){
        let res = (Math.floor(Math.random() * 10)) % 2;
        if(res == 0){
            numberOfHeadsCount++;
        }
        switch(i){
            case 1:
                nut1.innerText = "nut 1: " + res.toString();
                break;
            case 2:
                nut2.innerText = "nut 2: " +res.toString();
                break;
            case 3:
                nut3.innerText = "nut 3: " +res.toString();
                break;
            default:
                nut4.innerText = "nut 4: " +res.toString();
                break;
        }
    }
    if(numberOfHeadsCount % 2 == 0){
        numberOfEvens++;
    }

    numberOfRolls++;
   

    statsArea.innerText = (numberOfEvens/numberOfRolls) * 100 + "%";
}

