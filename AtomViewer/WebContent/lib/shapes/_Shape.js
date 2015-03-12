//>>built
define("shapes/_Shape",["dojo/_base/declare","dijit/_WidgetBase"],function(_1,_2){
return _1("shapes._Shape",[_2],{buildRendering:function(){
this.inherited(arguments);
this.domNode=this.srcNodeRef;
var _3=dojo.style(this.domNode,"display");
if(_3!="none"&&_3!="block"&&_3!="inline-block"){
this.domNode.style.display="inline-block";
}
this.domNode.style.pointerEvents="none";
this.domNode.style.lineHeight="0px";
this._header="<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" shape-rendering=\"geometric-precision\">";
this._header+="<g class=\"shapeg\" pointer-events=\"all\">";
this._footer="</g></svg>";
this.subscribe("/maqetta/appstates/state/changed",function(){
this.resize();
}.bind(this));
},_uniqueId:function(_4,_5){
var _6=0;
var id;
while(1){
id=_5+"_"+_6;
if(!_4.getElementById(id)){
break;
}else{
_6++;
}
}
return id;
},startup:function(){
var _7=function(_8){
var _9=this.domNode&&this.domNode.ownerDocument&&this.domNode.ownerDocument.styleSheets;
if(!_9){
_9=[];
}
var _a=false;
for(var ss=0;ss<_9.length;ss++){
var _b=_9[ss];
if(_b.href.indexOf("shapes.css")>=0&&_b.cssRules&&_b.cssRules.length>0){
_a=true;
this.resize();
this._bboxStartup=this._bbox;
break;
}
}
if(!_a&&_8<10){
setTimeout(function(_c){
_7(++_c);
}.bind(this,_8),1000);
}
}.bind(this);
var _d=0;
_7(_d);
},resize:function(){
this._resize();
},_resize:function(){
if(!this.domNode){
return;
}
dojo.addClass(this.domNode,"shape");
this.domNode.style.pointerEvents="none";
this.domNode.style.lineHeight="0px";
this.createGraphics();
if(!this._isDisplayed(this._g)){
return;
}
var _e=this._g.getBBox();
if(this.adjustBBox_Widget){
this.adjustBBox_Widget(_e);
}
var _f=this._bbox;
var x=_e.x,y=_e.y,w=_e.width,h=_e.height;
this._bbox=_e;
if(!this._bboxStartup){
this._bboxStartup=this._bbox;
}
var _10=dojo.style(this.domNode,"strokeWidth");
if(_10<1){
_10=1;
}
this._xoffset=this._yoffset=_10;
var _11=_10*2;
x-=this._xoffset;
w+=_11;
y-=this._yoffset;
h+=_11;
this._svgroot.setAttribute("viewBox",x+" "+y+" "+w+" "+h);
this._svgroot.style.width=w+"px";
this._svgroot.style.height=h+"px";
this.domNode.style.width=w+"px";
this.domNode.style.height=h+"px";
var _12=dojo.style(this.domNode,"display");
if(_12!="none"&&_12!="block"&&_12!="inline-block"){
this.domNode.style.display="inline-block";
}
},_isDisplayed:function(_13){
if(!_13||!_13.ownerDocument||!_13.ownerDocument.defaultView){
return false;
}
var win=_13.ownerDocument.defaultView;
var n=_13;
while(n&&n.tagName!="BODY"){
var _14=win.getComputedStyle(n,"");
if(_14.display=="none"){
return false;
}
n=n.parentNode;
}
return true;
}});
});
