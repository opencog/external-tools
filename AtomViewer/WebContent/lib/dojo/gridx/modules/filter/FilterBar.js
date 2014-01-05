//>>built
require({cache:{"url:gridx/templates/FilterBar.html":"<input type=\"button\" data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"\n\ticonClass: 'gridxFilterBarBtnIcon',\n\tlabel: '...',\n\ttitle: '${defineFilter}'\" aria-label='${defineFilter}'\n/><div class=\"gridxFilterBarStatus\"\n\t><span>${noFilterApplied}</span\n\t><span class=\"gridxFilterBarCloseBtn\" tabindex=\"-1\" title=\"${closeFilterBarBtn}\"><span class=\"gridxFilterBarCloseBtnText\">x</span></span\n></div>\n"}});
define("gridx/modules/filter/FilterBar",["dojo/_base/kernel","dojo/_base/declare","dijit/registry","dojo/_base/lang","dojo/_base/array","dojo/_base/event","dojo/dom-construct","dojo/dom-attr","dojo/dom-class","dojo/string","dojo/parser","dojo/query","../../core/_Module","dojo/text!../../templates/FilterBar.html","dojo/i18n!../../nls/FilterBar","./Filter","./FilterDialog","./FilterConfirmDialog","./FilterTooltip","dijit/TooltipDialog","dijit/popup","dijit/Tooltip","dijit/form/Button"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13){
return _2(_d,{name:"filterBar",forced:["filter"],getAPIPath:function(){
return {filterBar:this};
},closeButton:true,defineFilterButton:true,tooltipDelay:300,maxRuleCount:0,ruleCountToConfirmClearFilter:2,conditions:{string:["equal","contain","startWith","endWith","notEqual","notContain","notStartWith","notEndWith","isEmpty"],number:["equal","greater","less","greaterEqual","lessEqual","notEqual","isEmpty"],date:["equal","before","after","range","isEmpty"],time:["equal","before","after","range","isEmpty"],"boolean":["equal","isEmpty"]},load:function(_14,_15){
var F=_10;
F.before=F.lessEqual;
F.after=F.greaterEqual;
_1.deprecated("FilterBar module property closeFilterBarButton is deprecated.","Use closeButton instead","1.1");
this.closeFilterBarButton=this.arg("closeButton",this.arg("closeFilterBarButton"));
this._nls=_f;
this.domNode=_7.create("div",{innerHTML:_a.substitute(_e,_f),"class":"gridxFilterBar"});
_b.parse(this.domNode);
_9.toggle(this.domNode,"gridxFilterBarHideCloseBtn",!this.arg("closeButton"));
this.grid.vLayout.register(this,"domNode","headerNode",-1);
this._initWidgets();
this._initFocus();
this.refresh();
this.connect(this.domNode,"onclick","onDomClick");
this.connect(this.domNode,"onmouseover","onDomMouseOver");
this.connect(this.domNode,"onmousemove","onDomMouseMove");
this.connect(this.domNode,"onmouseout","onDomMouseOut");
this.loaded.callback();
},onDomClick:function(e){
if(!e.target||!e.target.tagName){
return;
}
if(_8.get(e.target,"action")==="clear"){
this.clearFilter();
}else{
if(_9.contains(e.target,"gridxFilterBarCloseBtn")||_9.contains(e.target,"gridxFilterBarCloseBtnText")){
this.hide();
}else{
this.showFilterDialog();
}
}
},onDomMouseMove:function(e){
if(e&&e.target&&(_8.get(e.target,"action")==="clear"||this.btnFilter===dijit.getEnclosingWidget(e.target))){
return;
}
this._showTooltip(e);
},onDomMouseOver:function(e){
},onDomMouseOut:function(e){
window.setTimeout(_4.hitch(this,"_hideTooltip"),10);
},applyFilter:function(_16){
var F=_10,_17=[];
this.filterData=_16;
_5.forEach(_16.conditions,function(_18){
var _19="string";
if(_18.colId){
_19=this.grid.column(_18.colId).dataType();
_17.push(this._getFilterExpression(_18.condition,_18,_19,_18.colId));
}else{
var arr=[];
_5.forEach(this.grid.columns(),function(col){
if(!col.isFilterable()){
return;
}
arr.push(this._getFilterExpression(_18.condition,_18,_19,col.id));
},this);
_17.push(F.or.apply(F,arr));
}
},this);
var _1a=(_16.type==="all"?F.and:F.or).apply(F,_17);
this.grid.filter.setFilter(_1a);
var _1b=this;
this.model.when({}).then(function(){
_1b._currentSize=_1b.model.size();
_1b._totalSize=_1b.model._cache.size();
_1b._buildFilterState();
});
},confirmToExecute:function(_1c,_1d){
var max=this.arg("ruleCountToConfirmClearFilter");
if(this.filterData&&(this.filterData.conditions.length>=max||max<=0)){
if(!this._cfmDlg){
this._cfmDlg=new _12();
}
this._cfmDlg.execute=_4.hitch(_1d,_1c);
this._cfmDlg.show();
}else{
_1c.apply(_1d);
}
},clearFilter:function(_1e){
if(!_1e){
this.confirmToExecute(_4.hitch(this,"clearFilter",true),this);
}else{
this.filterData=null;
this.grid.filter.setFilter();
this._buildFilterState();
}
},columnMixin:{isFilterable:function(){
return this.grid._columnsById[this.id].filterable!==false;
},setFilterable:function(_1f){
this.grid.filterBar._setFilterable(this.id,_1f);
return this;
},dataType:function(){
return (this.grid._columnsById[this.id].dataType||"string").toLowerCase();
},filterConditions:function(){
return this.grid.filterBar._getColumnConditions(this.id);
}},refresh:function(){
this.btnClose.style.display=this.closeButton?"":"none";
this.btnFilter.domNode.style.display=this.arg("defineFilterButton")?"":"none";
this._currentSize=this.model.size();
this._totalSize=this.model._cache.size();
this._buildFilterState();
},isVisible:function(){
return this.domNode.style.display!="none";
},show:function(){
this.domNode.style.display="block";
this.grid.vLayout.reLayout();
this.onShow();
},hide:function(){
this.domNode.style.display="none";
this.grid.vLayout.reLayout();
this._hideTooltip();
this.onHide();
},onShow:function(){
},onHide:function(){
},showFilterDialog:function(){
var dlg=this._filterDialog;
if(!dlg){
this._filterDialog=dlg=new _11({grid:this.grid});
}
if(dlg.open){
return;
}
if(!this.filterData){
dlg.setData(this.filterData);
}
dlg.show();
if(this.filterData){
dlg.setData(this.filterData);
}
},uninitialize:function(){
this._filterDialog&&this._filterDialog.destroyRecursive();
this.inherited(arguments);
_7.destroy(this.domNode);
},_getColumnConditions:function(_20){
var _21,_22;
if(!_20){
_21=[];
_22="string";
}else{
_21=this.grid._columnsById[_20].disabledConditions||[];
_22=(this.grid._columnsById[_20].dataType||"string").toLowerCase();
}
var ret=this.conditions[_22],_23={};
if(!ret){
ret=this.conditions["string"];
}
_5.forEach(_21,function(_24){
_23[_24]=true;
});
ret=_5.filter(ret,function(_25){
return !_23[_25];
});
return ret;
},_setFilterable:function(_26,_27){
var col=this.grid._columnsById[_26];
if(!col){
return;
}
if(col.filterable==!!_27){
return;
}
col.filterable=!!_27;
if(this.filterData){
var d=this.filterData,len=d.conditions.length;
d.conditions=_5.filter(d.conditions,function(c){
return c.colId!=_26;
});
if(len!=d.conditions.length){
this.applyFilter(d);
}
if(this._filterDialog.open){
this._filterDialog.setData(d);
}
}
},_initWidgets:function(){
this.btnFilter=_3.byNode(_c(".dijitButton",this.domNode)[0]);
this.btnClose=_c(".gridxFilterBarCloseBtn",this.domNode)[0];
this.statusNode=_c(".gridxFilterBarStatus",this.domNode)[0].firstChild;
_8.remove(this.btnFilter.focusNode,"aria-labelledby");
},_buildFilterState:function(){
if(!this.filterData||!this.filterData.conditions.length){
this.statusNode.innerHTML=this.arg("noFilterMessage",_f.filterBarMsgNoFilterTemplate);
return;
}
this.statusNode.innerHTML=_a.substitute(this.arg("hasFilterMessage",_f.filterBarMsgHasFilterTemplate),[this._currentSize,this._totalSize,_f.defaultItemsName])+"&nbsp; &nbsp; <a href=\"javascript:void(0);\" action=\"clear\" title=\""+_f.filterBarClearButton+"\">"+_f.filterBarClearButton+"</a>";
this._buildTooltip();
},_buildTooltip:function(){
if(!this._tooltip){
this._tooltip=new _13({grid:this.grid});
}
this._tooltip.buildContent();
},_showTooltip:function(evt,_28){
this._hideTooltip();
if(!this.filterData||!this.filterData.conditions||!this.filterData.conditions.length){
return;
}
if(!_28){
this._pointTooltipDelay=window.setTimeout(_4.hitch(this,"_showTooltip",evt,true),this.arg("tooltipDelay"));
return;
}
this._tooltip.show(evt);
},_hideTooltip:function(){
var dlg=this._tooltip;
if(!dlg){
return;
}
if(dlg.isMouseOn){
return;
}
if(this._pointTooltipDelay){
window.clearTimeout(this._pointTooltipDelay);
this._pointTooltipDelay=null;
}
dlg.hide();
},_getRuleString:function(_29,_2a,_2b){
var _2c,_2b;
if(_29=="isEmpty"){
_2c="";
}else{
if(/^date|^time/i.test(_2b)){
var f=this._formatDate;
if(/^time/i.test(_2b)){
f=this._formatTime;
}
if(_29==="range"){
var tpl=this.arg("rangeTemplate",_f.rangeTemplate);
_2c=_a.substitute(tpl,[f(_2a.start),f(_2a.end)]);
}else{
_2c=f(_2a);
}
}else{
_2c=_2a;
}
}
return "<span style=\"font-style:italic\">"+this._getConditionDisplayName(_29)+"</span> "+_2c;
},_getConditionDisplayName:function(c){
var k=c.charAt(0).toUpperCase()+c.substring(1);
return this.arg("condition"+k,_f["condition"+k]);
},_getConditionOptions:function(_2d){
var _2e=this._conditionOptions=this._conditionOptions||{};
if(!_2e[_2d]){
var arr=[];
_5.forEach(this._getColumnConditions(_2d),function(s){
var k=s.charAt(0).toUpperCase()+s.substring(1);
arr.push({label:this.arg("condition"+k,_f["condition"+k]),value:s});
},this);
_2e[_2d]=arr;
}
return _2e[_2d];
},_getFilterExpression:function(_2f,_30,_31,_32){
var F=_10;
var dc=this.grid._columnsById[_32].dateParser||this._stringToDate;
var tc=this.grid._columnsById[_32].timeParser||this._stringToTime;
var _33={date:dc,time:tc};
var c=_30.condition,exp,_34=false,_31=c=="isEmpty"?"string":_31;
if(c==="range"){
var _35=F.value(_30.value.start,_31),_36=F.value(_30.value.end,_31),_37=F.column(_32,_31,_33[_31]);
exp=F.and(F.greaterEqual(_37,_35),F.lessEqual(_37,_36));
}else{
if(/^not/.test(c)){
_34=true;
c=c.replace(/^not/g,"");
c=c.charAt(0).toLowerCase()+c.substring(1);
}
exp=F[c](F.column(_32,_31,_33[_31]),c=="isEmpty"?null:F.value(_30.value,_31));
if(_34){
exp=F.not(exp);
}
}
return exp;
},_stringToDate:function(s,_38){
_38=_38||/(\d{4})\/(\d\d?)\/(\d\d?)/;
_38.test(s);
var d=new Date();
d.setFullYear(parseInt(RegExp.$1));
d.setMonth(parseInt(RegExp.$2)-1);
return d;
},_stringToTime:function(s,_39){
_39=_39||/(\d\d?):(\d\d?):(\d\d?)/;
_39.test(s);
var d=new Date();
d.setHours(parseInt(RegExp.$1));
d.setMinutes(parseInt(RegExp.$2));
d.setSeconds(parseInt(RegExp.$3));
return d;
},_formatDate:function(_3a){
var m=_3a.getMonth()+1,d=_3a.getDate();
return m+"/"+d+"/"+_3a.getFullYear();
},_formatTime:function(_3b){
var h=_3b.getHours(),m=_3b.getMinutes();
if(h<10){
h="0"+h;
}
if(m<10){
m="0"+m;
}
return h+":"+m+":00";
},_initFocus:function(){
var _3c=this.grid.focus;
if(_3c){
_3c.registerArea({name:"filterbar_btn",priority:-1,focusNode:this.btnFilter.domNode,doFocus:this._doFocusBtnFilter,scope:this});
_3c.registerArea({name:"filterbar_clear",priority:-0.9,focusNode:this.domNode,doFocus:this._doFocusClearLink,scope:this});
_3c.registerArea({name:"filterbar_close",priority:-0.8,focusNode:this.btnClose,doFocus:this._doFocusBtnClose,scope:this});
}
},_doFocusBtnFilter:function(evt){
this.btnFilter.focus();
if(evt){
_6.stop(evt);
}
return true;
},_doFocusClearLink:function(evt){
this.btnFilter.focus();
var _3d=_c("a[action=\"clear\"]")[0];
if(_3d){
_3d.focus();
if(evt){
_6.stop(evt);
}
return true;
}
return false;
},_doFocusBtnClose:function(evt){
this.btnClose.focus();
if(evt){
_6.stop(evt);
}
return true;
},_doBlur:function(){
return true;
},destroy:function(){
this._filterDialog&&this._filterDialog.destroy();
_7.destroy(this.domNode);
this.inherited(arguments);
}});
});
