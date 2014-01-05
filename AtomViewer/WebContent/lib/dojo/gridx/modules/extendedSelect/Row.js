//>>built
define("gridx/modules/extendedSelect/Row",["dojo/_base/declare","dojo/_base/array","dojo/_base/query","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/sniff","dojo/dom-class","dojo/mouse","dojo/keys","../../core/_Module","./_RowCellBase"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
return _1(_b,{name:"selectRow",rowMixin:{select:function(){
this.grid.select.row.selectById(this.id);
return this;
},deselect:function(){
this.grid.select.row.deselectById(this.id);
return this;
},isSelected:function(){
return this.model.getMark(this.id)===true;
}},triggerOnCell:false,treeMode:true,getSelected:function(){
return this.model.getMarkedIds();
},isSelected:function(){
return _2.every(arguments,function(id){
return this.model.getMark(id)===true;
},this);
},clear:function(_c){
_3(".gridxRowSelected",this.grid.mainNode).forEach(function(_d){
_7.remove(_d,"gridxRowSelected");
_d.removeAttribute("aria-selected");
});
_3(".gridxRowPartialSelected",this.grid.mainNode).forEach(function(_e){
_7.remove(_e,"gridxRowPartialSelected");
});
this._clear();
this.model.clearMark();
if(!_c){
this._onSelectionChange();
}
},onHighlightChange:function(){
},_type:"row",_init:function(){
var t=this,g=t.grid;
t.model.treeMarkMode("",t.arg("treeMode"));
t.inherited(arguments);
t.model._spTypes.select=1;
t.batchConnect(g.rowHeader&&[g.rowHeader,"onMoveToRowHeaderCell","_onMoveToRowHeaderCell"],[g,"onRowMouseDown",function(e){
if(_8.isLeft(e)&&((t.arg("triggerOnCell")&&!_7.contains(e.target,"gridxTreeExpandoIcon")&&!_7.contains(e.target,"gridxTreeExpandoInner"))||!e.columnId)){
t._isOnCell=e.columnId;
if(t._isOnCell){
g.body._focusCellCol=e.columnIndex;
}
t._start({row:e.visualIndex},g._isCopyEvent(e),e.shiftKey);
}
}],[g,"onRowMouseOver",function(e){
if(t._selecting&&t.arg("triggerOnCell")&&e.columnId){
g.body._focusCellCol=e.columnIndex;
}
t._highlight({row:e.visualIndex});
}],[g,_6("ff")<4?"onRowKeyUp":"onRowKeyDown",function(e){
if(e.keyCode==_9.SPACE&&(!e.columnId||(t.arg("triggerOnCell")&&(!g.focus||g.focus.currentArea()=="body")))){
t._isOnCell=e.columnId;
t._start({row:e.visualIndex},g._isCopyEvent(e),e.shiftKey);
t._end();
}
}]);
},_markById:function(_f,_10){
var m=this.model;
_2.forEach(_f,function(arg){
m.markById(arg,_10);
});
m.when();
},_markByIndex:function(_11,_12){
var g=this.grid,m=this.model,_13=g.body,_14;
_2.forEach(_11,function(arg){
if(_4.isArrayLike(arg)){
var _15=arg[0],end=arg[1],i,_16;
if(_15>=0&&_15<Infinity){
if(end>=_15&&end<Infinity){
_16=end-_15+1;
}else{
_16=_13.visualCount-_15;
}
_14=_13.getRowInfo({visualIndex:_15});
_15=_14.rowIndex;
for(i=0;i<_16;++i){
m.markByIndex(i+_15,_12,"",_14.parentId);
}
}
}else{
if(arg>=0&&arg<Infinity){
_14=_13.getRowInfo({visualIndex:arg});
m.markByIndex(_14.rowIndex,_12,"",_14.parentId);
}
}
});
return m.when();
},_onRender:function(_17,_18){
var t=this,i,end=_17+_18;
for(i=_17;i<end;++i){
var _19={row:i};
if(t._isSelected(_19)||(t._selecting&&t._toSelect&&t._inRange(i,t._startItem.row,t._currentItem.row,1))){
t._doHighlight(_19,1);
}
}
},_onMark:function(id,_1a,_1b,_1c){
if(_1c=="select"){
var _1d=_3("[rowid=\""+id+"\"]",this.grid.mainNode);
if(_1d.length){
_1d.forEach(function(_1e){
var _1f=_1a&&_1a!="mixed";
_7.toggle(_1e,"gridxRowSelected",_1f);
_7.toggle(_1e,"gridxRowPartialSelected",_1a=="mixed");
_1e.setAttribute("aria-selected",!!_1f);
});
this.onHighlightChange({row:parseInt(_1d[0].getAttribute("visualindex"),10)},_1a);
}
}
},_onMoveToCell:function(_20,_21,e){
var t=this;
if(t.arg("triggerOnCell")&&e.shiftKey&&(e.keyCode==_9.UP_ARROW||e.keyCode==_9.DOWN_ARROW)){
t._start({row:_20},t.grid._isCopyEvent(e),1);
t._end();
}
},_onMoveToRowHeaderCell:function(_22,e){
if(e.shiftKey){
this._start({row:_22},this.grid._isCopyEvent(e),1);
this._end();
}
},_isSelected:function(_23){
var t=this,id=t._getRowId(_23.row);
return t._isRange?_2.indexOf(t._refSelectedIds,id)>=0:t.model.getMark(id);
},_beginAutoScroll:function(){
var _24=this.grid.autoScroll;
this._autoScrollH=_24.horizontal;
_24.horizontal=false;
},_endAutoScroll:function(){
this.grid.autoScroll.horizontal=this._autoScrollH;
},_doHighlight:function(_25,_26){
_3("[visualindex=\""+_25.row+"\"]",this.grid.mainNode).forEach(function(_27){
_7.toggle(_27,"gridxRowSelected",_26);
_27.setAttribute("aria-selected",!!_26);
});
this.onHighlightChange(_25,_26);
},_end:function(){
this.inherited(arguments);
delete this._isOnCell;
},_focus:function(_28){
var g=this.grid,_29=g.focus;
if(_29){
g.body._focusCellRow=_28.row;
_29.focusArea(this._isOnCell?"body":"rowHeader",true);
}
},_addToSelected:function(_2a,end,_2b){
var t=this,bd=t.grid.body,m=t.model,_2c=t._lastEndItem,a,b,i,d;
if(!t._isRange){
t._refSelectedIds=m.getMarkedIds();
}
if(t._isRange&&t._inRange(end.row,_2a.row,_2c.row)){
a=Math.min(end.row,_2c.row);
b=Math.max(end.row,_2c.row);
_2a=bd.getRowInfo({visualIndex:a}).rowIndex+1;
end=bd.getRowInfo({visualIndex:b}).rowIndex;
d=new _5();
m.when({start:_2a,count:end-_2a+1},function(){
for(i=_2a;i<=end;++i){
var id=m.indexToId(i),_2d=_2.indexOf(t._refSelectedIds,id)>=0;
m.markById(id,_2d);
}
}).then(function(){
m.when(null,function(){
d.callback();
});
});
return d;
}else{
a=Math.min(_2a.row,end.row);
b=Math.max(_2a.row,end.row);
for(i=a;i<=b;++i){
var _2e=bd.getRowInfo({visualIndex:i});
m.markByIndex(_2e.rowIndex,_2b,"",_2e.parentId);
}
return m.when();
}
}});
});
