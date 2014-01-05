//>>built
require(["dojo/ready","gridx/Grid","gridx/core/model/cache/Sync","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/data/TestData","gridx/tests/support/data/TreeColumnarTestData","gridx/tests/support/data/TreeNestedTestData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/stores/JsonRestStore","gridx/tests/support/stores/Memory","gridx/tests/support/stores/TreeJsonRestStore","gridx/tests/support/stores/HugeStore","gridx/tests/support/modules","dojo/store/Memory","gridx/tests/support/GridConfig","dijit/Menu","dijit/MenuItem","dijit/MenuSeparator","dijit/PopupMenuItem","dijit/CheckedMenuItem","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){
var _11={"music store":{defaultCheck:true,store:_9({dataSource:_5,size:200}),layouts:{"layout 1":_5.layouts[0],"layout 2":_5.layouts[1]}},"test store":{store:_b({dataSource:_6,size:100}),layouts:{"layout 1":_6.layouts[0],"layout 2":_6.layouts[1]}},"server store":{isServerSide:true,store:_a({path:"./support/stores",size:10000}),layouts:{"layout 1":_6.layouts[0],"layout 2":_6.layouts[1]},onChange:function(_12,cfg){
if(_12){
cfg.getHandle("cache","Asynchronous Cache").set("checked",true);
}
}},"huge server store":{isServerSide:true,store:_d({path:"./support/stores",size:10000000}),layouts:{"layout 1":_6.layouts[1]},onChange:function(_13,cfg){
if(_13){
cfg.getHandle("cache","Asynchronous Cache").set("checked",true);
}
cfg.getHandle("attr","vScrollerLazy").set("checked",_13);
}},"tree columnar store":{store:_9({dataSource:_7,maxLevel:3,maxChildrenCount:10}),layouts:{"layout 1":_7.layouts[0]},onChange:function(_14,cfg){
cfg.getHandle("mod","tree").set("checked",_14);
}},"tree store nested":{store:_9({dataSource:_8,maxLevel:3,maxChildrenCount:10}),layouts:{"layout 1":_8.layouts[0]},onChange:function(_15,cfg){
cfg.getHandle("mod","tree").set("checked",_15);
cfg.getHandle("attr","treeNested").set("checked",_15);
}}};
var _16={"Asynchronous Cache":{defaultCheck:true,cache:_4},"Synchronous Cache":{cache:_3}};
var _17={autoWidth:{type:"bool"},autoHeight:{type:"bool"},headerDefaultColumnWidth:{type:"number",value:50},vScrollerLazy:{type:"bool"},vScrollerLazyTimeout:{type:"number",value:200},vScrollerBuffSize:{type:"number",value:5},columnResizerMinWidth:{type:"number",value:10},columnResizerDetectWidth:{type:"number",value:20},treeNested:{type:"bool"},columnLockCount:{type:"number",value:1},dodUseAnimation:{type:"bool"},dodDuration:{type:"number",value:300},dodDefaultShow:{type:"bool"},dodShowExpando:{type:"bool"},dodAutoClose:{type:"bool"},sortPreSort:{type:"json",value:"[{colId: \"1\", descending: true}]"},filterBarMaxRuleCount:{type:"number",value:0},filterBarCloseFilterBarButton:{type:"bool",value:true},filterBarDefineFilterButton:{type:"bool",value:true},filterBarTooltipDelay:{type:"number",value:300},filterBarRuleCountToConfirmClearFilter:{type:"number",value:2},paginationInitialPage:{type:"number",value:0},paginationInitialPageSize:{type:"number",value:10},paginationBarVisibleSteppers:{type:"number",value:5},paginationBarSizeSeparator:{type:"string",value:"|"},paginationBarPosition:{type:"enum",values:{"top":"top","bottom":"bottom"}},paginationBarSizes:{type:"json",value:"[10, 20, 40, 80, 0]"},paginationBarDescription:{type:"bool"},paginationBarSizeSwitch:{type:"bool"},paginationBarStepper:{type:"bool"},paginationBarGotoButton:{type:"bool"},rowHeaderWidth:{type:"string",value:"20px"},selectRowTriggerOnCell:{type:"bool"},selectRowMultiple:{type:"bool"},selectColumnMultiple:{type:"bool"},selectCellMultiple:{type:"bool"},moveCellCopy:{type:"bool"},titleBarLabel:{type:"string",value:"All in one grid"}};
var _18={"Make formatted columns sortable":_e.FormatSort};
var _19={"vertical scroll":{virtual:_e.VirtualVScroller,"non virtual":_e.VScroller},focus:{"default":_e.Focus},columnResizer:{"default":_e.ColumnResizer},persistence:{"default":_e.Persist},toolBar:{"default":_e.ToolBar},sort:{single:_e.SingleSort,nested:_e.NestedSort},"export CSV":{"default":_e.ExportCSV},"export Table":{"default":_e.ExportTable},"print":{"default":_e.Printer},"column lock":{"default":_e.ColumnLock},"row header":{"defalt":_e.RowHeader},"indirect selection":{"defalt":_e.IndirectSelect},"row select":{basic:_e.SelectRow,extended:_e.ExtendedSelectRow},"column select":{basic:_e.SelectColumn,extended:_e.ExtendedSelectColumn},"cell select":{basic:_e.SelectCell,extended:_e.ExtendedSelectCell},"row move api":{"default":_e.MoveRow},"column move api":{"default":_e.MoveColumn},"row dnd":{"default":_e.DndRow},"column dnd":{"default":_e.DndColumn},"pagination api":{"default":_e.Pagination},"pagination bar":{"default":_e.PaginationBar,"drop down":_e.PaginationBarDD},"filter api":{"default":_e.Filter},"filter bar":{"default":_e.FilterBar},"widget in cell":{"default":_e.CellWidget},"edit":{"default":_e.Edit},"title bar":{"default":_e.TitleBar},"tree":{"default":_e.Tree},"summary bar":{"default":_e.SummaryBar},"menu":{"default":_e.Menu}};
function _1a(_1b){
_1c();
_1b.id="grid";
var t1=new Date().getTime();
window.grid=new _2(_1b);
var t2=new Date().getTime();
window.grid.placeAt("gridContainer");
var t3=new Date().getTime();
window.grid.startup();
var t4=new Date().getTime();
document.getElementById("tutor").style.display="none";
};
function _1c(){
if(window.grid){
window.grid.destroy();
window.grid=null;
}
document.getElementById("tutor").style.display="";
};
_1(function(){
var cfg=new _10({stores:_11,caches:_16,gridAttrs:_17,modules:_19,modelExts:_18,onCreate:_1a,onDestroy:_1c},"gridConfig");
cfg.startup();
});
});
