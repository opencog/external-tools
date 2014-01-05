//>>built
require({cache:{"url:gridx/templates/PaginationBarDD.html":"<div class='gridxPager'\n\t><table class='gridxPagerInner' cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\"\n\t\t><tr\n\t\t\t><td class=\"gridxPagerDescriptionTD\"\n\t\t\t\t><div class=\"gridxPagerDescription\"\n\t\t\t\t\tdata-dojo-attach-point=\"_descContainer\"\n\t\t\t\t></div\n\t\t\t></td\n\t\t\t><td class=\"gridxPagerStepperTD\"\n\t\t\t\t><div class=\"gridxPagerStepper\"\n\t\t\t\t\tdata-dojo-attach-point=\"_pageStepperContainer\"\n\t\t\t\t\t><label id=\"${id}-pagerStepperLabel\" class='gridxPagerLabel'>${pageLabel}</label\n\t\t\t\t></div\n\t\t\t></td\n\t\t\t><td class=\"gridxPagerSizeSwitchTD\"\n\t\t\t\t><div class=\"gridxPagerSizeSwitch\"\n\t\t\t\t\tdata-dojo-attach-point='_sizeSwitchContainer'\n\t\t\t\t\t><label id=\"${id}-pagerSizeSwitchLabel\" class='gridxPagerLabel'>${pageSizeLabel}</label\n\t\t\t\t></div\n\t\t\t></td\n\t\t></tr\n\t></table\n></div>\n"}});
define("gridx/modules/pagination/DropDownPager",["dojo/_base/declare","dojo/_base/lang","dojo/store/Memory","./_PagerBase","../../core/util","dojo/text!../../templates/PaginationBarDD.html"],function(_1,_2,_3,_4,_5,_6){
return _1(_4,{templateString:_6,refresh:function(){
this._createDescription();
this._createPageStepper();
this._createPageSizeSwitch();
},_onSwitchPage:function(_7){
this._pageStepperSelect.set("value",_7+1);
},_onChangePageSize:function(){
this._createPageStepper();
},_onSizeChange:function(){
this._createDescription();
this._createPageStepper();
},_createPageStepper:function(){
var t=this,_8=t.module;
if(t._toggleNode("gridxPagerStepper",_8._exist(t.position,"stepper"))){
var _9=[],_a,p=t.pagination,_b=p.pageCount(),_c=p.currentPage(),_d=t._pageStepperSelect,i,v,_e;
for(i=0;i<_b;++i){
v=i+1;
_e={id:v,label:v,value:v};
_9.push(_e);
if(_c==i){
_a=_e;
}
}
var _f=new _3({data:_9});
if(!_d){
var _10=t._pageStepperContainer.firstChild,cls=_8.arg("stepperClass"),_11=_2.mixin({store:_f,searchAttr:"label",item:_a,"class":"gridxPagerStepperWidget",onChange:function(_12){
p.gotoPage(_12-1);
}},_8.arg("stepperProps")||{});
_d=t._pageStepperSelect=new cls(_11);
_d.placeAt(t._pageStepperContainer,"last");
_d.startup();
_10.setAttribute("for",_d.focusNode.id);
}else{
_d.set("store",_f);
_d.set("value",_c+1);
}
_d.set("disabled",_b<=1);
}
},_createPageSizeSwitch:function(){
var t=this,mod=t.module;
if(t._toggleNode("gridxPagerSizeSwitch",mod._exist(t.position,"sizeSwitch"))){
var _13=[],p=t.pagination,_14=p.pageSize(),_15=mod.arg("pageSizeAllText",t.pageSizeAll),_16=t._sizeSwitchSelect,_17=mod.arg("sizes");
for(var i=0,len=_17.length;i<len;++i){
var _18=_17[i],_19=!(_18>0);
_13.push({label:_19?_15:_18,value:(_19?-1:_18)+"",selected:_14==_18||(_19&&p.isAll())});
}
if(!_16){
var _1a=t._sizeSwitchContainer.firstChild,cls=mod.arg("sizeSwitchClass"),_1b=_2.mixin({options:_13,"class":"gridxPagerSizeSwitchWidget",onChange:function(ps){
p.setPageSize(ps<0?0:ps);
}},mod.arg("sizeSwitchProps")||{});
_16=t._sizeSwitchSelect=new cls(_1b);
_16.placeAt(t._sizeSwitchContainer,"last");
_16.startup();
_1a.setAttribute("for",_16.focusNode.id);
}else{
_16.removeOption(_16.getOptions());
_16.addOption(_13);
}
}
},_initFocus:function(){
var t=this,g=t.module.grid,_1c=g.focus,pos=t.position,fp=t.focusPriority;
if(_1c){
_1c.registerArea({name:pos+"PageStepper",priority:fp,focusNode:t._pageStepperContainer,doFocus:function(evt){
_1c.stopEvent(evt);
t._pageStepperSelect.focus();
return true;
}});
_1c.registerArea({name:pos+"PageSizeSwitch",priority:fp+0.001,focusNode:t._sizeSwitchContainer,doFocus:function(evt){
_1c.stopEvent(evt);
t._sizeSwitchSelect.focus();
return true;
}});
}
}});
});
