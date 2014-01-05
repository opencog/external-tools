//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","dijit/form/HorizontalSlider","dijit/form/HorizontalRule","dijit/form/HorizontalRuleLabels","dijit/form/VerticalSlider","dijit/form/VerticalRule","dijit/form/VerticalRuleLabels","dojo/domReady!"],function(_1,_2,_3,_4,_5){
grid=new _1({id:"grid",store:_4({dataSource:_3,size:100}),structure:_3.layouts[1],cacheClass:_2,paginationInitialPageSize:25,modules:[_5.Pagination,_5.PaginationBar,_5.VirtualVScroller]});
grid.placeAt("gridContainer");
grid.startup();
});
function onHSliderChange(_6){
grid.resize({w:_6});
dojo.byId("widthLabel").innerHTML=Math.round(_6);
};
function onVSliderChange(_7){
grid.resize({h:_7});
dojo.byId("heightLabel").innerHTML=Math.round(_7);
};
