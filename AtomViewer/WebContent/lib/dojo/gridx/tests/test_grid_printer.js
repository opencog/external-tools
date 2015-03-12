//>>built
require(["gridx/Grid","gridx/core/model/cache/Async","gridx/tests/support/data/TestData","gridx/tests/support/stores/Memory","gridx/tests/support/modules","gridx/tests/support/TestPane","dijit/registry","dijit/form/CheckBox","dijit/form/NumberSpinner","dijit/form/SimpleTextarea","dijit/form/Button","dijit/ProgressBar","dijit/Dialog"],function(_1,_2,_3,_4,_5,_6,_7){
grid=new _1({id:"grid",cacheClass:_2,store:_4({path:"./support/stores",dataSource:_3,size:1000}),structure:_3.layouts[1],modules:[_5.CellWidget,_5.ExtendedSelectRow,_5.ExtendedSelectColumn,_5.ExportTable,_5.Printer,_5.SingleSort,_5.NestedSort,_5.Filter,_5.FilterBar,_5.Pagination,_5.PaginationBar,_5.MoveRow,_5.MoveColumn,_5.DndRow,_5.DndColumn,_5.VirtualVScroller],autoWidth:false,selectRowTriggerOnCell:true});
grid.placeAt("gridContainer");
grid.startup();
function _8(_9){
var _a=window.open();
_a.document.write(_9);
_a.document.close();
};
function _b(_c){
console.error("Fatal error: ",_c);
};
function _d(_e){
_7.byId("exportProgress").set("value",_e);
var s=_7.byId("exportProgress").domNode.style;
if(_e<1){
s.display="block";
}else{
setTimeout(function(){
s.display="none";
},500);
}
};
function _f(){
var _10={selectedOnly:_7.byId("selectedRows").get("checked"),omitHeader:_7.byId("omitHeader").get("checked"),useStoreData:_7.byId("useStoreData").get("checked")};
if(_7.byId("allowTitle").get("checked")){
_10.title=_7.byId("title").get("value");
}
if(_7.byId("allowDescription").get("checked")){
_10.description=_7.byId("description").get("value");
}
if(_7.byId("cssFile").get("checked")){
_10.styleSrc="support/test_grid_printer.css";
}
if(_7.byId("allowCssString").get("checked")){
_10.style=_7.byId("cssString").get("value");
}
if(_7.byId("natualWidth").get("checked")){
_10.natualWidth=true;
}
if(_7.byId("allowColumnWidth").get("checked")){
var cw=_10.columnWidth={};
grid.columns().forEach(function(c){
if(_7.byId("allowCW-"+c.id).get("checked")){
cw[c.id]=_7.byId("cw-"+c.id).get("value");
}
});
}
if(_7.byId("allowStartIndex").get("checked")){
_10.start=_7.byId("startIndex").get("value");
}
if(_7.byId("allowRowCount").get("checked")){
_10.count=_7.byId("rowCount").get("value");
}
if(_7.byId("allowProgressStep").get("checked")){
_10.progressStep=_7.byId("progressStep").get("value");
}
if(_7.byId("filter").get("checked")){
_10.filter=function(row){
var p=/Windows/;
return p.test(row.data().platform);
};
}
if(_7.byId("allowFormatters").get("checked")){
var fs=_10.formatters={};
if(_7.byId("formatStatus").get("checked")){
fs.status=function(_11){
return "<span class=\""+{Warning:"testDataWarningStatus",Critical:"testDataCriticalStatus",Normal:"testDataNormalStatus"}[_11.data()]+"\"></span>"+_11.data();
};
}
if(_7.byId("formatProgress").get("checked")){
fs.progress=function(_12){
return _12.data()*100+"%";
};
}
}
if(_7.byId("allowChooseColumns").get("checked")){
var _13=_10.columns=[];
grid.columns().forEach(function(c){
if(_7.byId("col-"+c.id).get("checked")){
_13.push(c.id);
}
});
}
return _10;
};
printGrid=function(){
grid.printer.print(_f()).then(null,_b,_d);
};
printPreview=function(){
grid.printer.toHTML(_f()).then(_8,_b,_d);
};
toggleTitle=function(){
_7.byId("title").domNode.style.display=this.get("checked")?"block":"none";
};
toggleDescription=function(){
_7.byId("description").domNode.style.display=this.get("checked")?"block":"none";
};
toggleCssString=function(){
_7.byId("cssString").domNode.style.display=this.get("checked")?"block":"none";
};
toggleColumnWidth=function(){
document.getElementById("columnwidth").style.display=this.get("checked")?"block":"none";
};
toggleSingleColumnWidth=function(){
_7.byId("cw-"+this.id.split("-")[1]).set("disabled",!this.get("checked"));
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
var _14=["<div style=\"font-weight: bolder; padding: 5px;\">Print Arguments</div>","<input id=\"allowTitle\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleTitle","\"/><label for=\"allowTitle\">Use Title</label><br />","<input id=\"title\" type=\"text\" data-dojo-type=\"dijit.form.TextBox\" data-dojo-props=\"","value: 'System Report'","\" style=\"display: none;\"/>","<input id=\"allowDescription\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleDescription","\"/><label for=\"allowDescription\">Use Description</label><br />","<textarea id=\"description\" data-dojo-type=\"dijit.form.SimpleTextarea\" data-dojo-props=\"","value: '<h1>System Report</h1>'","\" style=\"display: none;\"></textarea>","<input id=\"cssFile\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"cssFile\">Use CSS File</label><br />","<input id=\"allowCssString\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleCssString","\"/><label for=\"allowCssString\">Use CSS String</label><br />","<textarea id=\"cssString\" data-dojo-type=\"dijit.form.SimpleTextarea\" data-dojo-props=\"","value: '[colid=\\'server\\'] {color: red;}'","\" style=\"display: none;\"></textarea>","<input id=\"natualWidth\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"natualWidth\">Natual Column Width</label><br />","<input id=\"allowColumnWidth\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleColumnWidth","\"/><label for=\"allowColumnWidth\">Custom Column Width</label><br />","<div id=\"columnwidth\" style=\"padding: 5px; display: none;\"><table><tbody>"];
_14=_14.concat(grid.columns().map(function(c){
return ["<tr><td>","<input id=\"allowCW-",c.id,"\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","checked: true,","onChange: toggleSingleColumnWidth","\"/><label for=\"allowCW-",c.id,"\">",c.name(),":</label></td>","<td><input id=\"cw-",c.id,"\" type=\"text\" data-dojo-type=\"dijit.form.TextBox\" style=\"width: 50px;\" data-dojo-props=\"","value: '100px'","\"/></td></tr>"].join("");
}));
_14.push(["</tbody></table></div>","<div style=\"font-weight: bolder; padding: 5px;\">Export Arguments</div>","<input id=\"allowProgressStep\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleProgressStep","\"/>","<span id=\"progressStep\" data-dojo-type=\"dijit.form.NumberSpinner\" style=\"width: 50px;\" data-dojo-props=\"","value: 20,","constraints: {min: 1, max: 200},","disabled: true","\"></span><label for=\"allowProgressStep\">Progress Step</label><br />","<input id=\"allowStartIndex\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleStartIndex","\"/>","<span id=\"startIndex\" data-dojo-type=\"dijit.form.NumberSpinner\" style=\"width: 50px;\" data-dojo-props=\"","value: 0,","constraints: {min: 0, max: 999},","disabled: true","\"></span><label for=\"allowStartIndex\">Start Row Index</label><br />","<input id=\"allowRowCount\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleRowCount","\"/>","<span id=\"rowCount\" data-dojo-type=\"dijit.form.NumberSpinner\" style=\"width: 50px;\" data-dojo-props=\"","value: 100,","constraints: {min: 1, max: 1000},","disabled: true","\"></span><label for=\"allowRowCount\">Row Count</label><br />","<input id=\"omitHeader\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"omitHeader\">Omit Header</label><br />","<input id=\"selectedRows\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"selectedRows\">Selected Rows Only</label><br />","<input id=\"filter\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"filter\">Filter \"Windows\"</label><br />","<input id=\"useStoreData\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"/>","<label for=\"useStoreData\">Use Store Data</label><br />","<input id=\"allowFormatters\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleFormatters","\"/><label for=\"allowFormatters\">Use Formatters</label><br />","<div id=\"formatters\" style=\"padding: 5px; display: none;\">","<input id=\"formatStatus\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","checked: true","\"/><label for=\"formatStatus\">Format Column \"Status\"</label><br />","<input id=\"formatProgress\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","checked: true","\"/><label for=\"formatProgress\">Format Column \"Progress\"</label><br />","</div>","<input id=\"allowChooseColumns\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"","onChange: toggleChooseColumns","\"/><label for=\"allowChooseColumns\">Choose Columns</label><br />","<div id=\"choosecolumns\" style=\"padding: 5px; display: none;\">"].join(""));
_14=_14.concat(grid.columns().map(function(c){
return ["<input id=\"col-",c.id,"\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" data-dojo-props=\"checked: true\"/><label for=\"col-",c.id,"\">",c.name(),"</label><br />"].join("");
}));
_14.push(["</div><div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: printPreview\">Print Preview</div><br />","<div data-dojo-type=\"dijit.form.Button\" data-dojo-props=\"onClick: printGrid\">Print</div><br />","<div id=\"exportProgress\" data-dojo-type=\"dijit.ProgressBar\" style=\"display: none;\" data-dojo-props=\"","minimum: 0, maximum: 1","\"></div>"].join(""));
var tp=new _6({});
tp.placeAt("ctrlPane");
tp.addTestSet("Print",_14.join(""));
tp.startup();
});
