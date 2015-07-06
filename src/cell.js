function Cell(name,fnText,accDefault){
    this.giveName(name);
    this.subscribers = [];
    this.upstreams = {};
    this.update(fnText || 'undefined',undefined,accDefault);
}

Cell.prototype.update = function update(fnText,name,accDefault){

    var self = this;

    if(name !== undefined){
        self.giveName(name);
    }

    if(accDefault !== undefined){
        self.accText = accDefault || 'undefined';
        self.accDefault = Parser.createCalc(accDefault);
        self.acc = self.accDefault(self,{}, self.acc);//eval the function/string and use this function
    }

    if(fnText !== undefined){
        self.fnText = fnText;

        //subscribe to upstreams
        var self = self;
        Parser.classifyTokens(fnText).refs.forEach(function(ref){
            self.subUpstream(ref);
        });

        //create fn
        self.fn = Parser.createCalc(fnText);
    }

    //generate context
    //upstream looks like this:
    //cellTo.upstreams[cellFrom.name] = { from: cellFrom, bridgeFunc: bridgeFunc };
    var ctx = {};
    for(var prop in self.upstreams){
        if(self.upstreams.hasOwnProperty(prop)){
            ctx[prop] = self.upstreams[prop].from.output;
        }
    }

    var _result = self.fn(self, ctx, self.acc);

    if(_result && _result.then){
        _result
        .then(function(val){
            self.output = val;
            self.acc = self.output !== undefined ? self.output : self.acc;
            self.notify();
        })
        .catch(function(ex) {
            console.log('error from calculation: ', ex);
        });
    }else{
        self.output = _result;
        self.acc = self.output !== undefined ? self.output : self.acc;
        self.notify();
    }

};

Cell.prototype.resetAcc = function resetAcc(){
    this.update(undefined,undefined,this.accText);
};

Cell.names = {};
Cell.anonNameCount = 0;

Cell.getCell = function getCell(name){
    return Cell.names[name];
};

Cell.prototype.giveName = function giveName(name){
    var _n = name || undefined;

    if(name === undefined){
        Cell.anonNameCount++;
        _n = "anon" + Cell.anonNameCount;
    }

    if(Cell.names[_n] === undefined){
        Cell.names[_n] = this;
        this.name = _n;
    }else{
        throw new Error('Cell with a name "' + _n + '" already exists.  Please choose another');
    }
};

Cell.prototype.notify = function notify(){
    var self = this;

    this.subscribers.forEach(function(sub){
        try{
            sub(self);
        }catch(err){
            console.log(err);
        }
    });
};

Cell.prototype.subscribe = function subscribe(watch){
    this.subscribers.push(watch);
};

Cell.prototype.unsubscribe = function unsubscribe(watch){
    var idx = this.subscribers.indexOf(watch);
    if(idx > -1){
        this.subscribers.splice(idx,1);
    }
};

Cell.link = function link(cellFrom,cellTo){
    var bridgeFunc = function bridgeFunc(){
        cellTo.update();
    };
    cellTo.upstreams[cellFrom.name] = { from: cellFrom, bridgeFunc: bridgeFunc };
    cellFrom.subscribe(bridgeFunc);
};

Cell.unlink = function unlink(cellFrom,cellTo){
    cellFrom.unsubscribe(cellTo.upstreams[cellFrom.name].bridgeFunc);
    delete cellTo.upstreams[cellFrom.name];
};

Cell.prototype.subUpstream = function subUpstream(name){
    if(this.upstreams[name] === undefined && Cell.getCell(name) !== undefined){//otherwise, we are already subscribed
        Cell.link(Cell.getCell(name),this);
    }
};
