//>>built
define("gridx/modules/select/Row",["dojo/_base/declare","dojo/_base/array","dojo/_base/sniff","dojo/_base/query","dojo/dom-class","dojo/keys","./_RowCellBase","../../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _1(_7,{name:"selectRow",rowMixin:{select:function(){
this.grid.select.row.selectById(this.id);
return this;
},deselect:function(){
this.grid.select.row.deselectById(this.id);
return this;
},isSelected:function(){
return this.grid.select.row.isSelected(this.id);
}},triggerOnCell:false,treeMode:true,getSelected:function(){
return this.model.getMarkedIds();
},clear:function(){
if(this.arg("enabled")){
var _9=this.model;
_2.forEach(_9.getMarkedIds(),function(id){
_9.markById(id,0);
});
_9.when();
}
},_type:"row",_init:function(){
var t=this,g=t.grid;
t.model.treeMarkMode("",t.arg("treeMode"));
t.inherited(arguments);
t.model._spTypes.select=1;
t.batchConnect([g,"onRowMouseDown",function(e){
if((t.arg("triggerOnCell")&&!_5.contains(e.target,"gridxTreeExpandoIcon")&&!_5.contains(e.target,"gridxTreeExpandoInner"))||!e.columnId){
t._select(e.rowId,g._isCopyEvent(e));
}
}],[g,_3("ff")<4?"onRowKeyUp":"onRowKeyDown",function(e){
if((t.arg("triggerOnCell")||!e.columnId)&&e.keyCode==_6.SPACE){
t._select(e.rowId,g._isCopyEvent(e));
}
}]);
},_onMark:function(id,_a,_b,_c){
if(_c=="select"){
var t=this;
t._highlight(id,_a);
t.model.when({id:id},function(){
t[_a?"onSelected":"onDeselected"](t.grid.row(id,1));
});
}
},_highlight:function(_d,_e){
var _f=_4("[rowid=\""+_d+"\"]",this.grid.mainNode),_10=_e&&_e!="mixed";
if(_f.length){
_f.forEach(function(_11){
_5.toggle(_11,"gridxRowSelected",_10);
_5.toggle(_11,"gridxRowPartialSelected",_e=="mixed");
_11.setAttribute("aria-selected",!!_10);
});
this.onHighlightChange({row:parseInt(_f[0].getAttribute("visualindex"),10)},_e);
}
},_markById:function(id,_12){
var m=this.model;
if(m.treeMarkMode()&&!m.getMark(id)&&_12){
_12="mixed";
}
m.markById(id,_12);
m.when();
},_onRender:function(_13,_14){
var t=this,_15=t.model,end=_13+_14,i,id,_16;
for(i=_13;i<end;++i){
_16=t.grid.body.getRowNode({visualIndex:i});
if(_16){
id=_16.getAttribute("rowid");
t._highlight(id,_15.getMark(id));
}
}
}});
});
