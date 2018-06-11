// Classes
function HtmlElement(){
    this.click = function(){
        console.log('clicked');
    };
}

function HtmlImageElement(src){
    this.src = src;
}

function HtmlSelectElement(items = []){
    this.items = items;
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

// Set up inheritance by re-assigning the prototype chain
HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;

// Assign prototype methods
HtmlElement.prototype.focus = function(){
    console.log('focused');
}

HtmlElement.prototype.render = function(){
    return 'rendering from HtmlElement';
}

HtmlSelectElement.prototype.render = function(){
    let renderedString = '<select>\n';
    for(let i = 0; i < this.items.length; i++){
        renderedString += '<option>' + this.items[i] + '<option>\n'
    }
    return renderedString + '<select>';
}

HtmlImageElement.prototype.render = function(){
    return `<img src="${this.src}" />`;
}


// Instantiate objects
let e = new HtmlElement();
let s = new HtmlSelectElement([1,2,3]);
let img = new HtmlImageElement('http://');

let arrayOfHtmlElements = [e, s, img];

for(htmlElement of arrayOfHtmlElements){
    console.log(htmlElement.render());
}