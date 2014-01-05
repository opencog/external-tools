//>>built
define("gridx/core/model/Model",["require","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","dojo/DeferredList","dojo/aspect"],function(_1,_2,_3,_4,_5,_6,_7){
var _8=_4.isArrayLike,_9=_4.isString;
function _a(it){
return it||it===0;
};
function _b(it){
return typeof it=="number"&&it>=0;
};
function _c(it){
return it&&_b(it.start);
};
function _d(_e,_f){
var i,rgs=[],ids=[],res={range:rgs,id:ids},f=function(a){
if(_c(a)){
rgs.push(a);
}else{
if(_b(a)){
rgs.push({start:a,count:1});
}else{
if(_8(a)){
for(i=a.length-1;i>=0;--i){
if(_b(a[i])){
rgs.push({start:a[i],count:1});
}else{
if(_c(a[i])){
rgs.push(a[i]);
}else{
if(_9(a)){
ids.push(a[i]);
}
}
}
}
}else{
if(_9(a)){
ids.push(a);
}
}
}
}
};
if(_f&&(_f.index||_f.range||_f.id)){
f(_f.index);
f(_f.range);
if(_8(_f.id)){
for(i=_f.id.length-1;i>=0;--i){
ids.push(_f.id[i]);
}
}else{
if(_a(_f.id)){
ids.push(_f.id);
}
}
}else{
f(_f);
}
if(!rgs.length&&!ids.length&&_e.size()<0){
rgs.push({start:0,count:_e._cache.pageSize||1});
}
return res;
};
return _2([],{constructor:function(_10){
var t=this,_11=_10.cacheClass;
_11=typeof _11=="string"?_1(_11):_11;
t.store=_10.store;
t._exts={};
t._cmdQueue=[];
t._model=t._cache=new _11(t,_10);
t._createExts(_10.modelExtensions||[],_10);
var m=t._model;
t._cnnts=[_7.after(m,"onDelete",_4.hitch(t,"onDelete"),1),_7.after(m,"onNew",_4.hitch(t,"onNew"),1),_7.after(m,"onSet",_4.hitch(t,"onSet"),1)];
},destroy:function(){
_3.forEach(this._cnnts,function(_12){
_12.remove();
});
for(var n in this._exts){
this._exts[n].destroy();
}
},clearCache:function(){
this._cache.clear();
},isId:_a,setStore:function(_13){
this.store=_13;
this._cache.setStore(_13);
},when:function(_14,_15,_16){
this._oldSize=this.size();
this._addCmd({name:"_cmdRequest",scope:this,args:arguments,async:1});
return this._exec();
},scan:function(_17,_18){
var d=new _5,_19=_17.start||0,_1a=_17.pageSize||this._cache.pageSize||1,_1b=_17.count,end=_1b>0?_19+_1b:Infinity,_1c=_17.whenScope||this,_1d=_17.whenFunc||_1c.when;
var f=function(s){
d.progress(s/(_1b>0?s+_1b:_1c.size()));
_1d.call(_1c,{id:[],range:[{start:s,count:_1a}]},function(){
var i,r,_1e=[];
for(i=s;i<s+_1a&&i<end;++i){
r=_1c.byIndex(i);
if(r){
_1e.push(r);
}else{
end=-1;
break;
}
}
if(_18(_1e,s)||i==end){
end=-1;
}
}).then(function(){
if(end==-1){
d.callback();
}else{
f(s+_1a);
}
});
};
f(_19);
return d;
},onDelete:function(){
},onNew:function(){
},onSet:function(){
},onSizeChange:function(){
},_msg:function(){
},_addCmd:function(_1f){
var _20=this._cmdQueue,cmd=_20[_20.length-1];
if(cmd&&cmd.name==_1f.name&&cmd.scope==_1f.scope){
cmd.args.push(_1f.args||[]);
}else{
_1f.args=[_1f.args||[]];
_20.push(_1f);
}
},_onSizeChange:function(){
var t=this,_21=t._oldSize,_22=t._oldSize=t.size();
if(_21!=_22){
t.onSizeChange(_22,_21);
}
},_cmdRequest:function(){
var t=this;
return new _6(_3.map(arguments,function(_23){
var arg=_23[0],_24=function(){
t._onSizeChange();
if(_23[1]){
_23[1].call(_23[2]);
}
};
if(arg===null||!_23.length){
var d=new _5;
_24();
d.callback();
return d;
}
return t._model._call("when",[_d(t,arg),_24]);
}),0,1);
},_exec:function(){
var t=this,c=t._cache,d=new _5,_25=t._cmdQueue,_26=function(d,err){
t._busy=0;
if(c._checkSize){
c._checkSize();
}
if(err){
d.errback(err);
}else{
d.callback();
}
},_27=function(){
if(_3.some(_25,function(cmd){
return cmd.name=="_cmdRequest";
})){
try{
while(_25.length){
var cmd=_25.shift(),dd=cmd.scope[cmd.name].apply(cmd.scope,cmd.args);
if(cmd.async){
_5.when(dd,_27,_4.partial(_26,d));
return;
}
}
}
catch(e){
_26(d,e);
return;
}
}
_26(d);
};
if(t._busy){
return t._busy;
}
t._busy=d;
_27();
return d;
},_createExts:function(_28,_29){
_28=_3.filter(_28,function(ext){
ext=typeof ext=="string"?_1(ext):ext;
return ext&&ext.prototype;
});
_28.sort(function(a,b){
return a.prototype.priority-b.prototype.priority;
});
for(var i=0,len=_28.length;i<len;++i){
if(i==_28.length-1||_28[i]!=_28[i+1]){
var ext=new _28[i](this,_29);
this._exts[ext.name]=ext;
}
}
}});
});
