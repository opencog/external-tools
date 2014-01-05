//>>built
define("gridx/core/model/extensions/ClientFilter",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","../_Extension"],function(_1,_2,_3,_4,_5){
var _6=_3.hitch,_7=_2.forEach,_8=_2.indexOf;
return _1(_5,{name:"clientFilter",priority:20,constructor:function(_9,_a){
this.pageSize=_a.pageSize||100;
this._mixinAPI("filter","hasFilter");
_9.onFilterProgress=function(){
};
this.aspect(_9,"_msg","_receiveMsg");
this.aspect(_9,"setStore","clear");
},clear:function(){
this._ids=0;
this._indexes={};
},filter:function(_b){
this.model._addCmd({name:"_cmdFilter",scope:this,args:arguments,async:1});
},hasFilter:function(){
return !!this._ids;
},byIndex:function(_c,_d){
var t=this,_e=t._ids,_f=t.inner,id=_e&&_e[_c];
return !t.model.isId(_d)&&_e?t.model.isId(id)&&_f._call("byId",[id]):_f._call("byIndex",arguments);
},byId:function(id){
return (this.ids&&this._indexes[id]===undefined)?null:this.inner._call("byId",arguments);
},indexToId:function(_10,_11){
return !this.model.isId(_11)&&this._ids?this._ids[_10]:this.inner._call("indexToId",arguments);
},idToIndex:function(id){
if(this._ids&&this.inner._call("parentId",arguments)===""){
var idx=_8(this._ids,id);
return idx>=0?idx:undefined;
}
return this.inner._call("idToIndex",arguments);
},size:function(_12){
return !this.model.isId(_12)&&this._ids?this._ids.length:this.inner._call("size",arguments);
},when:function(_13,_14){
var t=this,f=function(){
if(t._ids){
t._mapWhenArgs(_13);
}
return t.inner._call("when",[_13,_14]);
};
if(t._refilter){
t._refilter=0;
if(t._ids){
var d=new _4();
t._reFilter().then(function(){
f().then(_6(d,d.callback),_6(d,d.errback));
});
return d;
}
}
return f();
},_cmdFilter:function(){
var a=arguments;
return this._filter.apply(this,a[a.length-1]);
},_filter:function(_15){
var t=this,_16=t.size();
t.clear();
if(_3.isFunction(_15)){
var ids=[];
return t.model.scan({start:0,pageSize:t.pageSize,whenScope:t,whenFunc:t.when},function(_17,s){
var i,id,row,end=s+_17.length;
for(i=s;i<end;++i){
id=t.indexToId(i);
row=t.byIndex(i);
if(row){
if(_15(row,id)){
ids.push(id);
t._indexes[id]=i;
}
}else{
break;
}
}
}).then(function(){
if(ids.length==t.size()){
t.clear();
}else{
t._ids=ids;
t.model._msg("filter",ids);
}
},0,t.model.onFilterProgress);
}else{
var d=new _4();
d.callback();
return d;
}
},_mapWhenArgs:function(_18){
var t=this,_19=[],_1a=t._ids.length;
_18.id=_2.filter(_18.id,function(id){
return t._indexes[id]!==undefined;
});
_7(_18.range,function(r){
if(t.model.isId(r.parentId)){
_19.push(r);
}else{
if(!r.count||r.count<0){
var cnt=_1a-r.start;
if(cnt<=0){
return;
}
r.count=cnt;
}
for(var i=0;i<r.count;++i){
var idx=t._mapIndex(i+r.start);
if(idx!==undefined){
_19.push({start:idx,count:1});
}
}
}
});
_18.range=_19;
},_mapMoveArgs:function(_1b){
var t=this;
if(_1b.length==3){
var _1c=[];
for(var i=_1b[0],end=_1b[0]+_1b[1];i<end;++i){
_1c.push(t._mapIndex(i));
}
_1b[0]=_1c;
_1b[1]=t._mapIndex(_1b[2]);
_1b.pop();
}else{
_1b[0]=_2.map(_1b[0],function(_1d){
return t._mapIndex(_1d);
});
_1b[1]=t._mapIndex(_1b[1]);
}
},_mapIndex:function(_1e){
return this._indexes[this._ids[_1e]];
},_moveFiltered:function(_1f,_20,_21){
var t=this,_22=t._ids.length;
if(_1f>=0&&_1f<_22&&_20>0&&_20<Infinity&&_21>=0&&_21<_22&&(_21<_1f||_21>_1f+_20)){
var i,len,_23=[];
for(i=_1f,len=_1f+_20;i<len;++i){
_23.push(t._mapIndex(i));
}
t.inner._call("moveIndexes",[_23,t._mapIndex(_21)]);
}
},_reFilter:function(){
var t=this;
return t.inner._call("when",[{id:t._ids,range:[]},function(){
_7(t._ids,function(id){
var idx=t.inner._call("idToIndex",[id]);
t._indexes[id]=idx;
});
t._ids.sort(function(a,b){
return t._indexes[a]-t._indexes[b];
});
}]);
},_onMoved:function(map){
var t=this;
_7(t._ids,function(id){
var _24=t._indexes[id];
if(map[_24]!==undefined){
t._indexes[id]=map[_24];
}
});
t._ids.sort(function(a,b){
return t._indexes[a]-t._indexes[b];
});
},_receiveMsg:function(msg,_25){
var t=this;
if(t._ids){
if(msg=="storeChange"){
t._refilter=1;
}else{
if(msg=="moved"){
t._onMoved(_25);
}else{
if(msg=="beforeMove"){
t._mapMoveArgs(_25);
}
}
}
}
},_onNew:function(id){
var t=this;
if(t._ids){
t._ids.push(id);
t._refilter=1;
}
t.onNew.apply(t,arguments);
},_onDelete:function(id,_26,row){
var t=this,_27=t._indexes,ids=t._ids;
if(ids){
var i=_8(ids,id),idx=_27[id];
if(i>=0){
ids.splice(i,1);
}
if(i>=0&&idx!==undefined){
_26=i;
for(i in _27){
if(_27[i]>idx){
--_27[i];
}
}
}else{
_26=undefined;
t._refilter=1;
}
}
t.onDelete(id,_26,row);
}});
});
