//>>built
require(["dojo/_base/array","gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/modules","gridx/tests/support/TestPane"],function(_1,_2,_3,_4,_5,_6,_7){
var _8=0;
destroy=function(){
if(window.grid){
grid.destroy();
window.grid=undefined;
}
};
create=function(){
if(!window.grid){
var _9=_5({dataSource:_4,size:100});
var _a=_4.layouts[_8];
var t1=new Date().getTime();
grid=new _2({id:"grid",cacheClass:_3,store:_9,structure:_a,modules:[_6.Focus],selectRowTriggerOnCell:true});
var t2=new Date().getTime();
grid.placeAt("gridContainer");
var t3=new Date().getTime();
grid.startup();
var t4=new Date().getTime();
}
};
create();
setStore=function(){
grid.setStore(_5({dataSource:_4,size:50+parseInt(Math.random()*200,10)}));
};
setColumns=function(){
_8=_8==4?0:4;
var _b=_4.layouts[_8];
grid.setColumns(_b);
};
var _c=10000;
newRow=function(){
grid.store.add({id:_c++});
};
setRow=function(){
var _d=grid.row(0).item();
_d.Year=parseInt(Math.random()*1000+1000,10);
grid.store.put(_d);
};
deleteRow=function(){
grid.store.remove(grid.row(0).id);
};
var tp=new _7({});
tp.placeAt("ctrlPane");
tp.addTestSet("Tests",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: setColumns\">Change column structure</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: setStore\">Change store</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: newRow\">Add an empty new row</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: setRow\">Set Year of the first row</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: deleteRow\">Delete the first row</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: destroy\">Destroy</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: create\">Create</div><br/>"].join(""));
tp.startup();
});
