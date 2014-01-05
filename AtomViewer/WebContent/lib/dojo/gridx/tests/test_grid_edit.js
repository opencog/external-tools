//>>built
require(["gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","dojo/store/Memory","dojo/date/locale","dijit/form/TextBox","dijit/form/ComboBox","dijit/form/DateTextBox","dijit/form/TimeTextBox","dijit/form/NumberTextBox","dijit/form/FilteringSelect","dijit/form/Select","dijit/form/HorizontalSlider","dijit/form/NumberSpinner","dijit/form/CheckBox","dijit/form/ToggleButton","dijit/Calendar","dijit/ColorPalette","gridx/Grid","gridx/core/model/cache/Sync","gridx/tests/support/modules"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
var _c=function(d){
res=_4.format(d,{selector:"date",datePattern:"yyyy/M/d"});
return res;
};
var _d=function(d){
res=_4.format(d,{selector:"time",timePattern:"hh:mm:ss"});
return res;
};
store=_2({dataSource:_1,size:100});
mystore=_2({dataSource:_1,size:200});
function _e(_f){
var _10=_1.getData(100).items;
var res={};
for(var i=0;i<_10.length;++i){
res[_10[i][_f]]=1;
}
_10=[];
for(var d in res){
_10.push({id:d});
}
return new _3({data:_10});
};
fsStore=_e("Album");
selectStore=_e("Length");
layout=[{field:"id",name:"ID",width:"20px"},{field:"Color",name:"Color Palatte",width:"205px",editable:true,decorator:function(_11){
return ["<div style=\"display: inline-block; border: 1px solid black; ","width: 20px; height: 20px; background-color: ",_11,"\"></div>",_11].join("");
},editor:"dijit/ColorPalette",editorArgs:{fromEditor:function(v,_12){
return v||_12.data();
}}},{field:"Genre",name:"TextBox",width:"100px",editable:true},{field:"Artist",name:"ComboBox",width:"100px",editable:true,editor:"dijit/form/ComboBox",editorArgs:{props:"store: mystore, searchAttr: \"Artist\""}},{field:"Year",name:"NumberTextBox",width:"100px",editable:true,editor:"dijit.form.NumberTextBox"},{field:"Album",name:"FilteringSelect",width:"100px",editable:true,editor:_a,editorArgs:{props:"store: fsStore, searchAttr: \"id\""}},{field:"Length",name:"Select",width:"100px",editable:true,editor:_b,editorArgs:{props:"store: selectStore, labelAttr: \"id\""}},{field:"Progress",name:"HorizontalSlider",width:"100px",editable:true,editor:"dijit/form/HorizontalSlider",editorArgs:{props:"minimum: 0, maximum: 1"}},{field:"Track",name:"Number Spinner",width:"100px",editable:true,width:"50px",editor:"dijit/form/NumberSpinner"},{field:"Heard",name:"Check Box",width:"30px",editable:true,editor:"dijit.form.CheckBox",editorArgs:{props:"value: true"}},{field:"Heard",name:"ToggleButton",width:"100px",editable:true,editor:"dijit.form.ToggleButton",editorArgs:{valueField:"checked",props:"label: \"Press me\""}},{field:"Download Date",name:"Calendar",width:"180px",editable:true,dataType:"date",storePattern:"yyyy/M/d",gridPattern:"yyyy/MMMM/dd",editor:"dijit/Calendar",editorArgs:{fromEditor:_c}},{field:"Download Date",name:"DateTextBox",width:"100px",editable:true,dataType:"date",storePattern:"yyyy/M/d",gridPattern:"yyyy--MM--dd",editor:_7,editorArgs:{fromEditor:_c}},{field:"Last Played",name:"TimeTextBox",width:"100px",editable:true,dataType:"time",storePattern:"HH:mm:ss",formatter:"hh:mm a",editor:_8,editorArgs:{fromEditor:_d}}];
});
