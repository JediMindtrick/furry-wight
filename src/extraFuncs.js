var valueWindow = function valueWindow(val,acc,windowLength){
    if(val){
        acc.push(val);
        if(acc.length > windowLength){
            acc = R.remove(0,acc.length - windowLength,acc);
        }
    }

    return acc;
};
