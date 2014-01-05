//>>built
define("gridx/modules/SummaryBar",["dojo/_base/declare","dojo/dom-construct","dojo/string","../core/_Module","dojo/i18n!../nls/SummaryBar"],function(_1,_2,_3,_4,_5){
return _1(_4,{name:"summaryBar",getAPIPath:function(){
return {summaryBar:this};
},preload:function(){
var t=this,m=t.model;
t.domNode=_2.create("div",{"class":"gridxSummaryBar"});
t.grid.vLayout.register(t,"domNode","footerNode",5);
t.connect(m,"onSizeChange","_update");
t.connect(m,"onMarkChange","_update");
t._update();
},destroy:function(){
_2.destroy(this.domNode);
this.inherited(arguments);
},_update:function(){
var t=this,g=t.grid,sr=g.select&&g.select.row,_6=t.model.size(),_7=sr?sr.getSelected().length:0,_8=sr?_5.summaryWithSelection:_5.summary;
t.domNode.innerHTML=_3.substitute(_8,[_6,_7]);
}});
});
