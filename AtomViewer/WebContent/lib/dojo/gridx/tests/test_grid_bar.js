//>>built
require(["gridx/Grid","gridx/core/model/cache/Sync","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/modules","gridx/modules/barPlugins/Summary","gridx/modules/barPlugins/LinkPager","gridx/modules/barPlugins/LinkSizer","gridx/modules/barPlugins/DropDownPager","gridx/modules/barPlugins/DropDownSizer","gridx/modules/barPlugins/GotoPageButton","gridx/modules/barPlugins/QuickFilter","dijit/Toolbar","dijit/form/Button","dijit/form/ToggleButton","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f){
var t1=new Date;
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),structure:_3.layouts[0],modules:[_5.Focus,_5.ExtendedSelectRow,_5.Pagination,_5.Filter,_5.Bar],selectRowTriggerOnCell:true,barTop:[[{pluginClass:"dijit/Toolbar",colSpan:2},{pluginClass:_c,"className":"quickFilter"}],[{pluginClass:_7,"className":"linkPager"},{content:"Grid Bar Test",style:"text-align: center; font-size: 15px; font-weight: bolder; text-shadow: 1px 1px 1px #fff;"},null]],barBottom:[[{pluginClass:_6,rowSpan:2},{pluginClass:_8,style:"text-align: center;",colSpan:2}],[{pluginClass:_9,style:"text-align: center;"},"gridx/modules/barPlugins/DropDownSizer",_b]]});
var _10=grid.bar.plugins.top[0][0];
_10.addChild(new _e({label:"cut",showLabel:false,iconClass:"dijitEditorIcon dijitEditorIconCut",onClick:function(){
}}));
_10.addChild(new _e({label:"copy",iconClass:"dijitEditorIcon dijitEditorIconCopy",showLabel:false,onClick:function(){
}}));
_10.addChild(new _e({label:"paste",iconClass:"dijitEditorIcon dijitEditorIconPaste",showLabel:false,onClick:function(){
}}));
_10.addChild(new _f({label:"Bold",iconClass:"dijitEditorIcon dijitEditorIconBold",showLabel:false}));
grid.placeAt("gridContainer");
grid.startup();
});
