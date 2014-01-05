//>>built
define("gridx/modules/barPlugins/DropDownSizer",["dojo/_base/declare","dojo/_base/lang","dojo/store/Memory","dijit/_WidgetBase","dijit/_FocusMixin","dijit/_TemplatedMixin","dojo/i18n!../../nls/PaginationBar","dijit/form/Select"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _1([_4,_5,_6],{templateString:"<div class=\"gridxDropDownSizer\"><label class=\"gridxPagerLabel\">${pageSizeLabel}</label></div>",constructor:function(_9){
_2.mixin(this,_7);
},postCreate:function(){
this.connect(this.grid.pagination,"onChangePageSize","_onChange");
this.refresh();
},grid:null,sizes:[10,25,50,100,0],sizerClass:_8,sizerProps:null,refresh:function(){
var t=this,_a=[],p=t.grid.pagination,_b=p.pageSize(),_c=t._sizeSwitchSelect,_d=t.sizes;
for(var i=0,_e=_d.length;i<_e;++i){
var _f=_d[i],_10=!(_f>0);
_a.push({label:String(_10?_7.pageSizeAll:_f),value:String(_10?-1:_f),selected:_b==_f||(_10&&p.isAll())});
}
if(!_c){
var cls=t.sizerClass,_11=_2.mixin({options:_a,"class":"gridxPagerSizeSwitchWidget",onChange:function(ps){
p.setPageSize(ps<0?0:ps);
}},t.sizerProps||{});
_c=t._sizeSwitchSelect=new cls(_11);
_c.placeAt(t.domNode,"last");
_c.startup();
}else{
_c.removeOption(_c.getOptions());
_c.addOption(_a);
}
},_onChange:function(_12){
var _13=this._sizeSwitchSelect;
if(this.grid.pagination.isAll()){
_12=-1;
}
if(_13&&_13.get("value")!=_12){
_13.set("value",_12);
}
}});
});
