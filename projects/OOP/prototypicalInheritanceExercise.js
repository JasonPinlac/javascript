// desing two objects
// HtmlElement
// HtmlSelectElement


function HtmlElement(){
    this.click = function(){
        console.log('clicked');
    };
}

HtmlElement.prototype.focus = function(){
    console.log('focused');
}

function HtmlSelectElement(){
    this.items = [];
    this.addItem = function(item){
        this.items.push(item);
    };
    this.removeItem = function(item){
        let indexFound = this.items.indexOf(item);
        if(indexFound > -1){
            this.items.splice(indexFound, 1);
        }
    };
}

let e = new HtmlElement();

HtmlSelectElement.prototype = e;
HtmlSelectElement.prototype.constructor = HtmlElement;




let s = new HtmlSelectElement();
s.addItem(1);
s.addItem(4);
s.addItem(9);
s.removeItem(4);

