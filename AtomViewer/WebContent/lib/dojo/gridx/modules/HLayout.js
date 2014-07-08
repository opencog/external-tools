//>>built
define("gridx/modules/HLayout",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/array","dojo/dom-style","dojo/DeferredList","../core/_Module"],function(_1,_2,_3,_4,_5,_6){
return _1(_6,{name:"hLayout",getAPIPath:function(){
return {hLayout:this};
},load:function(_7,_8){
var t=this;
t.connect(t.grid,"_onResizeEnd",function(_9,ds){
var d,dl=[];
for(d in ds){
dl.push(ds[d]);
}
new _5(dl).then(function(){
t.reLayout();
});
});
_8.then(function(){
t._layout();
});
},lead:0,tail:0,register:function(_a,_b,_c){
var r=this._regs=this._regs||[];
if(!_a){
_a=new _2();
_a.callback();
}
r.push([_a,_b,_c]);
},reLayout:function(){
var t=this,r=t._regs,_d=0,_e=0;
if(r){
_3.forEach(r,function(_f){
var w=_f[1].offsetWidth||_4.get(_f[1],"width");
if(_f[2]){
_e+=w;
}else{
_d+=w;
}
});
t.lead=_d;
t.tail=_e;
t.onUpdateWidth(_d,_e);
}
},onUpdateWidth:function(){
},_layout:function(){
var t=this,r=t._regs;
if(r){
var _10=0,_11=0,dl=_3.map(r,function(reg){
return reg[0];
});
new _5(dl).then(function(){
_3.forEach(r,function(reg){
var w=reg[1].offsetWidth||_4.get(reg[1],"width");
if(reg[2]){
_11+=w;
}else{
_10+=w;
}
});
t.lead=_10;
t.tail=_11;
t.loaded.callback();
});
}else{
t.loaded.callback();
}
}});
});
