//>>built
require(["dojo/store/Memory","gridx/Grid","gridx/core/model/cache/Sync","gridx/modules/SingleSort","gridx/modules/ColumnResizer","gridx/modules/select/Row"],function(_1,_2,_3,_4,_5,_6){
var _7=[{id:"id",field:"id",name:"Identity"},{id:"Year",field:"Year",name:"Year"},{id:"Length",field:"Length",name:"Length"},{id:"Track",field:"Track",name:"Track"},{id:"Download Date",field:"Download Date",name:"Download Date"},{id:"Last Played",field:"Last Played",name:"Last Played"},{id:"Heard",field:"Heard",name:"Heard"}];
var _8=[];
var _9=[{"Heard":true,"Year":2003,"Length":"03:31","Track":4,"Download Date":"1923/4/9","Last Played":"04:32:49"},{"Heard":false,"Year":1993,"Length":"03:15","Track":4,"Download Date":"1947/12/6","Last Played":"03:47:49"},{"Heard":true,"Year":1992,"Length":"07:00","Track":8,"Download Date":"1906/3/22","Last Played":"21:56:15"},{"Heard":true,"Year":1992,"Length":"20:40","Track":5,"Download Date":"1994/11/29","Last Played":"03:25:19"}];
var _a=100;
for(var i=0,l=_9.length;i<_a;i++){
_8.push(dojo.mixin({id:i+1},_9[i%l]));
}
var _b=new _1({data:_8});
var _c=new _2({cacheClass:_3,store:_b,structure:_7,modules:[_4,_5,{moduleClass:_6,triggerOnCell:true}]});
_c.placeAt("gridContainer");
_c.startup();
});
