//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/modules","dojo/domReady!"],function(_1,_2,_3,_4,_5){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:2000}),modules:[_5.SingleSort,_5.SelectRow,_5.VirtualVScroller],structure:_3.layouts[4]});
grid.placeAt("gridContainer");
grid.startup();
});
