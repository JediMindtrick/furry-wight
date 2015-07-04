
var getAtom = require('./resultAtom.js').getResultAtom,
    getComputer = require('./computer.js').getComputer;

var getCell = function(buffLimit){

    var _bufferLimit = (buffLimit == undefined ? 0 : buffLimit);
    var _callback = function(){};
    var _onResult = function(val){
        _buffer.unshift(val);

        if(_bufferLimit > 0 && _buffer.length > _bufferLimit){
            _buffer.pop();
        }

        _callback(_buffer);
        _listeners.forEach(function(listener){
            listener.giveInput(val);
        });
    };
    var _computer = null;
    var _atom = null;
    var _buffer = [];
    var _listeners = [];

    var _setFunction = function(typ,src){

        _buffer.splice(0,_buffer.length);
        if(_atom !== null){
            _atom.removeListener(_onResult);
        }
        if(_computer !== null){
                _computer.close();
        }

        _computer = getComputer(
            //default to javascript
            (typ !== undefined ? typ : 'js'),
            //default to identity function
            (src !== undefined ? src : 'function(val){return val;}'));

        _atom = getAtom();
        _atom.clearResult();
        _atom.addListener(_onResult);

        _computer.stream
        .progress(function(val){
            _atom.setResult(val);
        });

        return _atom;
    };

    _setFunction();

    return {
        setFunction: _setFunction,
        giveInput: function(){
            _computer.compute.apply(this,arguments);
        },
        chain: function(cell){
            _listeners.push(cell);
        },
        unchain: function(cell){
            var index = _listeners.indexOf(cell);
            if(index > -1){
                _listeners.splice(index, 1);
            }
        },
        clearBuffer: function(){
            _buffer.splice(0,_buffer.length);

            _callback(_buffer);
            //tell listeners
            _listeners.forEach(function(listener){
                listener.clearBuffer();
            });
        },
        getBuffer: function(){
            return _buffer;
        },
        onValue: function(callback){
            _callback = callback;
        }
    };
};

exports.getCell = getCell;
