//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","dijit/form/Button","dijit/form/ToggleButton","gridx/tests/support/TestPane"],function(_1,_2,_3,_4,_5,_6,_7,_8){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),structure:_3.layouts[0],modules:[_5.Focus,_5.ToolBar,_5.SingleSort,_5.VirtualVScroller]});
grid.toolBar.widget.addChild(new _6({label:"scroll to bottom",onClick:function(){
grid.vScroller.scrollToRow(grid.rowCount()-1);
}}));
grid.toolBar.widget.addChild(new _6({label:"scroll to top",onClick:function(){
grid.vScroller.scrollToRow(0);
}}));
grid.toolBar.widget.addChild(new _6({label:"cut",showLabel:false,iconClass:"dijitEditorIcon dijitEditorIconCut",onClick:function(){
alert("cut");
}}));
grid.toolBar.widget.addChild(new _6({label:"copy",iconClass:"dijitEditorIcon dijitEditorIconCopy",showLabel:true,onClick:function(){
alert("copy");
}}));
grid.toolBar.widget.addChild(new _7({label:"Bold",iconClass:"dijitEditorIcon dijitEditorIconBold",showLabel:false}));
grid.toolBar.widget.addChild(new _7({label:"Bold",iconClass:"dijitEditorIcon dijitEditorIconBold",showLabel:true}));
grid.placeAt("gridContainer");
grid.startup();
window.addClearSortButton=function(){
grid.toolBar.widget.addChild(new _6({label:"Clear Sort",onClick:function(){
grid.sort.clear();
}}));
};
window.removeLastButton=function(){
var tb=grid.toolBar.widget,_9=tb.getChildren();
tb.removeChild(_9[_9.length-1]);
};
var tp=new _8({});
tp.placeAt("ctrlPane");
tp.addTestSet("Sort actions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: addClearSortButton\">Add Clear Sort Button to toolbar</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: removeLastButton\">Remove the last button in toolbar</div><br/>",""].join(""));
tp.startup();
});
