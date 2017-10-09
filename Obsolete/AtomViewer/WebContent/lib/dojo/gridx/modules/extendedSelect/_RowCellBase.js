//>>built
define("gridx/modules/extendedSelect/_RowCellBase",["dojo/_base/declare","dojo/_base/lang","dojo/_base/query","./_Base","../../core/model/extensions/Mark"],function(_1,_2,_3,_4,_5){
return _1(_4,{modelExtensions:[_5],_getRowId:function(_6){
var _7=_3("[visualindex=\""+_6+"\"]",this.grid.bodyNode)[0];
return _7&&_7.getAttribute("rowid");
},_init:function(){
var t=this,m=t.model;
t.batchConnect([t.grid.body,"onMoveToCell","_onMoveToCell"],[m,"onMarkChange","_onMark"]);
}});
});
