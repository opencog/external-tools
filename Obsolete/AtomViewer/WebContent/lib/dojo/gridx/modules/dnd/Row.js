//>>built
define("gridx/modules/dnd/Row",["dojo/_base/declare","dojo/_base/array","dojo/_base/Deferred","dojo/_base/lang","dojo/dom-class","dojo/dom-geometry","dojo/_base/sniff","./_Base","../../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
var _a=_4.hitch,_b=_2.forEach;
function _c(_d,_e){
if(_d.grid){
var d=new _3(),_f=_a(d,d.callback),_10=_a(d,d.errback),_11=[],sg=_d.grid,_12=sg.dnd.row._selectedRowIds;
sg.model.when({id:_12},function(){
_b(_12,function(id){
var idx=sg.model.idToIndex(id),row=sg.model.byId(id);
if(row){
_11.push(_4.clone(row.rawData));
}
});
}).then(function(){
_f(_11);
},_10);
return d;
}else{
return _d.getGridDndRowData&&_d.getGridDndRowData(_e)||[];
}
};
return _1(_8,{name:"dndRow",required:["_dnd","moveRow"],getAPIPath:function(){
return {dnd:{row:this}};
},accept:["grid/rows"],provide:["grid/rows"],onDraggedOut:function(_13){
var t=this,_14=[];
if(_13.grid){
_14=_13.grid.dnd._dnd.profile.arg("accept");
}else{
for(var n in _13.accept){
_14.push(n);
}
}
if(!t.checkArg("copyWhenDragOut",_14)){
var g=t.grid,m=g.model,s=g.store,_15=t._selectedRowIds;
if(s.fetch){
var _16=[];
g.model.when({id:_15},function(){
_b(_15,function(id){
var row=m.byId(id);
if(row){
_16.push(row.item);
}
});
}).then(function(){
_b(_16,s.deleteItem,s);
s.save();
});
}else{
_b(_15,s.remove,s);
}
}
},_checkDndReady:function(evt){
var t=this,m=t.model;
if(!m.getMark||m.getMark(evt.rowId)){
t.grid.dnd._dnd.profile=t;
t._selectedRowIds=m.getMarkedIds?m.getMarkedIds():[evt.rowId];
return true;
}
return false;
},_cssName:"Row",_onBeginDnd:function(_17){
_17.delay=this.arg("delay");
},_getDndCount:function(){
return this._selectedRowIds.length;
},_onEndDnd:function(){
},_buildDndNodes:function(){
var gid=this.grid.id;
return _2.map(this._selectedRowIds,function(_18){
return ["<div id='",gid,"_dndrow_",_18,"' gridid='",gid,"' rowid='",_18,"'></div>"].join("");
}).join("");
},_onBeginAutoScroll:function(){
var _19=this.grid.autoScroll;
this._autoScrollH=_19.horizontal;
_19.horizontal=false;
},_onEndAutoScroll:function(){
this.grid.autoScroll.horizontal=this._autoScrollH;
},_getItemData:function(id){
return id.substring((this.grid.id+"_dndrow_").length);
},_calcTargetAnchorPos:function(evt,_1a){
var t=this,_1b=evt.target,_1c=t.grid.body,ret={width:_1a.w+"px",height:"",left:""},_1d=function(n){
return t.model.getMark&&t.model.getMark(n.getAttribute("rowid"));
},_1e=function(n){
return parseInt(n.getAttribute("visualindex"),10);
},_1f=function(_20){
var n=_20,_21=n,_22=n;
if(_1d(n)){
var _23=n.previousSibling;
while(_23&&_1d(_23)){
n=_23;
_23=_23.previousSibling;
}
_21=n;
n=_20;
var _24=n.nextSibling;
while(_24&&_1d(_24)){
n=_24;
_24=_24.nextSibling;
}
_22=n;
}
if(_21&&_22){
var _25=_6.position(_21),_26=_6.position(_22),_27=(_25.y+_26.y+_26.h)/2;
if(evt.clientY<_27){
t._target=_1e(_21);
ret.top=(_25.y-_1a.y)+"px";
}else{
t._target=_1e(_22)+1;
ret.top=(_26.y+_26.h-_1a.y)+"px";
}
}else{
delete t._target;
}
return ret;
};
if(!_7("ff")){
while(_1b){
if(_5.contains(_1b,"gridxRow")){
return _1f(_1b);
}
_1b=_1b.parentNode;
}
}
var bn=_1c.domNode,_28=bn.childNodes;
if(!_28.length){
ret.top="0px";
t._target=0;
}else{
_1b=bn.firstChild;
var idx=_1e(_1b),pos=_6.position(_1b);
if(idx===0&&evt.clientY<=pos.y+pos.h){
ret.top=(pos.y-_1a.y)+"px";
t._target=0;
}else{
_1b=bn.lastChild;
idx=_1e(_1b);
pos=_6.position(_1b);
if(idx===_1c.visualCount-1&&evt.clientY>pos.y+pos.h){
ret.top=(pos.y+pos.h-_1a.y)+"px";
t._target=_1c.visualCount;
}else{
var _29=_2.some(_28,function(_2a){
pos=_6.position(_2a);
if(pos.y<=evt.clientY&&pos.y+pos.h>=evt.clientY){
_1b=_2a;
return true;
}
});
return _29?_1f(_1b):null;
}
}
}
return ret;
},_onDropInternal:function(_2b,_2c){
var t=this,g=t.grid;
if(t._target>=0){
t.model.when({id:t._selectedRowIds},function(){
var _2d=_2.map(t._selectedRowIds,function(_2e){
return t.model.idToIndex(_2e);
});
g.move.row.move(_2d,g.body.getRowInfo({visualIndex:t._target}).rowIndex);
});
}
},_onDropExternal:function(_2f,_30,_31){
var d=new _3(),_32=_a(d,d.callback),_33=_a(d,d.errback),g=this.grid,_34=this._target,_35,_36,_37=_c(_2f,_30);
g.model.when([_34-1,_34],function(){
_35=g.model.byIndex(_34);
_36=g.model.byIndex(_34-1);
}).then(function(){
_3.when(_37,function(_38){
if(_38&&_38.length){
var _39=g.model.insert(_38,_36&&_36.item,_35&&_35.item);
_3.when(_39,_32,_33);
}
},_33);
},_33);
return d;
}});
});
