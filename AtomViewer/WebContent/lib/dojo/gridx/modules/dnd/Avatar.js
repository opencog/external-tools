//>>built
define("gridx/modules/dnd/Avatar",["dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/_base/window","dojo/dnd/Avatar"],function(_1,_2,_3,_4,_5){
return _1(_5,{construct:function(_6){
var t=this;
t.isA11y=_2.contains(_4.body(),"dijit_a11y");
t.node=_3.toDom(["<table border='0' cellspacing='0' class='gridxDndAvatar' ","style='position: absolute; z-index: 1999; margin: 0'>","<tbody><tr style='opacity: 0.9;'>","<td class='gridxDnDIcon'>",t.isA11y?"<span id='a11yIcon'>"+(t.manager.copy?"+":"<")+"</span>":"","</td>","<td class='gridxDnDItemIcon ",t._getIconClass(),"'></td>","<td><span class='gridxDnDItemCount'>",t._generateText(),"</span></td>","</tr></tbody></table>"].join(""));
},_getIconClass:function(){
var _7=this.manager._dndInfo;
return ["gridxDnDIcon",_7.cssName,_7.count===1?"Single":"Multi"].join("");
},_generateText:function(){
return "("+this.manager._dndInfo.count+")";
}});
});
