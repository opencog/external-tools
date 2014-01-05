//>>built
define("gridx/modules/barPlugins/GotoPageButton",["dojo/_base/declare","dojo/_base/lang","dojo/string","./_LinkPageBase","./GotoPagePane","dojo/i18n!../../nls/PaginationBar","dijit/Dialog","dijit/form/Button","dijit/form/NumberTextBox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return _1(_4,{templateString:"<span class='gridxPagerGotoBtn' tabindex='${_tabIndex}' title='${gotoBtnTitle}' aria-label='${gotoBtnTitle}' data-dojo-attach-event='onclick: _showGotoDialog'><span class='gridxPagerA11yInner'>&#9650;</span></span>",gotoPagePane:_5,dialogClass:_7,buttonClass:_8,numberTextBoxClass:_9,refresh:function(){
},_showGotoDialog:function(){
var t=this;
if(!t._gotoDialog){
var _a=t.dialogClass,_b=t.gotoPagePane,_c=_2.mixin({title:t.gotoDialogTitle,content:new _b({pager:t,pagination:t.grid.pagination})},t.dialogProps||{});
var _d=t._gotoDialog=new _a(_c);
_d.content.dialog=_d;
}
var _e=t.grid.pagination.pageCount(),_f=t._gotoDialog.content;
_f.pageCountMsgNode.innerHTML=_3.substitute(t.gotoDialogPageCount,[_e]);
_f.pageInputBox.constraints={fractional:false,min:1,max:_e};
t._gotoDialog.show();
},_onKey:function(){
},_focusNextBtn:function(){
}});
});
