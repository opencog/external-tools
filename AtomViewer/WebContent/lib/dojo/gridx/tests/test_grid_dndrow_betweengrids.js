//>>built
require(["dojo/_base/lang","gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/TestPane","gridx/tests/support/modules","dijit/form/Button","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7){
function _8(id,_9,_a,_b,_c){
var g=new _2(_1.mixin({id:id,cacheClass:_3,store:_5({path:"./support/stores",dataSource:_4,size:_a}),selectRowTriggerOnCell:true,modules:[_7.TitleBar,_7.ExtendedSelectRow,_7.MoveRow,_7.DndRow,_7.VirtualVScroller],structure:_4.layouts[_b]},_c));
g.placeAt(_9);
g.startup();
return g;
};
_8("grid1","grid1Container",100,9,{titleBarLabel:"<h1>Grid 1</h1>Draggable to any other grid.",dndRowAccept:["grid3/rows","grid4/rows"],dndRowProvide:["grid1/rows"]});
_8("grid2","grid2Container",0,6,{titleBarLabel:"<h1>Grid 2</h1>Not draggable to grid 1 and grid 4.",dndRowAccept:["grid1/rows","grid4/rows"],dndRowProvide:["grid2/rows"]});
_8("grid3","grid3Container",0,7,{titleBarLabel:"<h1>Grid 3</h1>Not draggable to grid 2. Can not rearrange.",dndRowCanRearrange:false,dndRowAccept:["grid1/rows","grid2/rows"],dndRowProvide:["grid3/rows"]});
_8("grid4","grid4Container",0,8,{titleBarLabel:"<h1>Grid 4</h1>Not draggable to grid 3.",dndRowAccept:["grid1/rows","grid3/rows"],dndRowProvide:["grid4/rows"]});
});
