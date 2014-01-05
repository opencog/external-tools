//>>built
define("gridx/tests/support/XQueryReadStore",["dojo","dojox","dojo/data/util/sorter","dojox/data/QueryReadStore","dojo/io/script","dojo/string"],function(_1,_2){
return _1.declare("gridx.tests.support.XQueryReadStore",[_2.data.QueryReadStore],{fetch:function(_3){
_3=_3||{};
if(!_3.store){
_3.store=this;
}
var _4=this;
var _5=function(_6,_7){
if(_7.onError){
var _8=_7.scope||_1.global;
_7.onError.call(_8,_6,_7);
}
};
var _9=function(_a,_b,_c){
var _d=_b.abort||null;
var _e=false;
var _f=_b.start?_b.start:0;
if(_4.doClientPaging==false){
_f=0;
}
var _10=_b.count?(_f+_b.count):_a.length;
_b.abort=function(){
_e=true;
if(_d){
_d.call(_b);
}
};
var _11=_b.scope||_1.global;
if(!_b.store){
_b.store=_4;
}
if(_b.onBegin){
_b.onBegin.call(_11,_c,_b);
}
if(_b.sort&&_4.doClientSorting){
_a.sort(_1.data.util.sorter.createSortFunction(_b.sort,_4));
}
if(_b.onItem){
for(var i=_f;(i<_a.length)&&(i<_10);++i){
var _12=_a[i];
if(!_e){
_b.onItem.call(_11,_12,_b);
}
}
}
if(_b.onComplete&&!_e){
var _13=null;
if(!_b.onItem){
_13=_a.slice(_f,_10);
}
_b.onComplete.call(_11,_13,_b);
}
};
this._fetchItems(_3,_9,_5);
return _3;
},getFeatures:function(){
return this._features;
},close:function(_14){
},getLabel:function(_15){
if(this._labelAttr&&this.isItem(_15)){
return this.getValue(_15,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(_16){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},_xhrFetchHandler:function(_17,_18,_19,_1a){
_17=this._filterResponse(_17);
if(_17.label){
this._labelAttr=_17.label;
}
var _1b=_17.numRows||-1;
this._items=[];
_1.forEach(_17.items,function(e){
this._items.push({i:e,r:this});
},this);
var _1c=_17.identifier;
this._itemsByIdentity={};
if(_1c){
this._identifier=_1c;
var i;
for(i=0;i<this._items.length;++i){
var _1d=this._items[i].i;
var _1e=_1d[_1c];
if(!this._itemsByIdentity[_1e]){
this._itemsByIdentity[_1e]=_1d;
}else{
throw new Error(this._className+":  The json data as specified by: ["+this.url+"] is malformed.  Items within the list have identifier: ["+_1c+"].  Value collided: ["+_1e+"]");
}
}
}else{
this._identifier=Number;
for(i=0;i<this._items.length;++i){
this._items[i].n=i;
}
}
_1b=this._numRows=(_1b===-1)?this._items.length:_1b;
_19(this._items,_18,_1b);
this._numRows=_1b;
},_fetchItems:function(_1f,_20,_21){
var _22=_1f.serverQuery||_1f.query||{};
if(!this.doClientPaging){
_22.start=_1f.start||0;
if(_1f.count){
_22.count=_1f.count;
}
}
if(!this.doClientSorting&&_1f.sort){
var _23=[];
_1.forEach(_1f.sort,function(_24){
if(_24&&_24.attribute){
_23.push((_24.descending?"-":"")+_24.attribute);
}
});
_22.sort=_23.join(",");
}
var _25=this;
_1.io.script.get({url:this.url,content:_22,timeout:20000,preventCache:true,callbackParamName:"callback",handle:function(_26){
_26.totalSize=1000;
_25._xhrFetchHandler(_26,_1f,_20,_21);
},load:function(_27){
},error:function(e){
_21(e,_1f);
}});
if(this.doClientPaging&&this._lastServerQuery!==null&&_1.toJson(_22)==_1.toJson(this._lastServerQuery)){
this._numRows=(this._numRows===-1)?this._items.length:this._numRows;
_20(this._items,_1f,this._numRows);
}else{
var _28=this.requestMethod.toLowerCase()=="post"?_1.xhrPost:_1.xhrGet;
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=_1.mixin({},_22);
}
},_filterResponse:function(_29){
return _29;
},_assertIsItem:function(_2a){
if(!this.isItem(_2a)){
throw new Error(this._className+": Invalid item argument.");
}
},_assertIsAttribute:function(_2b){
if(typeof _2b!=="string"){
throw new Error(this._className+": Invalid attribute argument ('"+_2b+"').");
}
},fetchItemByIdentity:function(_2c){
if(this._itemsByIdentity){
var _2d=this._itemsByIdentity[_2c.identity];
if(!(_2d===undefined)){
if(_2c.onItem){
var _2e=_2c.scope?_2c.scope:_1.global;
_2c.onItem.call(_2e,{i:_2d,r:this});
}
return;
}
}
var _2f=function(_30,_31){
var _32=_2c.scope?_2c.scope:_1.global;
if(_2c.onError){
_2c.onError.call(_32,_30);
}
};
var _33=function(_34,_35){
var _36=_2c.scope?_2c.scope:_1.global;
try{
var _37=null;
if(_34&&_34.length==1){
_37=_34[0];
}
if(_2c.onItem){
_2c.onItem.call(_36,_37);
}
}
catch(error){
if(_2c.onError){
_2c.onError.call(_36,error);
}
}
};
var _38={serverQuery:{id:_2c.identity}};
this._fetchItems(_38,_33,_2f);
},getIdentity:function(_39){
var _3a=null;
if(this._identifier===Number){
_3a=_39.n;
}else{
_3a=_39.i[this._identifier];
}
return _3a;
},getIdentityAttributes:function(_3b){
return [this._identifier];
}});
});
