//>>built
require(["dojo/_base/connect","dojo/_base/array","dojo/dom","gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/TestPane","gridx/tests/support/modules","dijit/form/NumberTextBox","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
grid=new _4({id:"grid",cacheClass:_5,store:_7({dataSource:_6,size:200}),structure:_6.layouts[0],modules:[_9.Focus,_9.RowHeader,_9.ColumnResizer,_9.ExtendedSelectRow,_9.ExtendedSelectColumn,_9.ExtendedSelectCell,_9.VirtualVScroller]});
grid.placeAt("gridContainer");
grid.startup();
_1.connect(grid.select.row,"onSelectionChange",function(_a){
_3.byId("rowSelectedCount").value=_a.length;
_3.byId("rowStatus").value=_a.join("\n");
});
_1.connect(grid.select.column,"onSelectionChange",function(_b){
_3.byId("colSelectedCount").value=_b.length;
_3.byId("colStatus").value=_b.join("\n");
});
_1.connect(grid.select.cell,"onSelectionChange",function(_c){
_3.byId("cellSelectedCount").value=_c.length;
_c=_2.map(_c,function(_d){
return ["(",_d[0],", ",_d[1],")"].join("");
});
_3.byId("cellStatus").value=_c.join("\n");
});
});
function selectRow(_e){
var _f=dijit.byId("rowStart").get("value");
var end=dijit.byId("rowEnd").get("value");
var a=Math.max(_f,end);
_f=Math.min(_f,end);
end=a;
grid.select.row[_e?"selectByIndex":"deselectByIndex"]([_f,end]);
};
function selectAllRow(_10){
if(_10){
grid.select.row.selectByIndex([0,grid.rowCount()-1]);
}else{
grid.select.row.clear();
}
};
function selectColumn(_11){
var _12=dijit.byId("colStart").get("value");
var end=dijit.byId("colEnd").get("value");
var a=Math.max(_12,end);
_12=Math.min(_12,end);
end=a;
grid.select.column[_11?"selectByIndex":"deselectByIndex"]([_12,end]);
};
function selectAllColumn(_13){
if(_13){
grid.select.column.selectByIndex([0,grid.columnCount()-1]);
}else{
grid.select.column.clear();
}
};
function selectCell(_14){
var _15=[dijit.byId("cellStartR").get("value"),dijit.byId("cellStartC").get("value")];
var end=[dijit.byId("cellEndR").get("value"),dijit.byId("cellEndC").get("value")];
grid.select.cell[_14?"selectByIndex":"deselectByIndex"](_15.concat(end));
};
function selectAllCell(_16){
if(_16){
grid.select.cell.selectByIndex([0,0,grid.rowCount()-1,grid.columnCount()-1]);
}else{
grid.select.cell.clear();
}
};
