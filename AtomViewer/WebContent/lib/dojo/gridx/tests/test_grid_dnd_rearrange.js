//>>built
require(["dojo/_base/lang","gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/TestPane","gridx/tests/support/modules","dijit/form/Button","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7){
function _8(id,_9,_a,_b,_c){
var g=new _2(_1.mixin({id:id,cacheClass:_3,store:_5({path:"./support/stores",dataSource:_4,size:_a}),selectRowTriggerOnCell:true,dndRowAccept:[],dndRowProvide:[],modules:[_7.Focus,_7.Filter,_7.FilterBar,_7.ExtendedSelectRow,_7.ExtendedSelectColumn,_7.RowHeader,_7.MoveRow,_7.MoveColumn,_7.DndRow,_7.DndColumn,_7.Pagination,_7.PaginationBar,_7.VirtualVScroller],structure:_4.layouts[_b]},_c));
g.placeAt(_9);
g.startup();
return g;
};
_8("grid","gridContainer",100,0,{});
});
