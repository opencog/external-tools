//>>built
define("gridx/core/model/_Extension",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/aspect"],function(_1,_2,_3,_4){
return _1([],{constructor:function(_5){
var t=this,i=t.inner=_5._model;
t._cnnts=[];
t.model=_5;
_5._model=t;
if(i){
t.aspect(i,"onDelete","_onDelete");
t.aspect(i,"onNew","_onNew");
t.aspect(i,"onSet","_onSet");
}
},destroy:function(){
_3.forEach(this._cnnts,function(_6){
_6.remove();
});
},aspect:function(_7,e,_8,_9,_a){
var _b=_4[_a||"after"](_7,e,_2.hitch(_9||this,_8),1);
this._cnnts.push(_b);
return _b;
},_onNew:function(){
this.onNew.apply(this,arguments);
},_onSet:function(){
this.onSet.apply(this,arguments);
},_onDelete:function(){
this.onDelete.apply(this,arguments);
},onNew:function(){
},onDelete:function(){
},onSet:function(){
},_call:function(_c,_d){
var t=this,m=t[_c],n=t.inner;
return m?m.apply(t,_d||[]):n&&n._call(_c,_d);
},_mixinAPI:function(){
var i,m=this.model,_e=arguments,_f=function(_10){
return function(){
return m._model._call(_10,arguments);
};
};
for(i=_e.length-1;i>=0;--i){
m[_e[i]]=_f(_e[i]);
}
}});
});
