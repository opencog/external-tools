//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/modules","gridx/tests/support/TestPane","gridx/modules/extendedSelect/Row","gridx/modules/IndirectSelect","gridx/modules/SummaryBar","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),structure:_3.layouts[0],selectRowTriggerOnCell:true,modules:[_5.SummaryBar,_5.SelectRow,_5.RowHeader,_5.IndirectSelect,_5.VirtualVScroller]});
grid.placeAt("gridContainer");
grid.startup();
});
