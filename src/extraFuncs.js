var valueWindow = function valueWindow(val,acc,windowLength){
    if(val){
        acc.push(val);
        if(acc.length > windowLength){
            acc = R.remove(0,acc.length - windowLength,acc);
        }
    }

    return acc;
};

var ajaxGET = function ajaxGET(url){

    return new Promise(function(resolve, reject) {
    // Your code
        fetch(url)//'/users.json')
        .then(function(response) {
            if(url.indexOf('.json') > -1){
                return response.json();
            }else{
                return response.text();
            }
        }).then(resolve).catch(function(ex) {
            console.log('[fetch] parsing failed', ex);
            reject(ex);
        });
    });
};

var poll = function poll(func,interval,acc){
    if(acc === undefined){
        acc = setInterval(func,interval);
    }
    return acc;
};

var updateCell = function updateCell(cellName,value){
    var _cell = Cell.getCell(cellName)
    _cell.update(value);
    return value;
};

//example usage
//poll(function(){ Cell.getCell('anon1').update((Math.random() * 10).toString()); },2000,acc)
//or
//poll(function(){ updateCell('anon1',(Math.random() * 10).toString()); },2000,acc)
