//>>built
define("gridx/modules/TitleBar",["dojo/_base/declare","dojo/dom-construct","../core/_Module"],function(_1,_2,_3){
return _1(_3,{name:"titleBar",getAPIPath:function(){
return {titleBar:this};
},constructor:function(){
this.domNode=_2.create("div",{"class":"gridxTitleBar",innerHTML:this.arg("label")});
},preload:function(){
this.grid.vLayout.register(this,"domNode","headerNode",-15);
},destroy:function(){
this.inherited(arguments);
_2.destroy(this.domNode);
},label:"",setLabel:function(_4){
this.domNode.innerHTML=this.label=_4;
}});
});
