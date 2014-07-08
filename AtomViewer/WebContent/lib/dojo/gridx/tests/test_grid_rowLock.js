//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane","dijit/form/NumberSpinner"],function(_1,_2,_3,_4,_5,_6){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),rowLockCount:2,structure:_3.layouts[0],modules:[_5.RowLock]});
grid.placeAt("gridContainer");
grid.startup();
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Lock/Unlock Rows",["<label for=\"integerspinner\">Rows to lock:</label><input id=\"integerspinner1\" data-dojo-type=\"dijit.form.NumberSpinner\" data-dojo-props=\"constraints:{max:10,min: 1},name:'integerspinner1', value: 1\"/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: lockRows\">Lock Rows</div>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: unlockRows\">Unlock</div>"].join(""));
tp.startup();
});
function lockRows(){
var c=dijit.byId("integerspinner1").get("value");
grid.rowLock.lock(c);
};
function unlockRows(){
grid.rowLock.unlock();
};
