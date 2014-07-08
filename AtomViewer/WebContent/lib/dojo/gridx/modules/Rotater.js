//>>built
define("gridx/modules/Rotater",["dojo/_base/kernel","dojo/_base/declare","dojo/dom-geometry","../core/_Module"],function(_1,_2,_3,_4){
_1.experimental("gridx/modules/Rotater");
return _2(_4,{name:"rotater",getAPIPath:function(){
return {rotater:this};
},constructor:function(){
this.connect(this.grid,"resize",this.resize);
},resize:function(_5){
var _6=this.grid;
if(_5){
_3.setMarginBox(_6.domNode,_5);
}else{
_5=_3.getMarginBox(_6.domNode);
}
if(_5.w){
_3.setMarginBox(_6.bodyNode,{w:_5.w});
}
var _7=_5.w&&_5.h&&_5.w>_5.h;
if(_6.landscapeStructure&&this._landscape!=_7){
this._landscape=_7;
var _8=_7?_6.landscapeStructure:_6.structure;
_6.setColumns(_8);
_6.header.refresh();
_6.body.refresh();
}
}});
});
