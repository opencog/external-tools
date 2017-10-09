//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),structure:_3.layouts[0],modules:[_5.Focus,_5.ColumnResizer,_5.RowHeader,_5.VirtualVScroller]});
grid.placeAt("gridContainer");
grid.startup();
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Set Column Width",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: setWidth\">Set a random width to column \"Album\"</div><br/>","<div>Width of column \"Album\": <span id=\"colWidthSpan\"></span></div>",""].join(""));
tp.startup();
update();
});
function setWidth(){
var a=20+Math.random()*200;
grid.columnResizer.setWidth("Album",a);
update();
};
function update(){
document.getElementById("colWidthSpan").innerHTML=grid.column("Album").getWidth();
};
