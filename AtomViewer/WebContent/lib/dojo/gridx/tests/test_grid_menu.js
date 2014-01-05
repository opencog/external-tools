//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane","dijit/Menu","dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator","dijit/form/CheckBox","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),structure:_3.layouts[0],modules:[_5.VirtualVScroller,_5.Focus,_5.RowHeader,_5.ExtendedSelectCell,_5.ExtendedSelectColumn,_5.ExtendedSelectRow,_5.Menu]});
grid.placeAt("gridContainer");
grid.startup();
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Bind Menu Actions",["<input id=\"grid-grid\" data-dojo-id=\"grid-grid\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"onChange: bindMenu\">Grid Menu</input><br/>","<input id=\"body-grid\" data-dojo-id=\"body-grid\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"onChange: bindMenu\">Body Menu</input><br/>","<input id=\"header\" data-dojo-id=\"header\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"onChange: bindMenu\">Header Menu</input><br/>","<input id=\"headercell\" data-dojo-id=\"headercell\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"onChange: bindMenu\">Header Cell Menu</input><br/>","<input id=\"headercell-selected\" data-dojo-id=\"headercell-selected\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"onChange: bindMenu\">Header Cell Selected Menu</input><br/>","<input id=\"row\" data-dojo-id=\"row\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"onChange: bindMenu\">Row Menu</input><br/>","<input id=\"row-selected\" data-dojo-id=\"row-selected\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"onChange: bindMenu\">Row Selected Menu</input><br/>","<input id=\"cell\" data-dojo-id=\"cell\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"onChange: bindMenu\">Cell Menu</input><br/>","<input id=\"cell-selected\" data-dojo-id=\"cell-selected\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"onChange: bindMenu\">Cell Selected Menu</input><br/>"].join(""));
tp.startup();
});
function bindMenu(_7){
var id=this.id.split("-"),_8=dijit.byId(this.id+"Menu");
if(_7){
grid.menu.bind(_8,{hookPoint:id[0],selected:id[1]=="selected"});
}else{
grid.menu.unbind(_8);
}
};
function getInfo(_9){
var _a=_9.row?_9.row:_9.cell?_9.cell.row:null;
var _b=_9.column?_9.column:_9.cell?_9.cell.column:null;
var _c=["grid id: "+_9.grid.id,"row id: "+(_a?_a.id:"null"),"row index: "+(_a?_a.index():"null"),"column id: "+(_b?_b.id:"null"),"column index: "+(_b?_b.index():"null"),"cell data: "+(_9.cell?_9.cell.data():"null")];
return _c.join("\n");
};
function showInfo(){
alert(getInfo(grid.menu.context));
};
