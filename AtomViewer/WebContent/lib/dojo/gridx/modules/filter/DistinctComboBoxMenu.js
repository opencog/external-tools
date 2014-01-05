//>>built
define("gridx/modules/filter/DistinctComboBoxMenu",["dojo/_base/declare","dijit/form/_ComboBoxMenu"],function(_1,_2){
return _1(_2,{createOptions:function(_3,_4,_5){
var _6={};
arguments[0]=_3.filter(function(_7){
var _8=_5(_7).label;
if(_6[_8]){
return false;
}else{
return _6[_8]=true;
}
});
this.inherited(arguments);
}});
});
