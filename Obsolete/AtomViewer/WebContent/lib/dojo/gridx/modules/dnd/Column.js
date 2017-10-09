//>>built
define("gridx/modules/dnd/Column",["dojo/_base/declare","dojo/_base/array","dojo/dom-geometry","dojo/dom-class","dojo/_base/query","./_Base","../../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_6,{name:"dndColumn",required:["_dnd","selectColumn","moveColumn"],getAPIPath:function(){
return {dnd:{column:this}};
},preload:function(){
var t=this,g=t.grid;
t.inherited(arguments);
t._selector=g.select.column;
t.connect(g.header,"onRender","_initHeader");
},load:function(){
this._initHeader();
this.loaded.callback();
},accept:[],provide:["grid/columns"],_checkDndReady:function(_8){
var t=this;
if(t._selector.isSelected(_8.columnId)){
t._selectedColIds=t._selector.getSelected();
t.grid.dnd._dnd.profile=t;
return true;
}
return false;
},onDraggedOut:function(){
},_cssName:"Column",_initHeader:function(){
_5(".gridxCell",this.grid.header.domNode).attr("aria-dragged","false");
},_onBeginDnd:function(_9){
var t=this;
_9.delay=t.arg("delay");
_2.forEach(t._selectedColIds,function(id){
_5("[colid=\""+id+"\"].gridxCell",t.grid.header.domNode).attr("aria-dragged","true");
});
},_getDndCount:function(){
return this._selectedColIds.length;
},_onEndDnd:function(){
_5("[aria-dragged=\"true\"].gridxCell",this.grid.header.domNode).attr("aria-dragged","false");
},_buildDndNodes:function(){
var _a=this.grid.id;
return _2.map(this._selectedColIds,function(_b){
return ["<div id='",_a,"_dndcolumn_",_b,"' gridid='",_a,"' columnid='",_b,"'></div>"].join("");
}).join("");
},_onBeginAutoScroll:function(){
var _c=this.grid.autoScroll;
this._autoScrollV=_c.vertical;
_c.vertical=false;
},_onEndAutoScroll:function(){
this.grid.autoScroll.vertical=this._autoScrollV;
},_getItemData:function(id){
return id.substring((this.grid.id+"_dndcolumn_").length);
},_calcTargetAnchorPos:function(_d,_e){
var _f=_d.target,t=this,g=t.grid,ltr=g.isLeftToRight(),_10=g._columns,ret={height:_e.h+"px",width:"",top:""},_11=function(n){
var id=n.getAttribute("colid"),_12=g._columnsById[id].index,_13=n,_14=n,_15=_12,_16=_12;
if(t._selector.isSelected(id)){
_15=_12;
while(_15>0&&t._selector.isSelected(_10[_15-1].id)){
--_15;
}
_13=_5(".gridxHeaderRow [colid='"+_10[_15].id+"']",g.headerNode)[0];
_16=_12;
while(_16<_10.length-1&&t._selector.isSelected(_10[_16+1].id)){
++_16;
}
_14=_5(".gridxHeaderRow [colid='"+_10[_16].id+"']",g.headerNode)[0];
}
if(_13&&_14){
var _17=_3.position(_13),_18=_3.position(_14),_19=(_17.x+_18.x+_18.w)/2,pre=_d.clientX<_19;
if(pre){
ret.left=(_17.x-_e.x-1)+"px";
}else{
ret.left=(_18.x+_18.w-_e.x-1)+"px";
}
t._target=pre^ltr?_16+1:_15;
}else{
delete t._target;
}
return ret;
};
while(_f){
if(_4.contains(_f,"gridxCell")){
return _11(_f);
}
_f=_f.parentNode;
}
var _1a=_5(".gridxRow",g.bodyNode)[0],_1b=_3.position(_1a.firstChild);
if(_1b.x+_1b.w<=_d.clientX){
ret.left=(_1b.x+_1b.w-_e.x-1)+"px";
t._target=_10.length;
}else{
if(_1b.x>=_d.clientX){
ret.left=(_1b.x-_e.x-1)+"px";
t._target=0;
}else{
if(_5(".gridxCell",_1a).some(function(_1c){
var _1d=_3.position(_1c);
if(_1d.x<=_d.clientX&&_1d.x+_1d.w>=_d.clientX){
_f=_1c;
return true;
}
})){
return _11(_f);
}
}
}
return ret;
},_onDropInternal:function(_1e,_1f){
var t=this;
if(t._target>=0){
var _20=_2.map(t._selectedColIds,function(_21){
return t.grid._columnsById[_21].index;
});
t.grid.move.column.move(_20,t._target);
}
},_onDropExternal:function(){
}});
});
