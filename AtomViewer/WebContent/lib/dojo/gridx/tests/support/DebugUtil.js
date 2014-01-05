//>>built
define("gridx/tests/support/DebugUtil",["dijit","dojo","dojox"],function(_1,_2,_3){
_2.setObject("DebugUtil",{timer:{_cache:{},_data:[],start:function(id){
if(!id){
this.defaultTimer=(new Date()).getTime();
}else{
this._cache[id]=(new Date()).getTime();
}
},end:function(id,_4,_5,_6){
if(id&&!this._cache[id]){
_4=id;
id=null;
}
var t=this.getTime(id);
var _7=id?this._cache[id]:this.defaultTimer;
if(!_5){
}
if(_6){
_6(t);
}
return t;
},getTime:function(id){
return (new Date()).getTime()-(id?this._cache[id]:this.defaultTimer);
},trackFunction:function(_8,_9,_a){
_8=_8||window;
var _b=_2.filter(this._data,function(d){
return d.obj==_8&&d.funcName==_9;
})[0];
if(!_b){
_b={obj:_8,funcName:_9,count:0,time:0};
this._data.push(_b);
}
var _c=_8[_9];
var _d=this;
_8[_9]=function(){
var _e=(new Date()).getTime()+"";
_d.start(_e);
var re=_c.apply(_8,arguments);
var _f=[];
for(var i=0;i<arguments.length;i++){
_f.push(arguments[i]+"");
}
_b.count++;
_b.time+=_d.getTime(_e);
_d.end(_e,_a||("Function \""+_9+"("+_f.join(",")+")"+"\" execution time"));
return re;
};
},clear:function(){
this._data.length=0;
},report:function(){
_2.forEach(this._data,function(d){
});
}}});
});
