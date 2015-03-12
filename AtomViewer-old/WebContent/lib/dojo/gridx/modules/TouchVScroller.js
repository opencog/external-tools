//>>built
define("gridx/modules/TouchVScroller",["dojo/_base/kernel","dojo/_base/declare","dojo/dom-style","../core/_Module","./VScroller","dojox/mobile/_ScrollableMixin"],function(_1,_2,_3,_4,_5){
_1.experimental("gridx/modules/TouchVScroller");
return _2(_5,{_init:function(){
var g=this.grid,mn=g.mainNode,bn=g.bodyNode,_6=new dojox.mobile.scrollable(dojo,dojox);
_3.set(this.domNode,"display","none");
_3.set(mn,"overflow","hidden");
_3.set(bn,"height","auto");
_3.set(g.headerNode.firstChild.firstChild,"margin-right","0px");
_6.init({domNode:mn,containerNode:bn,noResize:true});
}});
});
