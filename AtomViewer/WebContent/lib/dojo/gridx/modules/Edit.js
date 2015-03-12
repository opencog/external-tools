//>>built
define("gridx/modules/Edit",["dojo/_base/declare","dojo/_base/lang","dojo/_base/query","dojo/_base/json","dojo/_base/Deferred","dojo/_base/sniff","dojo/DeferredList","dojo/dom-class","dojo/keys","../core/_Module","../core/util","dojo/date/locale","dijit/form/TextBox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
function _d(_e,_f,_10){
if(_e.storePattern&&(_e.dataType=="date"||_e.dataType=="time")){
return _c.parse(_f,_e.storePattern);
}
return _10;
};
function _11(_12,_13,_14,_15){
var d=_c.parse(_15[_12],_13);
return d?_c.format(d,_14):_15[_12];
};
function _16(_17){
return _17&&function(_18,_19,_1a){
var _1b=_1a.gridCellEditField,_1c=_1a.cell,_1d=_1c.column.editorArgs;
_1b.set(_1d&&_1d.valueField||"value",_17(_19,_18,_1c,_1b));
};
};
_a._markupAttrs.push("!editable","!alwaysEditing","editor","!editorArgs","applyWhen");
return _1(_a,{name:"edit",forced:["cellWidget"],constructor:function(){
this._init();
},getAPIPath:function(){
return {edit:this};
},preload:function(){
var t=this,g=t.grid;
g.domNode.removeAttribute("aria-readonly");
t.connect(g,"onCellDblClick","_onUIBegin");
t.connect(g.cellWidget,"onCellWidgetCreated","_onCellWidgetCreated");
t.connect(g.body,"onAfterRow",function(row){
_3(".gridxCell",row.node()).forEach(function(_1e){
if(g._columnsById[_1e.getAttribute("colid")].editable){
_1e.removeAttribute("aria-readonly");
}
});
});
t._initFocus();
},cellMixin:{beginEdit:function(){
return this.grid.edit.begin(this.row.id,this.column.id);
},cancelEdit:function(){
return this.grid.edit.cancel(this.row.id,this.column.id);
},applyEdit:function(){
return this.grid.edit.apply(this.row.id,this.column.id);
},isEditing:function(){
return this.grid.edit.isEditing(this.row.id,this.column.id);
},editor:function(){
var cw=this.grid.cellWidget.getCellWidget(this.row.id,this.column.id);
return cw&&cw.gridCellEditField;
}},columnMixin:{isEditable:function(){
var col=this.grid._columnsById[this.id];
return col.editable;
},isAlwaysEditing:function(){
return this.grid._columnsById[this.id].alwaysEditing;
},setEditable:function(_1f){
this.grid._columnsById[this.id].editable=!!_1f;
return this;
},editor:function(){
return this.grid._columnsById[this.id].editor;
},setEditor:function(_20,_21){
this.grid.edit.setEditor(this.id,_20,_21);
return this;
}},begin:function(_22,_23){
var d=new _5(),t=this,g=t.grid;
if(!t.isEditing(_22,_23)){
var row=g.row(_22,1),col=g._columnsById[_23];
if(row&&col.editable){
g.cellWidget.setCellDecorator(_22,_23,t._getDecorator(_23),_16((col.editorArgs&&col.editorArgs.toEditor)||_2.partial(_d,col)));
t._record(_22,_23);
g.body.refreshCell(row.visualIndex(),col.index).then(function(){
t._focusEditor(_22,_23);
d.callback(true);
t.onBegin(g.cell(_22,_23,1));
});
}else{
d.callback(false);
}
}else{
t._record(_22,_23);
t._focusEditor(_22,_23);
d.callback(true);
t.onBegin(g.cell(_22,_23,1));
}
return d;
},cancel:function(_24,_25){
var d=new _5(),t=this,g=t.grid,m=t.model,row=g.row(_24,1);
if(row){
var cw=g.cellWidget,col=g._columnsById[_25];
if(col){
if(col.alwaysEditing){
var _26=m.byId(_24);
cw=cw.getCellWidget(_24,_25);
cw.setValue(_26.data[_25],_26.rawData[col.field]);
d.callback();
t.onCancel(g.cell(_24,_25,1));
}else{
t._erase(_24,_25);
cw.restoreCellDecorator(_24,_25);
g.body.refreshCell(row.visualIndex(),col.index).then(function(){
d.callback();
t.onCancel(g.cell(_24,_25,1));
});
}
}
}else{
d.callback();
}
return d;
},apply:function(_27,_28){
var d=new _5(),t=this,g=t.grid,_29=g.cell(_27,_28,1);
if(_29){
var _2a=g.cellWidget.getCellWidget(_27,_28),_2b=_2a&&_2a.gridCellEditField;
if(_2b&&(!_2.isFunction(_2b.isValid)||_2b.isValid())){
var _2c=_29.column.editorArgs,_2d=_2c&&_2c.valueField||"value",v=_2b.get(_2d),_2e=function(_2f,e){
if(!_2f){
console.warn("Can not apply change! Error message: ",e);
}
t._erase(_27,_28);
if(_29.column.alwaysEditing){
d.callback(_2f);
t.onApply(_29,_2f,e);
}else{
g.cellWidget.restoreCellDecorator(_27,_28);
g.body.refreshCell(_29.row.visualIndex(),_29.column.index()).then(function(){
d.callback(_2f);
t.onApply(_29,_2f,e);
});
}
};
try{
if(_2c&&_2c.fromEditor){
v=_2c.fromEditor(v,_2a.cell);
}else{
if(_29.column.storePattern){
v=_c.format(v,_29.column.storePattern);
}
}
if(_2.isFunction(_29.column.customApplyEdit)){
_5.when(_29.column.customApplyEdit(_29,v),function(){
_2e(true);
},function(e){
_2e(false,e);
});
}else{
if(_29.rawData()===v){
_2e(true);
}else{
_5.when(_29.setRawData(v),function(){
_2e(true);
},function(e){
_2e(false,e);
});
}
}
}
catch(e){
_2e(false,e);
}
return d;
}
}
d.callback(false);
return d;
},isEditing:function(_30,_31){
var col=this.grid._columnsById[_31];
if(col&&col.alwaysEditing){
return true;
}
var _32=this.grid.cellWidget.getCellWidget(_30,_31);
return !!_32&&!!_32.gridCellEditField;
},setEditor:function(_33,_34,_35){
var col=this.grid._columnsById[_33],_36=col.editorArgs=col.editorArgs||{};
col.editor=_34;
_2.mixin(_36,_35||{});
},onBegin:function(){
},onApply:function(){
},onCancel:function(){
},_init:function(){
this._editingCells={};
for(var i=0,_37=this.grid._columns,len=_37.length;i<len;++i){
var c=_37[i];
if(c.storePattern&&c.field&&(c.dataType=="date"||c.dataType=="time")){
c.gridPattern=c.gridPattern||(!_2.isFunction(c.formatter)&&(_2.isObject(c.formatter)||typeof c.formatter=="string")&&c.formatter)||c.storePattern;
var _38;
if(_2.isString(c.storePattern)){
_38=c.storePattern;
c.storePattern={};
c.storePattern[c.dataType+"Pattern"]=_38;
}
c.storePattern.selector=c.dataType;
if(_2.isString(c.gridPattern)){
_38=c.gridPattern;
c.gridPattern={};
c.gridPattern[c.dataType+"Pattern"]=_38;
}
c.gridPattern.selector=c.dataType;
c.formatter=_2.partial(_11,c.field,c.storePattern,c.gridPattern);
}
}
this._initAlwaysEdit();
},_initAlwaysEdit:function(){
for(var t=this,_39=t.grid._columns,i=_39.length-1;i>=0;--i){
var col=_39[i];
if(col.alwaysEditing){
col.editable=true;
col.navigable=true;
col.userDecorator=t._getDecorator(col.id);
col.setCellValue=_16((col.editorArgs&&col.editorArgs.toEditor)||_2.partial(_d,col));
col.decorator=function(){
return "";
};
col._cellWidgets={};
col._backupWidgets=[];
}
}
},_getColumnEditor:function(_3a){
var _3b=this.grid._columnsById[_3a].editor;
if(_2.isFunction(_3b)){
return _3b.prototype.declaredClass;
}else{
if(_2.isString(_3b)){
return _3b;
}else{
return "dijit.form.TextBox";
}
}
},_onCellWidgetCreated:function(_3c,_3d){
var t=this,_3e=_3d.column,_3f=_3c.gridCellEditField;
if(_3f&&_3e.alwaysEditing){
_3c.connect(_3f,"onChange",function(){
var rn=_3c.domNode.parentNode;
while(rn&&!_8.contains(rn,"gridxRow")){
rn=rn.parentNode;
}
if(rn){
var _40=_3e.editorArgs&&_3e.editorArgs.applyDelay||500;
clearTimeout(_3f._timeoutApply);
_3f._timeoutApply=setTimeout(function(){
t.apply(rn.getAttribute("rowid"),_3e.id);
},_40);
}
});
}
},_focusEditor:function(_41,_42){
var cw=this.grid.cellWidget,_43=function(){
var _44=cw.getCellWidget(_41,_42),_45=_44&&_44.gridCellEditField;
if(_45&&!_45.focused&&_2.isFunction(_45.focus)){
_45.focus();
}
};
if(_6("webkit")){
_43();
}else{
setTimeout(_43,1);
}
},_getDecorator:function(_46){
var _47=this._getColumnEditor(_46),p,_48,col=this.grid._columnsById[_46],_49=col.editorArgs||{},_4a=_49.useGridData,_4b=_49.constraints||{},_4c=_49.props||"",_4d=col.gridPattern||col.storePattern;
if(_4d){
_4b=_2.mixin({},_4d,_4b);
}
_4b=_4.toJson(_4b);
_4b=_4b.substring(1,_4b.length-1);
if(_4c&&_4b){
_4c+=", ";
}
return function(){
return ["<div data-dojo-type='",_47,"' ","data-dojo-attach-point='gridCellEditField' ","class='gridxCellEditor gridxHasGridCellValue ",_4a?"":"gridxUseStoreData","' data-dojo-props='",_4c,_4b,"'></div>"].join("");
};
},_record:function(_4e,_4f){
var _50=this._editingCells,r=_50[_4e];
if(!r){
r=_50[_4e]={};
}
r[_4f]=1;
},_erase:function(_51,_52){
var _53=this._editingCells,r=_53[_51];
if(r){
delete r[_52];
}
},_applyAll:function(){
var _54=this._editingCells,r,c;
for(r in _54){
for(c in _54[r]){
this.apply(r,c);
}
}
},_onUIBegin:function(evt){
if(!this.isEditing(evt.rowId,evt.columnId)){
this._applyAll();
}
return this.begin(evt.rowId,evt.columnId);
},_initFocus:function(){
var t=this,g=t.grid,f=g.focus;
if(f){
f.registerArea({name:"edit",priority:1,scope:t,doFocus:t._onFocus,doBlur:t._doBlur,onFocus:t._onFocus,onBlur:t._onBlur,connects:[t.connect(g,"onCellKeyDown","_onKey"),t.connect(t,"_focusEditor","_focus")]});
}else{
t.connect(g,"onCellMouseDown",function(e){
var _55=t._editingCells;
if(!_55[e.rowId]||!_55[e.rowId][e.columnId]){
t._applyAll();
}
});
}
},_onFocus:function(evt){
var t=this;
if(evt){
var n=evt.target;
while(n&&!_8.contains(n,"gridxCell")){
n=n.parentNode;
}
if(n){
var _56=n.getAttribute("colid"),_57=n.parentNode.parentNode.parentNode.parentNode.getAttribute("rowid");
if(t.isEditing(_57,_56)){
t._record(_57,_56);
return true;
}
}
return false;
}
return t._editing;
},_doBlur:function(evt,_58){
var t=this,g=t.grid,_59=g.body;
if(t._editing&&_58){
var _5a=_59.getRowInfo({parentId:t.model.treePath(t._focusCellRow).pop(),rowIndex:t.model.idToIndex(t._focusCellRow)}).visualIndex,_5b=g._columnsById[t._focusCellCol].index,dir=_58>0?1:-1,_5c=function(r,c){
return g._columns[c].editable;
};
_59._nextCell(_5a,_5b,dir,_5c).then(function(obj){
g.focus.stopEvent(evt);
t._applyAll();
t._focusCellCol=g._columns[obj.c].id;
var _5d=_59.getRowInfo({visualIndex:obj.r});
t._focusCellRow=t.model.indexToId(_5d.rowIndex,_5d.parentId);
_59._focusCellCol=obj.c;
_59._focusCellRow=obj.r;
t.begin(t._focusCellRow,t._focusCellCol);
});
return false;
}
return true;
},_onBlur:function(){
this._applyAll();
return true;
},_focus:function(_5e,_5f){
var t=this;
t._editing=true;
t._focusCellCol=_5f;
t._focusCellRow=_5e;
t.grid.focus.focusArea("edit");
},_blur:function(){
this._editing=false;
var _60=this.grid.focus;
if(_60){
if(_6("ie")){
setTimeout(function(){
_60.focusArea("body");
},1);
}else{
_60.focusArea("body");
}
}
},_onKey:function(e){
var t=this,g=t.grid,col=g._columnsById[e.columnId];
if(col.editable){
var _61=t.isEditing(e.rowId,e.columnId);
if(e.keyCode==_9.ENTER){
if(_61){
t.apply(e.rowId,e.columnId).then(function(_62){
if(_62){
t._blur();
}
if(col.alwaysEditing){
t._focusEditor(e.rowId,e.columnId);
}
});
}else{
if(g.focus.currentArea()=="body"){
g.focus.stopEvent(e);
t._onUIBegin(e);
}
}
}else{
if(e.keyCode==_9.ESCAPE&&_61){
t.cancel(e.rowId,e.columnId).then(_2.hitch(t,t._blur)).then(function(){
g.focus.focusArea("body");
});
}
}
}
if(t._editing&&e.keyCode!==_9.TAB){
e.stopPropagation();
}
}});
});
