//>>built
define("gridx/modules/ColumnLock",["dojo/_base/kernel","dojo/_base/lang","../core/_Module","dojo/_base/declare","dojo/_base/array","dojo/_base/html","dojo/query"],function(_1,_2,_3,_4,_5,_6,_7){
return _4(_3,{name:"columnLock",required:["body"],count:0,load:function(_8,_9){
this.count=this.arg("count");
var _a=this,g=this.grid,_b=_6.body();
_9.then(function(){
if(!g.columnWidth||!g.columnWidth.arg("autoResize")){
_a.connect(g.body,"onAfterRow",function(_c){
_a._lockColumns(_c.node());
});
if(g.columnResizer){
_a.connect(g.columnResizer,"onResize","_updateHeader");
_a.connect(g.columnResizer,"onResize","_updateBody");
}
if(g.header){
g.header.loaded.then(function(){
_a._updateHeader();
});
if(g.move&&g.move.column){
_a.connect(g.move.column,"move","_updateHeader");
}
}
_a._hackHScroller();
if(_a.count){
_a.lock(_a.count);
}
}
_a.loaded.callback();
});
},getAPIPath:function(){
return {columnLock:this};
},lock:function(_d){
if(this.grid.columnWidth&&this.grid.columnWidth.arg("autoResize")){
return;
}
if(_d>=this.grid._columns.length){
this.count=0;
console.warn("Warning: lock count is larger than columns count, do nothing.");
return;
}
this.unlock();
if(_d){
_6.addClass(this.grid.domNode,"gridxColumnLock");
}
this.count=_d;
this._updateUI();
},unlock:function(){
if(this.grid.columnWidth&&this.grid.columnWidth.arg("autoResize")){
return;
}
_6.removeClass(this.grid.domNode,"gridxColumnLock");
var _e=_7(".gridxHeaderRowInner",this.grid.headerNode)[0];
this._unlockColumns(_e);
_5.forEach(this.grid.bodyNode.childNodes,this._unlockColumns,this);
this.count=0;
this._updateUI();
},_unlockColumns:function(_f){
var ltr=this.grid.isLeftToRight();
var r=_f.firstChild.rows[0];
for(var i=0;i<this.count;i++){
var _10=r.cells[i];
_6.removeClass(_10,"gridxLockedCell");
_6.style(_10,{height:"auto"});
}
_f.style[ltr?"paddingLeft":"paddingRight"]="0px";
_f.style.width="auto";
},_updateUI:function(){
if(this.grid.header){
this._updateHeader();
}
this._updateBody();
this._updateScroller();
this.grid.hScroller&&this.grid.hScroller._doScroll();
this.grid.header.onRender();
},_lockColumns:function(_11){
if(!this.count||this.count>=this.grid._columns.length){
this.count=0;
return;
}
var ltr=this.grid.isLeftToRight();
var r=_11.firstChild.rows[0],i;
for(i=0;i<this.count;i++){
_1.style(r.cells[i],"height","auto");
}
var h1=_1.contentBox(r.cells[r.cells.length-1]).h,h2=_1.marginBox(r.cells[r.cells.length-1]).h;
_1.style(_11.firstChild,"height",h2+"px");
var pl=0,_12=this.grid._columns;
for(i=0;i<this.count;i++){
var _13=r.cells[i];
_6.addClass(_13,"gridxLockedCell");
var s={height:h1+"px"};
s[ltr?"left":"right"]=pl+"px";
_6.style(_13,s);
pl+=_13.offsetWidth;
}
_11.style[ltr?"paddingLeft":"paddingRight"]=pl+"px";
_11.style.width=this.grid.bodyNode.offsetWidth-pl+"px";
_11.scrollLeft=this.grid.hScroller?this.grid.hScroller.domNode.scrollLeft:0;
},_updateHeader:function(){
var _14=_7(".gridxHeaderRowInner",this.grid.headerNode)[0];
var sl=_14.scrollLeft;
this._lockColumns(_14);
_14.scrollLeft=sl;
this._updateScroller();
},_updateBody:function(){
_5.forEach(this.grid.bodyNode.childNodes,this._lockColumns,this);
},_updateScroller:function(){
if(this.grid.hScroller){
this.grid.hScroller.refresh();
}
},_hackHScroller:function(){
var _15=this;
_2.mixin(this.grid.hScroller,{_doScroll:function(){
var _16=this.domNode.scrollLeft;
if(_15.count){
_5.forEach(this.grid.bodyNode.childNodes,function(_17){
_17.scrollLeft=_16;
if(_17.style.position=="absolute"){
var l=0;
_5.forEach(_17.firstChild.rows[0].cells,function(_18){
if(_1.hasClass(_18,"gridxLockedCell")){
_18.style.left=_16+l+"px";
l+=_18.offsetWidth;
}
});
}
});
}else{
this.grid.bodyNode.scrollLeft=_16;
}
this.grid.onHScroll(this.grid.hScroller._lastLeft);
}});
}});
});
