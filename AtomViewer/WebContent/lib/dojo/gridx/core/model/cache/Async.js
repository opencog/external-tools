//>>built
define("gridx/core/model/cache/Async",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","dojo/DeferredList","./_Cache"],function(_1,_2,_3,_4,_5,_6){
var _7=_3.hitch;
function _8(_9,_a){
var d=new _4(),i,r,_b,_c,_d=_7(d,d.callback),_e=_7(d,d.errback),_f=_a.range,_10=_9.store.getChildren;
_a.pids=[];
if(_10){
for(i=_f.length-1;i>=0;--i){
r=_f[i];
_c=r.parentId;
if(_9.model.isId(_c)){
_a.id.push(_c);
_a.pids.push(_c);
_f.splice(i,1);
}
}
}
var ids=_11(_9,_a.id),mis=[];
if(ids.length){
_2.forEach(ids,function(id){
var idx=_9.idToIndex(id);
if(idx>=0&&!_9.treePath(id).pop()){
_f.push({start:idx,count:1});
}else{
mis.push(id);
}
});
_38(_9,mis).then(function(ids){
if(ids.length&&_10){
_40(_9,ids).then(function(ids){
if(ids.length){
console.warn("Requested row ids are not found: ",ids);
}
_d(_a);
},_e);
}else{
_d(_a);
}
},_e);
}else{
_d(_a);
}
return d;
};
function _12(_13,_14){
var d=new _4(),_15=_13._size[""];
_14=_16(_13,_17(_13,_18(_13,_19(_14))));
var _1a=_15>0?_2.filter(_14.range,function(r){
if(r.count>0&&_15<r.start+r.count){
r.count=_15-r.start;
}
return r.start<_15;
}):_14.range;
new _5(_2.map(_1a,function(r){
return _13._storeFetch(r);
}),0,1).then(_7(d,d.callback,_14),_7(d,d.errback));
return d;
};
function _1b(_1c,_1d){
var d=new _4();
new _5(_2.map(_1d.pids,function(pid){
return _1c._loadChildren(pid);
}),0,1).then(_7(d,d.callback,_1d),_7(d,d.errback));
return d;
};
function _17(_1e,_1f){
var i,req,_20=_1e._requests,_21=[];
for(i=_20.length-1;i>=0;--i){
req=_20[i];
_1f.range=_22(_1f.range,req.range);
if(_1f.range._overlap){
_21.push(req._def);
}
}
_1f._req=_21.length&&new _5(_21,0,1);
_20.push(_1f);
return _1f;
};
function _22(_23,_24){
if(!_24.length||!_23.length){
return _23;
}
var _25=[],f=0,r,res=[],_26=function(idx,_27){
_25[idx]=_25[idx]||0;
_25[idx]+=_27;
},_28=function(_29,_2a){
var i,r;
for(i=_29.length-1;i>=0;--i){
r=_29[i];
_26(r.start,_2a);
if(r.count){
_26(r.start+r.count,-_2a);
}
}
};
_28(_23,1);
_28(_24,2);
for(var i=0,len=_25.length;i<len;++i){
if(_25[i]){
f+=_25[i];
if(f===1){
res.push({start:i});
}else{
if(f===3){
res._overlap=true;
}
r=res[res.length-1];
if(r&&!r.count){
r.count=i-r.start;
}
}
}
}
return res;
};
function _19(_2b){
var _2c=[],r=_2b.range,i,t,a,b,c,_2d;
while(r.length>0){
c=a=r.pop();
_2d=0;
for(i=r.length-1;i>=0;--i){
b=r[i];
if(a.start<b.start){
t=b;
b=a;
a=t;
}
if(b.count){
if(a.start<=b.start+b.count){
if(a.count&&a.start+a.count>b.start+b.count){
b.count=a.start+a.count-b.start;
}else{
if(!a.count){
b.count=null;
}
}
}else{
a=c;
continue;
}
}
r[i]=b;
_2d=1;
break;
}
if(!_2d){
_2c.push(c);
}
}
_2b.range=_2c;
return _2b;
};
function _16(_2e,_2f){
var r=_2f.range,_30=[],a,b,ps=_2e.pageSize;
r.sort(function(a,b){
return a.start-b.start;
});
while(r.length){
a=r.shift();
if(r.length){
b=r[0];
if(b.count&&b.count+b.start-a.start<=ps){
b.count=b.count+b.start-a.start;
b.start=a.start;
continue;
}else{
if(!b.count&&b.start-a.start<ps){
b.start=a.start;
continue;
}
}
}
_30.push(a);
}
if(_30.length==1&&_30[0].count<ps){
_30[0].count=ps;
}
_2f.range=_30;
return _2f;
};
function _11(_31,ids){
var c=_31._cache;
return _2.filter(ids,function(id){
return !c[id];
});
};
function _18(_32,_33){
var i,j,r,end,_34,_35=[],_36=_32._struct[""],_37=_32._size[""];
for(i=_33.range.length-1;i>=0;--i){
r=_33.range[i];
end=r.count?r.start+r.count:_36.length-1;
_34=1;
for(j=r.start;j<end;++j){
var id=_36[j+1];
if(!id||!_32._cache[id]){
if(_34){
_35.push({start:j,count:1});
}else{
++_35[_35.length-1].count;
}
_34=0;
}else{
_34=1;
}
}
if(!r.count){
if(!_34){
delete _35[_35.length-1].count;
}else{
if(_37<0||j<_37){
_35.push({start:j});
}
}
}
}
_33.range=_35;
return _33;
};
function _38(_39,ids){
var d=new _4(),_3a=_7(d,d.errback),_3b=_39._struct[""],_3c=[],_3d,_3e;
if(ids.length){
for(var i=1,len=_3b.length;i<len;++i){
if(!_3b[i]){
if(_3e){
_3d.count++;
}else{
_3e=1;
_3c.push(_3d={start:i-1,count:1});
}
}
}
_3c.push({start:_3b.length<2?0:_3b.length-2});
}
var _3f=function(ids){
if(ids.length&&_3c.length){
_39._storeFetch(_3c.shift()).then(function(){
_3f(_11(_39,ids));
},_3a);
}else{
d.callback(ids);
}
};
_3f(ids);
return d;
};
function _40(_41,ids){
var d=new _4(),_42=_7(d,d.errback),st=_41._struct,_43=st[""].slice(1),_44=function(ids){
if(ids.length&&_43.length){
var pid=_43.shift();
_41._loadChildren(pid).then(function(){
[].push.apply(_43,st[pid].slice(1));
_44(_11(_41,ids));
},_42);
}else{
d.callback(ids);
}
};
_44(ids);
return d;
};
return _1(_6,{isAsync:true,constructor:function(_45,_46){
var cs=_46.cacheSize,ps=_46.pageSize;
this.cacheSize=cs>=0?cs:-1;
this.pageSize=ps>0?ps:100;
},when:function(_47,_48){
var t=this,d=_47._def=new _4(),_49=_7(d,d.errback),_4a=function(e){
t._requests.pop();
_49(e);
};
_8(t,_47).then(function(_4b){
_12(t,_4b).then(function(_4c){
_1b(t,_4c).then(function(_4d){
_4.when(_4d._req,function(){
var err;
if(_48){
try{
_48();
}
catch(e){
err=e;
}
}
t._requests.shift();
if(err){
d.errback(err);
}else{
d.callback();
}
},_4a);
},_4a);
},_4a);
},_49);
return d;
},keep:function(id){
var t=this,k=t._kept;
if(t._cache[id]&&t._struct[id]&&!k[id]){
k[id]=1;
++t._keptSize;
}
},free:function(id){
var t=this;
if(!t.model.isId(id)){
t._kept={};
t._keptSize=0;
}else{
if(t._kept[id]){
delete t._kept[id];
--t._keptSize;
}
}
},clear:function(){
var t=this;
if(t._requests&&t._requests.length){
t._clearLock=1;
return;
}
t.inherited(arguments);
t._requests=[];
t._priority=[];
t._kept={};
t._keptSize=0;
},_init:function(){
},_checkSize:function(){
var t=this,id,cs=t.cacheSize,p=t._priority;
if(t._clearLock){
t._clearLock=0;
t.clear();
}else{
if(cs>=0){
cs+=t._keptSize;
while(p.length>cs){
id=p.shift();
if(t._kept[id]){
p.push(id);
}else{
delete t._cache[id];
}
}
}
}
}});
});
