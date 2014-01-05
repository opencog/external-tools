//>>built
require(["gridx/Grid","gridx/core/model/cache/Sync","gridx/tests/support/data/MusicData","gridx/tests/support/stores/Memory","gridx/tests/support/modules","dojo/domReady!"],function(_1,_2,_3,_4,_5){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),structure:_3.layouts[7],autoHeight:true,paginationInitialPageSize:10,paginationInitialPage:2,modules:[_5.Pagination]});
grid.placeAt("gridContainer");
grid.startup();
var p=grid.pagination;
first=function(){
p.gotoPage(0);
};
last=function(){
p.gotoPage(p.pageSize()-1);
};
prev=function(){
p.gotoPage(p.currentPage()-1);
};
next=function(){
p.gotoPage(p.currentPage()+1);
};
});
