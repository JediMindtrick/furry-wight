var blankWorksheet = function(selector){
    riot.mount(selector,{ cells: [] });
};

var pushExample = function(){
//    poll(function(){ updateCell('anon1',(Math.random() * 10).toString()); },2000,acc)
    riot.mount('#list1',{ cells: [
        { displayComponent: 'fw-table', cell: new Cell('pushDestination') },
        { displayComponent: 'fw-table', cell: new Cell('pushSource',"poll(function(){ updateCell('pushDestination',(Math.random() * 10).toString()); },500,acc)")},

        { displayComponent: 'fw-table', cell: new Cell('last20Values','valueWindow(pushDestination,acc,20)','[]')},

        { displayComponent: 'fw-table', cell: new Cell('averageValues','(sum(last20Values)/length(last20Values))')},

        { displayComponent: 'fw-speedometer', cell: new Cell('guage','averageValues')},
        { displayComponent: 'fw-table', cell: new Cell('fetchData',"ajaxGET('./test2.json')")}
    ]});

}

var movingAverageExample = function(){
    var startCell = new Cell('inputEvents');
    var guageCell = new Cell('averageSpeed');

    riot.mount('#list1',{ cells: [
        { displayComponent: 'fw-speedometer', cell: guageCell },
        { displayComponent: 'fw-table', cell: startCell },
        { displayComponent: 'fw-table', cell: new Cell('last20events','valueWindow(inputEvents,acc,20)','[]') },
        { displayComponent: 'fw-table', cell: new Cell('average1','(sum(last20events)/length(last20events))') }
    ] });

    setTimeout(function(){
        guageCell.update('average1');

        setInterval(function() {
            startCell.update((Math.random() * 10).toString());
        }, 100);

    },3 * 1000);
};

var example4 = function(){
    riot.mount('#list1',{ cells: [
        { displayComponent: 'fw-speedometer', cell: new Cell() },
        { displayComponent: 'fw-ajax', cell: new Cell() },
        { displayComponent: 'fw-table', cell: new Cell() },
        { displayComponent: 'fw-table', cell: new Cell() },
        { displayComponent: 'fw-table', cell: new Cell('acc1','(function(){ acc.push(anon3); return acc; })();','[]') },
        { displayComponent: 'fw-table', cell: new Cell('acc2','add((anon3 ? anon3 : 0),acc)','0') }
    ] });
};

var example3 = function(){

    var _cell1 = new Cell('cell1','5');
    var _cell2 = new Cell('cell2','add(cell1,15)');

    riot.mount('#list1',{ cells: [
        { displayComponent: 'fw-table', cell: new Cell() },
        { displayComponent: 'fw-table', cell: new Cell() },
        { displayComponent: 'fw-table', cell: _cell1 },
        { displayComponent: 'fw-table', cell: _cell2 }
    ] });

    window.setTimeout(function(){
        _cell1.update('82');

        window.setTimeout(function(){
            _cell2.update('add(cell1,25)');
        },3000);
    },3000);
};
