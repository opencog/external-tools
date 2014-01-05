//>>built
define("gridx/modules/HScroller",["dojo/_base/declare","dojo/dom-style","dojo/_base/sniff","dojo/_base/Deferred","dojo/query","dojo/dom-geometry","dojox/html/metrics","../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _1(_8,{name:"hScroller",getAPIPath:function(){
return {hScroller:this};
},constructor:function(){
var t=this,g=t.grid,n=g.hScrollerNode;
g._initEvents(["H"],["Scroll"]);
t.domNode=n;
t.container=n.parentNode;
t.stubNode=n.firstChild;
},preload:function(){
var t=this,g=t.grid,n=g.hScrollerNode;
if(!g.autoWidth){
g.vLayout.register(t,"container","footerNode",0);
n.style.display="block";
t.batchConnect([g.columnWidth,"onUpdate","refresh"],[n,"onscroll","_onScroll"]);
if(_3("ie")){
n.style.height=(_7.getScrollbar().h+1)+"px";
}
}
},scroll:function(_9){
var dn=this.domNode;
if((_3("webkit")||_3("ie")<8)&&!this.grid.isLeftToRight()){
_9=dn.scrollWidth-dn.offsetWidth-_9;
}
if((_3("ff"))&&!this.grid.isLeftToRight()&&_9>0){
_9=-_9;
}
dn.scrollLeft=_9;
},scrollToColumn:function(_a){
var _b=this.grid.header.innerNode,_c=_5("table",_b)[0],_d=_c.rows[0].cells,_e=0,_f=0,ltr=this.grid.isLeftToRight(),_10=this.domNode.scrollLeft;
if(!ltr&&(_3("webkit")||_3("ie")<8)){
_10=this.domNode.scrollWidth-_10-_b.offsetWidth;
}
_10=Math.abs(_10);
for(var i=0;i<_d.length;i++){
_f+=_d[i].offsetWidth;
if(_d[i].getAttribute("colid")==_a){
break;
}
_e+=_d[i].offsetWidth;
}
if(_e<_10){
this.scroll(_e);
}else{
if(_f>_10+_b.offsetWidth){
this.scroll(_f-_b.offsetWidth);
}
}
},refresh:function(){
var t=this,g=t.grid,ltr=g.isLeftToRight(),_11=ltr?"marginLeft":"marginRight",_12=ltr?"marginRight":"marginLeft",_13=g.hLayout.lead,_14=g.hLayout.tail,w=(g.domNode.clientWidth||_2.get(g.domNode,"width"))-_13-_14,_15=_6.getBorderExtents(g.header.domNode).w,bn=g.header.innerNode,pl=_2.get(bn,ltr?"paddingLeft":"paddingRight")||0,s=t.domNode.style,sw=bn.firstChild.offsetWidth+pl,_16=s.display,_17=(sw<=w)?"none":"block";
s[_11]=_13+pl+"px";
s[_12]=_14+"px";
if(pl>0){
s.width=(w-pl<0?0:w-pl)+"px";
}
t.stubNode.style.width=(sw-pl<0?0:sw-pl)+"px";
s.display=_17;
if(_16!=_17){
g.vLayout.reLayout();
}
},_lastLeft:0,_onScroll:function(e){
var t=this,s=t.domNode.scrollLeft;
if((_3("webkit")||_3("ie")<8)&&!t.grid.isLeftToRight()){
s=t.domNode.scrollWidth-t.domNode.offsetWidth-s;
}
if(t._lastLeft!=s){
t._lastLeft=s;
t._doScroll();
}
},_doScroll:function(_18){
var t=this,g=t.grid;
g.bodyNode.scrollLeft=t.domNode.scrollLeft;
g.onHScroll(t._lastLeft);
}});
});
