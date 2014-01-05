//>>built
define("gridx/modules/filter/FilterTooltip",["dojo","dijit","dojo/_base/declare","dojo/string","dojo/i18n!../../nls/FilterBar","./Filter","./FilterDialog","dijit/TooltipDialog","dijit/popup","dijit/Tooltip","dojo/_base/array","dojo/_base/event","dojo/_base/html"],function(_1,_2,_3,_4,_5){
return _3(_2.TooltipDialog,{grid:null,filterBar:null,postCreate:function(){
this.inherited(arguments);
this.filterBar=this.grid.filterBar;
this.connect(this,"onClick","_onClick");
this.connect(this,"onMouseEnter","_onMouseEnter");
this.connect(this,"onMouseLeave","_onMouseLeave");
_1.addClass(this.domNode,"gridxFilterTooltip");
_1.addClass(this.domNode,"dijitTooltipBelow");
},show:function(_6){
this.inherited(arguments);
_2.popup.open({popup:this,x:_6.pageX,y:_6.pageY,padding:{x:-6,y:-3}});
},hide:function(){
this.inherited(arguments);
_2.popup.close(this);
},buildContent:function(){
var fb=this.filterBar,_7=fb._nls,_8=fb.filterData;
if(!_8||!_8.conditions.length){
return;
}
var _9=_8.type==="all"?_7.statusTipHeaderAll:_7.statusTipHeaderAny;
var _a=["<div class=\"gridxFilterTooltipTitle\"><b>${i18n.statusTipTitleHasFilter}</b> ",_9,"</div><table><tr><th>${i18n.statusTipHeaderColumn}</th><th>${i18n.statusTipHeaderCondition}</th></tr>"];
_1.forEach(_8.conditions,function(d,_b){
var _c=_b%2?" class=\"gridxFilterTooltipOddRow\"":"";
_a.push("<tr",_c,"><td>",(d.colId?this.grid.column(d.colId).name():"${i18n.anyColumnOption}"),"</td><td class=\"gridxFilterTooltipValueCell\">","<div>",fb._getRuleString(d.condition,d.value,d.type),"<span action=\"remove-rule\" title=\"${i18n.removeRuleButton}\""," class=\"gridxFilterTooltipRemoveBtn\"><span class=\"gridxFilterTooltipRemoveBtnText\">x</span></span></div></td></tr>");
},this);
_a.push("</table>");
this.i18n=_5;
this.set("content",_4.substitute(_a.join(""),this));
_1.toggleClass(this.domNode,"gridxFilterTooltipSingleRule",_8.conditions.length===1);
},_onMouseEnter:function(e){
this.isMouseOn=true;
},_onMouseLeave:function(e){
this.isMouseOn=false;
this.hide();
},_onClick:function(e){
var tr=this._getTr(e),fb=this.filterBar;
if(tr&&/^span$/i.test(e.target.tagName)){
fb.filterData.conditions.splice(tr.rowIndex-1,1);
tr.parentNode.removeChild(tr);
fb.applyFilter(fb.filterData);
_1.stopEvent(e);
}else{
this.filterBar.showFilterDialog();
this.hide();
}
},_getTr:function(e){
var tr=e.target;
while(tr&&!/^tr$/i.test(tr.tagName)&&tr!==this.domNode){
tr=tr.parentNode;
}
return (tr&&/^tr$/i.test(tr.tagName))?tr:null;
}});
});
