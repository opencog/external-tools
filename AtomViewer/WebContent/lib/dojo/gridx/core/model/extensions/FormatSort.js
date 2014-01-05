//>>built
define("gridx/core/model/extensions/FormatSort",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/data/util/sorter","../_Extension"],function(_1,_2,_3,_4,_5){
function _6(_7,_8,_9,_a){
return function(_b,_c){
return _8*_9(_a.getValue(_b,_7),_a.getValue(_c,_7));
};
};
function _d(_e,_f,_10,_11,_12,_13){
var _14={};
return function(_15,_16){
var idA=_11.getIdentity(_15),idB=_11.getIdentity(_16);
if(!_14[idA]){
_14[idA]=_13(_12._itemToObject(_15));
}
if(!_14[idB]){
_14[idB]=_13(_12._itemToObject(_16));
}
return _f*_10(_14[idA],_14[idB]);
};
};
return _1(_5,{name:"formatSort",priority:50,constructor:function(_17){
var t=this,c=t.cache=_17._cache;
t.aspect(c,"onBeforeFetch","_onBeforeFetch");
t.aspect(c,"onAfterFetch","_onAfterFetch");
},_onBeforeFetch:function(){
this._oldCreateSortFunction=_4.createSortFunction;
_4.createSortFunction=_3.hitch(this,this._createComparator);
},_onAfterFetch:function(){
if(this._oldCreateSortFunction){
_4.createSortFunction=this._oldCreateSortFunction;
delete this._oldCreateSortFunction;
}
},_createComparator:function(_18,_19){
var _1a=[],c=this.cache,map=_19.comparatorMap,bc=_4.basicComparator;
_2.forEach(_18,function(_1b){
var _1c=_1b.attribute,dir=_1b.descending?-1:1,_1d=bc,col=c.columns&&c.columns[_1b.colId];
if(map){
if(typeof _1c!=="string"&&_1c.toString){
_1c=_1c.toString();
}
_1d=map[_1c]||bc;
}
if(col&&col.comparator){
_1d=col.comparator;
}
var _1e=col&&col.sortFormatted&&col.formatter;
_1a.push(_1e?_d(_1c,dir,_1d,_19,c,_1e):_6(_1c,dir,_1d,_19));
});
return function(_1f,_20){
var i,len,ret=0;
for(i=0,len=_1a.length;!ret&&i<len;++i){
ret=_1a[i](_1f,_20);
}
return ret;
};
}});
});
