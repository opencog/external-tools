//>>built
define("gridx/modules/IndirectSelect",["dojo/_base/declare","dojo/_base/array","dojo/_base/event","dojo/_base/query","dojo/_base/lang","dojo/dom-class","dojo/_base/Deferred","dojo/keys","../core/_Module","../core/util","./RowHeader"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
return _1(_9,{name:"indirectSelect",required:["rowHeader","selectRow"],preload:function(){
var t=this,g=t.grid,_b=g.focus,sr=g.select.row,_c=g.rowHeader;
_c.cellProvider=_5.hitch(t,t._createSelector);
t.batchConnect([sr,"onHighlightChange","_onHighlightChange"],[sr,"clear","_onClear"],[sr,"onSelectionChange","_onSelectionChange"],[g,"onRowMouseOver","_onMouseOver"],[g,"onRowMouseOut","_onMouseOut"],[g,"onRowKeyDown","_onKeyDown"],[g,"onHeaderKeyDown","_onKeyDown"],_b&&[_b,"onFocusArea",function(_d){
if(_d=="rowHeader"){
t._onMouseOver();
}
}],_b&&[_b,"onBlurArea",function(_e){
if(_e=="rowHeader"){
t._onMouseOut();
}
}]);
if(sr.selectByIndex&&t.arg("all")){
t._allSelected={};
_c.headerProvider=_5.hitch(t,t._createSelectAllBox);
_c.loaded.then(function(){
if(_b){
t._initFocus();
}
t.connect(g,"onRowHeaderHeaderMouseDown","_onSelectAll");
});
}
},all:true,_createSelector:function(_f){
var _10=_f.node(),_11=_10&&_6.contains(_10,"gridxRowSelected"),_12=_10&&_6.contains(_10,"gridxRowPartialSelected");
return this._createCheckBox(_11,_12);
},_createCheckBox:function(_13,_14){
var _15=this._getDijitClass();
return ["<span role=\"",this._isSingle()?"radio":"checkbox","\" class=\"gridxIndirectSelectionCheckBox dijitReset dijitInline ",_15," ",_13?_15+"Checked":"",_14?_15+"Partial":"","\" aria-checked=\"",_13?"true":_14?"mixed":"false","\"><span class=\"gridxIndirectSelectionCheckBoxInner\">",_13?"&#10003;":_14?"&#9646;":"&#9744;","</span></span>"].join("");
},_createSelectAllBox:function(){
return this._createCheckBox(this._allSelected[this._getPageId()]);
},_getPageId:function(){
return this.grid.body.rootStart+","+this.grid.body.rootCount;
},_onClear:function(){
var cls=this._getDijitClass()+"Checked";
_4("."+cls,this.grid.rowHeader.bodyNode).forEach(function(_16){
_6.remove(_16,cls);
});
},_onHighlightChange:function(_17,_18){
var _19=_4("[visualindex=\""+_17.row+"\"].gridxRowHeaderRow .gridxIndirectSelectionCheckBox",this.grid.rowHeader.bodyNode)[0];
if(_19){
var _1a=this._getDijitClass(),_1b=_18=="mixed",_1c=_18&&!_1b;
_6.toggle(_19,_1a+"Checked",_1c);
_6.toggle(_19,_1a+"Partial",_1b);
_19.setAttribute("aria-checked",_1c?"true":_1b?"mixed":"false");
_19.firstChild.innerHTML=_1c?"&#10003;":_1b?"&#9646;":"&#9744;";
}
},_onMouseOver:function(){
var sr=this.grid.select.row;
if(!sr.holdingCtrl){
this._holdingCtrl=false;
sr.holdingCtrl=true;
}
},_onMouseOut:function(){
if(this.hasOwnProperty("_holdingCtrl")){
this.grid.select.row.holdingCtrl=false;
delete this._holdingCtrl;
}
},_getDijitClass:function(){
return this._isSingle()?"dijitRadio":"dijitCheckBox";
},_isSingle:function(){
var _1d=this.grid.select.row;
return _1d.hasOwnProperty("multiple")&&!_1d.arg("multiple");
},_onSelectAll:function(){
var t=this,g=t.grid,_1e=g.body;
g.select.row[t._allSelected[t._getPageId()]?"deselectByIndex":"selectByIndex"]([0,_1e.visualCount-1]);
},_onSelectionChange:function(_1f){
var t=this,d,_20,_21=t.grid.body,_22=t.model,_23=_21.rootStart,_24=_21.rootCount;
var _25=_2.filter(_1f,function(id){
return !_22.treePath(id).pop();
});
if(_24===_22.size()){
_20=_24==_25.length;
}else{
d=new _7();
_22.when({start:_23,count:_24},function(){
var _26=_2.filter(_2.map(_25,function(id){
return _22.idToIndex(id);
}),function(_27){
return _27>=_23&&_27<_23+_24;
});
_20=_24==_26.length;
d.callback();
});
}
_7.when(d,function(){
t._allSelected[t._getPageId()]=_20;
var _28=t.grid.rowHeader.headerCellNode.firstChild;
_6.toggle(_28,t._getDijitClass()+"Checked",_20);
_28.setAttribute("aria-checked",_20?"true":"false");
});
},_initFocus:function(){
var g=this.grid,_29=g.rowHeader,_2a=_29.headerCellNode,_2b=function(evt){
g.focus.stopEvent(evt);
_6.add(_2a,"gridxHeaderCellFocus");
_2a.focus();
return true;
},_2c=function(){
_6.remove(_2a,"gridxHeaderCellFocus");
return true;
};
g.focus.registerArea({name:"selectAll",priority:-0.1,focusNode:_29.headerNode,doFocus:_2b,doBlur:_2c,onFocus:_2b,onBlur:_2c});
},_onKeyDown:function(evt){
if(evt.keyCode==65&&evt.ctrlKey&&!evt.shiftKey){
if(!this._allSelected[this._getPageId()]){
this._onSelectAll();
}
_3.stop(evt);
}
}});
});
