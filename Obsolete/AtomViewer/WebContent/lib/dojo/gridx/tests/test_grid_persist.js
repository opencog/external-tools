//>>built
require(["dojo/_base/lang","gridx/Grid","gridx/core/model/cache/Sync","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane"],function(_1,_2,_3,_4,_5,_6,_7){
store=_5({dataSource:_4,size:100});
createGrid=function(e,_8){
if(!window.grid){
grid=new _2({id:"grid",cacheClass:_3,store:store,structure:_8||_4.layouts[4],modules:[_6.Persist,_6.SelectColumn,_6.MoveColumn,_6.DndColumn,_6.NestedSort,_6.VirtualVScroller,_6.ColumnResizer]});
grid.placeAt("gridContainer");
grid.startup();
}
};
createGrid();
createNewColGrid=function(){
var _9=_1.clone(_4.layouts[4]);
_9.push({id:"newCol",field:"Genre",name:"New Column"});
createGrid(null,_9);
};
createLessColGrid=function(){
var _a=_1.clone(_4.layouts[4]);
_a.splice(1,1);
createGrid(null,_a);
};
destroyGrid=function(){
if(window.grid){
grid.destroy();
window.grid=null;
}
};
enablePersist=function(){
if(window.grid){
grid.persist.enabled=true;
}
};
disablePersist=function(){
if(window.grid){
grid.persist.enabled=false;
}
};
var tp=new _7({});
tp.placeAt("ctrlPane");
tp.addTestSet("Pesistent Actions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: createGrid\">Create Grid</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: createNewColGrid\">Create Grid with new columns</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: createLessColGrid\">Create Grid with less columns</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: destroyGrid\">Destroy Grid</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: enablePersist\">Enable Persist</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: disablePersist\">Disable Persist</div><br/>",""].join(""));
tp.startup();
});
