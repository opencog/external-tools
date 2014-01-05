//>>built
require(["dojo/_base/array","gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/modules","gridx/tests/support/TestPane"],function(_1,_2,_3,_4,_5,_6,_7){
create=function(){
if(!window.grid){
var _8=_5({dataSource:_4,size:100});
var _9=_4.layouts[1];
var t1=new Date().getTime();
grid=new _2({id:"grid",cacheClass:_3,store:_8,structure:_9,headerHidden:true,modules:[_6.Focus]});
var t2=new Date().getTime();
grid.placeAt("gridContainer");
var t3=new Date().getTime();
grid.startup();
var t4=new Date().getTime();
}
};
create();
toggleHeader=function(){
var h=grid.header;
h.hidden=!h.hidden;
h.refresh();
grid.vLayout.reLayout();
};
var tp=new _7({});
tp.placeAt("ctrlPane");
tp.addTestSet("Tests",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: toggleHeader\">Toggle Header</div><br/>",].join(""));
tp.startup();
});
