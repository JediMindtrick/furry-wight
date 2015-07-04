//result = void(0)
//listeners[]
//clearResult()
//setResult()
//addListener()
//removeListener()

function getResultAtom(){
    var _result = void 0;
    var _listeners = [];

    return {
        clearResult: function(){
            _result = void 0;
        },
        setResult: function(val){
            _result = val;
            _listeners.forEach(function(listener){
                listener(val);
            });
        },
        addListener: function(listener){
            _listeners.push(listener);
        },
        removeListener: function(listener){
            var index = _listeners.indexOf(listener);
            if(index > -1){
                _listeners.splice(index, 1);
            }
        }
    };
}

exports.getResultAtom = getResultAtom;
