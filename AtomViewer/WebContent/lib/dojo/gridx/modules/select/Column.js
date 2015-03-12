//>>built
define("gridx/modules/select/Column",["dojo/_base/declare","dojo/_base/query","dojo/_base/array","dojo/_base/sniff","dojo/dom-class","dojo/keys","./_Base","../../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _1(_7,{name:"selectColumn",columnMixin:{select:function(){
this.grid.select.column._markById(this.id,1);
return this;
},deselect:function(){
this.grid.select.column._markById(this.id,0);
return this;
},isSelected:function(){
return this.grid.select.column.isSelected(this.id);
}},selectById:function(id){
this._markById(id,1);
},deselectById:function(id){
this._markById(id,0);
},isSelected:function(id){
var c=this.grid._columnsById[id];
return !!(c&&c._selected);
},getSelected:function(){
var _9=[],i,c,g=this.grid,_a=g._columns,_b=_a.length;
for(i=0;i<_b;++i){
c=_a[i];
if(c._selected){
_9.push(c.id);
}
}
return _9;
},clear:function(){
var _c=this.grid._columns,i,_d=_c.length;
for(i=0;i<_d;++i){
this._markById(_c[i].id,0);
}
},_type:"column",_init:function(){
var t=this,g=t.grid;
t.batchConnect([g,"onHeaderCellClick",function(e){
if(!_5.contains(e.target,"gridxArrowButtonNode")){
t._select(e.columnId,g._isCopyEvent(e));
}
}],[g,_4("ff")<4?"onHeaderCellKeyUp":"onHeaderCellKeyDown",function(e){
if(e.keyCode==_6.SPACE||e.keyCode==_6.ENTER){
t._select(e.columnId,g._isCopyEvent(e));
}
}]);
},_markById:function(id,_e){
var t=this,c=t.grid._columnsById[id];
if(t.arg("enabled")){
_e=!!_e;
if(c&&!c._selected==_e){
c._selected=_e;
t._highlight(id,_e);
t[_e?"onSelected":"onDeselected"](t.grid.column(id,1));
}
}
},_highlight:function(id,_f){
var t=this,g=t.grid;
_2("[colid='"+id+"']",g.bodyNode).forEach(function(_10){
_5.toggle(_10,"gridxColumnSelected",_f);
t.onHighlightChange({column:g._columnsById[id].index},_f);
});
},_onRender:function(_11,_12){
var i,j,_13,end=_11+_12,g=this.grid,bn=g.bodyNode,_14=_3.filter(g._columns,function(col){
return col._selected;
});
for(i=_14.length-1;i>=0;--i){
for(j=_11;j<end;++j){
_13=_2(["[visualindex=\"",j,"\"] [colid=\"",_14[i].id,"\"]"].join(""),bn)[0];
_5.add(_13,"gridxColumnSelected");
}
}
}});
});
