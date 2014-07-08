//>>built
require(["gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/modules","gridx/Grid","gridx/core/model/cache/Sync","gridx/core/model/cache/Async","dijit/form/ComboButton","dijit/Menu","dijit/MenuItem","dijit/ProgressBar","dijit/form/Button","dijit/form/CheckBox","dijit/form/DropDownButton","dijit/TooltipDialog"],function(_1,_2){
store=_2({dataSource:_1,size:100});
layout1=[{field:"id",name:"Index",width:"50px"},{field:"Progress",name:"Progress",dataType:"number",widgetsInCell:true,decorator:function(){
return ["<div data-dojo-type='dijit.ProgressBar' data-dojo-props='maximum: 1' ","class='gridxHasGridCellValue' style='width: 100%;'></div>"].join("");
}},{field:"Artist",name:"Button",widgetsInCell:true,navigable:true,decorator:function(){
return ["<button data-dojo-type=\"dijit.form.Button\" ","data-dojo-attach-point=\"btn\" ","data-dojo-props=\"onClick: function(){","alert(this.get('label'));","}\"></button>"].join("");
},setCellValue:function(_3){
this.btn.set("label",_3);
}},{field:"Album",name:"Read-only CheckBox",widgetsInCell:true,decorator:function(){
return ["<span data-dojo-type=\"dijit.form.CheckBox\" ","data-dojo-attach-point=\"cb\" ","data-dojo-props=\"readOnly: true\"","></span>","<label data-dojo-attach-point=\"lbl\"></label>"].join("");
},setCellValue:function(_4){
this.lbl.innerHTML=_4;
this.cb.set("value",_4.length%2);
}},{field:"Genre",name:"ComboButton",widgetsInCell:true,navigable:true,decorator:function(){
return ["<div data-dojo-type=\"dijit.form.ComboButton\" ","data-dojo-attach-point=\"btn\" ","data-dojo-props=\"","optionsTitle:'Save Options',","iconClass:'dijitIconFile',","onClick:function(){ console.log('Clicked ComboButton'); }","\">","<div data-dojo-type=\"dijit.Menu\">","<div data-dojo-type=\"dijit.MenuItem\"","data-dojo-props=\"","iconClass:'dijitEditorIcon dijitEditorIconSave',","onClick:function(){ console.log('Save'); }\">","Save","</div>","<div data-dojo-type=\"dijit.MenuItem\"","data-dojo-props=\"onClick:function(){ console.log('Save As'); }\">","Save As","</div></div></div>"].join("");
},setCellValue:function(_5){
this.btn.set("label",_5);
}},{field:"Name",name:"DropDown Button",widgetsInCell:true,navigable:true,decorator:function(){
return ["<div data-dojo-type=\"dijit.form.DropDownButton\" ","data-dojo-attach-point=\"btn\"","data-dojo-props=\"iconClass:'dijitIconApplication'\">","<div data-dojo-type=\"dijit.TooltipDialog\" data-dojo-attach-point=\"ttd\">","hihi","</div>","</div>"].join("");
},setCellValue:function(_6){
this.btn.set("label",_6);
}}];
layout2=[{field:"id",name:"Index",width:"50px"},{field:"Name",name:"Buttons",widgetsInCell:true,navigable:true,decorator:function(){
return ["<button data-dojo-type=\"dijit.form.Button\" ","data-dojo-attach-point=\"btn1\" ","data-dojo-props=\"onClick: function(){","alert(this.get('label'));","}\"></button>","<div data-dojo-type=\"dijit.form.DropDownButton\" ","data-dojo-attach-point=\"btn2\"","data-dojo-props=\"iconClass:'dijitIconApplication'\">","<div data-dojo-type=\"dijit.TooltipDialog\" data-dojo-attach-point=\"ttd\">","hihi","</div>","</div>","<div data-dojo-type=\"dijit.form.ComboButton\" ","data-dojo-attach-point=\"btn3\" ","data-dojo-props=\"","optionsTitle:'Save Options',","iconClass:'dijitIconFile',","onClick:function(){ console.log('Clicked ComboButton'); }","\">","<div data-dojo-type=\"dijit.Menu\">","<div data-dojo-type=\"dijit.MenuItem\"","data-dojo-props=\"","iconClass:'dijitEditorIcon dijitEditorIconSave',","onClick:function(){ console.log('Save'); }\">","Save","</div>","<div data-dojo-type=\"dijit.MenuItem\"","data-dojo-props=\"onClick:function(){ console.log('Save As'); }\">","Save As","</div></div></div>"].join("");
},setCellValue:function(_7){
this.btn1.set("label",_7);
this.btn2.set("label",_7);
this.btn3.set("label",_7);
}}];
});
