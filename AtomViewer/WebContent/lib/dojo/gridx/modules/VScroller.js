//>>built
define("gridx/modules/VScroller",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/_base/sniff","dojo/_base/query","dojo/dom-geometry","dojo/keys","dojox/html/metrics","../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
var st="scrollTop";
return _1(_9,{name:"vScroller",forced:["body","vLayout","columnWidth"],optional:["pagination"],getAPIPath:function(){
return {vScroller:this};
},constructor:function(){
var t=this,g=t.grid,dn=t.domNode=g.vScrollerNode;
t.stubNode=dn.firstChild;
if(g.autoHeight){
dn.style.display="none";
if(_4("ie")<8){
dn.style.width="0px";
}
}else{
var w=_8.getScrollbar().w,_a=g.isLeftToRight();
dn.style.width=w+"px";
dn.style[_a?"right":"left"]=-w+"px";
if(_4("ie")<8){
t.stubNode.style.width=w;
}
}
},preload:function(_b){
this.grid.hLayout.register(null,this.domNode,1);
},load:function(_c,_d){
var t=this,g=t.grid,bd=g.body,dn=t.domNode,bn=g.bodyNode;
t.batchConnect([t.domNode,"onscroll","_doScroll"],[bn,"onmousewheel","_onMouseWheel"],[g.mainNode,"onkeypress","_onKeyScroll"],_4("ff")&&[bn,"DOMMouseScroll","_onMouseWheel"]);
t.aspect(g,"_onResizeEnd","_onBodyChange");
t.aspect(bd,"onForcedScroll","_onForcedScroll");
t.aspect(bd,"onRender","_onBodyChange");
if(!g.autoHeight){
t.aspect(bd,"onEmpty",function(){
var ds=dn.style;
ds.display="none";
ds.width="";
if(_4("ie")<8){
ds.width=t.stub.style.width="0px";
}
g.hLayout.reLayout();
g.hScroller.refresh();
});
}
_d.then(function(){
t._updatePos();
_2.when(t._init(_c),function(){
t.domNode.style.width="";
t.loaded.callback();
});
});
},scrollToRow:function(_e,_f){
var d=new _2(),bn=this.grid.bodyNode,dn=this.domNode,dif=0,n=_5("[visualindex=\""+_e+"\"]",bn)[0],_10=function(_11){
setTimeout(function(){
d.callback(_11);
},5);
};
if(n){
var no=n.offsetTop,bs=bn[st];
if(_f){
dn[st]=no;
_10(true);
return d;
}else{
if(no<bs){
dif=no-bs;
}else{
if(no+n.offsetHeight>bs+bn.clientHeight){
dif=no+n.offsetHeight-bs-bn.clientHeight;
}else{
_10(true);
return d;
}
}
}
dn[st]+=dif;
}
_10(!!n);
return d;
},_init:function(){
this._onForcedScroll();
},_update:function(){
var t=this,g=t.grid;
if(!g.autoHeight){
var bd=g.body,bn=g.bodyNode,_12=bd.renderCount<bd.visualCount||bn.scrollHeight>bn.clientHeight,ds=t.domNode.style;
scrollBarWidth=_8.getScrollbar().w+(_4("webkit")?1:0);
if(_4("ie")<8){
var w=_12?scrollBarWidth+"px":"0px";
t.stubNode.style.width=w;
ds.width=w;
}else{
ds.width="";
}
ds.display=_12?"":"none";
t._updatePos();
}
g.hLayout.reLayout();
},_updatePos:function(){
var g=this.grid,dn=this.domNode,ds=dn.style,ltr=g.isLeftToRight(),_13=_6.getBorderExtents(g.mainNode);
ds[ltr?"right":"left"]=-(dn.offsetWidth+(ltr?_13.r:_13.l))+"px";
},_doScroll:function(){
this.grid.bodyNode[st]=this.domNode[st];
},_onMouseWheel:function(e){
if(this.grid.vScrollerNode.style.display!="none"){
var _14=typeof e.wheelDelta==="number"?e.wheelDelta/3:(-40*e.detail);
this.domNode[st]-=_14;
_3.stop(e);
}
},_onBodyChange:function(){
var t=this,g=t.grid;
t._update();
setTimeout(function(){
if(!g.bodyNode){
return;
}
t.stubNode.style.height=g.bodyNode.scrollHeight+"px";
t._doScroll();
g.vScrollerNode[st]=g.vScrollerNode[st]||0;
},0);
},_onForcedScroll:function(){
var t=this,bd=t.grid.body;
return t.model.when({start:bd.rootStart,count:bd.rootCount},function(){
bd.renderRows(0,bd.visualCount);
});
},_onKeyScroll:function(evt){
var t=this,g=t.grid,bd=g.body,bn=g.bodyNode,_15=g.focus,sn=t.domNode,_16;
if(bn.childNodes.length&&(!_15||_15.currentArea()=="body")){
if(evt.keyCode==_7.HOME){
sn[st]=0;
_16=bn.firstChild;
}else{
if(evt.keyCode==_7.END){
sn[st]=sn.scrollHeight-sn.offsetHeight;
_16=bn.lastChild;
}else{
if(evt.keyCode==_7.PAGE_UP){
if(!sn[st]){
_16=bn.firstChild;
}else{
sn[st]-=sn.offsetHeight;
}
}else{
if(evt.keyCode==_7.PAGE_DOWN){
if(sn[st]>=sn.scrollHeight-sn.offsetHeight){
_16=bn.lastChild;
}else{
sn[st]+=sn.offsetHeight;
}
}else{
return;
}
}
}
}
if(_15){
if(_16){
bd._focusCellRow=parseInt(_16.getAttribute("visualindex"),10);
_15.focusArea("body",1);
}else{
setTimeout(function(){
var _17=bn.childNodes,_18=0,end=_17.length-1,_19=_6.position(bn),i,p,_1a=function(idx){
var rn=_17[idx],pos=_6.position(rn);
if(evt.keyCode==_7.PAGE_DOWN){
var _1b=rn.previousSibling;
if((!_1b&&pos.y>=_19.y)||pos.y==_19.y){
return 0;
}else{
if(!_1b){
return -1;
}else{
var _1c=_6.position(_1b);
if(_1c.y<_19.y&&_1c.y+_1c.h>=_19.y){
return 0;
}else{
if(_1c.y>_19.y){
return 1;
}else{
return -1;
}
}
}
}
}else{
var _1d=rn.nextSibling;
if((!_1d&&pos.y+pos.h<=_19.y+_19.h)||pos.y+pos.h==_19.y+_19.h){
return 0;
}else{
if(!_1d){
return 1;
}else{
var _1e=_6.position(_1d);
if(_1e.y<=_19.y+_19.h&&_1e.y+_1e.h>_19.y+_19.h){
return 0;
}else{
if(_1e.y>_19.y+_19.h){
return 1;
}else{
return -1;
}
}
}
}
}
};
while(_18<=end){
i=Math.floor((_18+end)/2);
p=_1a(i);
if(p<0){
_18=i+1;
}else{
if(p>0){
end=i-1;
}else{
_16=_17[i];
break;
}
}
}
if(_16){
bd._focusCellRow=parseInt(_16.getAttribute("visualindex"),10);
_15.focusArea("body",1);
}
},0);
}
}
_3.stop(evt);
}
}});
});
