//>>built
define("gridx/modules/RowLock",["dojo/_base/kernel","dojo/_base/lang","../core/_Module","dojo/_base/declare","dojo/_base/array","dojo/_base/html","dojo/query"],function(_1,_2,_3,_4,_5,_6,_7){
return _4(_3,{name:"rowLock",required:["vLayout"],forced:["hLayout","body"],count:0,getAPIPath:function(){
return {rowLock:this};
},load:function(_8,_9){
_1.experimental("gridx/modules/RowLock");
this.count=this.arg("count");
var _a=this,g=this.grid;
_9.then(function(){
if(_a.grid.vScroller){
_a.connect(g.vScrollerNode,"onscroll",function(){
_a._updatePosition();
});
}
_a.lock(_a.count);
_a.loaded.callback();
});
},lock:function(_b){
this.unlock();
this.count=_b;
this._foreachLockedRows(function(_c){
_c.style.position="absolute";
_6.addClass(_c,"gridxLockedRow");
});
this._adjustBody();
this._updatePosition();
},unlock:function(){
this._foreachLockedRows(function(_d){
_d.style.position="static";
_6.removeClass(_d,"gridxLockedRow");
});
this.grid.bodyNode.style.paddingTop="0px";
this.count=0;
},_adjustBody:function(){
var h=0;
this._foreachLockedRows(function(_e){
h+=_e.offsetHeight;
});
this.grid.bodyNode.style.paddingTop=h+"px";
},_updatePosition:function(){
if(!this.count){
return;
}
var t=this.grid.bodyNode.scrollTop,h=0,_f=this;
this._foreachLockedRows(function(_10){
_10.style.top=t+h+"px";
h+=_10.offsetHeight;
});
},_foreachLockedRows:function(_11){
var _12=this.grid.bodyNode.childNodes;
for(var i=0;i<this.count;i++){
_11(_12[i]);
}
}});
});
