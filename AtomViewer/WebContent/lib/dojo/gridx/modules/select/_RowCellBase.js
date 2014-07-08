//>>built
define("gridx/modules/select/_RowCellBase",["dojo/_base/declare","dojo/_base/lang","./_Base","../../core/model/extensions/Mark"],function(_1,_2,_3,_4){
return _1(_3,{modelExtensions:[_4],selectById:function(_5,_6){
var t=this,m=t.model;
if(t.arg("enabled")){
m.markById(_5,1,t._getMarkType(_6));
m.when();
}
},deselectById:function(_7,_8){
var t=this,m=t.model;
if(t.arg("enabled")){
m.markById(_7,0,t._getMarkType(_8));
m.when();
}
},isSelected:function(_9,_a){
return this.model.getMark(_9,this._getMarkType(_a))===true;
},_init:function(){
var t=this,m=t.model;
t.connect(m,"onMarkChange","_onMark");
}});
});
