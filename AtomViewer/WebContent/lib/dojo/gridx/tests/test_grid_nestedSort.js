//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),baseSort:[{attribute:"Album",descending:true}],sortInitialOrder:[{colId:"id",descending:true},{colId:"Name",descending:false}],modules:[_5.VirtualVScroller,_5.Focus,_5.ColumnResizer,_5.NestedSort],structure:_3.layouts[0]});
grid.placeAt("gridContainer");
grid.startup();
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Core Functions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: testSort\">Sort via API</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: testClear\">Clear sort</div><br/>",""].join(""));
tp.startup();
});
function testSort(){
var d=[{colId:"id",descending:true},{colId:"Artist",descending:false},{colId:"Name",descending:false}];
grid.sort.sort(d);
};
function testClear(){
grid.sort.clear();
};
