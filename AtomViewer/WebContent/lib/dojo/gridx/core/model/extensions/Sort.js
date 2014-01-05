//>>built
define("gridx/core/model/extensions/Sort",["dojo/_base/declare","dojo/_base/lang","dojo/_base/json","../_Extension"],function(_1,_2,_3,_4){
return _1(_4,{name:"sort",priority:30,constructor:function(_5,_6){
var t=this,bs=_6.baseSort;
t._mixinAPI("sort");
if(bs&&bs.length){
t._baseSort=bs;
t._sort();
}
},sort:function(){
this.model._addCmd({name:"_cmdSort",scope:this,args:arguments});
},_cmdSort:function(){
var a=arguments;
this._sort.apply(this,a[a.length-1]);
},_sort:function(_7){
var t=this,m=t.model,bs=t._baseSort,c=m._cache,op=c.options=c.options||{},i,s,_8;
if(_2.isArrayLike(_7)){
for(i=0;i<_7.length;++i){
s=_7[i];
if(s.colId){
s.attribute=c.columns?(c.columns[s.colId].field||s.colId):s.colId;
}else{
s.colId=s.attribute;
}
}
if(bs){
_7=_7.concat(bs);
}
}else{
_7=bs;
}
if(op.sort&&op.sort.length){
if(_3.toJson(op.sort)!==_3.toJson(_7)){
_8=1;
}
}else{
if(_7&&_7.length){
_8=1;
}
}
op.sort=_2.clone(_7);
if(_8){
c.clear();
}
m._msg("storeChange");
}});
});
