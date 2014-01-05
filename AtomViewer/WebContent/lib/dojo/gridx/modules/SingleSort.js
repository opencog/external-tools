//>>built
define("gridx/modules/SingleSort",["dojo/_base/declare","dojo/_base/lang","dojo/keys","../core/model/extensions/Sort","../core/_Module"],function(_1,_2,_3,_4,_5){
return _1(_5,{name:"sort",forced:["header"],modelExtensions:[_4],getAPIPath:function(){
return {sort:this};
},preload:function(){
var t=this,g=t.grid,_6;
t.connect(g,"onHeaderCellClick","_onClick");
t.connect(g,"onHeaderCellKeyDown","_onKeyDown");
if(g.persist){
_6=g.persist.registerAndLoad("sort",function(){
return [{colId:t._sortId,descending:t._sortDescend}];
});
}
_6=_6||t.arg("initialOrder");
if(_2.isArrayLike(_6)){
_6=_6[0];
}
if(_6&&_6.colId){
t._sortId=_6.colId;
t._sortDescend=_6.descending;
t.model.sort([_6]);
}
},load:function(){
var t=this,_7,f=function(){
if(t._sortId){
t._updateHeader(t._sortId,t._sortDescend);
}
};
t.connect(t.grid.header,"onRender",f);
for(_7 in t.grid._columnsById){
t._initHeader(_7);
}
f();
t.loaded.callback();
},columnMixin:{sort:function(_8,_9){
this.grid.sort.sort(this.id,_8,_9);
return this;
},isSorted:function(){
return this.grid.sort.isSorted(this.id);
},clearSort:function(_a){
if(this.isSorted()){
this.grid.sort.clear(_a);
}
return this;
},isSortable:function(){
var _b=this.grid._columnsById[this.id];
return _b.sortable||_b.sortable===undefined;
},setSortable:function(_c){
this.grid._columnsById[this.id].sortable=!!_c;
return this;
}},sort:function(_d,_e,_f){
var t=this,g=t.grid,col=g._columnsById[_d];
if(col&&(col.sortable||col.sortable===undefined)){
if(t._sortId!=_d||t._sortDescend==!_e){
t._updateHeader(_d,_e);
}
t.model.sort([{colId:_d,descending:_e}]);
if(!_f){
g.body.refresh();
}
}
},isSorted:function(_10){
if(_10==this._sortId){
return this._sortDescend?-1:1;
}
return 0;
},clear:function(_11){
var t=this;
if(t._sortId!==null){
t._initHeader(t._sortId);
t._sortId=t._sortDescend=null;
t.model.sort();
if(!_11){
t.grid.body.refresh();
}
}
},getSortData:function(){
return this._sortId?[{colId:this._sortId,descending:this._sortDescend}]:null;
},_sortId:null,_sortDescend:null,_initHeader:function(_12){
var g=this.grid,_13=g.header.getHeaderNode(_12),col=g.column(_12,1);
_13.innerHTML=["<div class='gridxSortNode'>",col.name(),"</div>"].join("");
if(col.isSortable()){
_13.setAttribute("aria-sort","none");
}else{
_13.removeAttribute("aria-sort");
}
},_updateHeader:function(_14,_15){
var t=this;
if(t._sortId&&t._sortId!=_14){
t._initHeader(t._sortId);
}
t._sortId=_14;
t._sortDescend=!!_15;
var g=t.grid,_16=g.header.getHeaderNode(_14);
_16.innerHTML=["<div class='gridxSortNode ",_15?"gridxSortDown":"gridxSortUp","'><div class='gridxArrowButtonChar'>",_15?"&#9662;":"&#9652;","</div><div role='presentation' class='gridxArrowButtonNode'>&nbsp;</div><div class='gridxColCaption'>",g.column(_14,1).name(),"</div></div>"].join("");
_16.setAttribute("aria-sort",_15?"descending":"ascending");
g.vLayout.reLayout();
},_onClick:function(e){
this.sort(e.columnId,this._sortId!=e.columnId?0:!this._sortDescend);
},_onKeyDown:function(e){
if(e.keyCode==_3.ENTER){
this._onClick(e);
}
}});
});
