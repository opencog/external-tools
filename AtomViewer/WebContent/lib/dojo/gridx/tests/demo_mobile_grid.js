//>>built
require(["dojo/store/Memory","gridx/Grid","gridx/core/model/cache/Sync","gridx/modules/SingleSort","gridx/modules/TouchVScroller","gridx/modules/Rotater","dojox/mobile/parser","dojox/mobile/View","dojox/mobile/deviceTheme"],function(_1,_2,_3,_4,_5,_6){
var _7=[{id:"id",field:"id",name:"Identity"},{id:"Year",field:"Year",name:"Year"},{id:"Length",field:"Length",name:"Length"},{id:"Track",field:"Track",name:"Track"}];
var _8=[{id:"id",field:"id",name:"Identity"},{id:"Year",field:"Year",name:"Year"},{id:"Length",field:"Length",name:"Length"},{id:"Track",field:"Track",name:"Track"},{id:"Download Date",field:"Download Date",name:"Download Date"},{id:"Last Played",field:"Last Played",name:"Last Played"},{id:"Heard",field:"Heard",name:"Heard"},{id:"Length",field:"Length",name:"Length"},{id:"Track",field:"Track",name:"Track"},{id:"Download Date",field:"Download Date",name:"Download Date"},{id:"Last Played",field:"Last Played",name:"Last Played"}];
var _9=[];
var _a=[{"Heard":true,"Year":2003,"Length":"03:31","Track":4,"Download Date":"1923/4/9","Last Played":"04:32:49"},{"Heard":false,"Year":1993,"Length":"03:15","Track":4,"Download Date":"1947/12/6","Last Played":"03:47:49"},{"Heard":true,"Year":1992,"Length":"07:00","Track":8,"Download Date":"1906/3/22","Last Played":"21:56:15"},{"Heard":true,"Year":1992,"Length":"20:40","Track":5,"Download Date":"1994/11/29","Last Played":"03:25:19"}];
var _b=50;
for(var i=0,l=_a.length;i<_b;i++){
_9.push(dojo.mixin({id:i+1},_a[i%l]));
}
var _c=new _1({data:_9});
dojo.ready(function(){
var _d=new _2({id:"grid",cacheClass:_3,store:_c,structure:_7,landscapeStructure:_8,modules:[_4,_5,_6]});
_d.placeAt("gridDiv");
_d.startup();
});
});
