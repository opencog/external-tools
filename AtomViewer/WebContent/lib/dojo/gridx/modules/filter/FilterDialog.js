//>>built
require({cache:{"url:gridx/templates/FilterDialog.html":"<form action=\"./\" onsubmit=\"return false;\">\n<label id=\"${id}_MatchOptionLabel\" for=\"${id}_MatchOptionSelect\">${i18n.relationMsgFront} </label>\n<select data-dojo-type=\"dijit.form.Select\" id=\"${id}_MatchOptionSelect\" aria-labelledby=\"${id}_MatchOptionLabel\">\n\t<option value=\"all\">${i18n.relationAll}</option>\n\t<option value=\"any\">${i18n.relationAny}</option>\n</select>\n\n<div class=\"gridxFilterAccordionWrapper\">\n\t<div data-dojo-type=\"dijit.layout.AccordionContainer\"></div>\n</div>\n\n<div class=\"gridxFilterDialogButtons\">\n\t<input type=\"button\" class=\"gridxFilterDialogBtnAdd\" data-dojo-type=\"dijit.form.Button\" \n\t\t   showLabel=\"false\" iconClass=\"gridxFilterBtnAddRule\" label=\"${i18n.addRuleButton}\"/>\n\t<input type=\"submit\" data-dojo-type=\"dijit.form.Button\" label=\"${i18n.filterButton}\"/>\n\t<input type=\"button\" data-dojo-type=\"dijit.form.Button\" label=\"${i18n.clearButton}\"/>\n\t<input type=\"button\" data-dojo-type=\"dijit.form.Button\" label=\"${i18n.cancelButton}\"/>\n</div>\n</form>\n"}});
define("gridx/modules/filter/FilterDialog",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-class","dojo/string","dojo/query","dojo/keys","dijit/registry","dijit/Dialog","dojox/html/metrics","./FilterPane","dojo/text!../../templates/FilterDialog.html","dojo/i18n!../../nls/FilterBar","dijit/form/Select","dijit/form/Button","dijit/layout/AccordionContainer"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
return _1(_9,{title:_d.filterDefDialogTitle,cssClass:"gridxFilterDialog",grid:null,autofocus:false,postCreate:function(){
this.inherited(arguments);
this.i18n=_d;
this.set("content",_5.substitute(_c,this));
this._initWidgets();
_4.add(this.domNode,"gridxFilterDialog");
},done:function(){
this.hide();
this.grid.filterBar.applyFilter(this.getData());
},getData:function(){
return {type:this._sltMatch.get("value"),conditions:_3.map(this._accordionContainer.getChildren(),function(p){
return p.getData();
})};
},setData:function(_e){
this.removeChildren();
if(!_e||!_e.conditions.length){
return;
}
this._sltMatch.set("value","all"&&_e&&_e.type);
_3.forEach(_e.conditions,function(d){
this.addRule().setData(d);
},this);
},removeChildren:function(){
_3.forEach(this._accordionContainer.getChildren(),function(_f){
this._accordionContainer.removeChild(_f);
_f.destroy();
},this);
},clear:function(){
this.grid.filterBar.confirmToExecute(function(){
this.grid.filterBar.clearFilter(true);
this.hide();
},this);
},cancel:function(){
this.hide();
},show:function(){
this.inherited(arguments);
if(!this._accordionContainer.hasChildren()){
this.addRule();
}
},addRule:function(){
var ac=this._accordionContainer;
if(ac.getChildren().length===3){
ac._contentBox.w-=_a.getScrollbar().w;
}
var _10=ac.getChildren().length+1;
var _11=_5.substitute(this.i18n.ruleTitleTemplate,{ruleNumber:_10});
var fp=new _b({grid:this.grid,title:_11});
ac.addChild(fp);
ac.selectChild(fp);
if(!this._titlePaneHeight){
this._titlePaneHeight=fp._buttonWidget.domNode.offsetHeight+3;
}
fp._initCloseButton();
fp._onColumnChange();
try{
fp.tbSingle.focus();
}
catch(e){
}
_4.toggle(ac.domNode,"gridxFilterSingleRule",ac.getChildren().length===1);
this.connect(fp,"onChange","_updateButtons");
this._updateButtons();
this._updateAccordionContainerHeight();
ac.domNode.parentNode.scrollTop=100000;
return fp;
},_initWidgets:function(){
var _12=dojo.query("form",this.domNode)[0],_13=this;
_12.onsubmit=function(){
_13.done();
return false;
};
this._accordionContainer=_8.byNode(_6(".dijitAccordionContainer",this.domNode)[0]);
this._sltMatch=_8.byNode(_6(".dijitSelect",this.domNode)[0]);
var _14=_6(".dijitButton",this.domNode);
this._btnAdd=_8.byNode(_14[0]);
this._btnFilter=_8.byNode(_14[1]);
this._btnClear=_8.byNode(_14[2]);
this._btnCancel=_8.byNode(_14[3]);
this.connect(this._btnAdd,"onClick","addRule");
this.connect(this._btnClear,"onClick","clear");
this.connect(this._btnCancel,"onClick","cancel");
this.connect(this._accordionContainer,"removeChild","_updateButtons");
this.connect(this._accordionContainer,"removeChild","_updatePaneTitle");
},_updatePaneTitle:function(){
_3.forEach(this._accordionContainer.getChildren(),function(_15){
_15._updateTitle();
});
},_updateButtons:function(){
var _16=this._accordionContainer.getChildren();
if(_3.some(_16,function(c){
return c.getData()===null;
})){
this._btnFilter.set("disabled",true);
}else{
this._btnFilter.set("disabled",false);
}
var c=this.grid.filterBar.arg("maxRuleCount");
this._btnAdd.set("disabled",_16.length>=c&&c>0);
this._btnClear.set("disabled",!this.grid.filterBar.filterData);
},_updateAccordionContainerHeight:function(){
var ac=this._accordionContainer,len=ac.getChildren().length;
ac.domNode.style.height=145+len*this._titlePaneHeight+"px";
ac.resize();
},uninitialize:function(){
this.inherited(arguments);
}});
});
