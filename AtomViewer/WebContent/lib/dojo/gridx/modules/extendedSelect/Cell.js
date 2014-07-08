//>>built
define("gridx/modules/extendedSelect/Cell",["dojo/_base/declare","dojo/_base/array","dojo/_base/query","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/sniff","dojo/dom-class","dojo/mouse","dojo/keys","../../core/_Module","./_RowCellBase"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
var _c=_4.isArrayLike;
function _d(_e,_f,_10,_11){
return {rid:_e,r:_f,cid:_10,c:_11};
};
return _1(_b,{name:"selectCell",cellMixin:{select:function(){
this.grid.select.cell.selectByIndex(this.row.index(),this.column.index());
return this;
},deselect:function(){
this.grid.select.cell.deselectByIndex(this.row.index(),this.column.index());
return this;
},isSelected:function(){
return this.grid.select.cell.isSelected(this.row.id,this.column.id);
}},getSelected:function(){
var t=this,res=[];
_2.forEach(t.grid._columns,function(col){
var ids=t.model.getMarkedIds(t._getMarkType(col.id));
res.push.apply(res,_2.map(ids,function(rid){
return [rid,col.id];
}));
});
return res;
},clear:function(_12){
var t=this;
_3(".gridxCellSelected",t.grid.bodyNode).forEach(function(_13){
_7.remove(_13,"gridxCellSelected");
_13.removeAttribute("aria-selected");
});
_2.forEach(t.grid._columns,function(col){
t.model.clearMark(t._getMarkType(col.id));
});
t._clear();
if(!_12){
t._onSelectionChange();
}
},isSelected:function(_14,_15){
return this.model.getMark(_14,this._getMarkType(_15));
},_type:"cell",_markTypePrefix:"select_",_getMarkType:function(_16){
var _17=this._markTypePrefix+_16;
this.model._spTypes[_17]=1;
return _17;
},_markById:function(_18,_19){
if(!_c(_18[0])){
_18=[_18];
}
var t=this,_1a=t.grid._columnsById,_1b=t.model;
_2.forEach(_18,function(_1c){
var _1d=_1c[0],_1e=_1c[1];
if(_1d&&_1a[_1e]){
_1b.markById(_1d,_19,t._getMarkType(_1e));
}
});
_1b.when();
},_markByIndex:function(_1f,_20){
if(!_c(_1f[0])){
_1f=[_1f];
}
_1f=_2.filter(_1f,function(arg){
if(_c(arg)&&arg.length>=2&&arg[0]>=0&&arg[0]<Infinity&&arg[1]>=0&&arg[1]<Infinity){
if(arg.length>=4&&arg[2]>=0&&arg[2]<Infinity&&arg[3]>=0&&arg[3]<Infinity){
arg._range=1;
}
return true;
}
});
var t=this,m=t.model,g=t.grid,_21=g._columns,_22=g.body,i,j,col,_23,_24;
_2.forEach(_1f,function(arg){
if(arg._range){
var a=Math.min(arg[0],arg[2]),b=Math.max(arg[0],arg[2]),n=b-a+1,c1=Math.min(arg[1],arg[3]),c2=Math.max(arg[1],arg[3]);
for(i=c1;i<=c2;++i){
col=_21[i];
if(col){
_24=_22.getRowInfo({visualIndex:a});
a=_24.rowIndex;
_23=t._getMarkType(col.id);
for(j=0;j<n;++j){
m.markByIndex(a+j,_20,_23,_24.parentId);
}
}
}
}else{
col=_21[arg[1]];
if(col){
_24=_22.getRowInfo({visualIndex:arg[0]});
i=_24.rowIndex;
m.markByIndex(i,_20,t._getMarkType(col.id),_24.parentId);
}
}
});
return m.when();
},_init:function(){
var t=this,g=t.grid;
t.inherited(arguments);
t.batchConnect([g,"onCellMouseDown",function(e){
if(_8.isLeft(e)){
t._start(_d(e.rowId,e.visualIndex,e.columnId,e.columnIndex),g._isCopyEvent(e),e.shiftKey);
}
}],[g,"onCellMouseOver",function(e){
t._highlight(_d(e.rowId,e.visualIndex,e.columnId,e.columnIndex));
}],[g,_6("ff")<4?"onCellKeyUp":"onCellKeyDown",function(e){
if(e.keyCode===_9.SPACE){
t._start(_d(e.rowId,e.visualIndex,e.columnId,e.columnIndex),g._isCopyEvent(e),e.shiftKey);
t._end();
}
}]);
},_onRender:function(_25,_26){
var t=this,i,j,m=t.model,g=t.grid,_27=g._columns,end=_25+_26;
for(i=0;i<_27.length;++i){
var cid=_27[i].id,_28=t._getMarkType(cid);
if(m.getMarkedIds(_28).length){
for(j=_25;j<end;++j){
var rid=t._getRowId(j);
if(m.getMark(rid,_28)||(t._selecting&&t._toSelect&&t._inRange(i,t._startItem.c,t._currentItem.c,1)&&t._inRange(j,t._startItem.r,t._currentItem.r,1))){
_7.add(_3("[visualindex=\""+j+"\"] [colid=\""+cid+"\"]",g.bodyNode)[0],"gridxCellSelected");
}
}
}
}
},_onMark:function(id,_29,_2a,_2b){
var t=this;
if(_4.isString(_2b)&&!t._marking&&_2b.indexOf(t._markTypePrefix)===0){
var _2c=_3("[rowid=\""+id+"\"]",t.grid.bodyNode)[0];
if(_2c){
var cid=_2b.substr(t._markTypePrefix.length),_2d=_3("[colid=\""+cid+"\"]",_2c)[0];
if(_2d){
_7.toggle(_2d,"gridxCellSelected",_29);
}
}
}
},_onMoveToCell:function(_2e,_2f,e){
if(e.shiftKey){
var t=this,g=t.grid,rid=t._getRowId(_2e),cid=g._columns[_2f].id;
t._start(_d(rid,_2e,cid,_2f),g._isCopyEvent(e),1);
t._end();
}
},_isSelected:function(_30){
var t=this;
if(!_30.rid){
_30.rid=t._getRowId(_30.r);
}
if(t._isRange){
var _31=t._refSelectedIds[_30.cid];
return _31&&_2.indexOf(_31,_30.rid)>=0;
}else{
return t.model.getMark(_30.rid,t._getMarkType(_30.cid));
}
},_highlight:function(_32){
var t=this,_33=t._currentItem;
if(t._selecting){
if(_33===null){
t._highlightSingle(_32,1);
if(_6("ie")){
t._focus(_32);
}
}else{
var _34=t._startItem,_35=function(_36,to,_37){
var _38=to.c>_36.c?1:-1,_39=to.r>_36.r?1:-1,i,j,p,q,_3a={};
if(!_37){
for(j=_36.r,p=to.r+_39;j!=p;j+=_39){
_3a[j]=t.model.indexToId(j);
}
}
for(i=_36.c,q=to.c+_38;i!=q;i+=_38){
var cid=t.grid._columns[i].id;
for(j=_36.r,p=to.r+_39;j!=p;j+=_39){
t._highlightSingle(_d(_3a[j],j,cid,i),_37);
}
}
};
if(t._inRange(_32.r,_34.r,_33.r)||t._inRange(_32.c,_34.c,_33.c)||t._inRange(_34.r,_32.r,_33.r)||t._inRange(_34.c,_32.c,_33.c)){
_35(_34,_33,0);
}
_35(_34,_32,1);
t._focus(_32);
}
t._currentItem=_32;
}
},_doHighlight:function(_3b,_3c){
var i,j,_3d=this.grid.bodyNode.childNodes;
for(i=_3d.length-1;i>=0;--i){
if(_3d[i].getAttribute("visualindex")==_3b.r){
var _3e=_3d[i].getElementsByTagName("td");
for(j=_3e.length-1;j>=0;--j){
if(_3e[j].getAttribute("colid")==_3b.cid){
_7.toggle(_3e[j],"gridxCellSelected",_3c);
_3e[j].setAttribute("aria-selected",!!_3c);
return;
}
}
return;
}
}
},_focus:function(_3f){
if(this.grid.focus){
this.grid.body._focusCell(null,_3f.r,_3f.c);
}
},_getSelectedIds:function(){
var t=this,res={};
_2.forEach(t.grid._columns,function(col){
var ids=t.model.getMarkedIds(t._getMarkType(col.id));
if(ids.length){
res[col.id]=ids;
}
});
return res;
},_beginAutoScroll:function(){
},_endAutoScroll:function(){
},_addToSelected:function(_40,end,_41){
var t=this,_42=t.model,d=new _5(),_43=t._lastEndItem,a,b,_44,i,j,_45=[],_46=function(){
_42.when().then(function(){
d.callback();
});
};
if(!t._isRange){
t._refSelectedIds=t._getSelectedIds();
}
if(t._isRange){
if(t._inRange(end.r,_40.r,_43.r)){
a=Math.min(end.r,_43.r);
b=Math.max(end.r,_43.r);
_45.push({start:a+1,count:b-a,columnStart:_40.c,columnEnd:_43.c});
}
if(t._inRange(end.c,_40.c,_43.c)){
_44=end.c<_43.c?1:-1;
a=Math.min(_40.r,end.r);
b=Math.max(_40.r,end.r);
_45.push({start:a,count:b-a+1,columnStart:end.c+_44,columnEnd:_43.c});
}
}
_44=_40.c<end.c?1:-1;
for(i=_40.c;i!=end.c+_44;i+=_44){
var cid=t.grid._columns[i].id,_47=t._getMarkType(cid);
a=Math.min(_40.r,end.r);
b=Math.max(_40.r,end.r);
for(j=a;j<=b;++j){
_42.markByIndex(j,_41,_47);
}
}
if(_45.length){
_42.when(_45,function(){
var i,j,k,_48;
for(i=0;i<_45.length;++i){
_48=_45[i];
var _49=_48.columnStart<_48.columnEnd?1:-1;
for(j=_48.columnStart;j!=_48.columnEnd+_49;j+=_49){
var cid=t.grid._columns[j].id,_47=t._getMarkType(cid),_4a=t._refSelectedIds[cid];
for(k=_48.start;k<_48.start+_48.count;++k){
var rid=_42.indexToId(k),_4b=_4a&&_4a[rid];
_42.markById(rid,_4b,_47);
}
}
}
}).then(_46);
}else{
_46();
}
return d;
}});
});
