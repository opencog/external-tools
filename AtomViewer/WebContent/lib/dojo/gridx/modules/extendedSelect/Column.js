//>>built
define("gridx/modules/extendedSelect/Column",["dojo/_base/declare","dojo/_base/array","dojo/_base/query","dojo/_base/lang","dojo/_base/sniff","dojo/dom-class","dojo/mouse","dojo/keys","../../core/_Module","./_Base"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
return _1(_a,{name:"selectColumn",columnMixin:{select:function(){
this.grid.select.column.selectById(this.id);
return this;
},deselect:function(){
this.grid.select.column.deselectById(this.id);
return this;
},isSelected:function(){
return !!this.grid._columnsById[this.id]._selected;
}},getSelected:function(){
return _2.map(_2.filter(this.grid._columns,function(_b){
return _b._selected;
}),function(_c){
return _c.id;
});
},clear:function(_d){
_3(".gridxColumnSelected",this.grid.domNode).forEach(function(_e){
_6.remove(_e,"gridxColumnSelected");
_e.removeAttribute("aria-selected");
});
_2.forEach(this.grid._columns,function(_f){
_f._selected=0;
});
this._clear();
if(!_d){
this._onSelectionChange();
}
},isSelected:function(){
var _10=this.grid._columnsById;
return _2.every(arguments,function(id){
var col=_10[id];
return col&&col._selected;
});
},_type:"column",_markById:function(_11,_12){
_2.forEach(_11,function(_13){
var col=this.grid._columnsById[_13];
if(col){
col._selected=_12;
this._doHighlight({column:col.index},_12);
}
},this);
},_markByIndex:function(_14,_15){
var i,col,_16=this.grid._columns;
for(i=0;i<_14.length;++i){
var arg=_14[i];
if(_4.isArrayLike(arg)){
var _17=arg[0],end=arg[1],_18;
if(_17>=0&&_17<Infinity){
if(!(end>=_17&&end<Infinity)){
end=_16.length-1;
}
for(;_17<end+1;++_17){
col=_16[_17];
if(col){
col._selected=_15;
this._doHighlight({column:col.index},_15);
}
}
}
}else{
if(arg>=0&&arg<Infinity){
col=_16[arg];
if(col){
col._selected=_15;
this._doHighlight({column:arg},_15);
}
}
}
}
},_init:function(){
var t=this,g=t.grid;
t.batchConnect([g,"onHeaderCellMouseDown",function(e){
if(_7.isLeft(e)&&!_6.contains(e.target,"gridxArrowButtonNode")){
t._start({column:e.columnIndex},g._isCopyEvent(e),e.shiftKey);
}
}],[g,"onHeaderCellMouseOver",function(e){
t._highlight({column:e.columnIndex});
}],[g,"onCellMouseOver",function(e){
t._highlight({column:e.columnIndex});
}],[g,_5("ff")<4?"onHeaderCellKeyUp":"onHeaderCellKeyDown",function(e){
if((e.keyCode==_8.SPACE||e.keyCode==_8.ENTER)&&!_6.contains(e.target,"gridxArrowButtonNode")){
t._start({column:e.columnIndex},g._isCopyEvent(e),e.shiftKey);
t._end();
}
}],[g.header,"onMoveToHeaderCell","_onMoveToHeaderCell"]);
},_onRender:function(_19,_1a){
var i,j,end=_19+_1a,g=this.grid,bn=g.bodyNode,_1b,_1c=_2.filter(g._columns,function(col){
return col._selected;
});
for(i=_1c.length-1;i>=0;--i){
for(j=_19;j<end;++j){
_1b=_3(["[visualindex=\"",j,"\"] [colid=\"",_1c[i].id,"\"]"].join(""),bn)[0];
_6.add(_1b,"gridxColumnSelected");
_1b.setAttribute("aria-selected",true);
}
}
},_onMoveToHeaderCell:function(_1d,e){
if(e.shiftKey&&(e.keyCode==_8.LEFT_ARROW||e.keyCode==_8.RIGHT_ARROW)){
var t=this,col=t.grid._columnsById[_1d];
t._start({column:col.index},t.grid._isCopyEvent(e),1);
t._end();
}
},_isSelected:function(_1e){
var t=this,col=t.grid._columns[_1e.column],id=col.id;
return t._isRange?_2.indexOf(t._refSelectedIds,id)>=0:col._selected;
},_beginAutoScroll:function(){
var _1f=this.grid.autoScroll;
this._autoScrollV=_1f.vertical;
_1f.vertical=false;
},_endAutoScroll:function(){
this.grid.autoScroll.vertical=this._autoScrollV;
},_doHighlight:function(_20,_21){
_3("[colid=\""+this.grid._columns[_20.column].id+"\"].gridxCell",this.grid.domNode).forEach(function(_22){
_6.toggle(_22,"gridxColumnSelected",_21);
});
},_focus:function(_23){
var g=this.grid;
if(g.focus){
g.header._focusNode(_3("[colid=\""+g._columns[_23.column].id+"\"].gridxCell",g.header.domNode)[0]);
}
},_addToSelected:function(_24,end,_25){
var t=this,g=t.grid,a,i;
if(!t._isRange){
t._refSelectedIds=t.getSelected();
}
if(t._isRange&&t._inRange(end.column,_24.column,t._lastEndItem.column)){
_24=Math.min(end.column,t._lastEndItem.column);
end=Math.max(end.column,t._lastEndItem.column);
for(i=_24;i<=end;++i){
g._columns[i]._selected=_2.indexOf(t._refSelectedIds,g._columns[i].id)>=0;
}
}else{
a=Math.min(_24.column,end.column);
end=Math.max(_24.column,end.column);
_24=a;
for(i=_24;i<=end;++i){
g._columns[i]._selected=_25;
}
}
}});
});
