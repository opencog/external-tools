//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/TreeColumnarTestData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6){
var _7=_4({dataSource:_3,maxLevel:4,maxChildrenCount:10});
store2=_4({dataSource:_3,maxLevel:4,maxChildrenCount:10});
_7.hasChildren=function(id,_8){
return _8&&_7.getValues(_8,"children").length;
};
_7.getChildren=function(_9){
return _7.getValues(_9,"children");
};
store2.hasChildren=function(id,_a){
return _a&&store2.getValues(_a,"children").length;
};
store2.getChildren=function(_b){
return store2.getValues(_b,"children");
};
grid=new _1({id:"grid",cacheClass:_2,store:_7,structure:_3.layouts[1],selectRowTriggerOnCell:false,treeExpandLevel:2,modules:[_5.VirtualVScroller,_5.Tree,_5.ColumnResizer,_5.SelectRow,_5.RowHeader,_5.IndirectSelect]});
grid.placeAt("gridContainer");
grid.startup();
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Tree APIs",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: expand\">Expand the 3rd row</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: collapse\">Collapse the 3rd row</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: expandRec\">Recursively expand the 2nd row</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: collapseRec\">Recursively collapse the 2nd row</div><br/>",""].join(""));
tp.startup();
});
function expand(){
grid.tree.expand(grid.row(2).id);
};
function collapse(){
grid.tree.collapse(grid.row(2).id);
};
function expandRec(){
grid.tree.expandRecursive(grid.row(1).id);
};
function collapseRec(){
grid.tree.collapseRecursive(grid.row(1).id);
};
