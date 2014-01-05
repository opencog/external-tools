//>>built
define("gridx/modules/barPlugins/_LinkPageBase",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/sniff","dojo/dom-class","dijit/_WidgetBase","dijit/_FocusMixin","dijit/_TemplatedMixin","dojo/i18n!../../nls/PaginationBar"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return _1([_6,_8,_7],{constructor:function(_a){
var t=this;
_2.mixin(t,_9);
if(_4("ie")){
var _b=_a.grid.domNode.getAttribute("tabindex");
t._tabIndex=_b>0?_b:0;
}
},postCreate:function(){
this.domNode.setAttribute("tabIndex",this.grid.domNode.getAttribute("tabIndex"));
this.refresh();
this.connect(this,"onFocus","_onFocus");
this.connect(this.domNode,"onkeydown","_onKey");
},grid:null,_tabIndex:-1,_findNodeByEvent:function(_c,_d,_e){
var n=_c.target,_f=_5.contains;
while(!_f(n,_d)){
if(_f(n,_e)){
return null;
}
n=n.parentNode;
}
return n;
},_toggleHover:function(evt,_10,_11,_12){
var n=this._findNodeByEvent(evt,_10,_11);
if(n){
_5.toggle(n,_12,evt.type=="mouseover");
}
},_focus:function(_13,_14,_15,_16,_17){
var dir=_16?-1:1,i=_14?_3.indexOf(_13,_14)+(_15?dir:0):(_16?_13.length-1:0),_18=function(i,dir){
while(_13[i]&&!_17(_13[i])){
i+=dir;
}
return _13[i];
};
_14=_18(i,dir)||_18(i-dir,-dir);
if(_14){
_14.focus();
}
return _14;
},_onFocus:function(){
this._focusNextBtn();
}});
});
