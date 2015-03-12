//>>built
define("shapes/_PathMixin",["dojo/_base/declare",],function(_1){
return _1("shapes._PathMixin",[],{adjustBBox_Widget:function(_2){
var _3=_2.x;
var _4=_2.y;
var _5=_3+_2.width;
var _6=_4+_2.height;
for(var i=0;i<this._points.length;i++){
var x=this._points[i].x;
var y=this._points[i].y;
if(x<_3){
_3=x;
}
if(y<_4){
_4=y;
}
if(x>_5){
_5=x;
}
if(y>_6){
_6=y;
}
}
_2.x=_3;
_2.y=_4;
_2.width=_5-_3;
_2.height=_6-_4;
},_arrow:function(id,_7){
var s="<marker id=\""+id+"\"";
s+=" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\""+_7+"\">";
s+="<path d=\"M 0 0 L 10 5 L 0 10 z\"/>";
s+="</marker>";
return s;
},_computePathData:function(_8){
var d="";
for(var i=0;i<_8.length;i++){
d+=(i==0)?"M":"L";
d+=_8[i].x+","+_8[i].y;
}
return d;
},_computeArrowHead:function(_9,_a){
if(!_9||_9.length<2||!_a||!_a.type||!_a.width||!_a.height){
return "";
}
var _b,s;
var _c=(_a.type=="start")?0:_9.length-2;
var x0=_9[_c].x;
var y0=_9[_c].y;
var x1=_9[_c+1].x;
var y1=_9[_c+1].y;
var dx=x1-x0;
var dy=y1-y0;
if(dx==0){
_b=(dy>0)?90:-90;
}else{
_b=Math.atan(dy/dx)*180/Math.PI;
if(dx<0){
_b+=180;
}
}
var _d=_a.width/2;
if(_a.type=="start"){
if(_a.arrowDir==="backward"){
s="<path transform=\"translate("+x0+","+y0+") rotate("+_b+")\" d=\"M"+_a.height+",-"+_d+"L0,0L"+_a.height+","+_d+"z\"";
}else{
s="<path transform=\"translate("+x0+","+y0+") rotate("+_b+")\" d=\"M0,-"+_d+"L"+_a.height+",0L0,"+_d+"z\"";
}
}else{
if(_a.arrowDir==="backward"){
s="<path transform=\"translate("+x1+","+y1+") rotate("+_b+")\" d=\"M0,-"+_d+"L-"+_a.height+",0L0,"+_d+"z\"";
}else{
s="<path transform=\"translate("+x1+","+y1+") rotate("+_b+")\" d=\"M-"+_a.height+",-"+_d+"L0,0L-"+_a.height+","+_d+"z\"";
}
}
if(_a.fill){
s+=" fill=\""+_a.fill+"\"";
}
if(_a.stroke){
s+=" stroke=\""+_a.stroke+"\"";
}
if(_a.strokeWidth){
s+=" stroke-width=\""+_a.strokeWidth+"\"";
}
s+="/>";
return s;
},_checkForwardBackward:function(_e){
return (_e.toLowerCase()==="forward"||_e.toLowerCase()==="backward");
},createGraphics:function(){
var _f=this._computePathData(this._points);
var _10="<path class=\"arrow\" d=\""+_f+"\"/>";
var _11=dojo.style(this.domNode,"fill");
var _12=dojo.style(this.domNode,"stroke");
var _13=dojo.style(this.domNode,"strokeWidth");
var _14=this._checkForwardBackward(this.startarrow)?this._computeArrowHead(this._points,{type:"start",arrowDir:this.startarrow,width:8,height:13,fill:_12,stroke:_12,strokeWidth:_13}):"";
var _15=this._checkForwardBackward(this.endarrow)?this._computeArrowHead(this._points,{type:"end",arrowDir:this.endarrow,width:8,height:13,fill:_12,stroke:_12,strokeWidth:_13}):"";
this.domNode.innerHTML=this._header+_10+_14+_15+this._footer;
this._shape=dojo.query("path.arrow",this.domNode)[0];
this._shape.style.fill=_11;
this._shape.style.stroke=_12;
this._shape.style.strokeWidth=_13;
this._g=dojo.query("g.shapeg",this.domNode)[0];
this._svgroot=dojo.query("svg",this.domNode)[0];
this._svgroot.style.verticalAlign="top";
this._svgroot.style.overflow="visible";
}});
});
