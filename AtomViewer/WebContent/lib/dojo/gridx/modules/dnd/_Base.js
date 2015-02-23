//>>built
define("gridx/modules/dnd/_Base",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","../../core/_Module","./Avatar","./_Dnd"],function(_1,_2,_3,_4,_5){
return _1(_4,{delay:2,enabled:true,canRearrange:true,copyWhenDragOut:false,avatar:_5,preload:function(_6){
var _7=this.grid.dnd._dnd;
_7.register(this.name,this);
_7.avatar=this.arg("avatar");
},checkArg:function(_8,_9){
var _a=this.arg(_8);
return (_a&&_3.isObject(_a))?_2.some(_9,function(v){
return _a[v];
}):_a;
}});
});
