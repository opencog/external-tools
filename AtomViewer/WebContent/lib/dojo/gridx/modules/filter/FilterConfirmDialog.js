//>>built
require({cache:{"url:gridx/templates/FilterConfirmDialog.html":"<div class=\"gridxFilterConfirmDialogMessage\">${clearFilterMsg}</div\n><div class=\"gridxFilterConfirmDialogButtons\"\n\t><input type=\"button\" data-dojo-type=\"dijit.form.Button\" label=\"${clearButton}\"\n\t/><input type=\"button\" data-dojo-type=\"dijit.form.Button\" label=\"${cancelButton}\"\n/></div>\n"}});
define("gridx/modules/filter/FilterConfirmDialog",["dojo/_base/declare","dojo/string","dijit/Dialog","dojo/text!../../templates/FilterConfirmDialog.html","dojo/i18n!../../nls/FilterBar"],function(_1,_2,_3,_4,_5){
return _1(_3,{title:_5.clearFilterDialogTitle,cssClass:"gridxFilterConfirmDialog",autofocus:false,postCreate:function(){
this.inherited(arguments);
this.set("content",_2.substitute(_4,_5));
var _6=dijit.findWidgets(this.domNode);
this.btnClear=_6[0];
this.btnCancel=_6[1];
this.connect(this.btnCancel,"onClick","hide");
this.connect(this.btnClear,"onClick","onExecute");
this.connect(this,"show",function(){
this.btnCancel.focus();
});
},onExecute:function(){
this.execute();
},execute:function(){
}});
});
