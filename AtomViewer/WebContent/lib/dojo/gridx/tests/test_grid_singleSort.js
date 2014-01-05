//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane"],function(_1,_2,_3,_4,_5,_6){
var _7=[{field:"id",name:"Index",dataType:"number"},{field:"Genre",name:"Genre",width:"200px"},{field:"Artist",name:"Artist",width:"200px"},{field:"Year",name:"Year",dataType:"number",width:"200px"},{field:"Album",name:"Album (unsortable)",sortable:false,width:"200px"},{field:"Name",name:"Name",width:"200px"},{field:"Composer",name:"Composer"},{field:"Download Date",name:"Date"},{field:"Last Played",name:"Last Played"},{name:"Summary Genre and Year",formatter:function(_8){
return _8.Genre+"_"+_8.Year;
},sortFormatted:true}];
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),structure:_7,baseSort:[{attribute:"Album",descending:false}],sortInitialOrder:[{colId:"2",descending:true}],modules:[_5.VirtualVScroller,_5.ColumnResizer,_5.SingleSort],modelExtensions:[_5.FormatSort]});
grid.placeAt("gridContainer");
grid.startup();
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Sort actions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: testSort\">Sort 3rd column</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: testClear\">Clear sort</div><br/>",""].join(""));
tp.startup();
});
function testSort(){
grid.sort.sort("3",false);
};
function testColumnSortAPI(){
grid.column("4",true).sort(false);
};
function testClear(){
grid.sort.clear();
};
