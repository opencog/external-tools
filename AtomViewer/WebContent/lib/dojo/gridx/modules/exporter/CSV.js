//>>built
define("gridx/modules/exporter/CSV",["dojo/_base/declare","dojo/_base/lang","../../core/_Module","./Exporter"],function(_1,_2,_3){
return _1(_3,{name:"exportCsv",forced:["exporter"],getAPIPath:function(){
return {exporter:{toCSV:_2.hitch(this,this.toCSV)}};
},toCSV:function(_4){
return this.grid.exporter._export(this,_4||{});
},initialize:function(_5){
this._s=_5.separator||",";
this._n=_5.newLine||"\r\n";
this._lines=[];
},beforeHeader:function(){
this._cells=[];
},handleHeaderCell:function(_6){
this._cells.push(_6.column.name());
},afterHeader:function(){
this._lines.push(this._cells.join(this._s));
},beforeRow:function(){
this._cells=[];
},handleCell:function(_7){
var _8=String(_7.data).replace(/"/g,"\"\"");
if(_8.indexOf(this._s)>=0||_8.search(/[" \t\r\n]/)>=0){
_8="\""+_8+"\"";
}
this._cells.push(_8);
},afterRow:function(){
this._lines.push(this._cells.join(this._s));
},getResult:function(){
return this._lines.join(this._n);
}});
});
