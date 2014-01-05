//>>built
define("gridx/modules/AutoScroll",["dojo/_base/declare","dojo/_base/window","dojo/dom-geometry","../core/_Module"],function(_1,_2,_3,_4){
return _4.register(_1(_4,{name:"autoScroll",constructor:function(){
this.connect(_2.doc,"mousemove","_onMouseMove");
},getAPIPath:function(){
return {autoScroll:this};
},enabled:false,vertical:true,horizontal:true,margin:20,_timeout:100,_step:10,_maxMargin:100,_onMouseMove:function(e){
var t=this;
if(t.arg("enabled")){
var d1,d2,g=t.grid,m=t.arg("margin"),_5=_3.position(g.bodyNode);
if(t.arg("vertical")&&g.vScroller){
d1=e.clientY-_5.y-m;
d2=d1+2*m-_5.h;
t._vdir=d1<0?d1:(d2>0?d2:0);
}
if(t.arg("horizontal")&&g.hScroller){
d1=e.clientX-_5.x-m;
d2=d1+2*m-_5.w;
t._hdir=d1<0?d1:(d2>0?d2:0);
}
if(!t._handler){
t._scroll();
}
}
},_scroll:function(){
var t=this;
if(t.arg("enabled")){
var _6,a,_7,g=t.grid,m=t._maxMargin,s=t._step,v=t._vdir,h=t._hdir;
if(t.arg("vertical")&&v){
_6=v>0?1:-1;
a=Math.min(m,Math.abs(v))/s;
a=(a<1?1:a)*s*_6;
g.vScroller.domNode.scrollTop+=a;
_7=1;
}
if(t.arg("horizontal")&&h){
_6=h>0?1:-1;
a=Math.min(m,Math.abs(h))/s;
a=(a<1?1:a)*s*_6;
g.hScroller.domNode.scrollLeft+=a;
_7=1;
}
if(_7){
t._handler=setTimeout(function(){
t._scroll();
},t._timeout);
return;
}
}
delete t._handler;
}}));
});
