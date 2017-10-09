//>>built
define("gridx/modules/filter/Filter",["../../core/_Module","../../core/model/extensions/ClientFilter","../../core/model/extensions/Query","dojo/_base/declare","dojo/_base/array","dojo/_base/lang"],function(_1,_2,_3,_4,_5,_6){
var _7=_4(_1,{name:"filter",modelExtensions:[_2,_3],getAPIPath:function(){
return {filter:this};
},constructor:function(){
this.setFilter(this.arg("preCondition"),1);
},serverMode:false,setupFilterQuery:function(_8){
return _8;
},setFilter:function(_9,_a){
if(_9!=this._checker){
this._checker=_9;
this.refresh(_a);
}
},getFilter:function(){
return this._checker;
},refresh:function(_b){
var t=this,g=t.grid,m=t.model,_c=t._checker;
if(t.arg("serverMode")){
m.query(t.setupFilterQuery(_c&&_c.expr));
}else{
m.filter(_c);
}
m.clearCache();
if(!_b){
return g.tree?g.tree.refresh():g.body.refresh();
}
}});
function _d(d,_e,_f){
if(_6.isFunction(_f)){
d=_f(d);
}
switch(_e){
case "number":
return parseFloat(d,10);
case "boolean":
return !!d;
case "date":
d=new Date(d);
d.setHours(0);
d.setMinutes(0);
d.setSeconds(0);
d.setMilliseconds(0);
return d.getTime();
case "time":
d=new Date(d);
d.setDate(1);
d.setMonth(0);
d.setFullYear(2000);
return d.getTime();
default:
return String(d);
}
};
function _10(_11,op,_12,_13){
if(_6.isArray(_12)){
_12=_5.map(_12,function(_14){
return _14.expr;
});
}
return _6.mixin(_11,{expr:_6.mixin({op:op,data:_12},_13||{})});
};
function _15(_16,_17,_18,_19,op){
var _1a=String(_17.apply(0,_16)),_1b=String(_18.apply(0,_16));
if(!_19){
_1a=_1a.toLowerCase();
_1b=_1b.toLowerCase();
}
return op(_1a,_1b);
};
return _6.mixin(_7,{column:function(_1c,_1d,_1e,_1f){
_1d=String(_1d||"string").toLowerCase();
return _10(function(row){
return _d(row[_1f?"rawData":"data"][_1c],_1d,_1e);
},_1d,_1c,{isCol:true});
},value:function(v,_20,_21){
_20=String(_20||typeof v).toLowerCase();
v=_d(v,_20,_21);
return _10(function(){
return v;
},_20,v);
},isEmpty:function(_22,_23){
return _10(function(){
var v=_22.apply(0,arguments);
if(_23){
return _5.indexOf(_23,v)>=0;
}else{
return v===""||v===null||v===undefined;
}
},"isEmpty",[_22]);
},and:function(){
var _24=_5.filter(arguments,function(arg){
return _6.isFunction(arg);
});
return _10(function(){
var _25=arguments;
return _5.every(_24,function(_26){
return _26.apply(0,_25);
});
},"and",_24);
},or:function(){
var _27=_5.filter(arguments,function(arg){
return _6.isFunction(arg);
});
return _10(function(){
var _28=arguments;
return _5.some(_27,function(_29){
return _29.apply(0,_28);
});
},"or",_27);
},not:function(_2a){
return _10(function(){
return !_2a.apply(0,arguments);
},"not",[_2a]);
},equal:function(_2b,_2c){
return _10(function(){
return _2b.apply(0,arguments)===_2c.apply(0,arguments);
},"equal",[_2b,_2c]);
},greater:function(_2d,_2e){
return _10(function(){
return _2d.apply(0,arguments)>_2e.apply(0,arguments);
},"greater",[_2d,_2e]);
},less:function(_2f,_30){
return _10(function(){
return _2f.apply(0,arguments)<_30.apply(0,arguments);
},"less",[_2f,_30]);
},greaterEqual:function(_31,_32){
return _10(function(){
return _31.apply(0,arguments)>=_32.apply(0,arguments);
},"greaterEqual",[_31,_32]);
},lessEqual:function(_33,_34){
return _10(function(){
return _33.apply(0,arguments)<=_34.apply(0,arguments);
},"lessEqual",[_33,_34]);
},match:function(_35,_36){
return _10(function(){
return String(_35.apply(0,arguments)).search(_36)>=0;
},"match",[_35,{expr:{op:"regex",data:_36}}]);
},contain:function(_37,_38,_39){
return _10(function(){
return _15(arguments,_37,_38,_39,function(_3a,_3b){
return _3a.indexOf(_3b)>=0;
});
},"contain",[_37,_38]);
},startWith:function(_3c,_3d,_3e){
return _10(function(){
return _15(arguments,_3c,_3d,_3e,function(_3f,_40){
return _3f.substring(0,_40.length)===_40;
});
},"startWith",[_3c,_3d]);
},endWith:function(_41,_42,_43){
return _10(function(){
return _15(arguments,_41,_42,_43,function(_44,_45){
return _44.substring(_44.length-_45.length)===_45;
});
},"endWith",[_41,_42]);
}});
});
