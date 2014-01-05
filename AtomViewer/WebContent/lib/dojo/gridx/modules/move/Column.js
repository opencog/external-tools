//>>built
define("gridx/modules/move/Column",["dojo/_base/declare","dojo/_base/query","dojo/_base/array","dojo/keys","../../core/_Module"],function(_1,_2,_3,_4,_5){
return _1(_5,{name:"moveColumn",getAPIPath:function(){
return {move:{column:this}};
},preload:function(){
this.aspect(this.grid,"onHeaderCellKeyDown","_onKeyDown");
},columnMixin:{moveTo:function(_6){
this.grid.move.column.moveRange(this.index(),1,_6);
return this;
}},moveSelected:true,move:function(_7,_8){
if(typeof _7==="number"){
_7=[_7];
}
var _9=[],i,_a,_b=this.grid._columns,_c,_d=[];
for(i=0,_a=_7.length;i<_a;++i){
_9[_7[i]]=true;
}
for(i=_9.length-1;i>=0;--i){
if(_9[i]){
_d.unshift(_b[i]);
_b.splice(i,1);
}
}
for(i=0,_a=_b.length;i<_a;++i){
if(_b[i].index>=_8){
_c=i;
break;
}
}
if(_c===undefined){
_c=_b.length;
}
this._moveComplete(_d,_c);
},moveRange:function(_e,_f,_10){
if(_10<_e||_10>_e+_f){
if(_10>_e+_f){
_10-=_f;
}
this._moveComplete(this.grid._columns.splice(_e,_f),_10);
}
},onMoved:function(){
},_moveComplete:function(_11,_12){
var g=this.grid,map={},_13=g._columns,i,_14={},_15=_12<_13.length?_13[_12].id:null,_16=function(tr){
var _17=_2("> .gridxCell",tr).filter(function(_18){
return _14[_18.getAttribute("colid")];
});
if(_15===null){
_17.place(tr);
}else{
_17.place(_2("> [colid=\""+_15+"\"]",tr)[0],"before");
}
};
for(i=_11.length-1;i>=0;--i){
map[_11[i].index]=_12+i;
_14[_11[i].id]=1;
}
[].splice.apply(_13,[_12,0].concat(_11));
for(i=_13.length-1;i>=0;--i){
_13[i].index=i;
}
_16(_2(".gridxHeaderRowInner > table > tbody > tr",g.headerNode)[0]);
_2(".gridxRow > table > tbody > tr",g.bodyNode).forEach(_16);
this.onMoved(map);
},_onKeyDown:function(e){
var t=this,g=t.grid,_19=t.arg("moveSelected")&&g.select&&g.select.column,ltr=g.isLeftToRight(),_1a=ltr?_4.LEFT_ARROW:_4.RIGHT_ARROW,_1b=ltr?_4.RIGHT_ARROW:_4.LEFT_ARROW;
if(e.ctrlKey&&!e.shiftKey&&!e.altKey&&(e.keyCode==_1a||e.keyCode==_1b)){
var _1c=e.columnIndex,_1d=_19&&_19.isSelected(e.columnId)?_3.map(_19.getSelected(),function(id){
return g._columnsById[id].index;
}):[e.columnIndex],_1e=g.header.getHeaderNode(e.columnId);
if(e.keyCode==_1a){
while(_3.indexOf(_1d,_1c)>=0){
_1c--;
}
if(_1c>=0){
t.move(_1d,_1c);
g.header._focusNode(_1e);
}
}else{
if(e.keyCode==_1b){
while(_3.indexOf(_1d,_1c)>=0){
_1c++;
}
if(_1c<g._columns.length){
t.move(_1d,_1c+1);
g.header._focusNode(_1e);
}
}
}
}
}});
});
