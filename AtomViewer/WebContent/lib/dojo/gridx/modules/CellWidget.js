//>>built
define("gridx/modules/CellWidget",["dojo/_base/declare","dojo/_base/query","dojo/_base/array","dojo/_base/event","dojo/_base/sniff","dojo/dom-class","dojo/keys","dijit/registry","dijit/a11y","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
var _e=function(){
return "";
},_f=_1([_a,_b,_c],{content:"",setCellValue:null,cell:null,postMixInProperties:function(){
this.templateString=["<div class=\"gridxCellWidget\">",this.content,"</div>"].join("");
},postCreate:function(){
this.connect(this.domNode,"onmousedown",function(e){
e.cancelBubble=true;
});
},setValue:function(_10,_11,_12){
try{
var t=this;
_2(".gridxHasGridCellValue",t.domNode).map(function(_13){
return _8.byNode(_13);
}).forEach(function(_14){
if(_14){
var _15=_6.contains(_14.domNode,"gridxUseStoreData"),_16=_15?_11:_10,_17=_14.onChange;
if(_12&&_17&&!_17._init&&_14.get("value")!==_16){
_14.onChange=function(){
_14.onChange=_17;
};
_14.onChange._init=true;
}
if(!t.setCellValue){
_14.set("value",_16);
}
}
});
if(t.setCellValue){
t.setCellValue(_10,_11,t,_12);
}
}
catch(e){
console.error("Can not set cell value: ",e);
}
}});
_d._markupAttrs.push("!widgetsInCell","!setCellValue");
return _1(_d,{name:"cellWidget",getAPIPath:function(){
return {cellWidget:this};
},cellMixin:{widget:function(){
return this.grid.cellWidget.getCellWidget(this.row.id,this.column.id);
}},constructor:function(){
this._init();
},preload:function(){
var t=this,_18=t.grid.body;
t.batchConnect([_18,"onAfterRow","_showDijits"],[_18,"onAfterCell","_showDijit"],[_18,"onUnrender","_onUnrenderRow"]);
t._initFocus();
},destroy:function(){
this.inherited(arguments);
var i,id,col,cw,_19=this.grid._columns;
for(i=_19.length-1;i>=0;--i){
col=_19[i];
cw=col._cellWidgets;
if(cw){
for(id in cw){
cw[id].destroyRecursive();
}
delete col._cellWidgets;
}
}
},backupCount:20,setCellDecorator:function(_1a,_1b,_1c,_1d){
var _1e=this._decorators[_1a];
if(!_1e){
_1e=this._decorators[_1a]={};
}
var _1f=_1e[_1b];
if(!_1f){
_1f=_1e[_1b]={};
}
_1f.decorator=_1c;
_1f.setCellValue=_1d;
_1f.widget=null;
},restoreCellDecorator:function(_20,_21){
var _22=this._decorators[_20];
if(_22){
var _23=_22[_21];
if(_23){
if(_23.widget){
var _24=_23.widget.domNode.parentNode;
if(_24){
_24.innerHTML=null;
}
window.setTimeout(function(){
_23.widget.destroyRecursive();
_23.widget=null;
_23.decorator=null;
_23.setCellValue=null;
},100);
}
}
delete _22[_21];
}
},getCellWidget:function(_25,_26){
var _27=this.grid.body.getCellNode({rowId:_25,colId:_26});
if(_27){
var _28=_2(".gridxCellWidget",_27)[0];
if(_28){
return _8.byNode(_28);
}
}
return null;
},onCellWidgetCreated:function(){
},_init:function(){
this._decorators={};
var i,col,_29=this.grid._columns;
for(i=_29.length-1;i>=0;--i){
col=_29[i];
if(col.decorator&&col.widgetsInCell){
col.userDecorator=col.decorator;
col.decorator=_e;
col._cellWidgets={};
col._backupWidgets=[];
}
}
},_showDijits:function(row){
var t=this;
_3.forEach(row.cells(),function(_2a){
var col=_2a.column.def();
if(col.userDecorator||t._getSpecialCellDec(_2a.row.id,col.id)){
var _2b=_2a.node();
if(_2b){
var _2c=t._prepareCellWidget(_2a);
if(_5("ie")){
while(_2b.childNodes.length){
_2b.removeChild(_2b.firstChild);
}
}else{
_2b.innerHTML="";
}
_2c.placeAt(_2b);
_2c.startup();
}
}
});
},_showDijit:function(_2d){
var col=_2d.column.def();
if(col.userDecorator||this._getSpecialCellDec(_2d.row.id,col.id)){
var _2e=this._prepareCellWidget(_2d),_2f=_2d.node();
_2f.innerHTML="";
_2e.placeAt(_2f);
_2e.startup();
}
},_prepareCellWidget:function(_30){
var col=_30.column.def(),_31=this._getSpecialWidget(_30);
if(!_31){
_31=col._backupWidgets.pop();
if(!_31){
_31=new _f({content:col.userDecorator(),setCellValue:col.setCellValue});
this.onCellWidgetCreated(_31,_30);
}
col._cellWidgets[_30.row.id]=_31;
}
_31.cell=_30;
_31.setValue(_30.data(),_30.rawData(),true);
return _31;
},_onUnrenderRow:function(id){
var _32=this.grid._columns,_33=this.arg("backupCount"),_34=function(col,_35){
var w=col._cellWidgets[_35];
if(col._backupWidgets.length<_33){
col._backupWidgets.push(w);
}else{
w.destroyRecursive();
}
};
for(var i=0,len=_32.length;i<len;++i){
var col=_32[i],_36=col._cellWidgets;
if(_36){
if(this.model.isId(id)&&_36[id]){
_34(col,id);
delete _36[id];
}else{
for(var j in _36){
_34(col,j);
}
col._cellWidgets={};
}
}
}
},_getSpecialCellDec:function(_37,_38){
var _39=this._decorators[_37];
return _39&&_39[_38];
},_getSpecialWidget:function(_3a){
var _3b=this._decorators[_3a.row.id];
if(_3b){
var _3c=_3b[_3a.column.id];
if(_3c){
if(!_3c.widget&&_3c.decorator){
try{
_3c.widget=new _f({content:_3c.decorator(_3a.data(),_3a.row.id,_3a.row.visualIndex()),setCellValue:_3c.setCellValue});
}
catch(e){
console.error("Edit:",e);
}
}
return _3c.widget;
}
}
return null;
},_initFocus:function(){
var t=this,_3d=t.grid.focus;
if(_3d){
_3d.registerArea({name:"cellwidget",priority:1,scope:t,doFocus:t._doFocus,doBlur:t._doBlur,onFocus:t._onFocus,onBlur:t._endNavigate,connects:[t.connect(t.grid,"onCellKeyDown","_onKey")]});
}
},_doFocus:function(evt,_3e){
if(this._navigating){
var _3f=this._navElems,_40=function(){
var _41=_3e<0?(_3f.highest||_3f.last):(_3f.lowest||_3f.first);
if(_41){
_41.focus();
}
};
if(_5("webkit")){
_40();
}else{
setTimeout(_40,5);
}
return true;
}
return false;
},_doBlur:function(evt,_42){
if(evt){
var t=this,m=t.model,g=t.grid,_43=g.body,_44=t._navElems,_45=_44.lowest||_44.first,_46=_44.last||_44.highest||_45,_47=_5("ie")?evt.srcElement:evt.target;
if(_47==(_42>0?_46:_45)){
_4.stop(evt);
m.when({id:t._focusRowId},function(){
var _48=_43.getRowInfo({parentId:m.treePath(t._focusRowId).pop(),rowIndex:m.idToIndex(t._focusRowId)}).visualIndex,_49=g._columnsById[t._focusColId].index,dir=_42>0?1:-1,_4a=function(r,c){
return t._isNavigable(g._columns[c].id);
};
_43._nextCell(_48,_49,dir,_4a).then(function(obj){
t._focusColId=g._columns[obj.c].id;
var _4b=_43.getRowInfo({visualIndex:obj.r});
t._focusRowId=m.indexToId(_4b.rowIndex,_4b.parentId);
_43._focusCellCol=obj.c;
_43._focusCellRow=obj.r;
t._beginNavigate(t._focusRowId,t._focusColId);
t._doFocus(null,_42);
});
});
}
return false;
}else{
this._navigating=false;
return true;
}
},_isNavigable:function(_4c){
var col=this.grid._columnsById[_4c];
return col&&(col.navigable||col.navigable===undefined)&&col.decorator;
},_beginNavigate:function(_4d,_4e){
var t=this;
if(t._isNavigable(_4e)){
t._navigating=true;
t._focusColId=_4e;
t._focusRowId=_4d;
t._navElems=_9._getTabNavigable(t.grid.body.getCellNode({rowId:_4d,colId:_4e}));
return true;
}
return false;
},_endNavigate:function(){
this._navigating=false;
},_onFocus:function(evt){
var _4f=evt.target,dn=this.grid.domNode;
while(_4f&&_4f!==dn&&!_6.contains(_4f,"gridxCell")){
_4f=_4f.parentNode;
}
if(_4f&&_4f!==dn){
var _50=_4f,_51=_4f.getAttribute("colid");
while(_4f&&!_6.contains(_4f,"gridxRow")){
_4f=_4f.parentNode;
}
if(_4f){
var _52=_4f.getAttribute("rowid");
return _50!=evt.target&&this._beginNavigate(_52,_51);
}
}
return false;
},_onKey:function(e){
var t=this,_53=t.grid.focus;
if(e.keyCode==_7.F2&&!t._navigating&&_53.currentArea()=="body"){
if(t._beginNavigate(e.rowId,e.columnId)){
_4.stop(e);
_53.focusArea("cellwidget");
}
}else{
if(e.keyCode==_7.ESCAPE&&t._navigating&&_53.currentArea()=="cellwidget"){
t._navigating=false;
_53.focusArea("body");
}
}
}});
});
