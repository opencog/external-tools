//>>built
define("gridx/core/model/extensions/Mark",["dojo/_base/declare","dojo/_base/array","../_Extension"],function(_1,_2,_3){
return _1(_3,{name:"move",priority:5,constructor:function(_4){
var t=this;
t.mixed="mixed";
t.states={0:false,1:t.mixed,2:true};
t.clear();
t._mixinAPI("getMark","getMarkedIds","markById","markByIndex","clearMark","treeMarkMode");
t.aspect(_4,"_msg","_receiveMsg");
t.aspect(_4._cache,"onLoadRow","_onLoadRow");
t.aspect(_4,"setStore","clear");
_4.onMarkChange=function(){
};
_4._spTypes={};
},clear:function(){
this._byId={};
this._last={};
this._lazy={};
this._tree={};
},clearMark:function(_5){
this._byId[this._initMark(_5)]={};
},getMarkedIds:function(_6,_7){
var t=this,_8=[],id,tp=t._initMark(_6),_9=t._byId[tp];
if(_9){
for(id in _9){
if(_7||_9[id]==2){
_8.push(id);
}
}
}
return _8;
},isMarked:function(id,_a){
_a=this._initMark(_a);
var _b=this._byId[_a][id];
return _b==2;
},isPartialMarked:function(id,_c){
return this._byId[this._initMark(_c)][id]==1;
},getMark:function(id,_d){
var m=this._byId[this._initMark(_d)][id]||0;
return {0:false,1:this.mixed,2:true}[m];
},markById:function(id,_e,_f){
this._cmd(id,_e,_f,1);
},markByIndex:function(_10,_11,_12,_13){
if(_10>=0&&_10<Infinity){
this._cmd(_10,_11,_12,0,_13);
}
},treeMarkMode:function(_14,_15){
_14=this._initMark(_14);
var tm=this._tree;
return _15===undefined?tm[_14]:(tm[_14]=_15);
},_cmdMark:function(){
var t=this,_16=arguments,_17=[],m=t.model._model;
_2.forEach(_16,function(arg){
if(!arg[3]){
_17.push({start:arg[0],count:1});
}
});
return m._call("when",[{id:[],range:_17},function(){
_2.forEach(_16,function(arg){
var id=arg[3]?arg[0]:m._call("indexToId",[arg[0],arg[4]]),_18=arg[1],_19=t._initMark(arg[2]);
if(_18===t.mixed){
_18=1;
}else{
if(_18){
_18=2;
}else{
_18=0;
}
}
t._mark(id,_18,_19);
});
}]);
},_onDelete:function(id){
var t=this,tp,c=t._byId,s=t._last,z=t._lazy;
for(tp in c){
tp=t._initMark(tp);
delete c[tp][id];
delete s[tp][id];
delete z[tp][id];
}
t.onDelete.apply(t,arguments);
},_initMark:function(_1a){
var t=this,c=t._byId,s=t._last,z=t._lazy,tp=_1a||"select";
c[tp]=c[tp]||{};
z[tp]=z[tp]||{};
s[tp]=s[tp]||{};
return tp;
},_cmd:function(){
this.model._addCmd({name:"_cmdMark",scope:this,args:arguments,async:1});
},_receiveMsg:function(msg,_1b){
if(msg=="filter"){
var t=this,tp,id,sp=t.model._spTypes;
for(tp in sp){
if(sp[tp]){
for(id in t._byId[tp]){
if(_2.indexOf(_1b,id)<0){
t._doMark(id,tp,0,0,1);
}
}
}
}
}
},_mark:function(id,_1c,_1d){
var t=this,tp=t._initMark(_1d),_1e=t._byId[tp][id]||0;
if(t.model.isId(id)&&_1e!=_1c){
t._doMark(id,tp,_1c);
}
},_onLoadRow:function(id){
var t=this,m=t.model,mm=m._model,_1f=t._lazy,_20,lz,_21,pid=mm._call("treePath",[id]).pop();
if(m.isId(pid)){
for(_20 in _1f){
lz=_1f[_20];
_21=lz[pid];
if(typeof _21=="number"){
_21=lz[pid]={toMark:_21,count:mm._call("size",[pid])};
}
if(_21){
--_21.count;
if(!_21.count){
delete lz[pid];
}
t._doMark(id,_20,_21.toMark,1);
}
}
}
},_fireEvent:function(id,_22,_23,_24){
var t=this,m=t.model;
if(_23!=_24){
if(!_23){
delete t._byId[_22][id];
}
m.onMarkChange(id,t.states[_23||0],t.states[_24||0],_22);
}
},_doMark:function(id,tp,_25,_26,_27){
var i,ids,_28,_29,pid,_2a,_2b,_2c,_2d,t=this,m=t.model,mm=m._model,_2e=t._byId[tp],_2f=t._last[tp],_30=t._lazy[tp],_31=_2e[id]||0,_32;
if(t._tree[tp]){
_28=mm._call("children",[id]);
if(_25==1&&_2.every(_28,function(_33){
return (_2f[_33]||0)==(_2f[_28[0]]||0);
})){
_25=2;
}
}
_2e[id]=_2f[id]=_25;
if(!_27){
t._fireEvent(id,tp,_25,_31);
}
if(t._tree[tp]){
ids=[id];
while(ids.length){
_29=ids.shift();
_31=_2e[_29]||0;
_32=_2e[_29]=_25==1?_2f[_29]||0:_25;
if(!_27){
t._fireEvent(_29,tp,_32,_31);
}
if(mm._call("hasChildren",[_29])){
_28=mm._call("children",[_29]);
if(_28.length){
ids=ids.concat(_28);
}else{
_30[_29]=_25;
}
}
}
if(!_26){
_2d=mm._call("treePath",[id]);
for(i=_2d.length-1;i>0;--i){
pid=_2d[i];
_31=_2e[pid];
_2a=mm._call("children",[pid]);
_2b=_2.filter(_2a,function(_34){
return _2f[_34]=_2e[_34];
}).length;
_2c=_2.filter(_2a,function(_35){
return _2e[_35]==2;
}).length;
if(_2c==_2a.length&&_31!=2){
_2e[pid]=2;
}else{
if(!_2b&&_31){
delete _2e[pid];
}else{
if(_2b&&_2c<_2a.length&&_31!=1){
_2e[pid]=1;
}
}
}
if(!_27){
t._fireEvent(pid,tp,_2e[pid],_31);
}
}
}
}
}});
});
