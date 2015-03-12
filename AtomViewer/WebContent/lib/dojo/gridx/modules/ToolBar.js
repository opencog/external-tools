//>>built
define("gridx/modules/ToolBar",["dojo/_base/kernel","dojo/_base/declare","dijit/Toolbar","../core/_Module"],function(_1,_2,_3,_4){
_1.experimental("gridx/modules/ToolBar");
return _2(_4,{name:"toolBar",getAPIPath:function(){
return {toolBar:this};
},constructor:function(_5,_6){
this.widget=new _3(_6);
this.domNode=this.widget.domNode;
},preload:function(){
var t=this,w=t.widget,_7=t.grid.vLayout;
_7.register(t,"domNode","headerNode",-10);
t.batchConnect([w,"addChild","reLayout",_7],[w,"removeChild","reLayout",_7]);
t._initFocus();
},_initFocus:function(){
var t=this,_8=t.grid.focus;
if(_8){
_8.registerArea({name:t.name,priority:-1,focusNode:t.domNode,scope:t,doFocus:t._doFocus});
}
},_doFocus:function(_9){
var _a=this.widget.getChildren();
if(_a[0]){
_a[0].focus();
}
return _a.length;
},destroy:function(){
this.inherited(arguments);
this.widget.destroyRecursive();
}});
});
