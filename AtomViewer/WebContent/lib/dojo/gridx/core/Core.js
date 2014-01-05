//>>built
define("gridx/core/Core",["require","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","dojo/DeferredList","./model/Model","./Row","./Column","./Cell","./_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
var _c=_4.delegate,_d=_4.isFunction,_e=_4.isString,_f=_4.hitch,_10=_3.forEach;
function _11(mod){
var p=mod.moduleClass.prototype;
return (p.forced||[]).concat(p.optional||[]);
};
function _12(_13){
var cs={},c,i,len;
if(_4.isArray(_13)){
for(i=0,len=_13.length;i<len;++i){
c=_13[i];
c.index=i;
c.id=c.id||String(i+1);
cs[c.id]=c;
}
}
return cs;
};
function _14(_15,_16){
if(_16){
for(var _17 in _16){
var bp=_15[_17],ap=_16[_17];
if(bp&&_4.isObject(bp)&&!_d(bp)){
_14(bp,ap);
}else{
_15[_17]=ap;
}
}
}
};
function _18(_19){
var _1a=[],_1b=_19.coreModules.length;
_10(_19.modules,function(m,i){
if(_d(m)||_e(m)){
m={moduleClass:m};
}
if(m){
var mc=m.moduleClass;
if(_e(mc)){
try{
mc=m.moduleClass=_1(mc);
}
catch(e){
console.error(e);
}
}
if(_d(mc)){
_1a.push(m);
return;
}
}
console.error("The "+(i+1-_1b)+"-th declared module can NOT be found, please require it before using it");
});
_19.modules=_1a;
};
function _1c(_1d){
var _1e=_b._modules,_1f=_1d.modules,i,j,k,p,_20,_21,err;
for(i=0;i<_1f.length;++i){
p=_1f[i].moduleClass.prototype;
_20=(p.forced||[]).concat(p.required||[]);
for(j=0;j<_20.length;++j){
_21=_20[j];
for(k=_1f.length-1;k>=0;--k){
if(_1f[k].moduleClass.prototype.name===_21){
break;
}
}
if(k<0){
if(_1e[_21]){
_1f.push({moduleClass:_1e[_21]});
}else{
err=1;
console.error("Forced/Required dependent module '"+_21+"' is NOT found for '"+p.name+"' module.");
}
}
}
}
if(err){
throw new Error("Some forced/required dependent modules are NOT found.");
}
};
function _22(_23){
var i,_24={},_25=[];
_10(_23.modules,function(m){
_24[m.moduleClass.prototype.name]=m;
});
for(i in _24){
_25.push(_24[i]);
}
_23.modules=_25;
};
function _26(_27){
var _28=_27.modules,i,m,_29,q,key,_2a=function(_2b){
for(var j=_28.length-1;j>=0;--j){
if(_28[j].moduleClass.prototype.name==_2b){
return _28[j];
}
}
return null;
};
for(i=_28.length-1;m=_28[i];--i){
_29=m.moduleClass.prototype.name;
q=_11(m);
while(q.length){
key=q.shift();
if(key==_29){
throw new Error("Module '"+key+"' is in a dependancy circle!");
}
m=_2a(key);
if(m){
q=q.concat(_11(m));
}
}
}
};
function _2c(_2d){
var _2e=_2d.modules,i,_2f;
for(i=_2e.length-1;i>=0;--i){
_2f=_2e[i].moduleClass.prototype.modelExtensions;
if(_2f){
[].push.apply(_2d.modelExtensions,_2f);
}
}
};
function arr(_30,_31,_32,_33,_34,pid){
var i=_33||0,end=_34>=0?_33+_34:_31,r=[];
for(;i<end&&i<_31;++i){
r.push(_30[_32](i,0,pid));
}
return r;
};
function _35(_36,_37,_38){
var m,a,_39=_36._modules;
for(m in _39){
m=_39[m].mod;
a=m[_38+"Mixin"];
if(_d(a)){
a=a.apply(m);
}
_4.mixin(_37,a||{});
}
return _37;
};
function _3a(_3b,_3c,key){
var _3d=_3b._modules,m=_3d[key],mod=m.mod,d=mod.loaded;
if(!m.done){
m.done=1;
new _6(_3.map(_3.filter(m.deps,function(_3e){
return _3d[_3e];
}),_f(_3b,_3a,_3b,_3c)),0,1).then(function(){
if(mod.load){
mod.load(m.args,_3c);
}else{
if(d.fired<0){
d.callback();
}
}
});
}
return d;
};
return _2([],{setStore:function(_3f){
if(this.store!=_3f){
this.store=_3f;
this.model.setStore(_3f);
}
},setColumns:function(_40){
var t=this;
t.structure=_40;
t._columns=_4.clone(_40);
t._columnsById=_12(t._columns);
if(t.model){
t.model._cache.onSetColumns(t._columnsById);
}
},row:function(row,_41,_42){
var t=this;
if(typeof row=="number"&&!_41){
row=t.model.indexToId(row,_42);
}
if(t.model.byId(row)){
t._rowObj=t._rowObj||_35(t,new _8(t),"row");
return _c(t._rowObj,{id:row});
}
return null;
},column:function(_43,_44){
var t=this,c,a,obj={};
if(typeof _43=="number"&&!_44){
c=t._columns[_43];
_43=c&&c.id;
}
c=t._columnsById[_43];
if(c){
t._colObj=t._colObj||_35(t,new _9(t),"column");
for(a in c){
if(t._colObj[a]===undefined){
obj[a]=c[a];
}
}
return _c(t._colObj,obj);
}
return null;
},cell:function(row,_45,_46,_47){
var t=this,r=row instanceof _8?row:t.row(row,_46,_47);
if(r){
var c=_45 instanceof _9?_45:t.column(_45,_46);
if(c){
t._cellObj=t._cellObj||_35(t,new _a(t),"cell");
return _c(t._cellObj,{row:r,column:c});
}
}
return null;
},columnCount:function(){
return this._columns.length;
},rowCount:function(_48){
return this.model.size(_48);
},columns:function(_49,_4a){
return arr(this,this._columns.length,"column",_49,_4a);
},rows:function(_4b,_4c,_4d){
return arr(this,this.rowCount(_4d),"row",_4b,_4c,_4d);
},onModulesLoaded:function(){
},_init:function(){
var t=this,d=t._deferStartup=new _5();
t.modules=t.modules||[];
t.modelExtensions=t.modelExtensions||[];
t.setColumns(t.structure);
_18(t);
_1c(t);
_22(t);
_26(t);
_2c(t);
t.model=new _7(t);
t.when=_4.hitch(t.model,t.model.when);
t._create();
t._preload();
t._load(d).then(_f(t,"onModulesLoaded"));
},_uninit:function(){
var t=this,_4e=t._modules,m;
for(m in _4e){
_4e[m].mod.destroy();
}
if(t.model){
t.model.destroy();
}
},_create:function(){
var t=this,_4f=t._modules={};
_10(t.modules,function(mod){
var m,key=mod.moduleClass.prototype.name;
if(!_4f[key]){
_4f[key]={args:mod,mod:m=new mod.moduleClass(t,mod),deps:_11(mod)};
if(m.getAPIPath){
_14(t,m.getAPIPath());
}
}
});
},_preload:function(){
var m,_50=this._modules;
for(m in _50){
m=_50[m];
if(m.mod.preload){
m.mod.preload(m.args);
}
}
},_load:function(_51){
var dl=[],m;
for(m in this._modules){
dl.push(_3a(this,_51,m));
}
return new _6(dl,0,1);
}});
});
