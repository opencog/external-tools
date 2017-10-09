//>>built
define("gridx/modules/ColumnResizer",["dojo/_base/declare","dojo/_base/sniff","dojo/_base/window","dojo/_base/event","dojo/dom","dojo/dom-style","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/keys","dojo/query","../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
var _d=_7.remove;
function _e(e){
var _f=e.target;
if(_f){
if(/table/i.test(_f.tagName)){
var m=e.offsetX||e.layerX||0,i=0,_10=_f.rows[0].cells;
while(m>0&&_10[i]){
m-=_10[i].offsetWidth;
i++;
}
return _10[i]||null;
}
while(_f&&_f.tagName){
if(_f.tagName.toLowerCase()=="th"){
return _f;
}
_f=_f.parentNode;
}
}
return null;
};
return _1(_c,{name:"columnResizer",minWidth:20,detectWidth:5,load:function(_11){
var t=this,g=t.grid;
t.batchConnect([g.header.innerNode,"mousemove","_mousemove"],[g,"onHeaderMouseOut","_mouseout"],[g,"onHeaderMouseDown","_mousedown",t,t.name],[g,"onHeaderKeyDown","_keydown"],[_3.doc,"mousemove","_docMousemove"],[_3.doc,"onmouseup","_mouseup"]);
t.loaded.callback();
},getAPIPath:function(){
return {columnResizer:this};
},columnMixin:{setWidth:function(_12){
this.grid.columnResizer.setWidth(this.id,_12);
}},setWidth:function(_13,_14){
var t=this,g=t.grid,i,_15=g._columns,_16=t.arg("minWidth"),_17;
_14=parseInt(_14,10);
if(_14<_16){
_14=_16;
}
g._columnsById[_13].width=_14+"px";
for(i=0;i<_15.length;++i){
_15[i].declaredWidth=_15[i].width;
}
_b("[colid=\""+_13+"\"]",g.domNode).forEach(function(_18){
if(!_17){
_17=_6.get(_18,"width");
}
_18.style.width=_14+"px";
});
g.body.onRender();
g.vLayout.reLayout();
t.onResize(_13,_14,_17);
},onResize:function(){
},_mousemove:function(e){
var t=this,_19=_e(e),_1a=t.grid._eventFlags;
if(_19){
if(t._resizing){
_d(_19,"gridxHeaderCellOver");
}
if(t._resizing||!_19||t._ismousedown){
return;
}
var _1b=t._readyToResize=t._isInResizeRange(e);
_1a.onHeaderMouseDown=_1a.onHeaderCellMouseDown=_1b?t.name:undefined;
_7.toggle(_3.body(),"gridxColumnResizing",_1b);
if(_1b){
_d(_19,"gridxHeaderCellOver");
}
}
},_docMousemove:function(e){
if(this._resizing){
this._updateResizerPosition(e);
}
},_mouseout:function(e){
if(!this._resizing){
this._readyToResize=0;
_d(_3.body(),"gridxColumnResizing");
}
},_keydown:function(evt){
if((evt.keyCode==_a.LEFT_ARROW||evt.keyCode==_a.RIGHT_ARROW)&&evt.ctrlKey&&evt.shiftKey){
var _1c=evt.columnId,g=this.grid,dir=g.isLeftToRight()?1:-1,_1d=dir*2;
_b("[colid=\""+_1c+"\"]",g.header.domNode).forEach(function(_1e){
var _1f=_6.get(_1e,"width");
if(evt.keyCode==_a.LEFT_ARROW){
_1f-=_1d;
}else{
_1f+=_1d;
}
this.setWidth(_1c,_1f);
_4.stop(evt);
},this);
}
},_updateResizerPosition:function(e){
var t=this,_20=e.pageX-t._startX,_21=t._targetCell,g=t.grid,hs=g.hScroller,h=0,n,_22=e.pageX-t._gridX,_23=t.arg("minWidth"),ltr=this.grid.isLeftToRight();
if(!ltr){
_20=-_20;
}
if(_21.offsetWidth+_20<_23){
if(ltr){
_22=t._startX-t._gridX-_21.offsetWidth+_23;
}else{
_22=t._startX-t._gridX+(_21.offsetWidth-_23);
}
}
n=hs&&hs.container.offsetHeight?hs.container:g.bodyNode;
h=n.parentNode.offsetTop+n.offsetHeight-g.header.domNode.offsetTop;
_6.set(t._resizer,{top:g.header.domNode.offsetTop+"px",left:_22+"px",height:h+"px"});
},_showResizer:function(e){
var t=this;
if(!t._resizer){
t._resizer=_8.create("div",{className:"gridxColumnResizer"},t.grid.domNode,"last");
t.connect(t._resizer,"mouseup","_mouseup");
}
t._resizer.style.display="block";
t._updateResizerPosition(e);
},_hideResizer:function(){
this._resizer.style.display="none";
},_mousedown:function(e){
var t=this;
if(!t._readyToResize){
t._ismousedown=1;
return;
}
_5.setSelectable(t.grid.domNode,false);
_3.doc.onselectstart=function(){
return false;
};
t._resizing=1;
t._startX=e.pageX;
t._gridX=_9.position(t.grid.domNode).x;
t._showResizer(e);
},_mouseup:function(e){
var t=this;
t._ismousedown=0;
if(t._resizing){
t._resizing=0;
t._readyToResize=0;
_d(_3.body(),"gridxColumnResizing");
_5.setSelectable(t.grid.domNode,true);
_3.doc.onselectstart=null;
var _24=t._targetCell,_25=e.pageX-t._startX;
if(!t.grid.isLeftToRight()){
_25=-_25;
}
var w=(_2("webkit")?_24.offsetWidth:_6.get(_24,"width"))+_25,_26=t.arg("minWidth");
if(w<_26){
w=_26;
}
t.setWidth(_24.getAttribute("colid"),w);
t._hideResizer();
}
},_isInResizeRange:function(e){
var t=this,_27=_e(e),x=t._getCellX(e),_28=t.arg("detectWidth"),ltr=t.grid.isLeftToRight();
if(x<_28){
if(ltr){
return !!(t._targetCell=_27.previousSibling);
}else{
t._targetCell=_27;
return 1;
}
}else{
if(x>_27.offsetWidth-_28&&x<=_27.offsetWidth){
if(ltr){
t._targetCell=_27;
return 1;
}else{
return !!(t._targetCell=_27.previousSibling);
}
}
}
return 0;
},_getCellX:function(e){
var _29=e.target,_2a=_e(e);
if(!_2a){
return 100000;
}
if(/table/i.test(_29.tagName)){
return 0;
}
var lx=e.offsetX;
if(lx==undefined){
lx=e.layerX;
}
if(!/th/i.test(_29.tagName)){
lx+=_29.offsetLeft;
}
if(_2("ff")&&/th/i.test(_29.tagName)){
var ltr=this.grid.isLeftToRight();
var _2b=-parseInt(_6.get(_2a.parentNode.parentNode.parentNode,ltr?"marginLeft":"marginRight"));
if(!ltr){
_2b=this.grid.header.domNode.firstChild.scrollWidth-_2b-this.grid.header.innerNode.offsetWidth;
}
var d=lx-(_2a.offsetLeft-_2b);
if(d>=0){
lx=d;
}
if(lx>=_2a.offsetWidth){
lx=0;
}
}
return lx;
}});
});
