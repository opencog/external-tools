//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/modules/ColumnResizer","gridx/modules/VirtualVScroller","gridx/modules/select/Row","gridx/tests/support/XQueryReadStore","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6){
var _7=[{id:"id",field:"id",name:"Identity"},{id:"Year",field:"Year",name:"Year"},{id:"Length",field:"Length",name:"Length"},{id:"Track",field:"Track",name:"Track"},{id:"Download Date",field:"Download Date",name:"Download Date"},{id:"Last Played",field:"Last Played",name:"Last Played"},{id:"Heard",field:"Heard",name:"Heard"}];
var _8=new _1({id:"grid",cacheClass:_2,cacheSize:1000,pageSize:100,vScrollerLazy:true,vScrollerBuffSize:60,store:new _6({idAttribute:"id",url:"http://dojotoolkit.cn/data/?totalSize=1000000"}),structure:_7,bodyLoadFailInfo:"<b>Failed to load data from data service, please try it later.</b>",modules:[_5,_3,_4]});
_8.placeAt("gridContainer");
_8.startup();
});
