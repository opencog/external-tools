//>>built
require(["gridx/Grid","gridx/core/model/cache/Sync","gridx/tests/support/data/MusicData","gridx/tests/support/stores/ItemFileWriteStore","gridx/tests/support/TestPane","gridx/tests/support/modules","gridx/modules/Focus","gridx/modules/filter/Filter","gridx/modules/filter/FilterBar","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
grid=new _1({id:"grid",cacheClass:_2,store:_4({dataSource:_3,size:100}),selectRowTriggerOnCell:true,modules:[_8,_6.SingleSort,_6.VirtualVScroller,_6.Focus,{moduleClass:_9,maxRuleCount:5,ruleCountToConfirmClearFilter:2}],structure:_3.layouts[1]});
grid.placeAt("gridContainer");
grid.startup();
window.setStore=function(){
grid.setStore(_4({dataSource:_3,size:50+parseInt(Math.random()*200,10)}));
};
var tp=new _5({});
tp.placeAt("ctrlPane");
fb=grid.filterBar;
applyFilter=function(){
var _a={"type":"any","conditions":[{"colId":"id","condition":"greater","value":95,"type":"Number"},{"colId":"Artist","condition":"contain","value":"Jimi Hendrix","type":"Text"}]};
fb.applyFilter(_a);
};
clear=function(){
fb.clearFilter();
};
clearWithoutConfirm=function(){
fb.clearFilter(true);
};
showOrHide=function(){
var _b=fb.domNode.style.display=="none";
fb[_b?"show":"hide"]();
this.set("label",_b?"Hide fiter bar":"Show filter bar");
};
showFilterDialog=function(){
fb.showFilterDialog();
};
setIdentityFilterable=function(){
var c=grid.column("id",true);
c.setFilterable(!c.isFilterable());
this.set("label",c.isFilterable()?"Set \"Identity\" column un-filterable":"Set \"Identity\" column filterable");
};
getConditions=function(){
var c=grid.column("Download Date",true);
alert(dojo.toJson(c.filterConditions()));
};
tp.addTestSet("Filter Actions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: applyFilter\">Apply a given filter</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: clear\">Clear current filter</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: clearWithoutConfirm\">Clear current filter without confirm</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: showOrHide\">Hide filter bar</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: showFilterDialog\">Show filter dialog</div><br/>",""].join(""));
tp.addTestSet("Column Extended Actions",["<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: setIdentityFilterable\">Set \"Identity\" column un-filterable</div><br/>","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: getConditions\">Get the available conditions of column \"Download Date\"</div><br/>",""].join(""));
tp.startup();
});
