//>>built
define("gridx/modules/RowHeader",["dojo/_base/declare","dojo/_base/query","dojo/_base/lang","dojo/_base/sniff","dojo/aspect","dojo/dom-construct","dojo/dom-class","dojo/dom-style","dojo/dom-geometry","dojo/keys","../core/_Module","../core/util"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
return _1(_b,{name:"rowHeader",getAPIPath:function(){
return {rowHeader:this};
},constructor:function(){
this.headerNode=_6.create("div",{"class":"gridxRowHeaderHeader",role:"row",innerHTML:["<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"width: ",this.arg("width"),";\"><tr><th class=\"gridxRowHeaderHeaderCell\" role=\"rowheader\" tabindex=\"-1\"></th></tr></table>"].join("")});
this.bodyNode=_6.create("div",{"class":"gridxRowHeaderBody"});
},destroy:function(){
this.inherited(arguments);
this._b.remove();
_6.destroy(this.headerNode);
_6.destroy(this.bodyNode);
},preload:function(){
var t=this,_d=t.headerNode,_e=t.bodyNode,g=t.grid,_f=g.body,w=t.arg("width");
g._initEvents(["RowHeaderHeader","RowHeaderCell"],g._eventNames);
g.header.domNode.appendChild(_d);
_d.style.width=w;
t.headerCellNode=_2("th",_d)[0];
g._connectEvents(_d,"_onHeaderMouseEvent",t);
g.mainNode.appendChild(_e);
_e.style.width=w;
g.hLayout.register(null,_e);
t.batchConnect([_f,"onRender","_onRendered"],[_f,"onAfterRow","_onAfterRow"],[_f,"onAfterCell","_onAfterCell"],[_f,"onUnrender","_onUnrender"],[g.bodyNode,"onscroll","_onScroll"],[g,"onRowMouseOver","_onRowMouseOver"],[g,"onRowMouseOut","_onRowMouseOver"],[g,"_onResizeEnd","_onResize"],g.columnWidth&&[g.columnWidth,"onUpdate","_onResize"],g.columnResizer&&[g.columnResizer,"onResize","_onResize"],[g,"onRowHeaderCellMouseOver","_onCellMouseOver"],[g,"onRowHeaderCellMouseOut","_onCellMouseOver"]);
t._b=_5.before(_f,"renderRows",_3.hitch(t,t._onRenderRows),true);
g._connectEvents(_e,"_onBodyMouseEvent",t);
t._initFocus();
},load:function(_10,_11){
var t=this,g=t.grid,bn=t.bodyNode;
_11.then(function(){
var w=bn.offsetWidth||_8.get(bn,"width"),ltr=g.isLeftToRight(),_12=_9.getBorderExtents(g.mainNode);
bn.style[ltr?"left":"right"]=-(w+(ltr?_12.l:_12.r))+"px";
t.loaded.callback();
});
},width:"20px",onMoveToRowHeaderCell:function(){
},_onRenderRows:function(_13,_14,_15){
var nd=this.bodyNode;
if(_14>0){
var str=this._buildRows(_13,_14);
if(_15=="top"){
_6.place(str,nd,"first");
}else{
if(_15=="bottom"){
_6.place(str,nd,"last");
}else{
nd.innerHTML=str;
nd.scrollTop=0;
}
}
}else{
if(_15!="top"&&_15!="bottom"){
nd.innerHTML="";
}
}
},_onAfterRow:function(row){
var t=this,_16=row.visualIndex(),n=_2("[visualindex=\""+_16+"\"].gridxRowHeaderRow",t.bodyNode)[0],bn=_2("[visualindex=\""+_16+"\"].gridxRow .gridxRowTable",t.grid.bodyNode)[0],nt=n.firstChild,cp=t.arg("cellProvider");
n.setAttribute("rowid",row.id);
n.setAttribute("rowindex",row.index());
n.setAttribute("parentid",t.model.treePath(row.id).pop()||"");
if(cp){
nt.firstChild.firstChild.firstChild.innerHTML=cp.call(t,row);
}
t._syncRowHeight(nt,bn);
},_onAfterCell:function(_17){
var t=this,_18=_17.row.visualIndex(),n=_2("[visualindex=\""+_18+"\"].gridxRowHeaderRow",t.bodyNode)[0],bn=_2("[visualindex=\""+_18+"\"].gridxRow .gridxRowTable",t.grid.bodyNode)[0];
t._syncRowHeight(n.firstChild,bn);
},_syncRowHeight:function(_19,_1a){
var t=this;
if(t._isCollapse===undefined){
var _1b=_2(".gridxCell",t.grid.header.innerNode)[0];
t._isCollapse=_1b&&_8.get(_1b,"borderCollapse")=="collapse";
}
function _1c(){
return _4("ie")||t._isCollapse?_1a.offsetHeight+"px":_8.getComputedStyle(_1a).height;
};
_19.style.height=_1c();
setTimeout(function(){
_19.style.height=_1c();
},0);
},_onRendered:function(_1d,_1e){
var t=this,hp=t.arg("headerProvider");
if(hp){
t.headerCellNode.innerHTML=hp();
}
t._onScroll();
},_onUnrender:function(id){
var _1f=id&&_2("[rowid=\""+id+"\"].gridxRowHeaderRow",this.bodyNode);
if(_1f&&_1f.length){
_6.destroy(_1f[_1f.length-1]);
}
},_onScroll:function(){
this.bodyNode.scrollTop=this.grid.bodyNode.scrollTop;
},_onResize:function(){
for(var brn=this.grid.bodyNode.firstChild,n=this.bodyNode.firstChild;brn&&n;brn=brn.nextSibling,n=n.nextSibling){
n.firstChild.style.height=brn.firstChild.offsetHeight+"px";
}
var t=this,g=t.grid,bn=t.bodyNode,w=bn.offsetWidth||_8.get(bn,"width"),ltr=g.isLeftToRight(),_20=_9.getBorderExtents(g.mainNode);
bn.style[ltr?"left":"right"]=-(w+(ltr?_20.l:_20.r))+"px";
},_buildRows:function(_21,_22){
var sb=[];
for(var i=0;i<_22;++i){
sb.push("<div class=\"gridxRowHeaderRow\" role=\"row\" visualindex=\"",_21+i,"\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"height: 24px;\"><tr><td class=\"gridxRowHeaderCell\" role=\"rowheader\" tabindex=\"-1\"></td></tr></table></div>");
}
return sb.join("");
},_onHeaderMouseEvent:function(_23,e){
var g=this.grid,_24="onRowHeaderHeader"+_23,_25="onHeader"+_23;
if(g._isConnected(_24)){
g[_24](e);
}
if(g._isConnected(_25)){
g[_25](e);
}
},_onBodyMouseEvent:function(_26,e){
var g=this.grid,_27="onRowHeaderCell"+_26,_28="onRow"+_26,_29=g._isConnected(_27),_2a=g._isConnected(_28);
if(_29||_2a){
this._decorateBodyEvent(e);
if(e.rowIndex>=0){
if(e.isRowHeader&&_29){
g[_27](e);
}
if(_2a){
g[_28](e);
}
}
}
},_decorateBodyEvent:function(e){
var _2b=e.target||e.originalTarget;
while(_2b&&_2b!=this.bodyNode){
if(_7.contains(_2b,"gridxRowHeaderCell")){
e.isRowHeader=true;
e.rowHeaderCellNode=_2b;
}else{
if(_2b.tagName.toLowerCase()==="div"&&_7.contains(_2b,"gridxRowHeaderRow")){
e.rowId=_2b.getAttribute("rowid");
e.parentId=_2b.getAttribute("parentid");
e.rowIndex=parseInt(_2b.getAttribute("rowindex"),10);
e.visualIndex=parseInt(_2b.getAttribute("visualindex"),10);
return;
}
}
_2b=_2b.parentNode;
}
},_onRowMouseOver:function(e){
var _2c=_2("> [rowid=\""+e.rowId+"\"].gridxRowHeaderRow",this.bodyNode)[0];
if(_2c){
_7.toggle(_2c,"gridxRowOver",e.type.toLowerCase()=="mouseover");
}
},_onCellMouseOver:function(e){
var _2d=_2("> [rowid=\""+e.rowId+"\"].gridxRowHeaderRow .gridxRowHeaderCell",this.bodyNode)[0];
if(_2d){
_7.toggle(_2d,"gridxRowHeaderCellOver",e.type.toLowerCase()=="mouseover");
}
},_initFocus:function(){
var t=this,_2e=t.grid.focus;
if(_2e){
_2e.registerArea({name:"rowHeader",priority:0.9,focusNode:t.bodyNode,scope:t,doFocus:t._doFocus,onFocus:t._onFocus,doBlur:t._blur,onBlur:t._blur,connects:[t.connect(t.bodyNode,"onkeydown","_onKeyDown")]});
}
},_doFocus:function(evt){
if(this._focusRow(this.grid.body._focusCellRow)){
this.grid.focus.stopEvent(evt);
return true;
}
},_onFocus:function(evt){
var t=this,_2f=evt.target;
while(_2f!=t.bodyNode){
if(_7.contains(_2f,"gridxRowHeaderRow")){
var r=t.grid.body._focusCellRow=parseInt(_2f.getAttribute("visualindex"),10);
t._focusRow(r);
return true;
}
_2f=_2f.parentNode;
}
},_focusRow:function(_30){
var t=this,_31=_2("[visualindex=\""+_30+"\"] .gridxRowHeaderCell",t.bodyNode)[0];
t._blur();
_31=_31||t.bodyNode.firstChild;
if(_31){
_7.add(_31,"gridxCellFocus");
_31.focus();
}
return _31;
},_blur:function(){
_2(".gridxCellFocus",this.bodyNode).forEach(function(_32){
_7.remove(_32,"gridxCellFocus");
});
return true;
},_onKeyDown:function(evt){
var t=this,g=t.grid;
if(g.focus.currentArea()=="rowHeader"&&evt.keyCode==_a.UP_ARROW||evt.keyCode==_a.DOWN_ARROW){
g.focus.stopEvent(evt);
var _33=evt.keyCode==_a.UP_ARROW?-1:1,_34=g.body,r=_34._focusCellRow+_33;
_34._focusCellRow=r=r<0?0:(r>=_34.visualCount?_34.visualCount-1:r);
g.vScroller.scrollToRow(r).then(function(){
t._focusRow(r);
t.onMoveToRowHeaderCell(r,evt);
});
}
}});
});
