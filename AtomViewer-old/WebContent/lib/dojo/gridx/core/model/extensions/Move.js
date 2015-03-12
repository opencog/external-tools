//>>built
define("gridx/core/model/extensions/Move",["dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/DeferredList","../_Extension"],function(_1,_2,_3,_4,_5){
var _6=_2.hitch;
function _7(_8,_9){
var i,_a,_b=[],_c=[],_d,_e=1,_f=1,_10=_9,_11=_9,pos;
for(i=0,_a=_8.length;i<_a;++i){
_b[_8[i]]=1;
}
for(i=0,_a=_b.length;i<_a;++i){
if(_b[i]){
if(i<_9){
if(_e){
_e=0;
_d=[i,1];
pos=_c.length;
_c.unshift(_d);
}else{
if(_b[i-1]){
++_d[1];
}
}
}else{
if(_f){
_f=0;
_d=[i,1,_11];
_c.push(_d);
++_11;
}else{
if(_b[i-1]){
++_d[1];
++_11;
}
}
}
}else{
_e=_f=1;
}
}
for(i=0;i<=pos;++i){
_d=_c[i];
_d[2]=_10;
_10-=_d[1];
}
return _c;
};
function _12(_13,_14,_15,map){
var _16={},_17,to,i,_18={};
if(_15>_13+_14){
for(i=0;i<_14;++i){
_16[_13+i]=_15+i-_14;
}
for(i=0;i<_15-_13-_14;++i){
_16[_13+_14+i]=_13+i;
}
}else{
if(_15<_13){
for(i=0;i<_14;++i){
_16[_13+i]=_15+i;
}
for(i=0;i<_13-_15;++i){
_16[_15+i]=_15+i+_14;
}
}else{
return;
}
}
for(_17 in map){
_18[map[_17]]=parseInt(_17,10);
}
for(_17 in _16){
to=_16[_17];
if(_18.hasOwnProperty(_17)){
_17=_18[_17];
}
if(_17==to){
delete map[_17];
}else{
map[_17]=to;
}
}
};
return _1(_5,{name:"move",priority:10,constructor:function(_19,_1a){
var t=this,_1b=_19._cache.options=_19._cache.options||{};
t._mixinAPI("move","moveIndexes","insert");
_19.onMoved=function(){
};
if(_1a.updateStore){
t.updateStore=_1a.updateStore;
}
if(_1a.moveSortInfo){
_1b.sort=_1a.moveSortInfo;
}else{
_1b.sort=[{attribute:t.moveField=_1a.moveField||"order",descending:t.moveFieldDescending=_1a.moveFieldDescending||false}];
}
},move:function(_1c,_1d,_1e){
if(_1c>=0&&_1c<Infinity&&_1d>0&&_1d<Infinity&&_1e>=0&&_1e<Infinity&&(_1e<_1c||_1e>_1c+_1d)){
this.model._addCmd({name:"_cmdMove",scope:this,args:[_1c,_1d,_1e],async:1});
}
},moveIndexes:function(_1f,_20){
this.model._addCmd({name:"_cmdMove",scope:this,args:[_1f,_20],async:1});
},insert:function(_21,_22,_23){
var _24=new _3(),_25=_6(_24,_24.callback),_26=_6(_24,_24.errback),_27=this.moveField,_28=this.model.store,i,_29,dl=[],_2a=function(_2b){
return _28.fetch?_28.getValue(_2b,_27):_2b[_27];
},_2c=_22?_2a(_22):null,_2d=_23?_2a(_23):null;
for(i=0;_29=_21[i];++i){
if(_2c===null&&_2d===null){
_2c=Math.random();
}else{
if(_2c===null){
_2c=_2d-1;
}else{
if(_2d===null){
_2c=_2c+1;
}else{
_2c=(_2c+_2d)/2;
}
}
}
_29[_27]=_2c;
if(_28.fetch){
_28.newItem(_29);
}else{
var d=new _3();
_3.when(_28.add(_29),_6(d,d.callback),_6(d,d.errback));
dl.push(d);
}
}
if(_28.fetch){
_28.save({onComplete:_25,onError:_26});
}else{
new _4(dl).then(_25,_26);
}
return _24;
},updateStore:function(_2e,_2f,map){
var _30=[],_31=[],_32=[],_33=[],_34,to,m={},i,dif,cat={},_35,_36=0,t=this,_37=t.inner,_38=t.model.store,_39=t.moveField,dl=[],_3a=function(to){
if(to>0){
return _30[to-1]===undefined?to-1:_30[to-1];
}else{
return -1;
}
},_3b=function(to){
for(;to<_30.length;++to){
var _3c=_30[to];
if(!_31[_3c]){
return _3c===undefined?to:_3c;
}
}
return to;
},_3d=function(_3e){
var row=_37._call("byIndex",[_3e]);
return row&&row.item;
},_3f=function(_40){
return _38.fetch?_38.getValue(_40,_39):_40[_39];
},_41=function(_42,_43){
var _44=_31[_42];
if(_44){
return _44.value;
}else{
if(_42<0){
return _3f(_3d(0))-1;
}else{
if(_42<_43){
return _3f(_3d(_42));
}else{
return _3f(_3d(_43-1))+1;
}
}
}
},_45=function(_46,_47){
if(_38.fetch){
_38.setValue(_46,_39,_47);
}else{
_46=_2.clone(_46);
_46[_39]=_47;
var d=new _3();
_3.when(_38.put(_46,{overwrite:true}),_6(d,d.callback));
dl.push(d);
}
},_48=function(){
if(_38.fetch){
_38.save({onComplete:function(){
_2e.callback();
},onError:function(e){
_2e.errback(e);
}});
}else{
(new _4(dl)).then(function(){
_2e.callback();
},function(e){
_2e.errback(e);
});
}
};
var _49=Infinity;
for(_34 in map){
_34=parseInt(_34,10);
to=map[_34];
m[_34]=to;
if(to<_49){
_49=to;
}
_30[to]=_34;
}
for(i=_49;i<_30.length;++i){
if(_30[i]===undefined){
_30[i]=i;
m[i]=i;
}
}
for(_34 in m){
_34=parseInt(_34,10);
to=m[_34];
dif=to-_34;
if(cat[dif]===undefined){
cat[dif]=1;
}else{
++cat[dif];
}
}
for(dif in cat){
if(cat[dif]>_36){
_36=cat[dif];
_35=dif;
}
}
for(to=0;to<_30.length;++to){
_34=_30[to];
if(_34!==undefined&&to-_34!=_35){
_31[_34]={};
_32.push(_34);
}
}
for(i=0;i<_32.length;++i){
_34=_32[i];
to=m[_34];
var _4a=_31[_34].before=_3a(to),_4b=_31[_34].after=_3b(to);
_33.push({start:_34,count:1},{start:_4b,count:1});
if(_4a>=0){
_33.push({start:_4a,count:1});
}
}
_37._call("when",[{id:[],range:_33},function(){
var _4c=_37._call("size");
for(var i=0;i<_32.length;++i){
_34=_32[i];
var _4d=_3d(_34),_4e=_31[_34],_4f=_41(_4e.before,_4c),_50=_41(_4e.after,_4c),_51=(_4f+_50)/2;
_4e.value=_51;
_45(_4d,_51);
}
_48();
}]);
},_cmdMove:function(){
var d=new _3(),t=this,m=t.model,i,_52,map={},_53,_54=[],_55=t.inner._call("size");
for(i=0;_52=arguments[i];++i){
m._msg("beforeMove",_52);
if(_52.length==2){
_54=_54.concat(_7(_52[0],_52[1]));
}else{
_54.push(_52);
}
}
for(i=0;_52=_54[i];++i){
_12(_52[0],_52[1],_52[2],map);
}
for(i in map){
_53=1;
break;
}
if(_53){
t.updateStore(d,_54,map);
}else{
d.callback();
}
d.then(function(){
m._cache.clear();
m._msg("moved",map);
m.onMoved(_54,map);
});
return d;
}});
});
