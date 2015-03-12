//>>built
require(["dojo/_base/Deferred","dojo/_base/lang","dojo/DeferredList","dijit/form/RadioButton","gridx/Grid","gridx/tests/support/data/TestData","gridx/core/model/cache/Async","gridx/tests/support/stores/JsonRest","gridx/tests/support/modules","gridx/tests/support/TestPane","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
destroy=function(){
if(window.grid){
grid.destroy();
window.grid=undefined;
}
};
create=function(){
destroy();
if(!window.grid){
if(_6.resetSeed){
_6.resetSeed();
}
var _b=_8({path:"./support/stores",dataSource:_6,size:1000});
var _c=_6.layouts[1];
grid=new _5({id:"grid",cacheClass:_7,store:_b,structure:_c,selectRowTriggerOnCell:true,modules:[_9.ExtendedSelectRow,_9.Focus,_9.RowHeader,_9.ColumnResizer,_9.VirtualVScroller]});
grid.placeAt("gridContainer");
grid.startup();
}
};
create();
var _d=1000000;
var _e=function(){
var _f=_6.getData(1).items[0];
_f.order=_f.id=++_d;
return _f;
};
window.newRow=function(){
var btn=dijit.byId("addRowBtn");
btn.set("disabled",true);
_1.when(grid.store.add(_e()),function(){
btn.set("disabled",false);
});
};
window.addSomeRows=function(){
var _10=[],dl=[];
for(var i=0;i<10;++i){
_10.push(_e());
var d=new _1();
_1.when(grid.store.add(_10[_10.length-1]),_2.hitch(d,d.callback));
dl.push(d);
}
(new _3(dl)).then(function(){
});
};
window.deleteFirstRow=function(){
grid.model.when(0,function(){
if(grid.row(0)){
grid.store.remove(grid.row(0).id);
}
});
};
window.deleteLastRow=function(){
grid.model.when({start:0},function(){
if(grid.rowCount()){
grid.store.remove(grid.row(grid.rowCount()-1).id);
}
});
};
var tp=new _a({});
tp.placeAt("ctrlPane");
tp.addTestSet("Tests",["<div id=\"addRowBtn\" data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: newRow\">Add row</div>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: addSomeRows\">Add 10 rows</div>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: deleteFirstRow\">Delete First Row</div>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: deleteLastRow\">Delete Last Row</div>","<br/>",""].join(""));
tp.startup();
});
