//{ tagType: 'fw-cell', cell: new Cell('acc1','','[]')
//(function(){ acc.push(anon3); return acc; })()

//valueWindow(start,ctx,acc) []

var valueWindow = function valueWindow(val,acc,windowLength){
    if(val){
        acc.push(val);
        if(acc.length > windowLength){
            acc.shift();
        }
    }

    return acc;
};
