//>>built
require(["dojo/_base/lang","dojo/_base/html","dojo/_base/array","dojo/_base/connect","dojo/_base/window","dojo/dnd/Target","dojo/dnd/Source","gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/TestPane","gridx/tests/support/modules","dijit/form/Button","dijit/form/TextBox","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
function _e(id,_f,_10,_11,_12){
var g=new _8(_1.mixin({id:id,cacheClass:_9,store:_b({path:"./support/stores",dataSource:_a,size:_10}),selectRowTriggerOnCell:true,modules:[_d.Focus,_d.ExtendedSelectColumn,_d.MoveColumn,_d.DndColumn,_d.VirtualVScroller],structure:_a.layouts[_11]},_12));
g.placeAt(_f);
g.startup();
return g;
};
grid=_e("grid","grid1Container",100,0,{dndColumnCanRearrange:false});
var _13=new _6("songForm",{accept:["grid/columns"],onDropExternal:function(_14,_15,_16){
_2.byId("draggedColumns").innerHTML=_3.map(_15,function(_17){
return _17.getAttribute("columnid");
}).join(", ");
}});
grid.dnd._dnd._fixFF(_13,"songForm");
});
