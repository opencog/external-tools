//>>built
require(["dojo","gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/TestPane","gridx/tests/support/modules","dijit/form/Button","dijit/form/NumberTextBox","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7){
grid=new _2({id:"grid",store:_5({dataSource:_4,size:100}),structure:_4.layouts[0],cacheClass:_3,modules:[_7.Focus,{moduleClass:_7.TitleBar,label:"Gridx - Title Bar Label"},_7.VirtualVScroller]});
grid.placeAt("gridContainer");
grid.startup();
show=function(){
grid.titleBar.domNode.style.display="block";
};
hide=function(){
grid.titleBar.domNode.style.display="none";
};
showDialog=function(){
dijit.byId("setTitleDialog").show();
};
submit=function(){
var _8=dijit.byId("title_input").value;
grid.titleBar.setLabel(_8);
dijit.byId("title_input").set("value","");
dijit.byId("setTitleDialog").hide();
};
cancel=function(){
dijit.byId("title_input").set("value","");
dijit.byId("setTitleDialog").hide();
};
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Title Bar Actions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: show\">Show the title bar</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: hide\">Hide the title bar</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: showDialog\">Set a new titile</div><br/>",""].join(""));
tp.startup();
});
