//>>built
define("gridx/core/_Module",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Deferred","dojo/_base/connect","dojo/aspect"],function(_1,_2,_3,_4,_5,_6){
var _7=_2.isFunction,c="connect",_8=_1([],{constructor:function(_9,_a){
var t=this;
t.grid=_9;
t.model=_9.model;
t.loaded=new _4;
t._cnnts=[];
t._sbscs=[];
_2.mixin(t,_a);
},destroy:function(){
var f=_3.forEach;
f(this._cnnts,_5.disconnect);
f(this._sbscs,_5.unsubscribe);
},arg:function(_b,_c,_d){
if(arguments.length==2&&_7(_c)){
_d=_c;
_c=undefined;
}
var t=this,g=t.grid,r=t[_b];
if(!t.hasOwnProperty(_b)){
var _e=t.name+_b.substring(0,1).toUpperCase()+_b.substring(1);
if(g[_e]===undefined){
if(_c!==undefined){
r=_c;
}
}else{
r=g[_e];
}
}
t[_b]=(_d&&!_d(r))?_c:r;
return r;
},aspect:function(_f,e,_10,_11,pos){
var _12=_6[pos||"after"](_f,e,_2.hitch(_11||this,_10),1);
this._cnnts.push(_12);
return _12;
},connect:function(obj,e,_13,_14,_15){
var t=this,_16,g=t.grid,s=_14||t;
if(obj===g&&typeof e=="string"){
_16=_5[c](obj,e,function(){
var a=arguments;
if(g._eventFlags[e]===_15){
if(_7(_13)){
_13.apply(s,a);
}else{
if(_7(s[_13])){
s[_13].apply(s,a);
}
}
}
});
}else{
_16=_5[c](obj,e,s,_13);
}
t._cnnts.push(_16);
return _16;
},batchConnect:function(){
for(var i=0,_17=arguments,len=_17.length;i<len;++i){
if(_2.isArrayLike(_17[i])){
this[c].apply(this,_17[i]);
}
}
},subscribe:function(_18,_19,_1a){
var s=_5.subscribe(_18,_1a||this,_19);
this._sbscs.push(s);
return s;
}}),_1b=_8._modules={};
_8.register=function(_1c){
var p=_1c.prototype;
return _1b[p.name||p.declaredClass]=_1c;
};
_8._markupAttrs=["id","name","field","width","dataType","!formatter","!decorator","!sortable"];
return _8;
});
