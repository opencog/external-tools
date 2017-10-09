//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane","dijit/form/NumberSpinner"],function(_1,_2,_3,_4,_5,_6){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),structure:_3.layouts[0],modules:[_5.VirtualVScroller,{moduleClass:_5.ColumnLock,count:1},_5.ExtendedSelectCell,_5.CellWidget,_5.Edit,_5.SingleSort,_5.ColumnResizer,_5.Focus]});
grid.placeAt("gridContainer");
grid.startup();
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Lock/Unlock Columns",["<label for=\"integerspinner\">Columns to lock:</label><input id=\"integerspinner1\" data-dojo-type=\"dijit.form.NumberSpinner\" data-dojo-props=\"constraints:{max:10,min: 1},name:'integerspinner1', value: 1\"/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: lockColumns\">Lock Columns</div>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: unlockColumns\">Unlock</div>"].join(""));
tp.startup();
});
function lockColumns(){
var c=dijit.byId("integerspinner1").get("value");
grid.columnLock.lock(c);
};
function unlockColumns(){
grid.columnLock.unlock();
};
