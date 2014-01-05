//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/TestPane","gridx/tests/support/modules","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6){
g=null;
createGrid=function(_7,_8){
if(g){
g.destroy();
}
dojo.byId("title").innerHTML=_8;
g=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),structure:_3.layouts[1],modules:[_6.Focus,_6.ColumnResizer,_6.RowHeader,_6.IndirectSelect,_6.Pagination,_6.PaginationBar,_6.VirtualVScroller].concat(_7)});
g.placeAt("gridContainer");
g.startup();
};
mods=[[_6.ExtendedSelectRow],[{moduleClass:_6.ExtendedSelectRow,triggerOnCell:true}],[_6.SelectRow],[{moduleClass:_6.SelectRow,triggerOnCell:true}],[{moduleClass:_6.SelectRow,multiple:false}],[{moduleClass:_6.SelectRow,multiple:false,triggerOnCell:true}]];
createGrid0=function(){
createGrid(mods[0],"IndirectSelection with extended selection");
};
createGrid1=function(){
createGrid(mods[1],"IndirectSelection with extended selection (trigger on cell)");
};
createGrid2=function(){
createGrid(mods[2],"IndirectSelection with simple multi-selection (cannot swipe)");
};
createGrid3=function(){
createGrid(mods[3],"IndirectSelection with simple multi-selection (trigger on cell)");
};
createGrid4=function(){
createGrid(mods[4],"IndirectSelection with single-selection");
};
createGrid5=function(){
createGrid(mods[5],"IndirectSelection with single-selection (trigger on cell)");
};
createGrid1();
var tp=new _5({});
tp.placeAt("ctrlPane");
tp.addTestSet("Grid Creation",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: createGrid0\">Create Grid - IndirectSelection with extended selection</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: createGrid1\">Create Grid - IndirectSelection with extended selection (trigger on cell)</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: createGrid2\">Create Grid - IndirectSelection with simple multi-selection (cannot swipe)</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: createGrid3\">Create Grid - IndirectSelection with simple multi-selection (trigger on cell)</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: createGrid4\">Create Grid - IndirectSelection with single-selection</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: createGrid5\">Create Grid - IndirectSelection with single-selection (trigger on cell)</div><br/>"].join(""));
tp.startup();
});
