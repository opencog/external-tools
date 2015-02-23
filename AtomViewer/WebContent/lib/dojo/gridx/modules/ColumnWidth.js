//>>built
define("gridx/modules/ColumnWidth",["dojo/_base/declare","dojo/_base/array","dojo/_base/Deferred","dojo/_base/query","dojo/_base/sniff","dojo/dom-geometry","dojo/dom-class","dojo/dom-style","dojo/keys","../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
return _1(_a,{name:"columnWidth",forced:["hLayout"],getAPIPath:function(){
return {columnWidth:this};
},constructor:function(){
this._init();
},preload:function(){
var t=this,g=t.grid;
t._ready=new _3();
t.batchConnect([g.hLayout,"onUpdateWidth","_onUpdateWidth"],[g,"setColumns","_onSetColumns"]);
},load:function(){
this._adaptWidth();
this.loaded.callback();
},"default":60,autoResize:false,onUpdate:function(){
},_init:function(){
var t=this,g=t.grid,dn=g.domNode,_b=g._columns;
_2.forEach(_b,function(_c){
if(!_c.hasOwnProperty("declaredWidth")){
_c.declaredWidth=_c.width=_c.width||"auto";
}
});
if(g.autoWidth){
_2.forEach(_b,function(c){
if(c.declaredWidth=="auto"){
c.width=t.arg("default")+"px";
}
});
}else{
if(t.arg("autoResize")){
_7.add(dn,"gridxPercentColumnWidth");
_2.forEach(_b,function(c){
if(!(/%$/).test(c.declaredWidth)){
c.width="auto";
}
});
}
}
},_onUpdateWidth:function(){
var t=this,g=t.grid;
if(g.autoWidth){
t._adaptWidth();
}else{
var _d=g.hScrollerNode.style.display=="none";
t._adaptWidth(!_d,1);
if(!t.arg("autoResize")&&_d){
_4(".gridxCell",g.bodyNode).forEach(function(_e){
var _f=g._columnsById[_e.getAttribute("colId")];
if(t.arg("autoResize")||!_f.declaredWidth||_f.declaredWidth=="auto"||(/%$/).test(_f.declaredWidth)){
_e.style.width=_f.width;
}
});
}
t.onUpdate();
}
},_adaptWidth:function(_10,_11){
var t=this,g=t.grid,dn=g.domNode,_12=g.header,ltr=g.isLeftToRight(),_13=ltr?"marginLeft":"marginRight",_14=ltr?"marginRight":"marginLeft",_15=g.hLayout.lead,_16=g.hLayout.tail,_17=_12.innerNode,bs=g.bodyNode.style,hs=_17.style,_18=_6.getBorderExtents(_12.domNode).w,_19=_18,_1a=0,_1b=(dn.clientWidth||_8.get(dn,"width"))-_15-_16-_18,_1c=_4(".gridxCell",_17)[0],_1d=_1c?_6.getMarginBox(_1c).w-_6.getContentBox(_1c).w:0,_1e=!dn.offsetHeight;
if(_19===0){
_19=1;
}else{
_1a=2;
}
hs[_13]=_15+"px";
hs[_14]=(_16>_19?_16-_19:0)+"px";
g.mainNode.style[_13]=_15+"px";
g.mainNode.style[_14]=_16+"px";
_1b=_1b<0?0:_1b;
if(_10){
t.onUpdate();
return;
}
if(g.autoWidth){
var _1f=_4("th.gridxCell",_17),_20=0;
_1f.forEach(function(_21){
var w=_8.get(_21,"width");
if(!_5("safari")||!_1e){
w+=_1d;
}
_20+=w;
var c=g._columnsById[_21.getAttribute("colid")];
if(c.width=="auto"||(/%$/).test(c.width)){
_21.style.width=c.width=w+"px";
}
});
bs.width=_20+"px";
dn.style.width=(_15+_16+_20+_1a)+"px";
}else{
if(t.arg("autoResize")){
hs.borderWidth=g.vScrollerNode.style.display=="none"?0:"";
}else{
var _22=[],_23=g._columns,_24=0;
if(_5("safari")){
_1d=0;
}
_2.forEach(_23,function(c){
if(c.declaredWidth=="auto"){
_22.push(c);
}else{
if(/%$/.test(c.declaredWidth)){
var w=parseInt(_1b*parseFloat(c.declaredWidth,10)/100-_1d,10);
if(w<0){
w=0;
}
_12.getHeaderNode(c.id).style.width=c.width=w+"px";
}
}
});
_2.forEach(_23,function(c){
if(c.declaredWidth!="auto"){
var _25=_12.getHeaderNode(c.id),w=_5("safari")?parseFloat(_25.style.width,10):_25.offsetWidth||(_8.get(_25,"width")+_1d);
if(/%$/.test(c.declaredWidth)){
c.width=(w>_1d?w-_1d:0)+"px";
}
_24+=w;
}
});
if(_22.length){
var w=_1b>_24?((_1b-_24)/_22.length-_1d):t.arg("default"),ww=parseInt(w,10);
if(_1b>_24){
ww=_1b-_24-(ww+_1d)*(_22.length-1)-_1d;
}
w=parseInt(w,10);
if(w<0){
w=0;
}
if(ww<0){
ww=0;
}
_2.forEach(_22,function(c,i){
_12.getHeaderNode(c.id).style.width=c.width=(i<_22.length-1?w:ww)+"px";
});
}
}
}
g.hScroller.scroll(0);
_12._onHScroll(0);
g.vLayout.reLayout();
if(!_11){
t.onUpdate();
}
},_onSetColumns:function(){
var t=this,g=t.grid;
t._init();
g.header.refresh();
t._adaptWidth();
if(g.cellWidget){
g.cellWidget._init();
if(g.edit){
g.edit._init();
}
}
if(g.tree){
g.tree._initExpandLevel();
}
g.body.refresh();
}});
});
