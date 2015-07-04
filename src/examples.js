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
