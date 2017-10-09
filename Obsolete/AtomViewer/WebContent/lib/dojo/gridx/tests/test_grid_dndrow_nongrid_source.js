//>>built
require(["dojo/_base/lang","dojo/_base/html","dojo/_base/array","dojo/_base/connect","dojo/_base/window","dojo/dnd/Target","dojo/dnd/Source","gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/TestPane","gridx/tests/support/modules","dijit/form/Button","dijit/form/TextBox","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
function _e(id,_f,_10,_11,_12){
var g=new _8(_1.mixin({id:id,cacheClass:_9,store:_b({path:"./support/stores",dataSource:_a,size:_10}),selectRowTriggerOnCell:true,modules:[_d.ExtendedSelectRow,_d.ExtendedSelectColumn,_d.MoveRow,_d.MoveColumn,_d.DndRow,_d.DndColumn,_d.VirtualVScroller],structure:_a.layouts[_11]},_12));
g.placeAt(_f);
g.startup();
return g;
};
grid=_e("grid","grid1Container",25,0,{});
var _13=function(_14,i){
return ["<div id=\"songItem_",i,"\" class=\"dojoDndItem songItem\" dndType=\"grid/rows\" itemindex=\"",i,"\"><span class=\"songItemId\">",_14.id,"</span><span class=\"songItemName\">",_14.Name,"</span><span class=\"songItemArtist\">",_14.Artist,"</span></div>"].join("");
};
var _15=_a.getData(50).items;
_2.byId("draggableItems").innerHTML=_3.map(_15.slice(25),function(_16,i){
return _13(_16,i+25);
}).join("");
var _17=new _7("draggableItems",{accept:["grid/rows"],getGridDndRowData:function(_18){
return _3.map(_18,function(_19){
var idx=_19.getAttribute("itemindex");
return _15[idx];
});
},onDropExternal:function(_1a,_1b,_1c){
if(_1b[0].hasAttribute("rowid")){
var _1d=_3.map(_1b,function(_1e){
return _1e.getAttribute("rowid");
});
var _1f=this;
grid.model.when({id:_1d},function(){
_1b=_3.map(_1d,function(id){
var _20;
for(var i=0;i<_15.length;++i){
if(_15[i].id==id){
return _2.toDom(_13(_15[i],i));
}
}
return null;
});
_7.prototype.onDropExternal.call(_1f,_1a,_1b,_1c);
}).then(function(){
grid.dnd.row.onDraggedOut(_1f);
});
}else{
_7.prototype.onDropExternal.call(this,_1a,_1b,_1c);
}
}});
grid.dnd._dnd._fixFF(_17);
});
