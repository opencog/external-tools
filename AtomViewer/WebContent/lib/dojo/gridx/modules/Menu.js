//>>built
define("gridx/modules/Menu",["dojo/_base/declare","dojo/_base/connect","../core/_Module","dojo/dom-class","dojo/keys","dojo/_base/event","dojo/_base/lang","dijit/registry","dijit/Menu"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return _1(_3,{name:"menu",getAPIPath:function(){
return {menu:this};
},constructor:function(){
this._menus={};
},context:null,bind:function(_a,_b){
_b=_b||{};
var t=this,g=t.grid,_c=_b.hookPoint&&_b.hookPoint.toLowerCase()||"grid",_d=_b.selected?_c+"-selected":_c,_e=t._evtMap[_c],m=t._menus[_d]=t._menus[_d]||{},_f=_7.partial(t._showMenu,_d);
_2.disconnect(m.open);
_2.disconnect(m.close);
m.menu=_8.byId(_a);
if(_e){
m.open=t.connect(g,_e,_f);
}else{
if(_c=="body"){
m.open=t.connect(g.bodyNode,"oncontextmenu",_f);
}else{
m.open=t.connect(g.domNode,"oncontextmenu",_f);
}
}
m.close=t.connect(m.menu,"onClose",function(){
t._mutex=0;
});
},unbind:function(_10){
var _11,_12=this._menus,m;
_10=_8.byId(_10);
for(_11 in _12){
m=_12[_11];
if(m.menu==_10){
_2.disconnect(m.open);
_2.disconnect(m.close);
delete _12[_11];
return;
}
}
},_evtMap:{header:"onHeaderContextMenu",headercell:"onHeaderCellContextMenu",cell:"onCellContextMenu",row:"onRowContextMenu"},_showMenu:function(_13,e){
var t=this,_14=t._menus;
if(!t._mutex&&_14[_13].menu){
var g=t.grid,rid=e.rowId,cid=e.columnId,_15=!_13.indexOf("row"),_16=!_13.indexOf("cell"),_17=!_13.indexOf("headercell"),_18=_13.indexOf("-")>0,_19=!!((_16&&_4.contains(e.cellNode,"gridxCellSelected"))||(_17&&_4.contains(g.header.getHeaderNode(cid),"gridxColumnSelected"))||(_15&&_4.contains(g.body.getRowNode({rowId:rid}),"gridxRowSelected")));
if(_18==_19||(!_18&&_19&&!_14[_13+"-selected"])){
t.context={grid:g,column:_17&&g.column(cid,1),row:_15&&g.row(rid,1),cell:_16&&g.cell(rid,cid,1)};
_6.stop(e);
t._mutex=1;
_14[_13].menu._openMyself({target:e.target,coords:e.keyCode!=_5.F10&&"pageX" in e?{x:e.pageX,y:e.pageY}:null});
}
}
}});
});
