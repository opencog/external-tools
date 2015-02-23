//>>built
define("gridx/modules/exporter/Table",["dojo/_base/declare","dojo/_base/lang","../../core/_Module","./Exporter"],function(_1,_2,_3){
function _4(_5,_6){
var cw=_5.columnWidth,w=(cw&&cw[_6.id])||(_5.natualWidth?"":_6.getWidth())||"auto";
return [" colid=\"",_6.id,"\" style=\"width:",w,"\""].join("");
};
return _1(_3,{name:"exportTable",forced:["exporter"],getAPIPath:function(){
return {exporter:{toTable:_2.hitch(this,this.toTable)}};
},toTable:function(_7){
return this.grid.exporter._export(this,_7||{});
},initialize:function(_8){
this._rst=["<table class=\"grid\"",_8.natualWidth?"":" style=\"table-layout:fixed;\""," border=\"0\" cellpadding=\"0\" cellspacing=\"0\">"];
},beforeHeader:function(){
this._rst.push("<thead><tr class=\"grid_header\">");
},handleHeaderCell:function(_9,_a){
var _b=_9.column;
this._rst.push("<th class=\"grid_header_cell\"",_4(_a,_b),">",_b.name(),"</th>");
},afterHeader:function(){
this._rst.push("</tr><thead>");
},beforeBody:function(){
this._rst.push("<tbody>");
},beforeRow:function(_c){
var r=_c.row,_d=r.index();
this._rst.push("<tr class=\"grid_row grid_row_",_d%2?"even":"odd","\" rowid=\"",r.id,"\" rowindex=\"",_d,"\">");
},handleCell:function(_e,_f){
this._rst.push("<td class=\"grid_cell\"",_4(_f,_e.column),">",_e.data,"</td>");
},afterRow:function(){
this._rst.push("</tr>");
},afterBody:function(){
this._rst.push("</tbody></table>");
},getResult:function(){
return this._rst.join("");
}});
});
