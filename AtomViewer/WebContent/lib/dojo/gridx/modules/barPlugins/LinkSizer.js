//>>built
define("gridx/modules/barPlugins/LinkSizer",["dojo/_base/declare","dojo/_base/query","dojo/_base/event","dojo/string","dojo/dom-class","dojo/keys","./_LinkPageBase"],function(_1,_2,_3,_4,_5,_6,_7){
var _8=_5.contains;
return _1(_7,{templateString:"<div class=\"gridxLinkSizer\" role=\"toolbar\" data-dojo-attach-event=\"onclick: _changePageSize, onmouseover: _onHover, onmouseout: _onHover\"></div>",postMixInProperties:function(){
var t=this;
t.inherited(arguments);
t.connect(t.grid.pagination,"onChangePageSize","_onChange");
},sizeSeparator:"|",sizes:[10,25,50,100,0],refresh:function(){
var t=this,sb=[],_9=t._tabIndex,_a=t.sizeSeparator,_b=t.grid.pagination.pageSize(),_c=_4.substitute;
for(var i=0,_d=t.sizes.length;i<_d;++i){
var _e=t.sizes[i],_f=false;
if(!(_e>0)){
_e=0;
_f=true;
}
sb.push("<span class=\"gridxPagerSizeSwitchBtn ",_b===_e?"gridxPagerSizeSwitchBtnActive":"","\" pagesize=\"",_e,"\" title=\"",_f?t.pageSizeAllTitle:_c(t.pageSizeTitle,[_e]),"\" aria-label=\"",_f?t.pageSizeTitle:_c(t.pageSizeTitle,[_e]),"\" tabindex=\"",_9,"\">",_f?t.pageSizeAll:_c(t.pageSize,[_e]),"</span>","<span class=\"gridxPagerSizeSwitchSeparator\">"+_a+"</span>");
}
sb.pop();
t.domNode.innerHTML=sb.join("");
t.grid.vLayout.reLayout();
},_onHover:function(evt){
this._toggleHover(evt,"gridxPagerSizeSwitchBtn","gridxLinkSizer","gridxPagerSizeSwitchBtnHover");
},_onChange:function(_10,_11){
var dn=this.domNode,n=_2("[pagesize=\""+_10+"\"]",dn)[0];
if(n){
_5.add(n,"gridxPagerSizeSwitchBtnActive");
}
n=_2("[pagesize=\""+_11+"\"]",dn)[0];
if(n){
_5.remove(n,"gridxPagerSizeSwitchBtnActive");
}
},_changePageSize:function(evt){
var n=this._findNodeByEvent(evt,"gridxPagerSizeSwitchBtn","gridxLinkSizer");
if(n){
var _12=this._focusPageSize=n.getAttribute("pagesize");
this.grid.pagination.setPageSize(parseInt(_12,10));
}
},_onKey:function(evt){
var t=this,p=t.grid.pagination,_13=t.grid.isLeftToRight()?_6.LEFT_ARROW:_6.RIGHT_ARROW;
if(evt.keyCode==_6.LEFT_ARROW||evt.keyCode==_6.RIGHT_ARROW){
_3.stop(evt);
t._focusNextBtn(true,evt.keyCode==_13);
}else{
if(evt.keyCode==_6.ENTER&&_8(evt.target,"gridxPagerSizeSwitchBtn")&&!_8(evt.target,"gridxPagerSizeSwitchBtnActive")){
_3.stop(evt);
p.setPageSize(parseInt(t._focusPageSize,10));
}
}
},_focusNextBtn:function(_14,_15){
var t=this,c=t.domNode,n=_2("[pagesize=\""+t._focusPageSize+"\"]",c)[0];
n=t._focus(_2(".gridxPagerSizeSwitchBtn",c),n,_14,_15,function(_16){
return !_8(_16,"gridxPagerSizeSwitchBtnActive");
});
if(n){
t._focusPageSize=n.getAttribute("pagesize");
}
return n;
}});
});
