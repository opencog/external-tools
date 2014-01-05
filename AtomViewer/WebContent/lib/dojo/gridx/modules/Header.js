//>>built
define("gridx/modules/Header",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/dom-class","dojo/dom-geometry","dojo/_base/query","dojo/_base/sniff","dojo/keys","../core/util","../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
return _1(_b,{name:"header",getAPIPath:function(){
return {header:this};
},constructor:function(){
var t=this,dn=t.domNode=_4.create("div",{"class":"gridxHeaderRow",role:"presentation"}),_c=t.innerNode=_4.create("div",{"class":"gridxHeaderRowInner",role:"row"});
t.grid._connectEvents(dn,"_onMouseEvent",t);
},preload:function(_d){
var t=this,g=t.grid;
t.domNode.appendChild(t.innerNode);
t._build();
g.headerNode.appendChild(t.domNode);
g.vLayout.register(t,"domNode","headerNode");
t.aspect(g,"onHScroll","_onHScroll");
t.aspect(g,"onHeaderCellMouseOver","_onHeaderCellMouseOver");
t.aspect(g,"onHeaderCellMouseOut","_onHeaderCellMouseOver");
if(_8("ff")){
t.aspect(g,"onModulesLoaded",function(){
t._onHScroll(t._scrollLeft);
});
}
if(g.columnResizer){
t.aspect(g.columnResizer,"onResize",function(){
if(g.hScrollerNode.style.display=="none"){
t._onHScroll(0);
}
});
}
t._initFocus();
},destroy:function(){
this.inherited(arguments);
_4.destroy(this.domNode);
},columnMixin:{headerNode:function(){
return this.grid.header.getHeaderNode(this.id);
}},hidden:false,getHeaderNode:function(id){
return _7("[colid='"+id+"']",this.domNode)[0];
},refresh:function(){
this._build();
this._onHScroll(this._scrollLeft);
this.onRender();
},onRender:function(){
},onMoveToHeaderCell:function(){
},_scrollLeft:0,_build:function(){
var t=this,g=t.grid,f=g.focus,sb=["<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr>"];
_3.forEach(g._columns,function(_e){
sb.push("<th id=\"",(g.id+"-"+_e.id).replace(/\s+/,""),"\" role=\"columnheader\" aria-readonly=\"true\" tabindex=\"-1\" colid=\"",_e.id,"\" class=\"gridxCell ",f&&f.currentArea()=="header"&&_e.id==t._focusHeaderId?t._focusClass:"",(_2.isFunction(_e.headerClass)?_e.headerClass(_e):_e.headerClass)||"","\" style=\"width: ",_e.width,";",(_2.isFunction(_e.headerStyle)?_e.headerStyle(_e):_e.headerStyle)||"","\"><div class=\"gridxSortNode\">",_e.name||"","</div></th>");
});
sb.push("</tr></table>");
t.innerNode.innerHTML=sb.join("");
_5.toggle(t.domNode,"gridxHeaderRowHidden",t.arg("hidden"));
},_onHScroll:function(_f){
if((_8("webkit")||_8("ie")<8)&&!this.grid.isLeftToRight()){
_f=this.innerNode.scrollWidth-this.innerNode.offsetWidth-_f;
}
this.innerNode.scrollLeft=this._scrollLeft=_f;
},_onMouseEvent:function(_10,e){
var g=this.grid,_11="onHeaderCell"+_10,_12="onHeader"+_10;
if(g._isConnected(_11)||g._isConnected(_12)){
this._decorateEvent(e);
if(e.columnIndex>=0){
g[_11](e);
}
g[_12](e);
}
},_decorateEvent:function(e){
for(var n=e.target,c;n&&n!==this.domNode;n=n.parentNode){
if(n.tagName&&n.tagName.toLowerCase()=="th"){
c=this.grid._columnsById[n.getAttribute("colid")];
if(c){
e.headerCellNode=n;
e.columnId=c.id;
e.columnIndex=c.index;
}
return;
}
}
},_onHeaderCellMouseOver:function(e){
_5.toggle(this.getHeaderNode(e.columnId),"gridxHeaderCellOver",e.type=="mouseover");
},_focusHeaderId:null,_focusClass:"gridxHeaderCellFocus",_initFocus:function(){
var t=this,g=t.grid;
if(g.focus){
g.focus.registerArea({name:"header",priority:0,focusNode:t.innerNode,scope:t,doFocus:t._doFocus,doBlur:t._blurNode,onBlur:t._blurNode,connects:[t.connect(g,"onHeaderCellKeyDown","_onKeyDown"),t.connect(g,"onHeaderCellMouseDown",function(evt){
t._focusNode(t.getHeaderNode(evt.columnId));
})]});
}
},_doFocus:function(evt,_13){
var t=this,n=t._focusHeaderId&&t.getHeaderNode(t._focusHeaderId),r=t._focusNode(n||_7("th.gridxCell",t.domNode)[0]);
t.grid.focus.stopEvent(r&&evt);
return r;
},_focusNode:function(_14){
if(_14){
var t=this,g=t.grid,fid=t._focusHeaderId=_14.getAttribute("colid");
if(fid){
t._blurNode();
if(g.hScroller){
g.hScroller.scrollToColumn(fid);
}
g.body._focusCellCol=g._columnsById[fid].index;
_5.add(_14,t._focusClass);
setTimeout(function(){
if(_8("webkit")){
_5.add(_14,t._focusClass);
}
_14.focus();
if(_8("ie")<8){
t.innerNode.scrollLeft=t._scrollLeft;
}
},0);
return true;
}
}
return false;
},_blurNode:function(){
var t=this,n=_7("th."+t._focusClass,t.innerNode)[0];
if(n){
_5.remove(n,t._focusClass);
}
return true;
},_onKeyDown:function(evt){
var t=this,g=t.grid,col,dir=g.isLeftToRight()?1:-1,_15=evt.keyCode==_9.LEFT_ARROW?-dir:dir;
if(t._focusHeaderId&&!evt.ctrlKey&&!evt.altKey&&(evt.keyCode==_9.LEFT_ARROW||evt.keyCode==_9.RIGHT_ARROW)){
g.focus.stopEvent(evt);
col=g._columnsById[t._focusHeaderId];
col=g._columns[col.index+_15];
if(col){
t._focusNode(t.getHeaderNode(col.id));
t.onMoveToHeaderCell(col.id,evt);
}
}
}});
});
