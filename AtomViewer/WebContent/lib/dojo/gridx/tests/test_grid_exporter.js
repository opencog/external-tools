//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/ComputerData","gridx/tests/support/stores/Memory","gridx/tests/support/modules","gridx/tests/support/TestPane","dijit/registry","dijit/form/CheckBox","dijit/form/NumberSpinner","dijit/form/SimpleTextarea","dijit/form/Button","dijit/ProgressBar","dijit/Dialog","dojo/domReady!"],function(_1,_2,_3,_4,_5,_6,_7){
grid=new _1({id:"grid",cacheClass:_2,store:_4({path:"./support/stores",dataSource:_3,size:1000}),structure:_3.layouts[1],modules:[_5.CellWidget,_5.ExtendedSelectRow,_5.ExportCSV,_5.SingleSort,_5.Filter,_5.FilterBar,_5.Pagination,_5.PaginationBar,_5.VirtualVScroller],autoWidth:true,selectRowTriggerOnCell:true});
grid.placeAt("gridContainer");
grid.startup();
function _8(_9){
_7.byId("resultArea").set("value",_9);
_7.byId("resultDialog").show();
};
function _a(_b){
console.error("Fatal error: ",_b);
};
function _c(_d){
_7.byId("exportProgress").set("value",_d);
var s=_7.byId("exportProgress").domNode.style;
if(_d<1){
s.display="block";
}else{
setTimeout(function(){
s.display="none";
},500);
}
};
exportCSV=function(){
var _e={selectedOnly:_7.byId("selectedRows").get("checked"),omitHeader:_7.byId("omitHeader").get("checked"),useStoreData:_7.byId("useStoreData").get("checked")};
if(_7.byId("allowSeparator").get("checked")){
_e.separator=_7.byId("separator").get("value");
}
if(_7.byId("allowStartIndex").get("checked")){
_e.start=_7.byId("startIndex").get("value");
}
if(_7.byId("allowRowCount").get("checked")){
_e.count=_7.byId("rowCount").get("value");
}
if(_7.byId("allowProgressStep").get("checked")){
_e.progressStep=_7.byId("progressStep").get("value");
}
if(_7.byId("filter").get("checked")){
_e.filter=function(_f){
return /Windows/.test(_f.data().platform);
};
}
if(_7.byId("allowFormatters").get("checked")){
var fs=_e.formatters={};
if(_7.byId("formatStatus").get("checked")){
fs.status=function(_10){
return {Warning:"W",Critical:"C",Normal:"N"}[_10.data()];
};
}
if(_7.byId("formatProgress").get("checked")){
fs.progress=function(_11){
return _11.data()*100+"%";
};
}
}
if(_7.byId("allowChooseColumns").get("checked")){
var _12=_e.columns=[];
grid.columns().forEach(function(c){
var cb=_7.byId("col-"+c.id);
if(cb.get("checked")){
_12.push(c.id);
}
});
}
grid.exporter.toCSV(_e).then(_8,_a,_c);
};
toggleSeparator=function(){
_7.byId("separator").set("disabled",!this.get("checked"));
};
toggleProgressStep=function(){
_7.byId("progressStep").set("disabled",!this.get("checked"));
};
toggleStartIndex=function(){
_7.byId("startIndex").set("disabled",!this.get("checked"));
};
toggleRowCount=function(){
_7.byId("rowCount").set("disabled",!this.get("checked"));
};
toggleFormatters=function(){
document.getElementById("formatters").style.display=this.get("checked")?"block":"none";
};
toggleChooseColumns=function(){
document.getElementById("choosecolumns").style.display=this.get("checked")?"block":"none";
};
var _13=["<div style=\"font-weight: bolder; padding: 5px;\">CSV Arguments</div>","<input id=\"allowSeparator\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleSeparator","\"/>","<span id=\"separator\" data-dojo-type=\"dijit.form.TextBox\" style=\"width: 50px;\" data-dojo-props=\"","value: ',',","disabled: true","\" ></span><label for=\"allowSeparator\">Separator</label><br />","<div style=\"font-weight: bolder; padding: 5px;\">Export Arguments</div>","<input id=\"allowProgressStep\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleProgressStep","\"/>","<span id=\"progressStep\" data-dojo-type=\"dijit.form.NumberSpinner\" style=\"width: 50px;\" data-dojo-props=\"","value: 20,","constraints: {min: 1, max: 200},","disabled: true","\" ></span><label for=\"allowProgress\">Progress Step</label><br />","<input id=\"allowStartIndex\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleStartIndex","\"/>","<span id=\"startIndex\" data-dojo-type=\"dijit.form.NumberSpinner\" style=\"width: 50px;\" data-dojo-props=\"","value: 0,","constraints: {min: 0, max: 999},","disabled: true","\" ></span><label for=\"allowStartIndex\">Start Row Index</label><br />","<input id=\"allowRowCount\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleRowCount","\"/>","<span id=\"rowCount\" data-dojo-type=\"dijit.form.NumberSpinner\" style=\"width: 50px;\" data-dojo-props=\"","value: 100,","constraints: {min: 1, max: 1000},","disabled: true","\" ></span><label for=\"allowRowCount\">Row Count</label><br />","<input id=\"omitHeader\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"omitHeader\">Omit Header</label><br />","<input id=\"selectedRows\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"selectedRows\">Selected Rows Only</label><br />","<input id=\"filter\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"filter\">Filter \"Windows\"</label><br />","<input id=\"useStoreData\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"useStoreData\">Use Store Data</label><br />","<input id=\"allowFormatters\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleFormatters","\"/><label for=\"allowFormatters\">Use Formatters</label><br />","<div id=\"formatters\" style=\"padding: 5px; display: none;\">","<input id=\"formatStatus\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","checked: true","\"/><label for=\"formatStatus\">Format Column \"Status\"</label><br />","<input id=\"formatProgress\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","checked: true","\"/><label for=\"formatProgress\">Format Column \"Progress\"</label><br />","</div>","<input id=\"allowChooseColumns\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleChooseColumns","\"/><label for=\"allowChooseColumns\">Choose Columns</label><br />","<div id=\"choosecolumns\" style=\"padding: 5px; display: none;\">"];
_13=_13.concat(grid.columns().map(function(c){
return ["<input id=\"col-",c.id,"\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"checked: true\"/><label for=\"col-",c.id,"\">",c.name(),"</label><br />"].join("");
}));
_13.push(["</div><div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: exportCSV\">Export to CSV</div>","<div id=\"exportProgress\" data-dojo-type=\"dijit.ProgressBar\" style=\"display: none;\" data-dojo-props=\"","minimum: 0, maximum: 1","\"></div>"].join(""));
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Export",_13.join(""));
tp.startup();
});
