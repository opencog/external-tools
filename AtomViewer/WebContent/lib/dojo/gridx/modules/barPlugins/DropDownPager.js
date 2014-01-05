//>>built
define("gridx/modules/barPlugins/DropDownPager",["dojo/_base/declare","dojo/_base/lang","dojo/store/Memory","dijit/_WidgetBase","dijit/_FocusMixin","dijit/_TemplatedMixin","dojo/i18n!../../nls/PaginationBar","dijit/form/FilteringSelect"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _1([_4,_5,_6],{templateString:"<div class=\"gridxDropDownPager\"><label class=\"gridxPagerLabel\">${pageLabel}</label></div>",constructor:function(_9){
_2.mixin(this,_7);
},postCreate:function(){
var t=this,c="connect",p=t.grid.pagination;
t[c](p,"onSwitchPage","_onSwitchPage");
t[c](p,"onChangePageSize","refresh");
t[c](t.grid.model,"onSizeChange","refresh");
t.refresh();
},grid:null,stepperClass:_8,stepperProps:null,refresh:function(){
var t=this,_a=t.module,_b=[],_c,p=t.grid.pagination,_d=p.pageCount(),_e=p.currentPage(),_f=t._pageStepperSelect,i,v,_10;
for(i=0;i<_d;++i){
v=i+1;
_10={id:v,label:v,value:v};
_b.push(_10);
if(_e==i){
_c=_10;
}
}
var _11=new _3({data:_b});
if(!_f){
var cls=t.stepperClass,_12=_2.mixin({store:_11,searchAttr:"label",item:_c,"class":"gridxPagerStepperWidget",onChange:function(_13){
p.gotoPage(_13-1);
}},t.stepperProps||{});
_f=t._pageStepperSelect=new cls(_12);
_f.placeAt(t.domNode,"last");
_f.startup();
}else{
_f.set("store",_11);
_f.set("value",_e+1);
}
_f.set("disabled",_d<=1);
},_onSwitchPage:function(_14){
this._pageStepperSelect.set("value",_14+1);
}});
});
