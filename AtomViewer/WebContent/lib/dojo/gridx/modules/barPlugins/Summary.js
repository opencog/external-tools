//>>built
define("gridx/modules/barPlugins/Summary",["dojo/_base/declare","dojo/string","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/i18n!../../nls/SummaryBar"],function(_1,_2,_3,_4,_5){
return _1([_3,_4],{templateString:"<div class=\"gridxSummary\"></div>",grid:null,postCreate:function(){
var t=this,c="connect",m=t.grid.model;
t[c](m,"onSizeChange","refresh");
t[c](m,"onMarkChange","refresh");
t.refresh();
},refresh:function(){
var g=this.grid,sr=g.select&&g.select.row,_6=g.model.size(),_7=sr?sr.getSelected().length:0,_8=sr?_5.summaryWithSelection:_5.summary;
this.domNode.innerHTML=_2.substitute(_8,[_6,_7]);
}});
});
