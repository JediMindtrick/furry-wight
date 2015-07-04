var reserved = [
    'add',
    'subtract',
    'multiply',
    'divide'
];
var identifierRegex = /\w+/g;

var classifyTokens = function findRefs(text){
    var toReturn = {
        reserved: [],
        refs: []
    };
    var toks = text.match(identifierRegex);
    toks.forEach(function(tok){
        if(reserved.indexOf(tok) > -1){
            toReturn.reserved.push(tok);
        }else{
            toReturn.refs.push(tok);
        }
    });
    return toReturn;
};

var createCalc = function createCalc(userFunc){

    var template =
    '(function(cell,ctx,acc){\n' +
    '   with(R){ with(ctx) { return ' + userFunc + '; } }' +
    '})';

    var calc = window.doSomethingUnsafe(template);

    return calc;
};

var Parser = {};
Parser.createCalc = createCalc;
Parser.classifyTokens = classifyTokens;
Parser.reservedWords = reserved;

var testParse1 = function(){
    var t = "multiply(add(foo,bar),baz_1)";
    var result = classifyTokens(t);
    console.log('classifyTokens(' + t + ')');
    console.log(JSON.stringify(result));


    var R = {
        add: function add(lh,rh){ return lh + rh; },
        subtract: function subtract(lh,rh){ return lh - rh; },
        multiply: function multiply(lh,rh){ return lh * rh; },
        divide: function divide(lh,rh){ return lh / rh; }
    };

    var context = {
        bar: 1,
        foo: 3
    };

    console.log(createCalc('add(foo,bar)')(null,context));
    console.log(createCalc('subtract(foo,bar)')(null,context));
    console.log(createCalc('multiply(foo,5)')(null,context));
    console.log(createCalc('divide(foo,foo)')(null,context));
};
