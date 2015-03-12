//>>built
define("gridx/modules/select/Cell",["dojo/_base/declare","dojo/_base/array","dojo/_base/sniff","dojo/dom-class","dojo/keys","./_RowCellBase","../../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_6,{name:"selectCell",cellMixin:{select:function(){
this.grid.select.cell.selectById(this.row.id,this.column.id);
return this;
},deselect:function(){
this.grid.select.cell.deselectById(this.row.id,this.column.id);
return this;
},isSelected:function(){
return this.grid.select.cell.isSelected(this.row.id,this.column.id);
}},getSelected:function(){
var t=this,_8=[];
_2.forEach(t.grid._columns,function(_9){
var _a=t.model.getMarkedIds(t._getMarkType(_9.id));
_8.push.apply(_8,_2.map(_a,function(_b){
return [_b,_9.id];
}));
});
return _8;
},clear:function(){
var t=this,m=t.model;
if(t.arg("enabled")){
_2.forEach(t.grid._columns,function(_c){
var _d=t._getMarkType(_c.id),_e=m.getMarkedIds(_d),_f=_e.length,i;
for(i=0;i<_f;++i){
m.markById(_e[i],0,_d);
}
});
m.when();
}
},_type:"cell",_markTypePrefix:"select_",_getMarkType:function(_10){
var _11=this._markTypePrefix+_10;
this.model._spTypes[_11]=1;
return _11;
},_init:function(){
var t=this,g=t.grid;
t.inherited(arguments);
t.batchConnect([g,"onCellMouseDown",function(e){
t._select([e.rowId,e.columnId],g._isCopyEvent(e));
}],[g,_3("ff")<4?"onCellKeyUp":"onCellKeyDown",function(e){
if(e.keyCode==_5.SPACE){
t._select([e.rowId,e.columnId],g._isCopyEvent(e));
}
}]);
},_isSelected:function(_12){
return this.isSelected(_12[0],_12[1]);
},_onMark:function(_13,_14,_15,_16){
var t=this;
if(_16.indexOf(t._markTypePrefix)===0){
var _17=_16.substr(t._markTypePrefix.length);
if(t.grid._columnsById[_17]){
t._highlight(_13,_17,_14);
t.model.when({id:_13},function(){
t[_14?"onSelected":"onDeselected"](t.grid.cell(_13,_17,1));
});
}
}
},_highlight:function(_18,_19,_1a){
var _1b=this.grid.body.getCellNode({rowId:_18,colId:_19});
if(_1b){
_4.toggle(_1b,"gridxCellSelected",_1a);
_1b.setAttribute("aria-selected",!!_1a);
this.onHighlightChange();
}
},_markById:function(_1c,_1d){
var t=this,m=this.model;
m.markById(_1c[0],_1d,t._getMarkType(_1c[1]));
m.when();
},_onRender:function(_1e,_1f){
var t=this,_20=t.model,end=_1e+_1f,i,j,_21,_22,_23=t.grid._columns;
for(i=_1e;i<end;++i){
_21=_20.indexToId(i);
for(j=_23.length-1;j>=0;--j){
_22=_23[j].id;
if(_20.getMark(_21,t._getMarkType(_22))){
t._highlight(_21,_22,1);
}
}
}
}});
});
