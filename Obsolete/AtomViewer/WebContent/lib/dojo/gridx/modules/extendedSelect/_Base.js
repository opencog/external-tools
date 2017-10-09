//>>built
define("gridx/modules/extendedSelect/_Base",["dojo/_base/declare","dojo/_base/query","dojo/_base/connect","dojo/_base/Deferred","dojo/_base/sniff","dojo/_base/window","dojo/dom","dojo/keys","../../core/_Module","../AutoScroll"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return _1(_9,{required:["autoScroll"],getAPIPath:function(){
var _a={select:{}};
_a.select[this._type]=this;
return _a;
},load:function(){
var t=this,g=t.grid,_b=_6.doc;
g.domNode.setAttribute("aria-multiselectable",true);
t._refSelectedIds=[];
t.subscribe("gridClearSelection_"+g.id,function(_c){
if(_c!=t._type){
t.clear();
}
});
t.batchConnect([g.body,"onRender","_onRender"],[_b,"onmouseup","_end"],[_b,"onkeydown",function(e){
if(e.keyCode==_8.SHIFT){
_7.setSelectable(g.domNode,false);
}
}],[_b,"onkeyup",function(e){
if(e.keyCode==_8.SHIFT){
_7.setSelectable(g.domNode,true);
}
}]);
t._init();
t.loaded.callback();
},enabled:true,holdingCtrl:false,holdingShift:false,selectById:function(){
return this._subMark("_markById",arguments,true);
},deselectById:function(){
return this._subMark("_markById",arguments,false);
},selectByIndex:function(){
return this._subMark("_markByIndex",arguments,true);
},deselectByIndex:function(){
return this._subMark("_markByIndex",arguments,false);
},onSelectionChange:function(){
},_clear:function(){
var t=this;
delete t._lastToSelect;
delete t._lastStartItem;
delete t._lastEndItem;
},_subMark:function(_d,_e,_f){
var t=this;
if(t.arg("enabled")){
if(_f){
_3.publish("gridClearSelection_"+t.grid.id,[t._type]);
}
t._lastSelectedIds=t.getSelected();
t._refSelectedIds=[];
return _4.when(t[_d](_e,_f),function(){
t._onSelectionChange();
});
}
},_start:function(_10,_11,_12){
var t=this;
if(!t._selecting&&!t._marking&&t.arg("enabled")){
_7.setSelectable(t.grid.domNode,false);
t._fixFF(1);
var _13=t._isSelected(_10);
_12=_12||t.arg("holdingShift");
if(_12&&t._lastStartItem){
t._isRange=1;
t._toSelect=t._lastToSelect;
t._startItem=t._lastStartItem;
t._currentItem=t._lastEndItem;
}else{
t._startItem=_10;
t._currentItem=null;
if(_11||t.arg("holdingCtrl")){
t._toSelect=!_13;
}else{
t._toSelect=1;
t.clear(1);
}
}
_3.publish("gridClearSelection_"+t.grid.id,[t._type]);
t._beginAutoScroll();
t.grid.autoScroll.enabled=true;
t._lastSelectedIds=t.getSelected();
t._selecting=1;
t._highlight(_10);
}
},_highlight:function(_14){
var t=this;
if(t._selecting){
var _15=t._type,_16=t._startItem,_17=t._currentItem,_18=function(_19,to,_1a){
_19=_19[_15];
to=to[_15];
var dir=_19<to?1:-1;
for(;_19!=to;_19+=dir){
var _1b={};
_1b[_15]=_19;
t._highlightSingle(_1b,_1a);
}
};
if(_17===null){
t._highlightSingle(_14,1);
}else{
if(t._inRange(_14[_15],_16[_15],_17[_15])){
_18(_17,_14,0);
}else{
if(t._inRange(_16[_15],_14[_15],_17[_15])){
_18(_17,_16,0);
_17=_16;
}
_18(_14,_17,1);
}
}
t._currentItem=_14;
t._focus(_14);
}
},_end:function(){
var t=this,g=t.grid;
if(t._selecting){
t._fixFF();
t._endAutoScroll();
t._selecting=0;
t._marking=1;
g.autoScroll.enabled=false;
var d=t._addToSelected(t._startItem,t._currentItem,t._toSelect);
t._lastToSelect=t._toSelect;
t._lastStartItem=t._startItem;
t._lastEndItem=t._currentItem;
t._startItem=t._currentItem=t._isRange=null;
_4.when(d,function(){
_7.setSelectable(g.domNode,true);
t._marking=0;
t._onSelectionChange();
});
}
},_highlightSingle:function(_1c,_1d){
_1d=_1d?this._toSelect:this._isSelected(_1c);
this._doHighlight(_1c,_1d);
},_onSelectionChange:function(){
var t=this,_1e=t.getSelected();
t.onSelectionChange(_1e,t._lastSelectedIds);
t._lastSelectedIds=_1e;
},_inRange:function(_1f,_20,end,_21){
return ((_1f>=_20&&_1f<=end)||(_1f>=end&&_1f<=_20))&&(_21||_1f!=end);
},_fixFF:function(_22){
if(_5("ff")){
_2(".gridxSortNode",this.grid.headerNode).style("overflow",_22?"visible":"");
}
}});
});
