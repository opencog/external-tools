//>>built
define("gridx/modules/pagination/_PagerBase",["dojo/_base/declare","dojo/_base/lang","dojo/_base/query","dojo/string","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/i18n!../../nls/PaginationBar"],function(_1,_2,_3,_4,_5,_6,_7){
return _1([_5,_6],{pagination:null,module:null,position:"bottom",focusPriority:0,constructor:function(){
this._nls=_7;
_2.mixin(this,_7);
},postCreate:function(){
var t=this,c="connect",p=t.pagination,m=t.module.model;
t[c](p,"onSwitchPage","_onSwitchPage");
t[c](p,"onChangePageSize","_onChangePageSize");
t[c](m,"onSizeChange","_onSizeChange");
t[c](m,"onMarkChange","_createDescription");
t._initFocus();
t.refresh();
},_toggleNode:function(_8,_9){
_3("."+_8,this.domNode)[0].style.display=_9?"":"none";
return _9;
},_createDescription:function(){
var t=this,_a=t.module;
if(t._toggleNode("gridxPagerDescription",_a._exist(t.position,"description"))){
var g=_a.grid,_b=g.select&&g.select.row,_c=_b?_b.getSelected().length:0,_d=_b?_a.arg("descriptionSelectionTemplate",_7.summaryWithSelection):_a.arg("descriptionTemplate",_7.summary);
t._descContainer.innerHTML=_4.substitute(_d,[g.model.size(),_c]);
}
}});
});
