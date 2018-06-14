// this exercise is to see what are the percentages of math.random for values 1 though 10.
// I will run sample sizes of 10, 100, 1000, 10000

class Simulator {
    constructor() {
        this._one = "";
        this._two = "";
        this._three = "";
        this._four = "";
        this._five = "";
        this._six = "";
        this._seven = "";
        this._eight = "";
        this._nine = "";
        this._ten = "";
        this._oneCount = 0;
        this._twoCount = 0;
        this._threeCount = 0;
        this._fourCount = 0;
        this._fiveCount = 0;
        this._sixCount = 0;
        this._sevenCount = 0;
        this._eightCount = 0;
        this._nineCount = 0;
        this._tenCount = 0;
    }

    simulateOnce() {
        this._reset();
        this._update(this._randomize());
        this._display();
    }
    
    simulateTenTimes() {
        this._reset();
        for(let i = 0; i < 10; i++) {
            this._update(this._randomize())
        }
        this._display();
    }

    simulateOneHundredTimes() {
        this._reset()
        for(let i = 0; i < 100; i++) {
            this._update(this._randomize())
        }
        this._display();
    }

    simulateNTimes(n) {
        this._reset()
        for(let i = 0; i < n; i++) {
            this._update(this._randomize())
        }
        this._display();
    }

    // private members
    _reset() {
        this.one = "";
        this.two = "";
        this.three = "";
        this.four = "";
        this.five = "";
        this.six = "";
        this.seven = "";
        this.eight = "";
        this.nine = "";
        this.ten = "";
        this.oneCount = 0;
        this.twoCount = 0;
        this.threeCount = 0;
        this.fourCount = 0;
        this.fiveCount = 0;
        this.sixCount = 0;
        this.sevenCount = 0;
        this.eightCount = 0;
        this.nineCount = 0;
        this.tenCount = 0;
    }

    _randomize() {
        return Math.ceil(Math.random()* 10);
    }

    _update(number) {
        switch(number) {
            case 1:
                this.one += "|";
                this.oneCount++;
                break;
            case 2:
                this.two += "|";
                this.twoCount++;
                break;
            case 3:
                this.three += "|";
                this.threeCount++;
                break;
            case 4:
                this.four += "|";
                this.fourCount++;
                break;
            case 5:
                this.five += "|";
                this.fiveCount++;
                break;
            case 6:
                this.six += "|";
                this.sixCount++;
                break;
            case 7:
                this.seven += "|";
                this.sevenCount++;
                break;
            case 8:
                this.eight += "|";
                this.eightCount++;
                break;
            case 9:
                this.nine += "|";
                this.nineCount++;
                break;
            case 10:
                this.ten += "|";
                this.tenCount++;
                break;
            default:
                break;
        }
    }

    _display() {
        console.log(`one  : ${this.one} - ${this.oneCount}
two  : ${this.two} - ${this.twoCount}
three: ${this.three} - ${this.threeCount}
four : ${this.four} - ${this.fourCount}
five : ${this.five} - ${this.fiveCount}
six  : ${this.six} - ${this.sixCount}
seven: ${this.seven} - ${this.sevenCount}
eight: ${this.eight} - ${this.eightCount}
nine : ${this.nine} - ${this.nineCount}
ten  : ${this.ten} - ${this.tenCount}`);
    }
}

let s = new Simulator();
