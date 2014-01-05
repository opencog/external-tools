//>>built
define("gridx/core/model/cache/_Cache",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","../_Extension"],function(_1,_2,_3,_4,_5){
var _6=_3.hitch,_7=_3.mixin,_8=_2.indexOf;
function _9(_a){
this._size[""]=parseInt(_a,10);
};
function _b(d,_c,_d){
try{
var t=this,i=0,_e;
for(;_e=_d[i];++i){
t._addRow(t.store.getIdentity(_e),_c+i,t._itemToObject(_e),_e);
}
d.callback();
}
catch(e){
d.errback(e);
}
};
return _1(_5,{constructor:function(_f,_10){
var t=this;
t.setStore(_10.store);
t.columns=_10._columnsById;
t._mixinAPI("byIndex","byId","indexToId","idToIndex","size","treePath","parentId","hasChildren","children","keep","free");
},destroy:function(){
this.inherited(arguments);
this.clear();
},setStore:function(_11){
var t=this,c="aspect",old=_11.fetch;
t.clear();
t.store=_11;
if(!old&&_11.notify){
t[c](_11,"notify",function(_12,id){
if(_12===undefined){
t._onDelete(id);
}else{
if(id===undefined){
t._onNew(_12);
}else{
t._onSet(_12);
}
}
});
}else{
t[c](_11,old?"onSet":"put","_onSet");
t[c](_11,old?"onNew":"add","_onNew");
t[c](_11,old?"onDelete":"remove","_onDelete");
}
},clear:function(){
var t=this;
t._filled=0;
t._priority=[];
t._struct={};
t._cache={};
t._size={};
t._struct[""]=[];
t._size[""]=-1;
},byIndex:function(_13,_14){
this._init("byIndex",arguments);
return this._cache[this.indexToId(_13,_14)];
},byId:function(id){
this._init("byId",arguments);
return this._cache[id];
},indexToId:function(_15,_16){
this._init("indexToId",arguments);
var _17=this._struct[this.model.isId(_16)?_16:""];
return typeof _15=="number"&&_15>=0?_17&&_17[_15+1]:undefined;
},idToIndex:function(id){
this._init("idToIndex",arguments);
var s=this._struct,pid=s[id]&&s[id][0],_18=_8(s[pid]||[],id);
return _18>0?_18-1:-1;
},treePath:function(id){
this._init("treePath",arguments);
var s=this._struct,_19=[];
while(id!==undefined){
_19.unshift(id);
id=s[id]&&s[id][0];
}
if(_19[0]!==""){
_19=[];
}else{
_19.pop();
}
return _19;
},parentId:function(id){
return this.treePath(id).pop();
},hasChildren:function(id){
var t=this,s=t.store,c;
t._init("hasChildren",arguments);
c=t.byId(id);
return s.hasChildren&&s.hasChildren(id,c&&c.item);
},children:function(_1a){
this._init("children",arguments);
_1a=this.model.isId(_1a)?_1a:"";
var _1b=this._size[_1a],_1c=[],i=0;
for(;i<_1b;++i){
_1c.push(this.indexToId(i,_1a));
}
return _1c;
},size:function(_1d){
this._init("size",arguments);
var s=this._size[this.model.isId(_1d)?_1d:""];
return s>=0?s:-1;
},onBeforeFetch:function(){
},onAfterFetch:function(){
},onLoadRow:function(){
},onSetColumns:function(_1e){
var t=this,id,c,_1f,col;
t.columns=_1e;
for(id in t._cache){
c=t._cache[id];
for(_1f in _1e){
col=_1e[_1f];
c.data[_1f]=t._formatCell(col.id,c.rawData);
}
}
},_itemToObject:function(_20){
var s=this.store,obj={};
if(s.fetch){
_2.forEach(s.getAttributes(_20),function(_21){
obj[_21]=s.getValue(_20,_21);
});
return obj;
}
return _20;
},_formatCell:function(_22,_23){
var col=this.columns[_22];
return col.formatter?col.formatter(_23):_23[col.field||_22];
},_formatRow:function(_24){
var _25=this.columns,res={},_26;
for(_26 in _25){
res[_26]=this._formatCell(_26,_24);
}
return res;
},_addRow:function(id,_27,_28,_29,_2a){
var t=this,st=t._struct,pr=t._priority,pid=t.model.isId(_2a)?_2a:"",ids=st[pid],i;
if(!ids){
throw new Error("Fatal error of cache._addRow: parent item "+pid+" of "+id+" is not loaded");
}
if(!ids[_27+1]){
ids[_27+1]=id;
}else{
if(ids[_27+1]!==id){
throw new Error("Fatal error of cache._addRow: different row id "+id+" and "+ids[_27+1]+" for same row index "+_27);
}
}
st[id]=st[id]||[pid];
if(pid===""){
i=_8(pr,id);
if(i>=0){
pr.splice(i,1);
}
pr.push(id);
}
t._cache[id]={data:t._formatRow(_28),rawData:_28,item:_29};
t.onLoadRow(id);
},_loadChildren:function(_2b){
var t=this,d=new _4(),s=t.store,row=t.byId(_2b),_2c=row&&s.getChildren&&s.getChildren(row.item)||[];
_4.when(_2c,function(_2d){
var i=0,_2e,len=t._size[_2b]=_2d.length;
for(;i<len;++i){
_2e=_2d[i];
t._addRow(s.getIdentity(_2e),i,t._itemToObject(_2e),_2e,_2b);
}
d.callback();
},_6(d,d.errback));
return d;
},_storeFetch:function(_2f,_30){
var t=this,s=t.store,d=new _4(),req=_7({},t.options||{},_2f),_31=_6(t,_9),_32=_6(t,_b,d,_2f.start),_33=_6(d,d.errback);
t._filled=1;
t.onBeforeFetch();
if(s.fetch){
s.fetch(_7(req,{onBegin:_31,onComplete:_32,onError:_33}));
}else{
var _34=s.query(req.query||{},req);
_4.when(_34.total,_31);
_4.when(_34,_32,_33);
}
d.then(_6(t,t.onAfterFetch));
return d;
},_onSet:function(_35){
var t=this,id=t.store.getIdentity(_35),_36=t.idToIndex(id),_37=t.treePath(id),old=t._cache[id];
if(_37.length){
t._addRow(id,_36,t._itemToObject(_35),_35,_37.pop());
}
t.onSet(id,_36,t._cache[id],old);
},_onNew:function(_38,_39){
var t=this,s=t.store,row=t._itemToObject(_38),_3a=_39&&_39[s.fetch?"item":"parent"],_3b=_3a?s.getIdentity(_3a):"",_3c=t._size[""];
t.clear();
t.onNew(s.getIdentity(_38),0,{data:t._formatRow(row),rawData:row,item:_38});
if(!_3a&&_3c>=0){
t._size[""]=_3c+1;
t.model._onSizeChange();
}
},_onDelete:function(_3d){
var t=this,s=t.store,st=t._struct,id=s.fetch?s.getIdentity(_3d):_3d,_3e=t.treePath(id);
if(_3e.length){
var _3f,i,j,ids=[id],_40=_3e.pop(),sz=t._size,_41=sz[""],_42=_8(st[_40],id);
st[_40].splice(_42,1);
--sz[_40];
for(i=0;i<ids.length;++i){
_3f=st[ids[i]];
if(_3f){
for(j=_3f.length-1;j>0;--j){
ids.push(_3f[j]);
}
}
}
for(i=ids.length-1;i>=0;--i){
j=ids[i];
delete t._cache[j];
delete st[j];
delete sz[j];
}
i=_8(t._priority,id);
if(i>=0){
t._priority.splice(i,1);
}
t.onDelete(id,_42-1);
if(!_40&&_41>=0){
sz[""]=_41-1;
t.model._onSizeChange();
}
}else{
t.onDelete(id);
}
}});
});
