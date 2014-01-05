//>>built
define("gridx/modules/select/_Base",["dojo/_base/declare","dojo/_base/connect","../../core/_Module"],function(_1,_2,_3){
return _1(_3,{getAPIPath:function(){
var _4={select:{}};
_4.select[this._type]=this;
return _4;
},preload:function(){
var t=this,g=t.grid;
t.subscribe("gridClearSelection_"+g.id,function(_5){
if(_5!=t._type){
t.clear();
}
});
t.connect(g.body,"onRender","_onRender");
if(t.arg("multiple")){
g.domNode.setAttribute("aria-multiselectable",true);
}
t._init();
},enabled:true,multiple:true,holdingCtrl:false,onSelected:function(){
},onDeselected:function(){
},onHighlightChange:function(){
},_getMarkType:function(){
},_isSelected:function(){
return this.isSelected.apply(this,arguments);
},_select:function(_6,_7){
var t=this,_8=1;
if(t.arg("enabled")){
if(t.arg("multiple")&&(_7||t.arg("holdingCtrl"))){
_8=!t._isSelected(_6);
}else{
t.clear();
}
_2.publish("gridClearSelection_"+t.grid.id,[t._type]);
t._markById(_6,_8);
}
}});
});
