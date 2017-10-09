//>>built
define("shapes/Line",["dojo/_base/declare","shapes/_Shape","shapes/_PathMixin"],function(_1,_2,_3){
return _1("shapes.Line",[_2,_3],{points:"0,0,100,0",startarrow:"none",endarrow:"none",buildRendering:function(){
this.inherited(arguments);
var _4=[0,0,100,0];
var _5=this.points.replace(/,/g," ");
var _6=_5.split(" ");
if(_6.length<4){
console.error("invalid points array - at least 4 values required");
_6=_4;
}
this._points=[];
for(var i=0,j=0;i<(_6.length-1);i+=2,j++){
this._points[j]={x:_6[i]-0,y:_6[i+1]-0};
}
}});
});
