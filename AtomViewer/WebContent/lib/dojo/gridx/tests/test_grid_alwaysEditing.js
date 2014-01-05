//>>built
require(["gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/stores/ItemFileWriteStore","dojo/data/ItemFileWriteStore","dojo/date/locale","dijit/form/TextBox","dijit/form/ComboBox","dijit/form/DateTextBox","dijit/form/TimeTextBox","dijit/form/NumberTextBox","dijit/form/FilteringSelect","dijit/form/Select","dijit/form/HorizontalSlider","dijit/form/NumberSpinner","dijit/form/CheckBox","dijit/form/ToggleButton","dijit/Calendar","dijit/ColorPalette","gridx/Grid","gridx/core/model/cache/Sync","gridx/tests/support/modules"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
var _d=function(d){
res=_5.format(d,{selector:"date",datePattern:"yyyy/M/d"});
return res;
};
var _e=function(d){
res=_5.format(d,{selector:"time",timePattern:"hh:mm:ss"});
return res;
};
store1=_2({dataSource:_1,size:100});
dojo.connect(store1,"put",function(){
});
store2=_2({dataSource:_1,size:100});
mystore=_3({dataSource:_1,size:200});
function _f(_10){
var _11=_1.getData(100).items;
var res={};
for(var i=0;i<_11.length;++i){
res[_11[i][_10]]=1;
}
_11=[];
for(var d in res){
_11.push({id:d});
}
return new _4({data:{identifier:"id",label:"id",items:_11}});
};
fsStore=_f("Album");
selectStore=_f("Length");
layout1=[{field:"id",name:"ID",width:"20px"},{field:"Genre",name:"TextBox",width:"100px",alwaysEditing:true},{field:"Artist",name:"ComboBox",width:"100px",alwaysEditing:true,editor:"dijit.form.ComboBox",editorArgs:{props:"store: mystore, searchAttr: \"Artist\""}},{field:"Year",name:"NumberTextBox",width:"100px",alwaysEditing:true,editor:"dijit.form.NumberTextBox"},{field:"Album",name:"FilteringSelect",width:"100px",alwaysEditing:true,editor:_b,editorArgs:{props:"store: fsStore, searchAttr: \"id\""}},{field:"Length",name:"Select",width:"100px",alwaysEditing:true,editor:_c,editorArgs:{props:"store: selectStore, labelAttr: \"id\""}},{field:"Progress",name:"HorizontalSlider",width:"100px",alwaysEditing:true,editor:"dijit.form.HorizontalSlider",editorArgs:{props:"minimum: 0, maximum: 1"}},{field:"Track",name:"Number Spinner",width:"100px",alwaysEditing:true,width:"50px",editor:"dijit.form.NumberSpinner"},{field:"Heard",name:"Check Box",width:"30px",alwaysEditing:true,editor:"dijit.form.CheckBox",editorArgs:{props:"value: true"}},{field:"Heard",name:"ToggleButton",width:"100px",alwaysEditing:true,editor:"dijit.form.ToggleButton",editorArgs:{valueField:"checked",props:"label: \"Press me\""}},{field:"Download Date",name:"DateTextBox",width:"100px",alwaysEditing:true,dataType:"date",storePattern:"yyyy/M/d",gridPattern:"yyyy--MM--dd",editor:_8,editorArgs:{fromEditor:_d}},{field:"Last Played",name:"TimeTextBox",width:"100px",alwaysEditing:true,dataType:"time",storePattern:"HH:mm:ss",formatter:"hh:mm a",editor:_9,editorArgs:{fromEditor:_e}}];
layout2=[{field:"id",name:"ID",width:"20px"},{field:"Color",name:"Color Palatte",width:"210px",alwaysEditing:true,editor:"dijit.ColorPalette",editorArgs:{fromEditor:function(v,_12){
return v||_12.data();
}}},{field:"Download Date",name:"Calendar",width:"210px",alwaysEditing:true,dataType:"date",storePattern:"yyyy/M/d",gridPattern:"yyyy/MMMM/dd",editor:"dijit.Calendar",editorArgs:{fromEditor:_d}},{field:"Composer",name:"Editor",width:"500px",alwaysEditing:true,editor:"dijit.Editor",editorArgs:{props:"height: 20"}}];
});
