//>>built
require(["dojo/_base/array","dojo/ready","dojo/query","dojo/store/Memory","gridx/Grid","gridx/core/model/cache/Sync","gridx/tests/support/modules"],function(_1,_2,_3,_4,_5,_6,_7){
var _8=["Header","Row","HeaderCell","Cell"];
var _9=["Click","DblClick","MouseDown","MouseUp","MouseOver","MouseOut","MouseMove","ContextMenu","KeyDown","KeyPress","KeyUp"];
function _a(){
var _b=_1.map(_9,function(_c){
var _d={id:_c};
_1.forEach(_8,function(_e){
_d[_e]=0;
});
return _d;
});
return new _4({data:_b});
};
store1=_a();
layout1=_1.map(_8,function(_f){
return {id:_f,name:_f,width:"100px;",field:_f};
});
layout1.unshift({id:"id",width:"100px;",field:"id",style:"background-color: #"});
clear=function(){
grid.setStore(_a());
};
_2(function(){
_1.forEach(_8,function(_10){
_1.forEach(_9,function(evt){
var _11="on"+_10+evt;
grid.connect(grid,_11,function(e){
var _12=grid.cell(evt,_10);
_12.setRawData(parseInt(_12.data(),10)+1);
});
});
});
});
});
