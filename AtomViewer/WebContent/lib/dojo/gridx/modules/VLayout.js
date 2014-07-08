//>>built
define("gridx/modules/VLayout",["dojo/_base/declare","dojo/DeferredList","../core/_Module"],function(_1,_2,_3){
return _1(_3,{name:"vLayout",getAPIPath:function(){
return {vLayout:this};
},preload:function(){
var t=this,g=t.grid;
t.connect(g,"_onResizeEnd",function(_4,ds){
var d,dl=[];
for(d in ds){
dl.push(ds[d]);
}
new _2(dl).then(function(){
t.reLayout();
});
});
if(g.autoHeight){
t.connect(g.body,"onRender","reLayout");
}else{
t.connect(g,"setColumns",function(){
setTimeout(function(){
t.reLayout();
},0);
});
}
},load:function(_5,_6){
var t=this;
_6.then(function(){
if(t._defs&&t._mods){
new _2(t._defs).then(function(){
t._layout();
t.loaded.callback();
});
}else{
t.loaded.callback();
}
});
},register:function(_7,_8,_9,_a,_b){
var t=this;
t._defs=t._defs||[];
t._mods=t._mods||{};
t._mods[_9]=t._mods[_9]||[];
t._defs.push(_b||_7.loaded);
t._mods[_9].push({p:_a||0,mod:_7,nodeName:_8});
},reLayout:function(){
var t=this,_c=0,_d,n;
for(_d in t._mods){
n=t.grid[_d];
if(n){
_c+=n.offsetHeight;
}
}
t._updateHeight(_c);
},_layout:function(){
var _e=0,t=this,_f=t._mods,_10,n,i,hp,mod,_11;
for(_10 in _f){
n=t.grid[_10];
if(n){
hp=_f[_10];
hp.sort(function(a,b){
return a.p-b.p;
});
for(i=0;i<hp.length;++i){
mod=hp[i].mod;
_11=hp[i].nodeName;
if(mod&&mod[_11]){
n.appendChild(mod[_11]);
}
}
_e+=n.offsetHeight;
}
}
t._updateHeight(_e);
},_updateHeight:function(_12){
var g=this.grid,dn=g.domNode,ms=g.mainNode.style;
if(g.autoHeight){
g.vScroller.loaded.then(function(){
var _13=g.bodyNode.lastChild,_14=_13?_13.offsetTop+_13.offsetHeight:g.emptyNode.offsetHeight;
dn.style.height=(_14+_12)+"px";
ms.height=_14+"px";
});
}else{
if(dn.clientHeight>_12){
ms.height=(dn.clientHeight-_12)+"px";
}
}
}});
});
