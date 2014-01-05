//>>built
require({cache:{"url:gridx/templates/LinkPager.html":"<div class=\"gridxLinkPager\" role=\"toolbar\" aria-label=\"${id} ${pagerWai}\"\n\t><span class='gridxPagerStepperBtn gridxPagerPrevPage'\n\t\ttabindex='${_tabIndex}'\n\t\ttitle='${prevPageTitle}'\n\t\taria-label='${prevPageTitle}'\n\t\tpageindex='prev',\n\t\tdata-dojo-attach-point='_prevPageBtn'\n\t\tdata-dojo-attach-event='onclick: _prevPage'\n\t\t><span class='gridxPagerA11yInner'>&nbsp;&lt;</span\n\t></span\n\t><span class='gridxPagerPages'\n\t\tdata-dojo-attach-point='_pageBtnContainer'\n\t\tdata-dojo-attach-event='onclick: _gotoPage, onmouseover: _onHover, onmouseout: _onHover'\n\t></span\n\t><span class='gridxPagerStepperBtn gridxPagerNextPage'\n\t\ttabindex='${_tabIndex}'\n\t\ttitle='${nextPageTitle}'\n\t\taria-label='${nextPageTitle}'\n\t\tpageindex='next',\n\t\tdata-dojo-attach-point='_nextPageBtn'\n\t\tdata-dojo-attach-event='onclick: _nextPage'\n\t\t><span class='gridxPagerA11yInner'>&nbsp;&gt;</span\n\t></span\n></div>\n"}});
define("gridx/modules/barPlugins/LinkPager",["dojo/_base/declare","dojo/_base/query","dojo/_base/event","dojo/string","dojo/dom-class","dojo/keys","./_LinkPageBase","dojo/text!../../templates/LinkPager.html"],function(_1,_2,_3,_4,_5,_6,_7,_8){
var _9=_5.contains;
return _1(_7,{templateString:_8,postMixInProperties:function(){
var t=this,c="connect",p=t.grid.pagination;
t.inherited(arguments);
t[c](p,"onSwitchPage","refresh");
t[c](p,"onChangePageSize","refresh");
t[c](t.grid.model,"onSizeChange","refresh");
},visibleSteppers:3,refresh:function(){
var t=this,p=t.grid.pagination,_a=p.pageCount(),_b=p.currentPage(),_c=t.visibleSteppers,sb=[],_d=t._tabIndex,_e=false,_f=false,_10="<span class=\"gridxPagerStepperEllipsis\">&hellip;</span>",_11=_4.substitute,_12=function(_13){
return ["<span class=\"gridxPagerStepperBtn gridxPagerPage ",_b==_13?"gridxPagerStepperBtnActive":"","\" pageindex=\"",_13,"\" title=\"",_11(t.pageIndexTitle,[_13+1]),"\" aria-label=\"",_11(t.pageIndexTitle,[_13+1]),"\" tabindex=\"",_d,"\">",_11(t.pageIndex,[_13+1]),"</span>"].join("");
};
if(typeof _c!="number"||_c<=0){
_c=3;
}
if(_a){
var _14=_b-Math.floor((_c-1)/2),_15=_14+_c-1;
if(_14<1){
_14=1;
_15=_c-1;
}else{
if(_a>_c&&_14>=_a-_c){
_14=_a-_c;
}
}
if(_15>=_a-1){
_15=_a-2;
}
sb.push(_12(0));
if(_a>2){
if(_14>1){
sb.push(_10);
}
for(var i=_14;i<=_15;++i){
sb.push(_12(i));
}
if(_15<_a-2){
sb.push(_10);
}
}
if(_a>1){
sb.push(_12(_a-1));
}
}
t._pageBtnContainer.innerHTML=sb.join("");
if(!_b||_b===_a-1){
_f=!_b||_a<=1;
_e=_b||_a<=1;
}
_5.toggle(t._nextPageBtn,"gridxPagerStepperBtnDisable gridxPagerNextPageDisable",_e);
_5.toggle(t._prevPageBtn,"gridxPagerStepperBtnDisable gridxPagerPrevPageDisable",_f);
t.grid.vLayout.reLayout();
if(t.focused){
t._focusNextBtn();
}
},_onHover:function(evt){
this._toggleHover(evt,"gridxPagerStepperBtn","gridxPagerPages","gridxPagerStepperBtnHover");
},_prevPage:function(){
this._focusPageIndex="prev";
var p=this.grid.pagination;
p.gotoPage(p.currentPage()-1);
},_nextPage:function(){
this._focusPageIndex="next";
var p=this.grid.pagination;
p.gotoPage(p.currentPage()+1);
},_gotoPage:function(evt){
var n=this._findNodeByEvent(evt,"gridxPagerStepperBtn","gridxPagerPages");
if(n){
var _16=this._focusPageIndex=n.getAttribute("pageindex");
this.grid.pagination.gotoPage(parseInt(_16,10));
}
},_onKey:function(evt){
var t=this,p=t.grid.pagination,_17=t.grid.isLeftToRight()?_6.LEFT_ARROW:_6.RIGHT_ARROW;
if(evt.keyCode==_6.LEFT_ARROW||evt.keyCode==_6.RIGHT_ARROW){
_3.stop(evt);
t._focusNextBtn(true,evt.keyCode==_17);
}else{
if(evt.keyCode==_6.ENTER&&_9(evt.target,"gridxPagerStepperBtn")&&!_9(evt.target,"gridxPagerStepperBtnActive")&&!_9(evt.target,"gridxPagerStepperBtnDisable")){
_3.stop(evt);
if(isNaN(parseInt(t._focusPageIndex,10))){
t["_"+t._focusPageIndex+"Page"]();
}else{
p.gotoPage(parseInt(t._focusPageIndex,10));
}
}
}
},_focusNextBtn:function(_18,_19){
var t=this,c=t.domNode,n=_2("[pageindex=\""+t._focusPageIndex+"\"]",c)[0];
n=t._focus(_2(".gridxPagerStepperBtn",c),n,_18,_19,function(_1a){
return !_9(_1a,"gridxPagerStepperBtnActive")&&!_9(_1a,"gridxPagerStepperBtnDisable");
});
if(n){
t._focusPageIndex=n.getAttribute("pageindex");
}
return n;
}});
});
