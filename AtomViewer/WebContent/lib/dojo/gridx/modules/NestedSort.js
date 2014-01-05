//>>built
define("gridx/modules/NestedSort",["dojo/_base/declare","dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/query","dojo/_base/window","dojo/_base/sniff","dojo/string","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/dom-geometry","dojo/keys","../core/_Module","../core/model/extensions/Sort","dojo/i18n!../nls/NestedSort"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,nls){
var _10=_2.forEach,_11=_2.filter,_12=_2.indexOf,_13=_9.contains,_14=_9.remove,_15=_9.add;
return _1(_e,{name:"sort",forced:["header"],modelExtensions:[_f],_a11yText:{"dojoxGridDescending":"<span class=\"gridxNestedSortBtnText\">&#9662;</span>","dojoxGridAscending":"<span class=\"gridxNestedSortBtnText\">&#9652;</span>","dojoxGridAscendingTip":"<span class=\"gridxNestedSortBtnText\">&#1784;</span>","dojoxGridDescendingTip":"<span class=\"gridxNestedSortBtnText\">&#1783;</span>","dojoxGridUnsortedTip":"<span class=\"gridxNestedSortBtnText\">x</span>"},constructor:function(){
this._sortData=[];
},getAPIPath:function(){
return {sort:this};
},preload:function(_16){
var t=this;
t._sortData=t.arg("initialOrder")||t._sortData;
if(t.grid.persist){
var d=t.grid.persist.registerAndLoad("sort",function(){
return t._sortData;
});
if(d){
t._sortData=d;
}
}
t._sortData=_11(t._sortData,function(d){
return t.isSortable(d.colId);
});
if(t._sortData.length){
t.grid.model.sort(t._sortData);
}
},load:function(_17){
this._init();
this.loaded.callback();
},columnMixin:{isSorted:function(){
return this.grid.sort.isSorted(this.id);
},isSortable:function(){
return this.grid.sort.isSortable(this.id);
}},getSortData:function(){
return this._sortData;
},sort:function(_18){
var t=this;
t._sortData=_11(_18,function(d){
return t.isSortable(d.colId);
});
t._doSort();
t._updateUI();
},isSorted:function(_19){
return _2.some(this._sortData,function(d){
return d.colId==_19;
});
},_doSort:function(){
var g=this.grid,d=this._sortData;
g.model.sort(d.length?d:null);
g.body.refresh();
},clear:function(){
this._sortData.length=0;
this._doSort();
this._updateUI();
},isSortable:function(_1a){
var col=this.grid._columnsById[_1a];
return col&&(col.sortable||col.sortable===undefined);
},_init:function(){
var t=this,n=t.grid.header.domNode,f=function(){
t._initHeader();
t._initFocus();
t._updateUI();
};
t.connect(n,"onclick","_onHeaderClick");
t.connect(n,"onmouseover","_onMouseOver");
t.connect(n,"onmouseout","_onMouseOver");
t.connect(t.grid.header,"onRender",f);
f();
},_initHeader:function(){
var t=this,_1b=t.grid.header.domNode.firstChild.firstChild,tds=_1b.rows[0].cells;
if(_5(".gridxSortBtn",_1b).length){
return;
}
_10(_1b.rows[0].cells,function(td){
var _1c=td.getAttribute("colid");
if(t.isSortable(_1c)){
_a.create("div",{className:"gridxSortBtn gridxSortBtnNested"},td,"first");
_a.create("div",{className:"gridxSortBtn gridxSortBtnSingle"},td,"first");
}
});
},_onHeaderClick:function(e){
var t=this,btn=e.target,_1d=t._sortData,_1e;
if(_13(btn,"gridxNestedSortBtnText")){
btn=btn.parentNode;
}
t._markFocus(e);
if(_13(btn,"gridxSortBtn")){
_1e=btn.parentNode.getAttribute("colid");
}else{
return;
}
if(_13(btn,"gridxSortBtnSingle")){
if(_1d.length>1){
_1d.length=0;
}
var d=_11(_1d,function(_1f){
return _1f.colId===_1e;
})[0];
_1d.length=0;
if(d){
_1d.push(d);
}
t._sortColumn(_1e);
}else{
if(_13(btn,"gridxSortBtnNested")){
t._sortColumn(_1e);
}
}
_4.stop(e);
},_onMouseOver:function(e){
var g=this.grid;
_9.toggle(g.header.domNode,"gridxHeaderHover",e.type=="mouseover");
if(g.autoHeight){
g.vLayout.reLayout();
}
},_sortColumn:function(_20){
var t=this,_21=t._sortData;
if(t.isSortable(_20)){
var d=_11(_21,function(d){
return d.colId===_20;
})[0];
if(d){
if(d.descending){
_21.splice(_12(_21,d),1);
}
d.descending=!d.descending;
}else{
_21.push({colId:_20,descending:false});
}
t._doSort();
t._updateUI();
}
},_updateUI:function(){
var t=this,g=t.grid,dn=g.domNode,_22=t._sortData;
_14(dn,"gridxSingleSorted");
_14(dn,"gridxNestedSorted");
_5("th",g.header.domNode).forEach(function(_23){
var _24=_23.getAttribute("colid");
if(t.isSortable(_24)){
_10(["","Desc","Asc","Main"],function(s){
_14(_23,"gridxCellSorted"+s);
});
var _25=_23.childNodes[0],_26=_23.childNodes[1],_27=t._a11yText;
_25.title=nls.singleSort+" - "+nls.ascending;
_26.title=nls.nestedSort+" - "+nls.ascending;
_25.innerHTML=_27.dojoxGridAscendingTip+"&nbsp;";
_26.innerHTML=_22.length+1+_27.dojoxGridAscendingTip;
var d=_11(_22,function(_28){
return _28.colId===_24;
})[0];
t._setWaiState(_23,_24,d);
if(d){
_26.innerHTML=_12(_22,d)+1;
_15(_23,"gridxCellSorted");
if(d==_22[0]){
_15(_23,"gridxCellSortedMain");
}
var len=_22.length;
if(d.descending){
_15(_23,"gridxCellSortedDesc");
if(len==1){
_25.title=nls.singleSort+" - "+nls.unsorted;
_25.innerHTML=_27.dojoxGridDescending+"&nbsp;";
}else{
_26.title=nls.nestedSort+" - "+nls.unsorted;
_26.innerHTML+=_27.dojoxGridDescending;
}
}else{
_15(_23,"gridxCellSortedAsc");
if(len==1){
_25.title=nls.singleSort+": "+nls.descending;
_25.innerHTML=_27.dojoxGridAscending+"&nbsp;";
}else{
_26.title=nls.nestedSort+" - "+nls.descending;
_26.innerHTML+=_27.dojoxGridAscending;
}
}
}
}
});
if(_22.length==1){
_15(dn,"gridxSingleSorted");
}else{
if(_22.length>1){
_15(dn,"gridxNestedSorted");
}
}
},_initFocus:function(){
var t=this,g=t.grid,_29=g.header.domNode;
if(g.focus){
t._initRegions();
g.focus.registerArea({name:"header",priority:0,focusNode:_29,scope:t,doFocus:t._doFocus,doBlur:t._blurNode,onBlur:t._blurNode,connects:[t.connect(_29,"onkeypress","_onKeyPress")]});
}
},_doFocus:function(e){
this._focusRegion(this._getCurrentRegion()||this._focusRegions[0]);
return true;
},_blurNode:function(e){
return true;
},_onKeyPress:function(e){
var t=this,ltr=t.grid.isLeftToRight(),_2a=ltr?_d.RIGHT_ARROW:_d.LEFT_ARROW,_2b=ltr?_d.LEFT_ARROW:_d.RIGHT_ARROW;
switch(e.keyCode){
case _2b:
t._focusPrevious();
break;
case _2a:
t._focusNext();
break;
case _d.ENTER:
case _d.SPACE:
t._onHeaderClick(e);
break;
}
_4.stop(e);
},_onBlur:function(e){
this._blurRegion(e.target);
},_focusNext:function(){
var t=this,i=t._currRegionIdx,rs=t._focusRegions;
while(rs[i+1]&&_b.get(rs[++i],"display")==="none"){
}
if(rs[i]){
t._focusRegion(rs[i]);
}
},_focusPrevious:function(){
var t=this,i=t._currRegionIdx,rs=t._focusRegions;
while(rs[i-1]&&(_b.get(rs[--i],"display")==="none")){
}
if(rs[i]){
t._focusRegion(rs[i]);
}
},_markFocus:function(e){
var _2c=e.target,i=_12(this._focusRegions,_2c);
if(i>=0){
this._focusRegion(_2c);
}
},_initRegions:function(){
var t=this;
_10(t._nconns,_3.disconnect);
t._focusRegions=[];
t._nconns=[];
_5(".gridxCell",t.grid.header.domNode).forEach(function(_2d){
var _2e=_2d.childNodes;
_10([2,1,0],function(i){
if(_2e[i]){
_2e[i].setAttribute("tabindex","-1");
t._focusRegions.push(_2e[i]);
t._nconns.push(t.connect(_2e[i],"onblur","_onBlur"));
return;
}
});
});
t._currRegionIdx=-1;
},_focusRegion:function(_2f){
if(_2f){
var t=this,g=t.grid,_30=t._getRegionHeader(_2f);
_2f.focus();
window.setTimeout(function(){
_15(_30,"gridxCellSortFocus");
if(_13(_2f,"gridxSortNode")){
_15(_2f,"gridxSortNodeFocus");
}else{
if(_13(_2f,"gridxSortBtn")){
_15(_2f,"gridxSortBtnFocus");
}
}
_15(t.grid.header.domNode,"gridxHeaderFocus");
t._currRegionIdx=_12(t._focusRegions,_2f);
_2f.focus();
if(g.hScroller){
g.hScroller.scrollToColumn(_30.getAttribute("colid"));
}
},0);
}
},_blurRegion:function(_31){
if(_31){
var _32=this._getRegionHeader(_31);
_14(_32,"gridxCellSortFocus");
_14(_31,"gridxSortNodeFocus");
_14(_31,"gridxSortBtnFocus");
_14(this.grid.header.domNode,"gridxHeaderFocus");
}
},_getCurrentRegion:function(){
return this._currRegionIdx===-1?null:this._focusRegions[this._currRegionIdx];
},_getRegionHeader:function(_33){
while(_33&&!_13(_33,"gridxCell")){
_33=_33.parentNode;
}
return _33;
},_setWaiState:function(_34,_35,_36){
var col=this.grid.column(_35),_37="Column "+col.name(),_38="none",_39="ascending";
if(_36){
_38=_36.descending?"descending":"ascending";
_39=_36.descending?"none":"descending";
}
var _3a=_8.substitute(nls.waiSingleSortLabel,[_37,_38,_39]),_3b=_8.substitute(nls.waiNestedSortLabel,[_37,_38,_39]);
_34.childNodes[0].setAttribute("aria-label",_3a);
_34.childNodes[1].setAttribute("aria-label",_3b);
}});
});
