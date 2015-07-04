var movingAverageExample = function(){
    var startCell = new Cell('inputEvents');
    var guageCell = new Cell('averageSpeed');

    riot.mount('#list1',{ list: [
        { tagType: 'fw-speedometer', cell: guageCell },
        { tagType: 'fw-cell', cell: startCell },
        { tagType: 'fw-cell', cell: new Cell('last20events','valueWindow(inputEvents,acc,20)','[]') },
        { tagType: 'fw-cell', cell: new Cell('average1','(sum(last20events)/length(last20events))') }
    ] });

    setTimeout(function(){
        guageCell.update('average1');

        setInterval(function() {
            startCell.update((Math.random() * 10).toString());
        }, 100);

    },3 * 1000);
};

var example4 = function(){
    riot.mount('#list1',{ list: [
        { tagType: 'fw-speedometer', cell: new Cell() },
        { tagType: 'fw-ajax', cell: new Cell() },
        { tagType: 'fw-cell', cell: new Cell() },
        { tagType: 'fw-cell', cell: new Cell() },
        { tagType: 'fw-cell', cell: new Cell('acc1','(function(){ acc.push(anon3); return acc; })();','[]') },
        { tagType: 'fw-cell', cell: new Cell('acc2','add((anon3 ? anon3 : 0),acc)','0') }
    ] });
};

var example3 = function(){

    var _cell1 = new Cell('cell1','5');
    var _cell2 = new Cell('cell2','add(cell1,15)');

    riot.mount('#list1',{ list: [
        { tagType: 'fw-cell', cell: new Cell() },
        { tagType: 'fw-cell', cell: new Cell() },
        { tagType: 'fw-cell', cell: _cell1 },
        { tagType: 'fw-basic', cell: _cell2 }
    ] });

    window.setTimeout(function(){
        _cell1.update('82');

        window.setTimeout(function(){
            _cell2.update('add(cell1,25)');
        },3000);
    },3000);
};
