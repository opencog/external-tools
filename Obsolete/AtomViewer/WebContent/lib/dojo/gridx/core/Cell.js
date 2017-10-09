//>>built
define("gridx/core/Cell",["dojo/_base/declare"],function(_1){
return _1([],{constructor:function(_2,_3,_4){
var t=this;
t.grid=_2;
t.model=_2.model;
t.row=_3;
t.column=_4;
},data:function(){
return this.model.byId(this.row.id).data[this.column.id];
},rawData:function(){
var t=this,f=t.column.field();
return f&&t.model.byId(t.row.id).rawData[f];
},setRawData:function(_5){
var _6={},_7=this.column.field();
if(_7){
_6[_7]=_5;
return this.row.setRawData(_6);
}
}});
});
