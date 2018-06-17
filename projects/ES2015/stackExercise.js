/// create a stack using es6 classes


class Stack {
    constructor(){
        this._underlyingArray = [];
        this._topIndex = -1;
    }

    _isEmpty(){
        if(this._underlyingArray.length == 0) {
            return true;
        }
        return false;
    }

    peek() {
        if(!this._isEmpty())
            return this._underlyingArray[this._topIndex];
    }

    push(value) {
        this._topIndex++;
        this._underlyingArray.push(value);

    }

    pop() {
        if(!this._isEmpty()){
            this._topIndex--;
            let popped = this._underlyingArray.pop();
            return popped;
        }
    }
}