var nactor = require("nactor"),
    Q = require('q');

function getComputer(type,source){

    var _computationSource = '(function(){' + '\n' +
        'return ' + source + '\n' +
    '})();';

    var _computation = eval(_computationSource);

    var actor = nactor.actor({
        // Declare the context of your actor by an object
        compute : function() {
            //TODO: make a clone of the arguments and pass that on
            var result = _computation.apply(this,arguments);
            return result;
        }
    });

    // Intialize the actor
    actor.init();

    var resultStream = Q.defer();

    var compute = function(){

        var toReturn = Q.defer();

        var args = Array.prototype.slice.call(arguments);

        args.push(function(){
            resultStream.notify.apply(this,arguments);
            toReturn.resolve.apply(this,arguments);
        });

        actor.compute.apply(this,args);

        return toReturn.promise;
    }

    return {
        compute: compute,
        stream: resultStream.promise,
        close: resultStream.resolve
    }
}

exports.getComputer = getComputer;
