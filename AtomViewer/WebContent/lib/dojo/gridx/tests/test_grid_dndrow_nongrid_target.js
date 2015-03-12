//>>built
require(["dojo/_base/lang","dojo/_base/html","dojo/_base/array","dojo/_base/connect","dojo/_base/window","dojo/dnd/Target","dojo/dnd/Source","gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/TestPane","gridx/tests/support/modules","dijit/form/Button","dijit/form/TextBox","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
function _e(id,_f,_10,_11,_12){
var g=new _8(_1.mixin({id:id,cacheClass:_9,store:_b({path:"./support/stores",dataSource:_a,size:_10}),selectRowTriggerOnCell:true,modules:[_d.ExtendedSelectRow,_d.ExtendedSelectColumn,_d.MoveRow,_d.MoveColumn,_d.DndRow,_d.DndColumn,_d.VirtualVScroller,_d.ColumnResizer],structure:_a.layouts[_11]},_12));
g.placeAt(_f);
g.startup();
return g;
};
grid=_e("grid","grid1Container",25,6,{});
var _13=new _6("songForm",{accept:["grid/rows"],onDropExternal:function(_14,_15,_16){
var _17=_14.grid.model,_18=_15[0].getAttribute("rowid");
_17.when({id:_18},function(){
var _19=_17.byId(_18).rawData;
_2.byId("inputName").value=_19["Name"];
_2.byId("inputYear").value=_19["Year"];
_2.byId("inputGenre").value=_19["Genre"];
_2.byId("inputArtist").value=_19["Artist"];
_2.byId("inputAlbum").value=_19["Album"];
_2.byId("inputComposer").value=_19["Composer"];
_2.byId("inputLength").value=_19["Length"];
_2.byId("inputTrack").value=_19["Track"];
});
}});
grid.dnd._dnd._fixFF(_13,"songForm");
var _1a=new _6("trashcan",{accept:["grid/rows"],onDropExternal:function(_1b,_1c,_1d){
_1b.grid.dnd.row.onDraggedOut(this);
_2.byId("trashcan").innerHTML+=_3.map(_1c,function(_1e){
return "<span class=\"trashItem\">"+_1e.getAttribute("rowid")+"</span>";
}).join("");
}});
grid.dnd._dnd._fixFF(_1a);
});
