//>>built
require(["dojo/_base/array","gridx/Grid","gridx/core/model/cache/Sync","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/modules","dojo/number","dijit/layout/BorderContainer","dijit/layout/TabContainer","dijit/layout/AccordionContainer","dijit/layout/ContentPane","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6){
var _7=function(){
return new _2({cacheClass:_3,store:_5({dataSource:_4,size:10}),structure:_4.layouts[0],modules:[_6.Focus,_6.VirtualVScroller,_6.RowHeader,_6.IndirectSelect,_6.NestedSort,_6.ExtendedSelectRow,_6.ExtendedSelectColumn,_6.ExtendedSelectCell,_6.Filter,_6.FilterBar,_6.Pagination,_6.PaginationBar]});
};
dojo.ready(function(){
_1.forEach(["centerPane","rightPane","bottomPane"],function(_8,i){
dijit.byId(_8).set("content",_7());
});
_1.forEach(new Array(5),function(a,i){
dijit.byId("tabPane").addChild(new dijit.layout.ContentPane({title:"Tab "+(i+1),content:_7()}));
});
_1.forEach(new Array(3),function(a,i){
dijit.byId("accPane").addChild(new dijit.layout.ContentPane({title:"Accordion "+(i+1),content:_7()}));
});
});
});
