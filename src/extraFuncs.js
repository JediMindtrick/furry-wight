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
