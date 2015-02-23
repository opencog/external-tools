//>>built
define("gridx/modules/Persist",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/json","dojo/_base/unload","dojo/cookie","../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_7,{name:"persist",constructor:function(_8){
var t=this,_9=_8.destroy;
t.arg("key",window.location+"/"+_8.id,function(_a){
return _a;
});
t._persistedList={};
_8.destroy=function(){
t.save();
_9.call(_8);
};
t._restoreColumnState();
_5.addOnWindowUnload(function(){
t.save();
});
},getAPIPath:function(){
return {persist:this};
},enabled:true,options:null,key:"",put:function(_b,_c,_d){
if(_c&&_3.isObject(_c)){
_6(_b,_4.toJson(_c),_d);
}else{
_6(_b,null,{expires:-1});
}
},get:function(_e){
return _4.fromJson(_6(_e));
},registerAndLoad:function(_f,_10,_11){
this._persistedList[_f]={saver:_10,scope:_11,enabled:true};
var get=this.arg("get"),_12=get(this.arg("key"));
return _12?_12[_f]:null;
},features:function(){
var _13=this._persistedList,_14=[],_15;
for(_15 in _13){
if(_13.hasOwnProperty(_15)){
_14.push(_15);
}
}
return _14;
},enable:function(_16){
this._setEnable(_16,1);
},disable:function(_17){
this._setEnable(_17,0);
},isEnabled:function(_18){
var _19=this._persistedList[_18];
if(_19){
return _19.enabled;
}
return _18?false:this.arg("enabled");
},save:function(){
var t=this,_1a=null,put=t.arg("put");
if(t.arg("enabled")){
var _1b,_1c,_1d=t._persistedList;
_1a={};
for(_1b in _1d){
_1c=_1d[_1b];
if(_1c.enabled){
_1a[_1b]=_1c.saver.call(_1c.scope||_3.global);
}
}
}
put(t.arg("key"),_1a,t.arg("options"));
},_setEnable:function(_1e,_1f){
var _20=this._persistedList;
_1f=!!_1f;
if(_20[_1e]){
_20[_1e].enabled=_1f;
}else{
if(!_1e){
for(_1e in _20){
_20[_1e].enabled=_1f;
}
this.enabled=_1f;
}
}
},_restoreColumnState:function(){
var t=this,_21=t.grid,col,_22=[],_23={},_24,_25=t.registerAndLoad("column",t._columnStateSaver,t);
if(_3.isArray(_25)){
_2.forEach(_25,function(c){
_23[c.id]=c;
});
_2.forEach(_21._columns,function(col){
var c=_23[col.id];
if(!c){
_24=true;
}else{
if(c.id==col.id){
col.declaredWidth=col.width=c.width;
}
}
});
if(_24){
_22=_21._columns;
}else{
_2.forEach(_21._columns,function(col){
var c=_23[col.id];
_22[c.index]=col;
});
for(var i=_22.length-1;i>=0;--i){
if(!_22[i]){
_22.splice(i,1);
}
}
}
_21.setColumns(_22);
}
},_columnStateSaver:function(){
return _2.map(this.grid._columns,function(c){
return {id:c.id,index:c.index,width:c.width};
});
}});
});
