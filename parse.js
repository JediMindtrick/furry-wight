'use strict';

var reserved = R.keys(R);
reserved.push('ctx');
reserved.push('acc');
reserved.push('cell');

var identifierRegex = /\w+/g;

var classifyTokens = function findRefs(text) {
    var toReturn = {
        reserved: [],
        refs: []
    };
    var toks = text.match(identifierRegex);
    toks.forEach(function (tok) {
        if (reserved.indexOf(tok) > -1) {
            toReturn.reserved.push(tok);
        } else {
            toReturn.refs.push(tok);
        }
    });
    return toReturn;
};

var createCalc = function createCalc(userFunc) {

    var template = '(function(cell,ctx,acc){\n' + '   with(R){ with(ctx) { return ' + userFunc + '; } }' + '})';

    var calc = window.doSomethingUnsafe(template);

    return calc;
};

var Parser = {};
Parser.createCalc = createCalc;
Parser.classifyTokens = classifyTokens;
Parser.reservedWords = reserved;

var testParse1 = function testParse1() {
    var t = 'multiply(add(foo,bar),baz_1)';
    var result = classifyTokens(t);
    console.log('classifyTokens(' + t + ')');
    console.log(JSON.stringify(result));

    var R = {
        add: function add(lh, rh) {
            return lh + rh;
        },
        subtract: function subtract(lh, rh) {
            return lh - rh;
        },
        multiply: function multiply(lh, rh) {
            return lh * rh;
        },
        divide: function divide(lh, rh) {
            return lh / rh;
        }
    };

    var context = {
        bar: 1,
        foo: 3
    };

    console.log(createCalc('add(foo,bar)')(null, context));
    console.log(createCalc('subtract(foo,bar)')(null, context));
    console.log(createCalc('multiply(foo,5)')(null, context));
    console.log(createCalc('divide(foo,foo)')(null, context));
};
//# sourceMappingURL=data:application/json;base64,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QWMsQ0FBQyxDQUFDLElBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFdBQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDM0QsV0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN6RCxXQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0NBQzVELENBQUMiLCJmaWxlIjoic3JjL3BhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHJlc2VydmVkID0gUi5rZXlzKFIpO1xucmVzZXJ2ZWQucHVzaCgnY3R4Jyk7XG5yZXNlcnZlZC5wdXNoKCdhY2MnKTtcbnJlc2VydmVkLnB1c2goJ2NlbGwnKTtcblxudmFyIGlkZW50aWZpZXJSZWdleCA9IC9cXHcrL2c7XG5cbnZhciBjbGFzc2lmeVRva2VucyA9IGZ1bmN0aW9uIGZpbmRSZWZzKHRleHQpe1xuICAgIHZhciB0b1JldHVybiA9IHtcbiAgICAgICAgcmVzZXJ2ZWQ6IFtdLFxuICAgICAgICByZWZzOiBbXVxuICAgIH07XG4gICAgdmFyIHRva3MgPSB0ZXh0Lm1hdGNoKGlkZW50aWZpZXJSZWdleCk7XG4gICAgdG9rcy5mb3JFYWNoKGZ1bmN0aW9uKHRvayl7XG4gICAgICAgIGlmKHJlc2VydmVkLmluZGV4T2YodG9rKSA+IC0xKXtcbiAgICAgICAgICAgIHRvUmV0dXJuLnJlc2VydmVkLnB1c2godG9rKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0b1JldHVybi5yZWZzLnB1c2godG9rKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0b1JldHVybjtcbn07XG5cbnZhciBjcmVhdGVDYWxjID0gZnVuY3Rpb24gY3JlYXRlQ2FsYyh1c2VyRnVuYyl7XG5cbiAgICB2YXIgdGVtcGxhdGUgPVxuICAgICcoZnVuY3Rpb24oY2VsbCxjdHgsYWNjKXtcXG4nICtcbiAgICAnICAgd2l0aChSKXsgd2l0aChjdHgpIHsgcmV0dXJuICcgKyB1c2VyRnVuYyArICc7IH0gfScgK1xuICAgICd9KSc7XG5cbiAgICB2YXIgY2FsYyA9IHdpbmRvdy5kb1NvbWV0aGluZ1Vuc2FmZSh0ZW1wbGF0ZSk7XG5cbiAgICByZXR1cm4gY2FsYztcbn07XG5cbnZhciBQYXJzZXIgPSB7fTtcblBhcnNlci5jcmVhdGVDYWxjID0gY3JlYXRlQ2FsYztcblBhcnNlci5jbGFzc2lmeVRva2VucyA9IGNsYXNzaWZ5VG9rZW5zO1xuUGFyc2VyLnJlc2VydmVkV29yZHMgPSByZXNlcnZlZDtcblxudmFyIHRlc3RQYXJzZTEgPSBmdW5jdGlvbigpe1xuICAgIHZhciB0ID0gXCJtdWx0aXBseShhZGQoZm9vLGJhciksYmF6XzEpXCI7XG4gICAgdmFyIHJlc3VsdCA9IGNsYXNzaWZ5VG9rZW5zKHQpO1xuICAgIGNvbnNvbGUubG9nKCdjbGFzc2lmeVRva2VucygnICsgdCArICcpJyk7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG5cblxuICAgIHZhciBSID0ge1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uIGFkZChsaCxyaCl7IHJldHVybiBsaCArIHJoOyB9LFxuICAgICAgICBzdWJ0cmFjdDogZnVuY3Rpb24gc3VidHJhY3QobGgscmgpeyByZXR1cm4gbGggLSByaDsgfSxcbiAgICAgICAgbXVsdGlwbHk6IGZ1bmN0aW9uIG11bHRpcGx5KGxoLHJoKXsgcmV0dXJuIGxoICogcmg7IH0sXG4gICAgICAgIGRpdmlkZTogZnVuY3Rpb24gZGl2aWRlKGxoLHJoKXsgcmV0dXJuIGxoIC8gcmg7IH1cbiAgICB9O1xuXG4gICAgdmFyIGNvbnRleHQgPSB7XG4gICAgICAgIGJhcjogMSxcbiAgICAgICAgZm9vOiAzXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKGNyZWF0ZUNhbGMoJ2FkZChmb28sYmFyKScpKG51bGwsY29udGV4dCkpO1xuICAgIGNvbnNvbGUubG9nKGNyZWF0ZUNhbGMoJ3N1YnRyYWN0KGZvbyxiYXIpJykobnVsbCxjb250ZXh0KSk7XG4gICAgY29uc29sZS5sb2coY3JlYXRlQ2FsYygnbXVsdGlwbHkoZm9vLDUpJykobnVsbCxjb250ZXh0KSk7XG4gICAgY29uc29sZS5sb2coY3JlYXRlQ2FsYygnZGl2aWRlKGZvbyxmb28pJykobnVsbCxjb250ZXh0KSk7XG59O1xuIl19