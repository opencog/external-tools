//>>built
require({cache:{"url:gridx/templates/PaginationBar.html":"<div class='gridxPager' role=\"navigation\" aria-label='${id} ${pagerWai}'\n\t><table class='gridxPagerInner' cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\"\n\t\t><tr\n\t\t\t><td class=\"gridxPagerDescriptionTD\"\n\t\t\t\t><div class=\"gridxPagerDescription\"\n\t\t\t\t\tdata-dojo-attach-point=\"_descContainer\"\n\t\t\t\t></div\n\t\t\t></td\n\t\t\t><td class=\"gridxPagerStepperTD\"\n\t\t\t\t><div class=\"gridxPagerStepper\"\n\t\t\t\t\trole=\"toolbar\"\n\t\t\t\t\taria-label='${id} ${pagerWai}'\n\t\t\t\t\tdata-dojo-attach-point=\"_pageStepperContainer\"\n\t\t\t\t\t><span class='gridxPagerStepperBtn gridxPagerPrevPage'\n\t\t\t\t\t\ttabindex='${_tabIndex}'\n\t\t\t\t\t\ttitle='${prevPageTitle}'\n\t\t\t\t\t\taria-label='${prevPageTitle}'\n\t\t\t\t\t\trole=\"button\"\n\t\t\t\t\t\tpageindex='Prev'\n\t\t\t\t\t\tdata-dojo-attach-point='_prevPageBtn'\n\t\t\t\t\t\tdata-dojo-attach-event='onclick: _gotoPrevPage'\n\t\t\t\t\t\t><span class='gridxPagerA11yInner'>&nbsp;&lt;</span\n\t\t\t\t\t></span\n\t\t\t\t\t><span class='gridxPagerPages'\n\t\t\t\t\t\tdata-dojo-attach-point='_pageBtnContainer'\n\t\t\t\t\t\tdata-dojo-attach-event='onclick: _gotoPage, onmouseover: _onHoverPageBtn, onmouseout: _onHoverPageBtn'\n\t\t\t\t\t></span\n\t\t\t\t\t><span class='gridxPagerStepperBtn gridxPagerNextPage'\n\t\t\t\t\t\ttabindex='${_tabIndex}'\n\t\t\t\t\t\ttitle='${nextPageTitle}'\n\t\t\t\t\t\taria-label='${nextPageTitle}'\n\t\t\t\t\t\tpageindex='Next'\n\t\t\t\t\t\tdata-dojo-attach-point='_nextPageBtn'\n\t\t\t\t\t\tdata-dojo-attach-event='onclick: _gotoNextPage'\n\t\t\t\t\t\t><span class='gridxPagerA11yInner'>&nbsp;&gt;</span\n\t\t\t\t\t></span\n\t\t\t\t></div\n\t\t\t></td\n\t\t\t><td class=\"gridxPagerSizeSwitchTD\"\n\t\t\t\t><div class=\"gridxPagerSizeSwitch\"\n\t\t\t\t\trole=\"toolbar\"\n\t\t\t\t\taria-label='${id} ${pagerWai}'\n\t\t\t\t\tdata-dojo-attach-point='_sizeSwitchContainer'\n\t\t\t\t\tdata-dojo-attach-event='onclick: _switchPageSize, onmouseover: _onHoverSizeBtn, onmouseout: _onHoverSizeBtn'\n\t\t\t\t></div\n\t\t\t></td\n\t\t\t><td class='gridxPagerGoto'\n\t\t\t\t><span class='gridxPagerGotoBtn'\n\t\t\t\t\ttabindex='${_tabIndex}'\n\t\t\t\t\ttitle='${gotoBtnTitle}'\n\t\t\t\t\trole='button'\n\t\t\t\t\taria-label='${gotoBtnTitle}'\n\t\t\t\t\tdata-dojo-attach-point='_gotoBtn'\n\t\t\t\t\tdata-dojo-attach-event='onclick: _showGotoDialog'\n\t\t\t\t\t><span class='gridxPagerA11yInner'>&#9650;</span\n\t\t\t\t></span\n\t\t\t></td\n\t\t></tr\n\t></table\n></div>\n"}});
define("gridx/modules/pagination/LinkPager",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/sniff","dojo/_base/query","dojo/dom-class","dojo/string","dojo/keys","../../core/util","./_PagerBase","dojo/text!../../templates/PaginationBar.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
var _c=_6.contains,_d=_6.toggle,_e=_7.substitute;
function _f(evt,_10,_11){
var n=evt.target;
while(!_c(n,_10)){
if(_c(n,_11)){
return null;
}
n=n.parentNode;
}
return n;
};
function _12(evt,_13,_14,_15){
var n=_f(evt,_13,_14);
if(n){
_d(n,_15,evt.type=="mouseover");
}
};
function _16(_17,_18,_19,_1a,_1b){
var dir=_1a?-1:1,i=_18?_2.indexOf(_17,_18)+(_19?dir:0):(_1a?_17.length-1:0),_1c=function(i,dir){
while(_17[i]&&!_1b(_17[i])){
i+=dir;
}
return _17[i];
};
_18=_1c(i,dir)||_1c(i-dir,-dir);
if(_18){
_18.focus();
}
return _18;
};
return _1(_a,{templateString:_b,_tabIndex:-1,postMixInProperties:function(){
if(_4("ie")){
var _1d=this.module.grid.domNode.getAttribute("tabindex");
this._tabIndex=_1d>0?_1d:0;
}
},refresh:function(){
var t=this;
t._createDescription();
t._createPageStepper();
t._createPageSizeSwitch();
t._createGotoButton();
},_onSwitchPage:function(){
this._createPageStepper();
this.module.grid.vLayout.reLayout();
},_onSizeChange:function(){
this._createDescription();
this._onSwitchPage();
},_focusArea:function(){
var _1e=this.module.grid.focus;
return _1e&&_1e.currentArea();
},_onChangePageSize:function(_1f,_20){
var t=this,n=_5("[pagesize=\""+_1f+"\"]",t._sizeSwitchContainer)[0];
if(n){
_6.add(n,"gridxPagerSizeSwitchBtnActive");
}
n=_5("[pagesize=\""+_20+"\"]",t._sizeSwitchContainer)[0];
if(n){
_6.remove(n,"gridxPagerSizeSwitchBtnActive");
}
if(t._focusArea()==t.position+"PageSizeSwitch"){
t._findNextPageSizeSwitch();
}
t._createPageStepper();
t.module.grid.vLayout.reLayout();
},_createPageStepper:function(){
var t=this,mod=t.module;
if(t._toggleNode("gridxPagerStepper",mod._exist(t.position,"stepper"))){
var p=t.pagination,_21=p.pageCount(),_22=p.currentPage(),_23=mod.arg("visibleSteppers"),sb=[],_24=t._tabIndex,_25=false,_26=false,_27=[mod.arg("pageIndexTitleTemplate",t.pageIndexTitle),mod.arg("pageIndexWaiTemplate",t.pageIndexTitle),mod.arg("pageIndexTemplate",t.pageIndex)],_28="<span class=\"gridxPagerStepperEllipsis\">&hellip;</span>",_29=function(_2a){
return ["<span class=\"gridxPagerStepperBtn gridxPagerPage ",_22==_2a?"gridxPagerStepperBtnActive":"","\" aria-pressed=\"",_22==_2a?"true":"false","\" pageindex=\"",_2a,"\" title=\"",_e(_27[0],[_2a+1]),"\" aria-label=\"",_e(_27[1],[_2a+1]),"\" role=\"button\" tabindex=\"",_24,"\">",_e(_27[2],[_2a+1]),"</span>"].join("");
};
if(_21){
var _2b=_22-Math.floor((_23-1)/2),_2c=_2b+_23-1;
if(_2b<1){
_2b=1;
_2c=_23-1;
}else{
if(_21>_23&&_2b>=_21-_23){
_2b=_21-_23;
}
}
if(_2c>=_21-1){
_2c=_21-2;
}
sb.push(_29(0));
if(_21>2){
if(_2b>1){
sb.push(_28);
}
for(var i=_2b;i<=_2c;++i){
sb.push(_29(i));
}
if(_2c<_21-2){
sb.push(_28);
}
}
if(_21>1){
sb.push(_29(_21-1));
}
}
t._pageBtnContainer.innerHTML=sb.join("");
if(!_22||_22===_21-1){
_26=!_22||_21<=1;
_25=_22||_21<=1;
}
_d(t._nextPageBtn,"gridxPagerStepperBtnDisable gridxPagerNextPageDisable",_25);
_d(t._prevPageBtn,"gridxPagerStepperBtnDisable gridxPagerPrevPageDisable",_26);
t._nextPageBtn.setAttribute("aria-disabled",_25);
t._prevPageBtn.setAttribute("aria-disabled",_26);
if(t._focusArea()==t.position+"PageStepper"){
t._findNextPageStepperBtn();
}
}
},_gotoPrevPage:function(){
this._focusPageIndex="Prev";
var p=this.pagination;
p.gotoPage(p.currentPage()-1);
},_gotoNextPage:function(){
this._focusPageIndex="Next";
var p=this.pagination;
p.gotoPage(p.currentPage()+1);
},_gotoPage:function(evt){
var n=_f(evt,"gridxPagerStepperBtn","gridxPagerPages");
if(n){
var _2d=this._focusPageIndex=n.getAttribute("pageindex");
this.pagination.gotoPage(parseInt(_2d,10));
}
},_onHoverPageBtn:function(evt){
_12(evt,"gridxPagerStepperBtn","gridxPagerPages","gridxPagerStepperBtnHover");
},_onHoverSizeBtn:function(evt){
_12(evt,"gridxPagerSizeSwitchBtn","gridxPagerSizeSwitch","gridxPagerSizeSwitchBtnHover");
},_createPageSizeSwitch:function(){
var t=this,mod=t.module;
if(t._toggleNode("gridxPagerSizeSwitch",mod._exist(t.position,"sizeSwitch"))){
var sb=[],_2e=t._tabIndex,_2f=mod.arg("sizeSeparator"),_30=t.pagination.pageSize(),_31=[mod.arg("pageSizeTitleTemplate",t.pageSizeTitle),mod.arg("pageSizeWaiTemplate",t.pageSizeTitle),mod.arg("pageSizeTemplate",t.pageSize),mod.arg("pageSizeAllTitleText",t.pageSizeAllTitle),mod.arg("pageSizeAllWaiText",t.pageSizeAllTitle),mod.arg("pageSizeAllText",t.pageSizeAll)];
_2.forEach(mod.arg("sizes"),function(_32){
var _33=false;
if(!(_32>0)){
_32=0;
_33=true;
}
sb.push("<span class=\"gridxPagerSizeSwitchBtn ",_30===_32?"gridxPagerSizeSwitchBtnActive":"","\" aria-pressed=\"",_30===_32?"true":"false","\" pagesize=\"",_32,"\" title=\"",_33?_31[3]:_e(_31[0],[_32]),"\" aria-label=\"",_33?_31[4]:_e(_31[1],[_32]),"\" role=\"button\" tabindex=\"",_2e,"\">",_33?_31[5]:_e(_31[2],[_32]),"</span>","<span class=\"gridxPagerSizeSwitchSeparator\">"+_2f+"</span>");
});
sb.pop();
t._sizeSwitchContainer.innerHTML=sb.join("");
}
},_switchPageSize:function(evt){
var n=_f(evt,"gridxPagerSizeSwitchBtn","gridxPagerSizeSwitch");
if(n){
var _34=this._focusPageSize=n.getAttribute("pagesize");
this.pagination.setPageSize(parseInt(_34,10));
}
},_createGotoButton:function(){
this._toggleNode("gridxPagerGoto",this.module._exist(this.position,"gotoButton"));
},_showGotoDialog:function(){
var t=this,mod=t.module;
if(!t._gotoDialog){
var cls=mod.arg("dialogClass"),_35=mod.arg("gotoPagePane"),_36=_3.mixin({"class":"gridxGotoPageDialog",title:t.gotoDialogTitle,content:new _35({pager:t})},mod.arg("dialogProps")||{});
t._gotoDialog=new cls(_36);
}
var _37=t.pagination.pageCount(),_38=t._gotoDialog.content;
_38.pageCountMsgNode.innerHTML=_e(t.gotoDialogPageCount,[_37]);
_38.pageInputBox.set("constraints",{fractional:false,min:1,max:_37});
t._gotoDialog.show();
},_initFocus:function(){
var t=this,g=t.module.grid,_16=g.focus;
if(_16){
var p=g.pagination,pos=t.position,fp=t.focusPriority,_39=g.isLeftToRight()?_8.LEFT_ARROW:_8.RIGHT_ARROW;
_16.registerArea({name:pos+"PageStepper",priority:fp,focusNode:t._pageStepperContainer,doFocus:_3.hitch(t,t._findNextPageStepperBtn,false,false)});
t.connect(t._pageStepperContainer,"onkeydown",function(evt){
if(evt.keyCode==_8.LEFT_ARROW||evt.keyCode==_8.RIGHT_ARROW){
t._findNextPageStepperBtn(true,evt.keyCode==_39);
}else{
if(evt.keyCode==_8.ENTER&&_c(evt.target,"gridxPagerStepperBtn")&&!_c(evt.target,"gridxPagerStepperBtnActive")&&!_c(evt.target,"gridxPagerStepperBtnDisable")){
if(isNaN(parseInt(t._focusPageIndex,10))){
t["_goto"+t._focusPageIndex+"Page"]();
}else{
p.gotoPage(parseInt(t._focusPageIndex,10));
}
}else{
return;
}
}
_16.stopEvent(evt);
});
_16.registerArea({name:pos+"PageSizeSwitch",priority:fp+0.001,focusNode:t._sizeSwitchContainer,doFocus:_3.hitch(t,t._findNextPageSizeSwitch,false,false)});
t.connect(t._sizeSwitchContainer,"onkeydown",function(evt){
if(evt.keyCode==_8.LEFT_ARROW||evt.keyCode==_8.RIGHT_ARROW){
t._findNextPageSizeSwitch(true,evt.keyCode==_39);
}else{
if(evt.keyCode==_8.ENTER&&_c(evt.target,"gridxPagerSizeSwitchBtn")&&!_c(evt.target,"gridxPagerSizeSwitchBtnActive")){
p.setPageSize(parseInt(t._focusPageSize,10));
}else{
return;
}
}
_16.stopEvent(evt);
});
_16.registerArea({name:pos+"GotoPage",priority:fp+0.002,focusNode:t._gotoBtn,doFocus:function(evt){
_16.stopEvent(evt);
t._gotoBtn.focus();
return true;
}});
t.connect(t._gotoBtn,"onkeydown",function(evt){
if(evt.keyCode==_8.ENTER){
t._showGotoDialog();
_16.stopEvent(evt);
}
});
}
},_findNextPageSizeSwitch:function(_3a,_3b,evt){
var t=this,c=t._sizeSwitchContainer,n=_5("[pagesize=\""+t._focusPageSize+"\"]",c)[0];
t.module.grid.focus.stopEvent(evt);
n=_16(_5(".gridxPagerSizeSwitchBtn",c),n,_3a,_3b,function(_3c){
return !_c(_3c,"gridxPagerSizeSwitchBtnActive");
});
if(n){
t._focusPageSize=n.getAttribute("pagesize");
}
return n;
},_findNextPageStepperBtn:function(_3d,_3e,evt){
var t=this,c=t._pageStepperContainer,n=_5("[pageindex=\""+t._focusPageIndex+"\"]",c)[0];
t.module.grid.focus.stopEvent(evt);
n=_16(_5(".gridxPagerStepperBtn",c),n,_3d,_3e,function(_3f){
return !_c(_3f,"gridxPagerStepperBtnActive")&&!_c(_3f,"gridxPagerStepperBtnDisable");
});
if(n){
t._focusPageIndex=n.getAttribute("pageindex");
}
return n;
}});
});
