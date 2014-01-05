//>>built
define("gridx/tests/MockServerStore",["dojo","dojo/data/ItemFileWriteStore"],function(_1){
return _1.declare("gridx.tests.MockServerStore",_1.data.ItemFileWriteStore,{constructor:function(){
var _2=this.fetch;
this.fetch=function(_3){
var t=_3.start*10,_4=this;
setTimeout(function(){
_2.call(_4,_3);
},200);
return _3;
};
}});
});
