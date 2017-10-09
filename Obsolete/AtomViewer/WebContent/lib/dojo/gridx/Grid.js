/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

//>>built
require({cache:{"dojo/i18n":function(){
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
_3.add("dojo-preload-i18n-Api",1);
1||_3.add("dojo-v1x-i18n-Api",1);
var _a=_1.i18n={},_b=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_c=function(_d,_e,_f,_10){
for(var _11=[_f+_10],_12=_e.split("-"),_13="",i=0;i<_12.length;i++){
_13+=(_13?"-":"")+_12[i];
if(!_d||_d[_13]){
_11.push(_f+_13+"/"+_10);
}
}
return _11;
},_14={},_15=function(_16,_17,_18){
_18=_18?_18.toLowerCase():_1.locale;
_16=_16.replace(/\./g,"/");
_17=_17.replace(/\./g,"/");
return (/root/i.test(_18))?(_16+"/nls/"+_17):(_16+"/nls/"+_18+"/"+_17);
},_19=_1.getL10nName=function(_1a,_1b,_1c){
return _1a=_9.id+"!"+_15(_1a,_1b,_1c);
},_1d=function(_1e,_1f,_20,_21,_22,_23){
_1e([_1f],function(_24){
var _25=_6.clone(_24.root),_26=_c(!_24._v1x&&_24,_22,_20,_21);
_1e(_26,function(){
for(var i=1;i<_26.length;i++){
_25=_6.mixin(_6.clone(_25),arguments[i]);
}
var _27=_1f+"/"+_22;
_14[_27]=_25;
_23();
});
});
},_28=function(id,_29){
return /^\./.test(id)?_29(id):id;
},_2a=function(_2b){
var _2c=_5.extraLocale||[];
_2c=_6.isArray(_2c)?_2c:[_2c];
_2c.push(_2b);
return _2c;
},_2d=function(id,_2e,_2f){
if(_3("dojo-preload-i18n-Api")){
var _30=id.split("*"),_31=_30[1]=="preload";
if(_31){
if(!_14[id]){
_14[id]=1;
_32(_30[2],_8.parse(_30[3]),1,_2e);
}
_2f(1);
}
if(_31||_33(id,_2e,_2f)){
return;
}
}
var _34=_b.exec(id),_35=_34[1]+"/",_36=_34[5]||_34[4],_37=_35+_36,_38=(_34[5]&&_34[4]),_39=_38||_1.locale,_3a=_37+"/"+_39,_3b=_38?[_39]:_2a(_39),_3c=_3b.length,_3d=function(){
if(!--_3c){
_2f(_6.delegate(_14[_3a]));
}
};
_4.forEach(_3b,function(_3e){
var _3f=_37+"/"+_3e;
if(_3("dojo-preload-i18n-Api")){
_40(_3f);
}
if(!_14[_3f]){
_1d(_2e,_37,_35,_36,_3e,_3d);
}else{
_3d();
}
});
};
if(_3("dojo-unit-tests")){
var _41=_a.unitTests=[];
}
if(_3("dojo-preload-i18n-Api")||1){
var _42=_a.normalizeLocale=function(_43){
var _44=_43?_43.toLowerCase():_1.locale;
return _44=="root"?"ROOT":_44;
},_45=function(mid,_46){
return (1&&1)?_46.isXdUrl(_2.toUrl(mid+".js")):true;
},_47=0,_48=[],_32=_a._preloadLocalizations=function(_49,_4a,_4b,_4c){
_4c=_4c||_2;
function _4d(mid,_4e){
if(_45(mid,_4c)||_4b){
_4c([mid],_4e);
}else{
_5a([mid],_4e,_4c);
}
};
function _4f(_50,_51){
var _52=_50.split("-");
while(_52.length){
if(_51(_52.join("-"))){
return;
}
_52.pop();
}
_51("ROOT");
};
function _53(_54){
_54=_42(_54);
_4f(_54,function(loc){
if(_4.indexOf(_4a,loc)>=0){
var mid=_49.replace(/\./g,"/")+"_"+loc;
_47++;
_4d(mid,function(_55){
for(var p in _55){
_14[_2.toAbsMid(p)+"/"+loc]=_55[p];
}
--_47;
while(!_47&&_48.length){
_2d.apply(null,_48.shift());
}
});
return true;
}
return false;
});
};
_53();
_4.forEach(_1.config.extraLocale,_53);
},_33=function(id,_56,_57){
if(_47){
_48.push([id,_56,_57]);
}
return _47;
},_40=function(){
};
}
if(1){
var _58={},_59=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_5a=function(_5b,_5c,_5d){
var _5e=[];
_4.forEach(_5b,function(mid){
var url=_5d.toUrl(mid+".js");
function _2d(_5f){
var _60=_59(_5f,_40,mid,_58);
if(_60===_58){
_5e.push(_14[url]=_58.result);
}else{
if(_60 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_60);
_60={};
}
_5e.push(_14[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_60:{root:_60,_v1x:1}));
}
};
if(_14[url]){
_5e.push(_14[url]);
}else{
var _61=_5d.syncLoadNls(mid);
if(_61){
_5e.push(_61);
}else{
if(!_7){
try{
_5d.getText(url,true,_2d);
}
catch(e){
_5e.push(_14[url]={});
}
}else{
_7.get({url:url,sync:true,load:_2d,error:function(){
_5e.push(_14[url]={});
}});
}
}
}
});
_5c&&_5c.apply(null,_5e);
};
_40=function(_62){
for(var _63,_64=_62.split("/"),_65=_1.global[_64[0]],i=1;_65&&i<_64.length-1;_65=_65[_64[i++]]){
}
if(_65){
_63=_65[_64[i]];
if(!_63){
_63=_65[_64[i].replace(/-/g,"_")];
}
if(_63){
_14[_62]=_63;
}
}
return _63;
};
_a.getLocalization=function(_66,_67,_68){
var _69,_6a=_15(_66,_67,_68);
_2d(_6a,(!_45(_6a,_2)?function(_6b,_6c){
_5a(_6b,_6c,_2);
}:_2),function(_6d){
_69=_6d;
});
return _69;
};
if(_3("dojo-unit-tests")){
_41.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _6e;
_6e=_59("{prop:1}",_40,"nonsense",_58);
t.is({prop:1},_6e);
t.is(undefined,_6e[1]);
_6e=_59("({prop:1})",_40,"nonsense",_58);
t.is({prop:1},_6e);
t.is(undefined,_6e[1]);
_6e=_59("{'prop-x':1}",_40,"nonsense",_58);
t.is({"prop-x":1},_6e);
t.is(undefined,_6e[1]);
_6e=_59("({'prop-x':1})",_40,"nonsense",_58);
t.is({"prop-x":1},_6e);
t.is(undefined,_6e[1]);
_6e=_59("define({'prop-x':1})",_40,"nonsense",_58);
t.is(_58,_6e);
t.is({"prop-x":1},_58.result);
_6e=_59("define('some/module', {'prop-x':1})",_40,"nonsense",_58);
t.is(_58,_6e);
t.is({"prop-x":1},_58.result);
_6e=_59("this is total nonsense and should throw an error",_40,"nonsense",_58);
t.is(_6e instanceof Error,true);
});
});
}
}
return _6.mixin(_a,{dynamic:true,normalize:_28,load:_2d,cache:_14});
});
},"gridx/modules/ColumnResizer":function(){
define(["dojo/_base/declare","dojo/_base/sniff","dojo/_base/window","dojo/_base/event","dojo/dom","dojo/dom-style","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/keys","dojo/query","../core/_Module"],function(_6f,_70,win,_71,dom,_72,_73,_74,_75,_76,_77,_78){
var _79=_73.remove;
function _7a(e){
var _7b=e.target;
if(_7b){
if(/table/i.test(_7b.tagName)){
var m=e.offsetX||e.layerX||0,i=0,_7c=_7b.rows[0].cells;
while(m>0&&_7c[i]){
m-=_7c[i].offsetWidth;
i++;
}
return _7c[i]||null;
}
while(_7b&&_7b.tagName){
if(_7b.tagName.toLowerCase()=="th"){
return _7b;
}
_7b=_7b.parentNode;
}
}
return null;
};
return _6f(_78,{name:"columnResizer",minWidth:20,detectWidth:5,load:function(_7d){
var t=this,g=t.grid;
t.batchConnect([g.header.innerNode,"mousemove","_mousemove"],[g,"onHeaderMouseOut","_mouseout"],[g,"onHeaderMouseDown","_mousedown",t,t.name],[g,"onHeaderKeyDown","_keydown"],[win.doc,"mousemove","_docMousemove"],[win.doc,"onmouseup","_mouseup"]);
t.loaded.callback();
},getAPIPath:function(){
return {columnResizer:this};
},columnMixin:{setWidth:function(_7e){
this.grid.columnResizer.setWidth(this.id,_7e);
}},setWidth:function(_7f,_80){
var t=this,g=t.grid,i,_81=g._columns,_82=t.arg("minWidth"),_83;
_80=parseInt(_80,10);
if(_80<_82){
_80=_82;
}
g._columnsById[_7f].width=_80+"px";
for(i=0;i<_81.length;++i){
_81[i].declaredWidth=_81[i].width;
}
_77("[colid=\""+_7f+"\"]",g.domNode).forEach(function(_84){
if(!_83){
_83=_72.get(_84,"width");
}
_84.style.width=_80+"px";
});
g.body.onRender();
g.vLayout.reLayout();
t.onResize(_7f,_80,_83);
},onResize:function(){
},_mousemove:function(e){
var t=this,_85=_7a(e),_86=t.grid._eventFlags;
if(_85){
if(t._resizing){
_79(_85,"gridxHeaderCellOver");
}
if(t._resizing||!_85||t._ismousedown){
return;
}
var _87=t._readyToResize=t._isInResizeRange(e);
_86.onHeaderMouseDown=_86.onHeaderCellMouseDown=_87?t.name:undefined;
_73.toggle(win.body(),"gridxColumnResizing",_87);
if(_87){
_79(_85,"gridxHeaderCellOver");
}
}
},_docMousemove:function(e){
if(this._resizing){
this._updateResizerPosition(e);
}
},_mouseout:function(e){
if(!this._resizing){
this._readyToResize=0;
_79(win.body(),"gridxColumnResizing");
}
},_keydown:function(evt){
if((evt.keyCode==_76.LEFT_ARROW||evt.keyCode==_76.RIGHT_ARROW)&&evt.ctrlKey&&evt.shiftKey){
var _88=evt.columnId,g=this.grid,dir=g.isLeftToRight()?1:-1,_89=dir*2;
_77("[colid=\""+_88+"\"]",g.header.domNode).forEach(function(_8a){
var _8b=_72.get(_8a,"width");
if(evt.keyCode==_76.LEFT_ARROW){
_8b-=_89;
}else{
_8b+=_89;
}
this.setWidth(_88,_8b);
_71.stop(evt);
},this);
}
},_updateResizerPosition:function(e){
var t=this,_8c=e.pageX-t._startX,_8d=t._targetCell,g=t.grid,hs=g.hScroller,h=0,n,_8e=e.pageX-t._gridX,_8f=t.arg("minWidth"),ltr=this.grid.isLeftToRight();
if(!ltr){
_8c=-_8c;
}
if(_8d.offsetWidth+_8c<_8f){
if(ltr){
_8e=t._startX-t._gridX-_8d.offsetWidth+_8f;
}else{
_8e=t._startX-t._gridX+(_8d.offsetWidth-_8f);
}
}
n=hs&&hs.container.offsetHeight?hs.container:g.bodyNode;
h=n.parentNode.offsetTop+n.offsetHeight-g.header.domNode.offsetTop;
_72.set(t._resizer,{top:g.header.domNode.offsetTop+"px",left:_8e+"px",height:h+"px"});
},_showResizer:function(e){
var t=this;
if(!t._resizer){
t._resizer=_74.create("div",{className:"gridxColumnResizer"},t.grid.domNode,"last");
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
dom.setSelectable(t.grid.domNode,false);
win.doc.onselectstart=function(){
return false;
};
t._resizing=1;
t._startX=e.pageX;
t._gridX=_75.position(t.grid.domNode).x;
t._showResizer(e);
},_mouseup:function(e){
var t=this;
t._ismousedown=0;
if(t._resizing){
t._resizing=0;
t._readyToResize=0;
_79(win.body(),"gridxColumnResizing");
dom.setSelectable(t.grid.domNode,true);
win.doc.onselectstart=null;
var _90=t._targetCell,_91=e.pageX-t._startX;
if(!t.grid.isLeftToRight()){
_91=-_91;
}
var w=(_70("webkit")?_90.offsetWidth:_72.get(_90,"width"))+_91,_92=t.arg("minWidth");
if(w<_92){
w=_92;
}
t.setWidth(_90.getAttribute("colid"),w);
t._hideResizer();
}
},_isInResizeRange:function(e){
var t=this,_93=_7a(e),x=t._getCellX(e),_94=t.arg("detectWidth"),ltr=t.grid.isLeftToRight();
if(x<_94){
if(ltr){
return !!(t._targetCell=_93.previousSibling);
}else{
t._targetCell=_93;
return 1;
}
}else{
if(x>_93.offsetWidth-_94&&x<=_93.offsetWidth){
if(ltr){
t._targetCell=_93;
return 1;
}else{
return !!(t._targetCell=_93.previousSibling);
}
}
}
return 0;
},_getCellX:function(e){
var _95=e.target,_96=_7a(e);
if(!_96){
return 100000;
}
if(/table/i.test(_95.tagName)){
return 0;
}
var lx=e.offsetX;
if(lx==undefined){
lx=e.layerX;
}
if(!/th/i.test(_95.tagName)){
lx+=_95.offsetLeft;
}
if(_70("ff")&&/th/i.test(_95.tagName)){
var ltr=this.grid.isLeftToRight();
var _97=-parseInt(_72.get(_96.parentNode.parentNode.parentNode,ltr?"marginLeft":"marginRight"));
if(!ltr){
_97=this.grid.header.domNode.firstChild.scrollWidth-_97-this.grid.header.innerNode.offsetWidth;
}
var d=lx-(_96.offsetLeft-_97);
if(d>=0){
lx=d;
}
if(lx>=_96.offsetWidth){
lx=0;
}
}
return lx;
}});
});
},"dojo/dnd/autoscroll":function(){
define("dojo/dnd/autoscroll",["../_base/lang","../sniff","../_base/window","../dom-geometry","../dom-style","../window"],function(_98,has,win,_99,_9a,_9b){
var _9c={};
_98.setObject("dojo.dnd.autoscroll",_9c);
_9c.getViewport=_9b.getBox;
_9c.V_TRIGGER_AUTOSCROLL=32;
_9c.H_TRIGGER_AUTOSCROLL=32;
_9c.V_AUTOSCROLL_VALUE=16;
_9c.H_AUTOSCROLL_VALUE=16;
var _9d,doc=win.doc,_9e=Infinity,_9f=Infinity;
_9c.autoScrollStart=function(d){
doc=d;
_9d=_9b.getBox(doc);
var _a0=win.body(doc).parentNode;
_9e=Math.max(_a0.scrollHeight-_9d.h,0);
_9f=Math.max(_a0.scrollWidth-_9d.w,0);
};
_9c.autoScroll=function(e){
var v=_9d||_9b.getBox(doc),_a1=win.body(doc).parentNode,dx=0,dy=0;
if(e.clientX<_9c.H_TRIGGER_AUTOSCROLL){
dx=-_9c.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-_9c.H_TRIGGER_AUTOSCROLL){
dx=Math.min(_9c.H_AUTOSCROLL_VALUE,_9f-_a1.scrollLeft);
}
}
if(e.clientY<_9c.V_TRIGGER_AUTOSCROLL){
dy=-_9c.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-_9c.V_TRIGGER_AUTOSCROLL){
dy=Math.min(_9c.V_AUTOSCROLL_VALUE,_9e-_a1.scrollTop);
}
}
window.scrollBy(dx,dy);
};
_9c._validNodes={"div":1,"p":1,"td":1};
_9c._validOverflow={"auto":1,"scroll":1};
_9c.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_a2,_a3;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in _9c._validNodes)){
var s=_9a.getComputedStyle(n),_a4=(s.overflow.toLowerCase() in _9c._validOverflow),_a5=(s.overflowX.toLowerCase() in _9c._validOverflow),_a6=(s.overflowY.toLowerCase() in _9c._validOverflow);
if(_a4||_a5||_a6){
b=_99.getContentBox(n,s);
t=_99.position(n,true);
}
if(_a4||_a5){
w=Math.min(_9c.H_TRIGGER_AUTOSCROLL,b.w/2);
rx=e.pageX-t.x;
if(has("webkit")||has("opera")){
rx+=win.body().scrollLeft;
}
dx=0;
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
_a2=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_a4||_a6){
h=Math.min(_9c.V_TRIGGER_AUTOSCROLL,b.h/2);
ry=e.pageY-t.y;
if(has("webkit")||has("opera")){
ry+=win.body().scrollTop;
}
dy=0;
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
_a3=n.scrollTop;
n.scrollTop=n.scrollTop+dy;
}
}
if(dx||dy){
return;
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
_9c.autoScroll(e);
};
return _9c;
});
},"gridx/modules/dnd/_Base":function(){
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","../../core/_Module","./Avatar","./_Dnd"],function(_a7,_a8,_a9,_aa,_ab){
return _a7(_aa,{delay:2,enabled:true,canRearrange:true,copyWhenDragOut:false,avatar:_ab,preload:function(_ac){
var dnd=this.grid.dnd._dnd;
dnd.register(this.name,this);
dnd.avatar=this.arg("avatar");
},checkArg:function(_ad,arr){
var arg=this.arg(_ad);
return (arg&&_a9.isObject(arg))?_a8.some(arr,function(v){
return arg[v];
}):arg;
}});
});
},"gridx/modules/dnd/_Dnd":function(){
define("gridx/modules/dnd/_Dnd",["dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/dom-construct","dojo/dom-geometry","dojo/dom-class","dojo/dom-style","dojo/dom","dojo/_base/window","dojo/_base/sniff","dojo/dnd/Source","dojo/dnd/Manager","../../core/_Module","../AutoScroll"],function(_ae,_af,_b0,_b1,_b2,_b3,_b4,dom,win,_b5,_b6,_b7,_b8){
var _b9=_af.hitch;
return _b8.register(_ae(_b8,{name:"_dnd",constructor:function(){
var t=this,g=t.grid,doc=win.doc;
t.accept=[];
t._profiles={};
t._selectStatus={};
t._node=_b1.create("div");
t.batchConnect([g,"onCellMouseOver","_checkDndReady"],[g,"onCellMouseOut","_dismissDndReady"],[g,"onCellMouseDown","_beginDnd"],[doc,"onmouseup","_endDnd"],[doc,"onmousemove","_onMouseMove"]);
t.subscribe("/dnd/cancel","_endDnd");
},load:function(_ba){
var t=this,n=t.grid.mainNode;
t._source=new _b6(n,{isSource:false,accept:t.accept,getSelectedNodes:function(){
return [0];
},getItem:_b9(t,"_getItem"),checkAcceptance:_b9(t,"_checkAcceptance"),onDraggingOver:_b9(t,"_onDraggingOver"),onDraggingOut:_b9(t,"_onDraggingOut"),onDropExternal:_b9(t,"_onDropExternal"),onDropInternal:_b9(t,"_onDropInternal")});
if(_b5("ff")){
t._fixFF(t._source,n);
}
t._source.grid=t.grid;
t._saveSelectStatus();
t.loaded.callback();
},destroy:function(){
this.inherited(arguments);
this._source.destroy();
_b1.destroy(this._node);
},getAPIPath:function(){
return {dnd:{_dnd:this}};
},profile:null,register:function(_bb,_bc){
this._profiles[_bb]=_bc;
[].push.apply(this.accept,_bc.arg("accept"));
},_fixFF:function(_bd){
return this.connect(win.doc,"onmousemove",function(evt){
var pos=_b2.position(_bd.node),x=evt.clientX,y=evt.clientY,_be=_bd._alreadyIn,_bf=y>=pos.y&&y<=pos.y+pos.h&&x>=pos.x&&x<=pos.x+pos.w;
if(!_be&&_bf){
_bd._alreadyIn=1;
_bd.onOverEvent();
}else{
if(_be&&!_bf){
_bd._alreadyIn=0;
_bd.onOutEvent();
}
}
});
},_onMouseMove:function(evt){
var t=this;
if(t._alreadyIn&&(t._dnding||t._extDnding)){
t._markTargetAnchor(evt);
}
},_saveSelectStatus:function(_c0){
var _c1,_c2,_c3=this.grid.select;
if(_c3){
for(_c1 in _c3){
_c2=_c3[_c1];
if(_c2&&_af.isObject(_c2)){
this._selectStatus[_c1]=_c2.arg("enabled");
if(_c0!==undefined){
_c2.enabled=_c0;
}
}
}
}
},_loadSelectStatus:function(){
var _c4,_c5,_c6=this.grid.select;
if(_c6){
for(_c4 in _c6){
_c5=_c6[_c4];
if(_c5&&_af.isObject(_c5)){
_c5.enabled=this._selectStatus[_c4];
}
}
}
},_checkDndReady:function(evt){
var t=this,_c7,p;
if(!t._dndReady&&!t._dnding&&!t._extDnding){
for(_c7 in t._profiles){
p=t._profiles[_c7];
if(p.arg("enabled")&&p._checkDndReady(evt)){
t.profile=p;
t._saveSelectStatus(false);
_b3.add(win.body(),"gridxDnDReadyCursor");
t._dndReady=1;
return;
}
}
}
},_dismissDndReady:function(){
if(this._dndReady){
this._loadSelectStatus();
this._dndReady=0;
_b3.remove(win.body(),"gridxDnDReadyCursor");
}
},_beginDnd:function(evt){
var t=this;
t._checkDndReady(evt);
if(t._dndReady){
var p=t.profile,m=_b7.manager();
t._source.isSource=true;
t._source.canNotDragOut=!p.arg("provide").length;
t._node.innerHTML=p._buildDndNodes();
t._oldStartDrag=m.startDrag;
m.startDrag=_b9(t,"_startDrag",evt);
if(t.avatar){
t._oldMakeAvatar=m.makeAvatar;
m.makeAvatar=function(){
return new t.avatar(m);
};
}
m._dndInfo={cssName:p._cssName,count:p._getDndCount()};
p._onBeginDnd(t._source);
dom.setSelectable(t.grid.domNode,false);
}
},_endDnd:function(){
var t=this,m=_b7.manager();
t._source.isSource=false;
t._alreadyIn=0;
delete m._dndInfo;
if(t._oldStartDrag){
m.startDrag=t._oldStartDrag;
delete t._oldStartDrag;
}
if(t._oldMakeAvatar){
m.makeAvatar=t._oldMakeAvatar;
delete t._oldMakeAvatar;
}
if(t._dndReady||t._dnding||t._extDnding){
t._dnding=t._extDnding=0;
t._destroyUI();
dom.setSelectable(t.grid.domNode,true);
_b3.remove(win.body(),"gridxDnDReadyCursor");
t.profile._onEndDnd();
t._loadSelectStatus();
}
},_createUI:function(){
_b3.add(win.body(),"gridxDnDCursor");
if(this.grid.autoScroll){
this.profile._onBeginAutoScroll();
this.grid.autoScroll.enabled=true;
}
},_destroyUI:function(){
var t=this;
t._unmarkTargetAnchor();
_b3.remove(win.body(),"gridxDnDCursor");
if(t.grid.autoScroll){
t.profile._onEndAutoScroll();
t.grid.autoScroll.enabled=false;
}
},_createTargetAnchor:function(){
return _b1.create("div",{"class":"gridxDnDAnchor"});
},_markTargetAnchor:function(evt){
var t=this;
if(t._extDnding||t.profile.arg("canRearrange")){
var _c8=t._targetAnchor,_c9=_b2.position(t.grid.mainNode);
if(!_c8){
_c8=t._targetAnchor=t._createTargetAnchor();
_c8.style.display="none";
t.grid.mainNode.appendChild(_c8);
}
_b3.add(_c8,"gridxDnDAnchor"+t.profile._cssName);
var pos=t.profile._calcTargetAnchorPos(evt,_c9);
if(pos){
_b4.set(_c8,pos);
_c8.style.display="block";
}else{
_c8.style.display="none";
}
}
},_unmarkTargetAnchor:function(){
var _ca=this._targetAnchor;
if(_ca){
_ca.style.display="none";
_b3.remove(_ca,"gridxDnDAnchor"+this.profile._cssName);
}
},_startDrag:function(evt,_cb,_cc,_cd){
var t=this;
if(t._dndReady&&_cb===t._source){
t._oldStartDrag.call(_b7.manager(),_cb,t._node.childNodes,_cd);
t._dndReady=0;
t._dnding=t._alreadyIn=1;
t._createUI();
t._markTargetAnchor(evt);
}
},_getItem:function(id){
return {type:this.profile.arg("provide"),data:this.profile._getItemData(id)};
},_checkAcceptance:function(_ce,_cf){
var t=this,_d0=function(arr){
var res={};
for(var i=arr.length-1;i>=0;--i){
res[arr[i]]=1;
}
return res;
},_d1=_b6.prototype.checkAcceptance,res=_d1.apply(t._source,arguments);
if(res){
if(_ce.grid===t.grid){
return t.profile.arg("canRearrange");
}
if(!_ce.canNotDragOut){
for(var _d2 in t._profiles){
var p=t._profiles[_d2];
var _d3=_d1.apply({accept:_d0(p.arg("accept"))},arguments);
if(p.arg("enabled")&&_d3&&(!p.checkAcceptance||p.checkAcceptance.apply(p,arguments))){
t.profile=p;
t._extDnding=1;
return true;
}
}
}
}
return false;
},_onDraggingOver:function(){
var t=this;
if(t._dnding||t._extDnding){
t._alreadyIn=1;
t._createUI();
}
},_onDraggingOut:function(){
var t=this;
if(t._dnding||t._extDnding){
t._alreadyIn=0;
t._destroyUI();
}
},_onDropInternal:function(_d4,_d5){
this.profile._onDropInternal(_d4,_d5);
},_onDropExternal:function(_d6,_d7,_d8){
var t=this,_d9=t.profile._onDropExternal(_d6,_d7,_d8);
_b0.when(_d9,function(){
if(!_d8){
if(_d6.grid){
_d6.grid.dnd._dnd.profile.onDraggedOut(t._source);
}else{
_d6.deleteSelectedNodes();
}
}
});
}}));
});
},"gridx/modules/Body":function(){
define("gridx/modules/Body",["dojo/_base/declare","dojo/_base/query","dojo/_base/array","dojo/_base/lang","dojo/json","dojo/dom-construct","dojo/dom-class","dojo/_base/Deferred","dojo/_base/sniff","dojo/keys","../core/_Module","../core/util","dojo/i18n!../nls/Body"],function(_da,_db,_dc,_dd,_de,_df,_e0,_e1,_e2,_e3,_e4,_e5,nls){
return _da(_e4,{name:"body",optional:["tree"],getAPIPath:function(){
return {body:this};
},constructor:function(){
var t=this,m=t.model,g=t.grid,dn=t.domNode=g.bodyNode,_e6=function(){
t.refresh();
};
if(t.arg("rowHoverEffect")){
_e0.add(dn,"gridxBodyRowHoverEffect");
}
g.emptyNode.innerHTML=t.arg("loadingInfo",nls.loadingInfo);
g._connectEvents(dn,"_onMouseEvent",t);
t.aspect(m,"onDelete","_onDelete");
t.aspect(m,"onSet","_onSet");
t.aspect(g,"onRowMouseOver","_onRowMouseOver");
t.aspect(g,"onCellMouseOver","_onCellMouseOver");
t.aspect(g,"onCellMouseOut","_onCellMouseOver");
t.connect(g.bodyNode,"onmouseleave",function(){
_db("> .gridxRowOver",t.domNode).removeClass("gridxRowOver");
});
t.connect(g.bodyNode,"onmouseover",function(e){
if(e.target==g.bodyNode){
_db("> .gridxRowOver",t.domNode).removeClass("gridxRowOver");
}
});
t.aspect(g,"setStore",_e6);
},preload:function(){
this._initFocus();
},load:function(_e7){
var t=this,m=t.model,g=t.grid,_e8=function(){
t.aspect(m,"onSizeChange","_onSizeChange");
t.loaded.callback();
};
m.when({},function(){
t.rootCount=t.rootCount||m.size();
t.visualCount=g.tree?g.tree.getVisualSize(t.rootStart,t.rootCount):t.rootCount;
_e8();
}).then(null,function(e){
t._loadFail(e);
_e8();
});
},destroy:function(){
this.inherited(arguments);
this.domNode.innerHTML="";
},rowMixin:{node:function(){
return this.grid.body.getRowNode({rowId:this.id});
},visualIndex:function(){
var t=this,id=t.id;
return t.grid.body.getRowInfo({rowId:id,rowIndex:t.index(),parentId:t.model.parentId(id)}).visualIndex;
}},cellMixin:{node:function(){
return this.grid.body.getCellNode({rowId:this.row.id,colId:this.column.id});
}},rowHoverEffect:true,stuffEmptyCell:true,renderWholeRowOnSet:false,compareOnSet:function(v1,v2){
return typeof v1=="object"&&typeof v2=="object"?_de.stringify(v1)==_de.stringify(v2):v1===v2;
},getRowNode:function(_e9){
if(this.model.isId(_e9.rowId)&&_e2("ie")){
return this._getRowNode(_e9.rowId);
}else{
var _ea=this._getRowNodeQuery(_e9);
return _ea&&_db("> "+_ea,this.domNode)[0]||null;
}
},_getRowNode:function(id){
for(var i=0,_eb=this.domNode.childNodes,row;row=_eb[i];++i){
if(row.getAttribute("rowid")==id){
return row;
}
}
return null;
},getCellNode:function(_ec){
var t=this,_ed=_ec.colId,_ee=t.grid._columns,r=t._getRowNodeQuery(_ec);
if(r){
if(!_ed&&_ee[_ec.colIndex]){
_ed=_ee[_ec.colIndex].id;
}
var c=" [colid='"+_ed+"'].gridxCell";
if(t.model.isId(_ec.rowId)&&_e2("ie")){
var _ef=t._getRowNode(_ec.rowId);
return _db(c,_ef)[0]||null;
}else{
return _db(r+c,t.domNode)[0]||null;
}
}
return null;
},getRowInfo:function(_f0){
var t=this,m=t.model,g=t.grid,id=_f0.rowId;
if(m.isId(id)){
_f0.rowIndex=m.idToIndex(id);
_f0.parentId=m.parentId(id);
}
if(typeof _f0.rowIndex=="number"&&_f0.rowIndex>=0){
_f0.visualIndex=g.tree?g.tree.getVisualIndexByRowInfo(_f0.parentId,_f0.rowIndex,t.rootStart):_f0.rowIndex-t.rootStart;
}else{
if(typeof _f0.visualIndex=="number"&&_f0.visualIndex>=0){
if(g.tree){
var _f1=g.tree.getRowInfoByVisualIndex(_f0.visualIndex,t.rootStart);
_f0.rowIndex=_f1.start;
_f0.parentId=_f1.parentId;
}else{
_f0.rowIndex=t.rootStart+_f0.visualIndex;
}
}else{
return _f0;
}
}
_f0.rowId=m.isId(id)?id:m.indexToId(_f0.rowIndex,_f0.parentId);
return _f0;
},refresh:function(_f2){
var t=this;
delete t._err;
return t.model.when({}).then(function(){
var rs=t.renderStart,rc=t.renderCount;
if(typeof _f2=="number"&&_f2>=0){
_f2=rs>_f2?rs:_f2;
var _f3=rs+rc-_f2,n=_db("> [visualindex=\""+_f2+"\"]",t.domNode)[0],_f4=[],_f5=[];
if(n){
var _f6=t._buildRows(_f2,_f3,_f4,_f5);
if(_f6){
_df.place(_f6,n,"before");
}
}
while(n){
var tmp=n.nextSibling,_f7=parseInt(n.getAttribute("visualindex"),10),id=n.getAttribute("rowid");
_df.destroy(n);
if(_f7>=_f2+_f3){
t.onUnrender(id);
}
n=tmp;
}
_dc.forEach(_f5,t.onAfterRow,t);
_e1.when(t._buildUncachedRows(_f4),function(){
t.onRender(_f2,_f3);
t.onForcedScroll();
});
}else{
t.renderRows(rs,rc,0,1);
t.onForcedScroll();
}
},function(e){
t._loadFail(e);
});
},refreshCell:function(_f8,_f9){
var d=new _e1(),t=this,m=t.model,g=t.grid,col=g._columns[_f9],_fa=col&&t.getCellNode({visualIndex:_f8,colId:col.id});
if(_fa){
var _fb,_fc=t.getRowInfo({visualIndex:_f8}),idx=_fc.rowIndex,pid=_fc.parentId;
m.when({start:idx,count:1,parentId:pid},function(){
_fb=m.byIndex(idx,pid);
if(_fb){
_fc.rowId=m.indexToId(idx,pid);
var _fd=g.tree&&_fb.data[col.id]===undefined;
var _fe=g.cell(_fc.rowId,col.id,1);
_fa.innerHTML=t._buildCellContent(_fe,_fd);
t.onAfterCell(_fe);
}
}).then(function(){
d.callback(!!_fb);
});
return d;
}
d.callback(false);
return d;
},rootStart:0,rootCount:0,renderStart:0,renderCount:0,visualStart:0,visualCount:0,autoUpdate:true,autoChangeSize:true,updateRootRange:function(_ff,_100){
var t=this,tree=t.grid.tree,vc=t.visualCount=tree?tree.getVisualSize(_ff,_100):_100;
t.rootStart=_ff;
t.rootCount=_100;
if(t.renderStart+t.renderCount>vc){
t.renderStart=vc-t.renderCount;
if(t.renderStart<0){
t.renderStart=0;
t.renderCount=vc;
}
}
if(!t.renderCount&&vc){
t.onForcedScroll();
}
},renderRows:function(_101,_102,_103,_104){
var t=this,g=t.grid,str="",_105=[],_106=[],n=t.domNode,en=g.emptyNode,_107=t.arg("emptyInfo",nls.emptyInfo),_108="";
if(t._err){
return;
}
if(_102>0){
en.innerHTML=t.arg("loadingInfo",nls.loadingInfo);
en.style.zIndex="";
if(_103!="top"&&_103!="bottom"){
t.model.free();
}
str=t._buildRows(_101,_102,_105,_106);
if(_103=="top"){
t.renderCount+=t.renderStart-_101;
t.renderStart=_101;
_df.place(str,n,"first");
}else{
if(_103=="bottom"){
t.renderCount=_101+_102-t.renderStart;
_df.place(str,n,"last");
}else{
t.renderStart=_101;
t.renderCount=_102;
var _109=_104?n.scrollTop:0;
n.scrollTop=0;
if(_e2("ie")){
while(n.childNodes.length){
n.removeChild(n.firstChild);
}
}
n.innerHTML=str;
if(_109){
n.scrollTop=_109;
}
n.scrollLeft=g.hScrollerNode.scrollLeft;
_108=str?"":_107;
if(!str){
en.style.zIndex=1;
}
t.onUnrender();
}
}
_dc.forEach(_106,t.onAfterRow,t);
_e1.when(t._buildUncachedRows(_105),function(){
en.innerHTML=_108;
t.onRender(_101,_102);
});
}else{
if(!{top:1,bottom:1}[_103]){
n.scrollTop=0;
if(_e2("ie")){
while(n.childNodes.length){
n.removeChild(n.firstChild);
}
}
n.innerHTML="";
en.innerHTML=_107;
en.style.zIndex=1;
t.onUnrender();
t.onEmpty();
t.model.free();
}
}
},unrenderRows:function(_10a,_10b){
if(_10a>0){
var t=this,i=0,id,bn=t.domNode;
if(_10b=="post"){
for(;i<_10a&&bn.lastChild;++i){
id=bn.lastChild.getAttribute("rowid");
t.model.free(id);
bn.removeChild(bn.lastChild);
t.onUnrender(id);
}
}else{
var tp=bn.scrollTop;
for(;i<_10a&&bn.firstChild;++i){
id=bn.firstChild.getAttribute("rowid");
t.model.free(id);
tp-=bn.firstChild.offsetHeight;
bn.removeChild(bn.firstChild);
t.onUnrender(id);
}
t.renderStart+=i;
bn.scrollTop=tp>0?tp:0;
}
t.renderCount-=i;
t.model.when();
}
},onAfterRow:function(){
},onAfterCell:function(){
},onRender:function(){
},onUnrender:function(){
},onDelete:function(){
},onSet:function(){
},onMoveToCell:function(){
},onEmpty:function(){
},onForcedScroll:function(){
},collectCellWrapper:function(){
},_getRowNodeQuery:function(args){
var r;
if(this.model.isId(args.rowId)){
r="[rowid='"+args.rowId+"']";
}else{
if(typeof args.rowIndex=="number"&&args.rowIndex>=0){
r="[rowindex='"+args.rowIndex+"']";
if(args.parentId){
r+="[parentid='"+args.parentId+"']";
}
}else{
if(typeof args.visualIndex=="number"&&args.visualIndex>=0){
r="[visualindex='"+args.visualIndex+"']";
}
}
}
return r&&r+".gridxRow";
},_buildRows:function(_10c,_10d,_10e,_10f){
var t=this,i,end=_10c+_10d,s=[],g=t.grid,m=t.model,w=t.domNode.scrollWidth;
for(i=_10c;i<end;++i){
var _110=t.getRowInfo({visualIndex:i}),row=g.row(_110.rowId,1);
s.push("<div class=\"gridxRow ",i%2?"gridxRowOdd":"","\" role=\"row\" visualindex=\"",i);
if(row){
m.keep(row.id);
s.push("\" rowid=\"",row.id,"\" rowindex=\"",_110.rowIndex,"\" parentid=\"",_110.parentId,"\">",t._buildCells(row),"</div>");
_10f.push(row);
}else{
s.push("\"><div class=\"gridxRowDummy\" style=\"width:",w,"px;\"></div></div>");
_110.start=_110.rowIndex;
_110.count=1;
_10e.push(_110);
}
}
return s.join("");
},_buildUncachedRows:function(_111){
var t=this;
return _111.length&&t.model.when(_111,function(){
try{
_dc.forEach(_111,t._buildRowContent,t);
}
catch(e){
t._loadFail(e);
}
}).then(null,function(e){
t._loadFail(e);
});
},_loadFail:function(e){
console.error(e);
var en=this.grid.emptyNode;
en.innerHTML=this.arg("loadFailInfo",nls.loadFailInfo);
en.style.zIndex=1;
this.domNode.innerHTML="";
this._err=1;
},_buildRowContent:function(_112){
var t=this,n=_db("> [visualindex=\""+_112.visualIndex+"\"]",t.domNode)[0];
if(n){
var row=t.grid.row(_112.rowIndex,0,_112.parentId);
if(row){
t.model.keep(row.id);
n.setAttribute("rowid",row.id);
n.setAttribute("rowindex",_112.rowIndex);
n.setAttribute("parentid",_112.parentId||"");
n.innerHTML=t._buildCells(row);
t.onAfterRow(row);
}else{
throw new Error("Row is not in cache:"+_112.rowIndex);
}
}
},_buildCells:function(row){
var col,cell,_113,cls,_114,i,len,t=this,g=t.grid,_115=g._columns,_116=row.data(),_117=g.focus&&(g.focus.currentArea()=="body"),sb=["<table class=\"gridxRowTable\" role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr>"];
for(i=0,len=_115.length;i<len;++i){
col=_115[i];
_113=g.tree&&_116[col.id]===undefined;
cell=g.cell(row.id,col.id,1);
cls=(_dd.isFunction(col["class"])?col["class"](cell):col["class"])||"";
_114=(_dd.isFunction(col.style)?col.style(cell):col.style)||"";
sb.push("<td aria-describedby=\"",(g.id+"-"+col.id).replace(/\s+/,""),"\" class=\"gridxCell ");
if(_113){
sb.push("gridxPaddingCell");
}
if(_117&&t._focusCellRow===row.visualIndex()&&t._focusCellCol===i){
sb.push("gridxCellFocus");
}
sb.push(cls,"\" aria-readonly=\"true\" role=\"gridcell\" tabindex=\"-1\" colid=\"",col.id,"\" style=\"width: ",col.width,"; ",_114,"\">",t._buildCellContent(cell,_113),"</td>");
}
sb.push("</tr></table>");
return sb.join("");
},_buildCellContent:function(cell,_118){
var r="",col=cell.column,row=cell.row,data=cell.data();
if(!_118){
var s=col.decorator?col.decorator(data,row.id,row.visualIndex()):data;
r=this._wrapCellData(s,row.id,col.id);
}
return (r===""||r===null||r===undefined)&&(_e2("ie")<8||this.arg("stuffEmptyCell"))?"&nbsp;":r;
},_wrapCellData:function(_119,_11a,_11b){
var _11c=[];
this.collectCellWrapper(_11c,_11a,_11b);
var i=_11c.length-1;
if(i>0){
_11c.sort(function(a,b){
a.priority=a.priority||0;
b.priority=b.priority||0;
return a.priority-b.priority;
});
}
for(;i>=0;--i){
_119=_11c[i].wrap(_119,_11a,_11b);
}
return _119;
},_onMouseEvent:function(_11d,e){
var g=this.grid,_11e="onCell"+_11d,_11f="onRow"+_11d;
if(g._isConnected(_11e)||g._isConnected(_11f)){
this._decorateEvent(e);
if(e.rowId){
if(e.columnId){
g[_11e](e);
}
g[_11f](e);
}
}
},_decorateEvent:function(e){
var n=e.target||e.originalTarget,g=this.grid,tag;
for(;n&&n!=g.bodyNode;n=n.parentNode){
tag=n.tagName&&n.tagName.toLowerCase();
if(tag=="td"&&_e0.contains(n,"gridxCell")){
var col=g._columnsById[n.getAttribute("colid")];
e.cellNode=n;
e.columnId=col.id;
e.columnIndex=col.index;
}
if(tag=="div"&&_e0.contains(n,"gridxRow")){
e.rowId=n.getAttribute("rowid");
e.parentId=n.getAttribute("parentid");
e.rowIndex=parseInt(n.getAttribute("rowindex"),10);
e.visualIndex=parseInt(n.getAttribute("visualindex"),10);
return;
}
}
},_onSet:function(id,_120,_121,_122){
var t=this;
if(t.autoUpdate&&_121){
var g=t.grid,row=g.row(id,1),_123=row&&row.node();
if(_123){
var _124=_121.data,_125=_122.data,cols=g._columns,_126=t.arg("renderWholeRowOnSet"),_127=t.arg("compareOnSet");
if(_126){
_123.innerHTML=t._buildCells(row);
t.onAfterRow(row);
t.onSet(row);
t.onRender(_120,1);
}else{
_dc.forEach(cols,function(col){
if(!_127(_124[col.id],_125[col.id])){
var _128=g.tree&&_124[col.id]===undefined,cell=row.cell(col.id,1);
cell.node().innerHTML=t._buildCellContent(cell,_128);
t.onAfterCell(cell);
}
});
}
}
}
},_onDelete:function(id){
var t=this;
if(t.autoUpdate){
var node=t.getRowNode({rowId:id});
if(node){
var sn,_129=0,_12a=parseInt(node.getAttribute("rowindex"),10),pid=node.getAttribute("parentid"),pids={},_12b=[node],rid,ids=[id],vidx;
pids[id]=1;
for(sn=node.nextSibling;sn&&pids[sn.getAttribute("parentid")];sn=sn.nextSibling){
rid=sn.getAttribute("rowid");
ids.push(rid);
_12b.push(sn);
pids[rid]=1;
}
for(;sn;sn=sn.nextSibling){
if(sn.getAttribute("parentid")==pid){
sn.setAttribute("rowindex",parseInt(sn.getAttribute("rowindex"),10)-1);
}
vidx=parseInt(sn.getAttribute("visualindex"),10)-_12b.length;
sn.setAttribute("visualindex",vidx);
_e0.toggle(sn,"gridxRowOdd",vidx%2);
++_129;
}
t.renderCount-=_12b.length;
_dc.forEach(_12b,_df.destroy);
_dc.forEach(ids,t.onUnrender,t);
if(t.autoChangeSize&&t.rootStart===0&&!pid){
t.updateRootRange(0,t.rootCount-1);
}
t.onDelete(id,_12a);
t.onRender(_12a,_129);
}
}
},_onSizeChange:function(size,_12c){
var t=this;
if(t.autoChangeSize&&t.rootStart===0&&(t.rootCount===_12c||_12c<0)){
t.updateRootRange(0,size);
t.refresh();
}
},_onRowMouseOver:function(e){
var _12d=_db("> div.gridxRowOver",this.domNode)[0],_12e=this.getRowNode({rowId:e.rowId});
if(_12d!=_12e){
if(_12d){
_e0.remove(_12d,"gridxRowOver");
}
if(_12e){
_e0.add(_12e,"gridxRowOver");
}
}
},_onCellMouseOver:function(e){
_e0.toggle(e.cellNode,"gridxCellOver",e.type=="mouseover");
},_focusCellCol:0,_focusCellRow:0,_initFocus:function(){
var t=this,g=t.grid,ltr=g.isLeftToRight(),bn=g.bodyNode,_12f=g.focus,c="connect";
if(_12f){
_12f.registerArea({name:"body",priority:1,focusNode:bn,scope:t,doFocus:t._doFocus,doBlur:t._blurCell,onFocus:t._onFocus,onBlur:t._blurCell});
t[c](g.mainNode,"onkeypress",function(evt){
if(_12f.currentArea()=="body"&&(!g.tree||!evt.ctrlKey)){
_12f._noBlur=1;
var dk=_e3,arr={},dir=ltr?1:-1;
arr[dk.LEFT_ARROW]=[0,-dir,evt];
arr[dk.RIGHT_ARROW]=[0,dir,evt];
arr[dk.UP_ARROW]=[-1,0,evt];
arr[dk.DOWN_ARROW]=[1,0,evt];
t._moveFocus.apply(t,arr[evt.keyCode]||[]);
_12f._noBlur=0;
}
});
t[c](g,"onCellClick",function(evt){
t._focusCellRow=evt.visualIndex;
t._focusCellCol=evt.columnIndex;
});
t[c](t,"onRender",function(_130,_131){
if(t._focusCellRow>=_130&&t._focusCellRow<_130+_131&&_12f.currentArea()=="body"){
t._focusCell();
}
});
t[c](g.emptyNode,"onfocus",function(){
_12f.focusArea("body");
});
}
},_doFocus:function(evt){
return this._focusCell(evt)||this._focusCell(0,-1,-1);
},_focusCell:function(evt,_132,_133){
var t=this,g=t.grid;
g.focus.stopEvent(evt);
_133=_133>=0?_133:t._focusCellCol;
_132=_132>=0?_132:t._focusCellRow;
var _134=g._columns[_133].id,n=t.getCellNode({visualIndex:_132,colId:_134});
if(n){
var _135=_db(".gridxCellFocus",t.domNode)[0];
if(n!=_135){
if(_135){
_e0.remove(_135,"gridxCellFocus");
}
_e0.add(n,"gridxCellFocus");
t._focusCellRow=_132;
t._focusCellCol=_133;
g.header._focusHeaderId=_134;
}
g.hScroller.scrollToColumn(_134);
if(_e2("ie")<8){
var _136=g.bodyNode.scrollLeft;
n.focus();
g.bodyNode.scrollLeft=_136;
}else{
n.focus();
}
}else{
if(!g.rowCount()){
g.emptyNode.focus();
return true;
}
}
return n;
},_moveFocus:function(_137,_138,evt){
if(_137||_138){
var r,c,t=this,g=t.grid,cols=g._columns,vc=t.visualCount;
g.focus.stopEvent(evt);
r=t._focusCellRow+_137;
r=r<0?0:(r>=vc?vc-1:r);
c=t._focusCellCol+_138;
c=c<0?0:(c>=cols.length?cols.length-1:c);
g.vScroller.scrollToRow(r).then(function(){
t._focusCell(0,r,c);
t.onMoveToCell(r,c,evt);
});
}
},_nextCell:function(r,c,dir,_139){
var d=new _e1(),g=this.grid,cc=g._columns.length,rc=this.visualCount;
do{
c+=dir;
if(c<0||c>=cc){
r+=dir;
c=c<0?cc-1:0;
if(r<0){
r=rc-1;
c=cc-1;
}else{
if(r>=rc){
r=0;
c=0;
}
}
}
}while(!_139(r,c));
g.vScroller.scrollToRow(r).then(function(){
d.callback({r:r,c:c});
});
return d;
},_blurCell:function(){
var n=_db(".gridxCellFocus",this.domNode)[0];
if(n){
_e0.remove(n,"gridxCellFocus");
}
return true;
},_onFocus:function(evt){
for(var n=evt.target,t=this;n&&n!=t.domNode;n=n.parentNode){
if(_e0.contains(n,"gridxCell")){
var _13a=t.grid._columnsById[n.getAttribute("colid")].index;
while(!_e0.contains(n,"gridxRow")){
n=n.parentNode;
}
return t._focusCell(0,parseInt(n.getAttribute("visualindex"),10),_13a);
}
}
return false;
}});
});
},"gridx/core/model/Model":function(){
define("gridx/core/model/Model",["require","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","dojo/DeferredList","dojo/aspect"],function(_13b,_13c,_13d,lang,_13e,_13f,_140){
var _141=lang.isArrayLike,_142=lang.isString;
function isId(it){
return it||it===0;
};
function _143(it){
return typeof it=="number"&&it>=0;
};
function _144(it){
return it&&_143(it.start);
};
function _145(self,args){
var i,rgs=[],ids=[],res={range:rgs,id:ids},f=function(a){
if(_144(a)){
rgs.push(a);
}else{
if(_143(a)){
rgs.push({start:a,count:1});
}else{
if(_141(a)){
for(i=a.length-1;i>=0;--i){
if(_143(a[i])){
rgs.push({start:a[i],count:1});
}else{
if(_144(a[i])){
rgs.push(a[i]);
}else{
if(_142(a)){
ids.push(a[i]);
}
}
}
}
}else{
if(_142(a)){
ids.push(a);
}
}
}
}
};
if(args&&(args.index||args.range||args.id)){
f(args.index);
f(args.range);
if(_141(args.id)){
for(i=args.id.length-1;i>=0;--i){
ids.push(args.id[i]);
}
}else{
if(isId(args.id)){
ids.push(args.id);
}
}
}else{
f(args);
}
if(!rgs.length&&!ids.length&&self.size()<0){
rgs.push({start:0,count:self._cache.pageSize||1});
}
return res;
};
return _13c([],{constructor:function(args){
var t=this,_146=args.cacheClass;
_146=typeof _146=="string"?_13b(_146):_146;
t.store=args.store;
t._exts={};
t._cmdQueue=[];
t._model=t._cache=new _146(t,args);
t._createExts(args.modelExtensions||[],args);
var m=t._model;
t._cnnts=[_140.after(m,"onDelete",lang.hitch(t,"onDelete"),1),_140.after(m,"onNew",lang.hitch(t,"onNew"),1),_140.after(m,"onSet",lang.hitch(t,"onSet"),1)];
},destroy:function(){
_13d.forEach(this._cnnts,function(cnnt){
cnnt.remove();
});
for(var n in this._exts){
this._exts[n].destroy();
}
},clearCache:function(){
this._cache.clear();
},isId:isId,setStore:function(_147){
this.store=_147;
this._cache.setStore(_147);
},when:function(args,_148,_149){
this._oldSize=this.size();
this._addCmd({name:"_cmdRequest",scope:this,args:arguments,async:1});
return this._exec();
},scan:function(args,_14a){
var d=new _13e,_14b=args.start||0,_14c=args.pageSize||this._cache.pageSize||1,_14d=args.count,end=_14d>0?_14b+_14d:Infinity,_14e=args.whenScope||this,_14f=args.whenFunc||_14e.when;
var f=function(s){
d.progress(s/(_14d>0?s+_14d:_14e.size()));
_14f.call(_14e,{id:[],range:[{start:s,count:_14c}]},function(){
var i,r,rows=[];
for(i=s;i<s+_14c&&i<end;++i){
r=_14e.byIndex(i);
if(r){
rows.push(r);
}else{
end=-1;
break;
}
}
if(_14a(rows,s)||i==end){
end=-1;
}
}).then(function(){
if(end==-1){
d.callback();
}else{
f(s+_14c);
}
});
};
f(_14b);
return d;
},onDelete:function(){
},onNew:function(){
},onSet:function(){
},onSizeChange:function(){
},_msg:function(){
},_addCmd:function(args){
var cmds=this._cmdQueue,cmd=cmds[cmds.length-1];
if(cmd&&cmd.name==args.name&&cmd.scope==args.scope){
cmd.args.push(args.args||[]);
}else{
args.args=[args.args||[]];
cmds.push(args);
}
},_onSizeChange:function(){
var t=this,_150=t._oldSize,size=t._oldSize=t.size();
if(_150!=size){
t.onSizeChange(size,_150);
}
},_cmdRequest:function(){
var t=this;
return new _13f(_13d.map(arguments,function(args){
var arg=args[0],_151=function(){
t._onSizeChange();
if(args[1]){
args[1].call(args[2]);
}
};
if(arg===null||!args.length){
var d=new _13e;
_151();
d.callback();
return d;
}
return t._model._call("when",[_145(t,arg),_151]);
}),0,1);
},_exec:function(){
var t=this,c=t._cache,d=new _13e,cmds=t._cmdQueue,_152=function(d,err){
t._busy=0;
if(c._checkSize){
c._checkSize();
}
if(err){
d.errback(err);
}else{
d.callback();
}
},func=function(){
if(_13d.some(cmds,function(cmd){
return cmd.name=="_cmdRequest";
})){
try{
while(cmds.length){
var cmd=cmds.shift(),dd=cmd.scope[cmd.name].apply(cmd.scope,cmd.args);
if(cmd.async){
_13e.when(dd,func,lang.partial(_152,d));
return;
}
}
}
catch(e){
_152(d,e);
return;
}
}
_152(d);
};
if(t._busy){
return t._busy;
}
t._busy=d;
func();
return d;
},_createExts:function(exts,args){
exts=_13d.filter(exts,function(ext){
ext=typeof ext=="string"?_13b(ext):ext;
return ext&&ext.prototype;
});
exts.sort(function(a,b){
return a.prototype.priority-b.prototype.priority;
});
for(var i=0,len=exts.length;i<len;++i){
if(i==exts.length-1||exts[i]!=exts[i+1]){
var ext=new exts[i](this,args);
this._exts[ext.name]=ext;
}
}
}});
});
},"dojo/dnd/common":function(){
define("dojo/dnd/common",["../_base/connect","../_base/kernel","../_base/lang","../dom"],function(_153,_154,lang,dom){
var _155=lang.getObject("dojo.dnd",true);
_155.getCopyKeyState=_153.isCopyKey;
_155._uniqueId=0;
_155.getUniqueId=function(){
var id;
do{
id=_154._scopeName+"Unique"+(++_155._uniqueId);
}while(dom.byId(id));
return id;
};
_155._empty={};
_155.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
return _155;
});
},"gridx/core/Row":function(){
define("gridx/core/Row",["dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred"],function(_156,lang,_157){
return _156([],{constructor:function(grid,id){
this.grid=grid;
this.model=grid.model;
this.id=id;
},index:function(){
return this.model.idToIndex(this.id);
},parent:function(){
return this.grid.row(this.model.parentId(this.id),1);
},cell:function(_158,isId){
return this.grid.cell(this,_158,isId);
},cells:function(_159,_15a){
var t=this,g=t.grid,_15b=[],cols=g._columns,_15c=cols.length,i=_159||0,end=_15a>=0?_159+_15a:_15c;
for(;i<end&&i<_15c;++i){
_15b.push(g.cell(t.id,cols[i].id,1));
}
return _15b;
},data:function(){
return this.model.byId(this.id).data;
},rawData:function(){
return this.model.byId(this.id).rawData;
},item:function(){
return this.model.byId(this.id).item;
},setRawData:function(_15d){
var t=this,s=t.grid.store,item=t.item(),_15e,d;
if(s.setValue){
d=new _157();
try{
for(_15e in _15d){
s.setValue(item,_15e,_15d[_15e]);
}
s.save({onComplete:lang.hitch(d,d.callback),onError:lang.hitch(d,d.errback)});
}
catch(e){
d.errback(e);
}
}
return d||_157.when(s.put(lang.mixin(lang.clone(item),_15d)));
}});
});
},"url:gridx/templates/Grid.html":"<div class=\"gridx\" role=\"grid\" tabindex=\"0\" aria-readonly=\"true\"\n\t><div class=\"gridxHeader\" role=\"presentation\" data-dojo-attach-point=\"headerNode\"></div\n\t><div class=\"gridxMain\" role=\"presentation\" data-dojo-attach-point=\"mainNode\"\n\t\t><div class=\"gridxBodyEmpty\" role=\"alert\" tabindex=\"-1\" data-dojo-attach-point=\"emptyNode\"></div\n\t\t><div class=\"gridxBody\" role=\"presentation\" data-dojo-attach-point=\"bodyNode\"></div\n\t\t><div class=\"gridxVScroller\" data-dojo-attach-point=\"vScrollerNode\" tabindex=\"-1\"\n\t\t\t><div style='width: 1px;'></div\n\t\t></div\n\t></div\n\t><div class=\"gridxFooter\" data-dojo-attach-point=\"footerNode\"\n\t\t><div class=\"gridxHScroller\"\n\t\t\t><div class=\"gridxHScrollerInner\" data-dojo-attach-point=\"hScrollerNode\" tabindex=\"-1\"\n\t\t\t\t><div style=\"width:1px; height: 1px;\"></div\n\t\t\t></div\n\t\t></div\n\t></div\n\t><span data-dojo-attach-point=\"lastFocusNode\" tabindex=\"0\"></span\n></div>\n","gridx/modules/extendedSelect/Column":function(){
define("gridx/modules/extendedSelect/Column",["dojo/_base/declare","dojo/_base/array","dojo/_base/query","dojo/_base/lang","dojo/_base/sniff","dojo/dom-class","dojo/mouse","dojo/keys","../../core/_Module","./_Base"],function(_15f,_160,_161,lang,_162,_163,_164,keys,_165,_166){
return _15f(_166,{name:"selectColumn",columnMixin:{select:function(){
this.grid.select.column.selectById(this.id);
return this;
},deselect:function(){
this.grid.select.column.deselectById(this.id);
return this;
},isSelected:function(){
return !!this.grid._columnsById[this.id]._selected;
}},getSelected:function(){
return _160.map(_160.filter(this.grid._columns,function(col){
return col._selected;
}),function(col){
return col.id;
});
},clear:function(_167){
_161(".gridxColumnSelected",this.grid.domNode).forEach(function(node){
_163.remove(node,"gridxColumnSelected");
node.removeAttribute("aria-selected");
});
_160.forEach(this.grid._columns,function(col){
col._selected=0;
});
this._clear();
if(!_167){
this._onSelectionChange();
}
},isSelected:function(){
var cols=this.grid._columnsById;
return _160.every(arguments,function(id){
var col=cols[id];
return col&&col._selected;
});
},_type:"column",_markById:function(args,_168){
_160.forEach(args,function(_169){
var col=this.grid._columnsById[_169];
if(col){
col._selected=_168;
this._doHighlight({column:col.index},_168);
}
},this);
},_markByIndex:function(args,_16a){
var i,col,_16b=this.grid._columns;
for(i=0;i<args.length;++i){
var arg=args[i];
if(lang.isArrayLike(arg)){
var _16c=arg[0],end=arg[1],_16d;
if(_16c>=0&&_16c<Infinity){
if(!(end>=_16c&&end<Infinity)){
end=_16b.length-1;
}
for(;_16c<end+1;++_16c){
col=_16b[_16c];
if(col){
col._selected=_16a;
this._doHighlight({column:col.index},_16a);
}
}
}
}else{
if(arg>=0&&arg<Infinity){
col=_16b[arg];
if(col){
col._selected=_16a;
this._doHighlight({column:arg},_16a);
}
}
}
}
},_init:function(){
var t=this,g=t.grid;
t.batchConnect([g,"onHeaderCellMouseDown",function(e){
if(_164.isLeft(e)&&!_163.contains(e.target,"gridxArrowButtonNode")){
t._start({column:e.columnIndex},g._isCopyEvent(e),e.shiftKey);
}
}],[g,"onHeaderCellMouseOver",function(e){
t._highlight({column:e.columnIndex});
}],[g,"onCellMouseOver",function(e){
t._highlight({column:e.columnIndex});
}],[g,_162("ff")<4?"onHeaderCellKeyUp":"onHeaderCellKeyDown",function(e){
if((e.keyCode==keys.SPACE||e.keyCode==keys.ENTER)&&!_163.contains(e.target,"gridxArrowButtonNode")){
t._start({column:e.columnIndex},g._isCopyEvent(e),e.shiftKey);
t._end();
}
}],[g.header,"onMoveToHeaderCell","_onMoveToHeaderCell"]);
},_onRender:function(_16e,_16f){
var i,j,end=_16e+_16f,g=this.grid,bn=g.bodyNode,node,cols=_160.filter(g._columns,function(col){
return col._selected;
});
for(i=cols.length-1;i>=0;--i){
for(j=_16e;j<end;++j){
node=_161(["[visualindex=\"",j,"\"] [colid=\"",cols[i].id,"\"]"].join(""),bn)[0];
_163.add(node,"gridxColumnSelected");
node.setAttribute("aria-selected",true);
}
}
},_onMoveToHeaderCell:function(_170,e){
if(e.shiftKey&&(e.keyCode==keys.LEFT_ARROW||e.keyCode==keys.RIGHT_ARROW)){
var t=this,col=t.grid._columnsById[_170];
t._start({column:col.index},t.grid._isCopyEvent(e),1);
t._end();
}
},_isSelected:function(_171){
var t=this,col=t.grid._columns[_171.column],id=col.id;
return t._isRange?_160.indexOf(t._refSelectedIds,id)>=0:col._selected;
},_beginAutoScroll:function(){
var _172=this.grid.autoScroll;
this._autoScrollV=_172.vertical;
_172.vertical=false;
},_endAutoScroll:function(){
this.grid.autoScroll.vertical=this._autoScrollV;
},_doHighlight:function(_173,_174){
_161("[colid=\""+this.grid._columns[_173.column].id+"\"].gridxCell",this.grid.domNode).forEach(function(node){
_163.toggle(node,"gridxColumnSelected",_174);
});
},_focus:function(_175){
var g=this.grid;
if(g.focus){
g.header._focusNode(_161("[colid=\""+g._columns[_175.column].id+"\"].gridxCell",g.header.domNode)[0]);
}
},_addToSelected:function(_176,end,_177){
var t=this,g=t.grid,a,i;
if(!t._isRange){
t._refSelectedIds=t.getSelected();
}
if(t._isRange&&t._inRange(end.column,_176.column,t._lastEndItem.column)){
_176=Math.min(end.column,t._lastEndItem.column);
end=Math.max(end.column,t._lastEndItem.column);
for(i=_176;i<=end;++i){
g._columns[i]._selected=_160.indexOf(t._refSelectedIds,g._columns[i].id)>=0;
}
}else{
a=Math.min(_176.column,end.column);
end=Math.max(_176.column,end.column);
_176=a;
for(i=_176;i<=end;++i){
g._columns[i]._selected=_177;
}
}
}});
});
},"gridx/modules/Header":function(){
define("gridx/modules/Header",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/dom-class","dojo/dom-geometry","dojo/_base/query","dojo/_base/sniff","dojo/keys","../core/util","../core/_Module"],function(_178,lang,_179,_17a,_17b,_17c,_17d,_17e,keys,util,_17f){
return _178(_17f,{name:"header",getAPIPath:function(){
return {header:this};
},constructor:function(){
var t=this,dn=t.domNode=_17a.create("div",{"class":"gridxHeaderRow",role:"presentation"}),_180=t.innerNode=_17a.create("div",{"class":"gridxHeaderRowInner",role:"row"});
t.grid._connectEvents(dn,"_onMouseEvent",t);
},preload:function(args){
var t=this,g=t.grid;
t.domNode.appendChild(t.innerNode);
t._build();
g.headerNode.appendChild(t.domNode);
g.vLayout.register(t,"domNode","headerNode");
t.aspect(g,"onHScroll","_onHScroll");
t.aspect(g,"onHeaderCellMouseOver","_onHeaderCellMouseOver");
t.aspect(g,"onHeaderCellMouseOut","_onHeaderCellMouseOver");
if(_17e("ff")){
t.aspect(g,"onModulesLoaded",function(){
t._onHScroll(t._scrollLeft);
});
}
if(g.columnResizer){
t.aspect(g.columnResizer,"onResize",function(){
if(g.hScrollerNode.style.display=="none"){
t._onHScroll(0);
}
});
}
t._initFocus();
},destroy:function(){
this.inherited(arguments);
_17a.destroy(this.domNode);
},columnMixin:{headerNode:function(){
return this.grid.header.getHeaderNode(this.id);
}},hidden:false,getHeaderNode:function(id){
return _17d("[colid='"+id+"']",this.domNode)[0];
},refresh:function(){
this._build();
this._onHScroll(this._scrollLeft);
this.onRender();
},onRender:function(){
},onMoveToHeaderCell:function(){
},_scrollLeft:0,_build:function(){
var t=this,g=t.grid,f=g.focus,sb=["<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr>"];
_179.forEach(g._columns,function(col){
sb.push("<th id=\"",(g.id+"-"+col.id).replace(/\s+/,""),"\" role=\"columnheader\" aria-readonly=\"true\" tabindex=\"-1\" colid=\"",col.id,"\" class=\"gridxCell ",f&&f.currentArea()=="header"&&col.id==t._focusHeaderId?t._focusClass:"",(lang.isFunction(col.headerClass)?col.headerClass(col):col.headerClass)||"","\" style=\"width: ",col.width,";",(lang.isFunction(col.headerStyle)?col.headerStyle(col):col.headerStyle)||"","\"><div class=\"gridxSortNode\">",col.name||"","</div></th>");
});
sb.push("</tr></table>");
t.innerNode.innerHTML=sb.join("");
_17b.toggle(t.domNode,"gridxHeaderRowHidden",t.arg("hidden"));
},_onHScroll:function(left){
if((_17e("webkit")||_17e("ie")<8)&&!this.grid.isLeftToRight()){
left=this.innerNode.scrollWidth-this.innerNode.offsetWidth-left;
}
this.innerNode.scrollLeft=this._scrollLeft=left;
},_onMouseEvent:function(_181,e){
var g=this.grid,_182="onHeaderCell"+_181,_183="onHeader"+_181;
if(g._isConnected(_182)||g._isConnected(_183)){
this._decorateEvent(e);
if(e.columnIndex>=0){
g[_182](e);
}
g[_183](e);
}
},_decorateEvent:function(e){
for(var n=e.target,c;n&&n!==this.domNode;n=n.parentNode){
if(n.tagName&&n.tagName.toLowerCase()=="th"){
c=this.grid._columnsById[n.getAttribute("colid")];
if(c){
e.headerCellNode=n;
e.columnId=c.id;
e.columnIndex=c.index;
}
return;
}
}
},_onHeaderCellMouseOver:function(e){
_17b.toggle(this.getHeaderNode(e.columnId),"gridxHeaderCellOver",e.type=="mouseover");
},_focusHeaderId:null,_focusClass:"gridxHeaderCellFocus",_initFocus:function(){
var t=this,g=t.grid;
if(g.focus){
g.focus.registerArea({name:"header",priority:0,focusNode:t.innerNode,scope:t,doFocus:t._doFocus,doBlur:t._blurNode,onBlur:t._blurNode,connects:[t.connect(g,"onHeaderCellKeyDown","_onKeyDown"),t.connect(g,"onHeaderCellMouseDown",function(evt){
t._focusNode(t.getHeaderNode(evt.columnId));
})]});
}
},_doFocus:function(evt,step){
var t=this,n=t._focusHeaderId&&t.getHeaderNode(t._focusHeaderId),r=t._focusNode(n||_17d("th.gridxCell",t.domNode)[0]);
t.grid.focus.stopEvent(r&&evt);
return r;
},_focusNode:function(node){
if(node){
var t=this,g=t.grid,fid=t._focusHeaderId=node.getAttribute("colid");
if(fid){
t._blurNode();
if(g.hScroller){
g.hScroller.scrollToColumn(fid);
}
g.body._focusCellCol=g._columnsById[fid].index;
_17b.add(node,t._focusClass);
setTimeout(function(){
if(_17e("webkit")){
_17b.add(node,t._focusClass);
}
node.focus();
if(_17e("ie")<8){
t.innerNode.scrollLeft=t._scrollLeft;
}
},0);
return true;
}
}
return false;
},_blurNode:function(){
var t=this,n=_17d("th."+t._focusClass,t.innerNode)[0];
if(n){
_17b.remove(n,t._focusClass);
}
return true;
},_onKeyDown:function(evt){
var t=this,g=t.grid,col,dir=g.isLeftToRight()?1:-1,_184=evt.keyCode==keys.LEFT_ARROW?-dir:dir;
if(t._focusHeaderId&&!evt.ctrlKey&&!evt.altKey&&(evt.keyCode==keys.LEFT_ARROW||evt.keyCode==keys.RIGHT_ARROW)){
g.focus.stopEvent(evt);
col=g._columnsById[t._focusHeaderId];
col=g._columns[col.index+_184];
if(col){
t._focusNode(t.getHeaderNode(col.id));
t.onMoveToHeaderCell(col.id,evt);
}
}
}});
});
},"gridx/modules/dnd/Avatar":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/_base/window","dojo/dnd/Avatar"],function(_185,_186,_187,win,_188){
return _185(_188,{construct:function(_189){
var t=this;
t.isA11y=_186.contains(win.body(),"dijit_a11y");
t.node=_187.toDom(["<table border='0' cellspacing='0' class='gridxDndAvatar' ","style='position: absolute; z-index: 1999; margin: 0'>","<tbody><tr style='opacity: 0.9;'>","<td class='gridxDnDIcon'>",t.isA11y?"<span id='a11yIcon'>"+(t.manager.copy?"+":"<")+"</span>":"","</td>","<td class='gridxDnDItemIcon ",t._getIconClass(),"'></td>","<td><span class='gridxDnDItemCount'>",t._generateText(),"</span></td>","</tr></tbody></table>"].join(""));
},_getIconClass:function(){
var info=this.manager._dndInfo;
return ["gridxDnDIcon",info.cssName,info.count===1?"Single":"Multi"].join("");
},_generateText:function(){
return "("+this.manager._dndInfo.count+")";
}});
});
},"gridx/core/Cell":function(){
define("gridx/core/Cell",["dojo/_base/declare"],function(_18a){
return _18a([],{constructor:function(grid,row,_18b){
var t=this;
t.grid=grid;
t.model=grid.model;
t.row=row;
t.column=_18b;
},data:function(){
return this.model.byId(this.row.id).data[this.column.id];
},rawData:function(){
var t=this,f=t.column.field();
return f&&t.model.byId(t.row.id).rawData[f];
},setRawData:function(_18c){
var obj={},_18d=this.column.field();
if(_18d){
obj[_18d]=_18c;
return this.row.setRawData(obj);
}
}});
});
},"gridx/core/Core":function(){
define("gridx/core/Core",["require","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","dojo/DeferredList","./model/Model","./Row","./Column","./Cell","./_Module"],function(_18e,_18f,_190,lang,_191,_192,_193,Row,_194,Cell,_195){
var _196=lang.delegate,_197=lang.isFunction,_198=lang.isString,_199=lang.hitch,_19a=_190.forEach;
function _19b(mod){
var p=mod.moduleClass.prototype;
return (p.forced||[]).concat(p.optional||[]);
};
function _19c(_19d){
var cs={},c,i,len;
if(lang.isArray(_19d)){
for(i=0,len=_19d.length;i<len;++i){
c=_19d[i];
c.index=i;
c.id=c.id||String(i+1);
cs[c.id]=c;
}
}
return cs;
};
function _19e(base,_19f){
if(_19f){
for(var path in _19f){
var bp=base[path],ap=_19f[path];
if(bp&&lang.isObject(bp)&&!_197(bp)){
_19e(bp,ap);
}else{
base[path]=ap;
}
}
}
};
function _1a0(self){
var mods=[],_1a1=self.coreModules.length;
_19a(self.modules,function(m,i){
if(_197(m)||_198(m)){
m={moduleClass:m};
}
if(m){
var mc=m.moduleClass;
if(_198(mc)){
try{
mc=m.moduleClass=_18e(mc);
}
catch(e){
console.error(e);
}
}
if(_197(mc)){
mods.push(m);
return;
}
}
console.error("The "+(i+1-_1a1)+"-th declared module can NOT be found, please require it before using it");
});
self.modules=mods;
};
function _1a2(self){
var _1a3=_195._modules,_1a4=self.modules,i,j,k,p,deps,_1a5,err;
for(i=0;i<_1a4.length;++i){
p=_1a4[i].moduleClass.prototype;
deps=(p.forced||[]).concat(p.required||[]);
for(j=0;j<deps.length;++j){
_1a5=deps[j];
for(k=_1a4.length-1;k>=0;--k){
if(_1a4[k].moduleClass.prototype.name===_1a5){
break;
}
}
if(k<0){
if(_1a3[_1a5]){
_1a4.push({moduleClass:_1a3[_1a5]});
}else{
err=1;
console.error("Forced/Required dependent module '"+_1a5+"' is NOT found for '"+p.name+"' module.");
}
}
}
}
if(err){
throw new Error("Some forced/required dependent modules are NOT found.");
}
};
function _1a6(self){
var i,mods={},_1a7=[];
_19a(self.modules,function(m){
mods[m.moduleClass.prototype.name]=m;
});
for(i in mods){
_1a7.push(mods[i]);
}
self.modules=_1a7;
};
function _1a8(self){
var _1a9=self.modules,i,m,_1aa,q,key,_1ab=function(_1ac){
for(var j=_1a9.length-1;j>=0;--j){
if(_1a9[j].moduleClass.prototype.name==_1ac){
return _1a9[j];
}
}
return null;
};
for(i=_1a9.length-1;m=_1a9[i];--i){
_1aa=m.moduleClass.prototype.name;
q=_19b(m);
while(q.length){
key=q.shift();
if(key==_1aa){
throw new Error("Module '"+key+"' is in a dependancy circle!");
}
m=_1ab(key);
if(m){
q=q.concat(_19b(m));
}
}
}
};
function _1ad(self){
var _1ae=self.modules,i,_1af;
for(i=_1ae.length-1;i>=0;--i){
_1af=_1ae[i].moduleClass.prototype.modelExtensions;
if(_1af){
[].push.apply(self.modelExtensions,_1af);
}
}
};
function arr(self,_1b0,type,_1b1,_1b2,pid){
var i=_1b1||0,end=_1b2>=0?_1b1+_1b2:_1b0,r=[];
for(;i<end&&i<_1b0;++i){
r.push(self[type](i,0,pid));
}
return r;
};
function _1b3(self,_1b4,name){
var m,a,mods=self._modules;
for(m in mods){
m=mods[m].mod;
a=m[name+"Mixin"];
if(_197(a)){
a=a.apply(m);
}
lang.mixin(_1b4,a||{});
}
return _1b4;
};
function _1b5(self,_1b6,key){
var mods=self._modules,m=mods[key],mod=m.mod,d=mod.loaded;
if(!m.done){
m.done=1;
new _192(_190.map(_190.filter(m.deps,function(_1b7){
return mods[_1b7];
}),_199(self,_1b5,self,_1b6)),0,1).then(function(){
if(mod.load){
mod.load(m.args,_1b6);
}else{
if(d.fired<0){
d.callback();
}
}
});
}
return d;
};
return _18f([],{setStore:function(_1b8){
if(this.store!=_1b8){
this.store=_1b8;
this.model.setStore(_1b8);
}
},setColumns:function(_1b9){
var t=this;
t.structure=_1b9;
t._columns=lang.clone(_1b9);
t._columnsById=_19c(t._columns);
if(t.model){
t.model._cache.onSetColumns(t._columnsById);
}
},row:function(row,isId,_1ba){
var t=this;
if(typeof row=="number"&&!isId){
row=t.model.indexToId(row,_1ba);
}
if(t.model.byId(row)){
t._rowObj=t._rowObj||_1b3(t,new Row(t),"row");
return _196(t._rowObj,{id:row});
}
return null;
},column:function(_1bb,isId){
var t=this,c,a,obj={};
if(typeof _1bb=="number"&&!isId){
c=t._columns[_1bb];
_1bb=c&&c.id;
}
c=t._columnsById[_1bb];
if(c){
t._colObj=t._colObj||_1b3(t,new _194(t),"column");
for(a in c){
if(t._colObj[a]===undefined){
obj[a]=c[a];
}
}
return _196(t._colObj,obj);
}
return null;
},cell:function(row,_1bc,isId,_1bd){
var t=this,r=row instanceof Row?row:t.row(row,isId,_1bd);
if(r){
var c=_1bc instanceof _194?_1bc:t.column(_1bc,isId);
if(c){
t._cellObj=t._cellObj||_1b3(t,new Cell(t),"cell");
return _196(t._cellObj,{row:r,column:c});
}
}
return null;
},columnCount:function(){
return this._columns.length;
},rowCount:function(_1be){
return this.model.size(_1be);
},columns:function(_1bf,_1c0){
return arr(this,this._columns.length,"column",_1bf,_1c0);
},rows:function(_1c1,_1c2,_1c3){
return arr(this,this.rowCount(_1c3),"row",_1c1,_1c2,_1c3);
},onModulesLoaded:function(){
},_init:function(){
var t=this,d=t._deferStartup=new _191();
t.modules=t.modules||[];
t.modelExtensions=t.modelExtensions||[];
t.setColumns(t.structure);
_1a0(t);
_1a2(t);
_1a6(t);
_1a8(t);
_1ad(t);
t.model=new _193(t);
t.when=lang.hitch(t.model,t.model.when);
t._create();
t._preload();
t._load(d).then(_199(t,"onModulesLoaded"));
},_uninit:function(){
var t=this,mods=t._modules,m;
for(m in mods){
mods[m].mod.destroy();
}
if(t.model){
t.model.destroy();
}
},_create:function(){
var t=this,mods=t._modules={};
_19a(t.modules,function(mod){
var m,key=mod.moduleClass.prototype.name;
if(!mods[key]){
mods[key]={args:mod,mod:m=new mod.moduleClass(t,mod),deps:_19b(mod)};
if(m.getAPIPath){
_19e(t,m.getAPIPath());
}
}
});
},_preload:function(){
var m,mods=this._modules;
for(m in mods){
m=mods[m];
if(m.mod.preload){
m.mod.preload(m.args);
}
}
},_load:function(_1c4){
var dl=[],m;
for(m in this._modules){
dl.push(_1b5(this,_1c4,m));
}
return new _192(dl,0,1);
}});
});
},"dojo/dnd/Selector":function(){
define("dojo/dnd/Selector",["../_base/array","../_base/declare","../_base/event","../_base/kernel","../_base/lang","../dom","../dom-construct","../mouse","../_base/NodeList","../on","../touch","./common","./Container"],function(_1c5,_1c6,_1c7,_1c8,lang,dom,_1c9,_1ca,_1cb,on,_1cc,dnd,_1cd){
var _1ce=_1c6("dojo.dnd.Selector",_1cd,{constructor:function(node,_1cf){
if(!_1cf){
_1cf={};
}
this.singular=_1cf.singular;
this.autoSync=_1cf.autoSync;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(on(this.node,_1cc.press,lang.hitch(this,"onMouseDown")),on(this.node,_1cc.release,lang.hitch(this,"onMouseUp")));
},singular:false,getSelectedNodes:function(){
var t=new _1cb();
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
t.push(dom.byId(i));
}
return t;
},selectNone:function(){
return this._removeSelection()._removeAnchor();
},selectAll:function(){
this.forInItems(function(data,id){
this._addItemClass(dom.byId(id),"Selected");
this.selection[id]=1;
},this);
return this._removeAnchor();
},deleteSelectedNodes:function(){
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var n=dom.byId(i);
this.delItem(i);
_1c9.destroy(n);
}
this.anchor=null;
this.selection={};
return this;
},forInSelectedItems:function(f,o){
o=o||_1c8.global;
var s=this.selection,e=dnd._empty;
for(var i in s){
if(i in e){
continue;
}
f.call(o,this.getItem(i),i,this);
}
},sync:function(){
_1ce.superclass.sync.call(this);
if(this.anchor){
if(!this.getItem(this.anchor.id)){
this.anchor=null;
}
}
var t=[],e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
if(!this.getItem(i)){
t.push(i);
}
}
_1c5.forEach(t,function(i){
delete this.selection[i];
},this);
return this;
},insertNodes:function(_1d0,data,_1d1,_1d2){
var _1d3=this._normalizedCreator;
this._normalizedCreator=function(item,hint){
var t=_1d3.call(this,item,hint);
if(_1d0){
if(!this.anchor){
this.anchor=t.node;
this._removeItemClass(t.node,"Selected");
this._addItemClass(this.anchor,"Anchor");
}else{
if(this.anchor!=t.node){
this._removeItemClass(t.node,"Anchor");
this._addItemClass(t.node,"Selected");
}
}
this.selection[t.node.id]=1;
}else{
this._removeItemClass(t.node,"Selected");
this._removeItemClass(t.node,"Anchor");
}
return t;
};
_1ce.superclass.insertNodes.call(this,data,_1d1,_1d2);
this._normalizedCreator=_1d3;
return this;
},destroy:function(){
_1ce.superclass.destroy.call(this);
this.selection=this.anchor=null;
},onMouseDown:function(e){
if(this.autoSync){
this.sync();
}
if(!this.current){
return;
}
if(!this.singular&&!dnd.getCopyKeyState(e)&&!e.shiftKey&&(this.current.id in this.selection)){
this.simpleSelection=true;
if(_1ca.isLeft(e)){
_1c7.stop(e);
}
return;
}
if(!this.singular&&e.shiftKey){
if(!dnd.getCopyKeyState(e)){
this._removeSelection();
}
var c=this.getAllNodes();
if(c.length){
if(!this.anchor){
this.anchor=c[0];
this._addItemClass(this.anchor,"Anchor");
}
this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){
var i=0,node;
for(;i<c.length;++i){
node=c[i];
if(node==this.anchor||node==this.current){
break;
}
}
for(++i;i<c.length;++i){
node=c[i];
if(node==this.anchor||node==this.current){
break;
}
this._addItemClass(node,"Selected");
this.selection[node.id]=1;
}
this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1;
}
}
}else{
if(this.singular){
if(this.anchor==this.current){
if(dnd.getCopyKeyState(e)){
this.selectNone();
}
}else{
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
}else{
if(dnd.getCopyKeyState(e)){
if(this.anchor==this.current){
delete this.selection[this.anchor.id];
this._removeAnchor();
}else{
if(this.current.id in this.selection){
this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id];
}else{
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected");
}
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}else{
if(!(this.current.id in this.selection)){
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}
}
_1c7.stop(e);
},onMouseUp:function(){
if(!this.simpleSelection){
return;
}
this.simpleSelection=false;
this.selectNone();
if(this.current){
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
},onMouseMove:function(){
this.simpleSelection=false;
},onOverEvent:function(){
this.onmousemoveEvent=on(this.node,_1cc.move,lang.hitch(this,"onMouseMove"));
},onOutEvent:function(){
if(this.onmousemoveEvent){
this.onmousemoveEvent.remove();
delete this.onmousemoveEvent;
}
},_removeSelection:function(){
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var node=dom.byId(i);
if(node){
this._removeItemClass(node,"Selected");
}
}
this.selection={};
return this;
},_removeAnchor:function(){
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this.anchor=null;
}
return this;
}});
return _1ce;
});
},"gridx/core/model/extensions/Query":function(){
define(["dojo/_base/declare","../_Extension"],function(_1d4,_1d5){
return _1d4(_1d5,{name:"query",priority:40,constructor:function(_1d6,args){
this._mixinAPI("query");
if(args.query){
this.query(args.query,args.queryOptions);
}
},query:function(){
this.model._addCmd({name:"_cmdQuery",scope:this,args:arguments});
},_cmdQuery:function(){
var a=arguments,args=a[a.length-1],m=this.model,c=m._cache,op=c.options=c.options||{};
op.query=args[0];
op.queryOptions=args[1];
m._msg("storeChange");
c.clear();
}});
});
},"gridx/modules/extendedSelect/_Base":function(){
define("gridx/modules/extendedSelect/_Base",["dojo/_base/declare","dojo/_base/query","dojo/_base/connect","dojo/_base/Deferred","dojo/_base/sniff","dojo/_base/window","dojo/dom","dojo/keys","../../core/_Module","../AutoScroll"],function(_1d7,_1d8,_1d9,_1da,_1db,win,dom,keys,_1dc){
return _1d7(_1dc,{required:["autoScroll"],getAPIPath:function(){
var path={select:{}};
path.select[this._type]=this;
return path;
},load:function(){
var t=this,g=t.grid,doc=win.doc;
g.domNode.setAttribute("aria-multiselectable",true);
t._refSelectedIds=[];
t.subscribe("gridClearSelection_"+g.id,function(type){
if(type!=t._type){
t.clear();
}
});
t.batchConnect([g.body,"onRender","_onRender"],[doc,"onmouseup","_end"],[doc,"onkeydown",function(e){
if(e.keyCode==keys.SHIFT){
dom.setSelectable(g.domNode,false);
}
}],[doc,"onkeyup",function(e){
if(e.keyCode==keys.SHIFT){
dom.setSelectable(g.domNode,true);
}
}]);
t._init();
t.loaded.callback();
},enabled:true,holdingCtrl:false,holdingShift:false,selectById:function(){
return this._subMark("_markById",arguments,true);
},deselectById:function(){
return this._subMark("_markById",arguments,false);
},selectByIndex:function(){
return this._subMark("_markByIndex",arguments,true);
},deselectByIndex:function(){
return this._subMark("_markByIndex",arguments,false);
},onSelectionChange:function(){
},_clear:function(){
var t=this;
delete t._lastToSelect;
delete t._lastStartItem;
delete t._lastEndItem;
},_subMark:function(func,args,_1dd){
var t=this;
if(t.arg("enabled")){
if(_1dd){
_1d9.publish("gridClearSelection_"+t.grid.id,[t._type]);
}
t._lastSelectedIds=t.getSelected();
t._refSelectedIds=[];
return _1da.when(t[func](args,_1dd),function(){
t._onSelectionChange();
});
}
},_start:function(item,_1de,_1df){
var t=this;
if(!t._selecting&&!t._marking&&t.arg("enabled")){
dom.setSelectable(t.grid.domNode,false);
t._fixFF(1);
var _1e0=t._isSelected(item);
_1df=_1df||t.arg("holdingShift");
if(_1df&&t._lastStartItem){
t._isRange=1;
t._toSelect=t._lastToSelect;
t._startItem=t._lastStartItem;
t._currentItem=t._lastEndItem;
}else{
t._startItem=item;
t._currentItem=null;
if(_1de||t.arg("holdingCtrl")){
t._toSelect=!_1e0;
}else{
t._toSelect=1;
t.clear(1);
}
}
_1d9.publish("gridClearSelection_"+t.grid.id,[t._type]);
t._beginAutoScroll();
t.grid.autoScroll.enabled=true;
t._lastSelectedIds=t.getSelected();
t._selecting=1;
t._highlight(item);
}
},_highlight:function(_1e1){
var t=this;
if(t._selecting){
var type=t._type,_1e2=t._startItem,_1e3=t._currentItem,_1e4=function(from,to,toHL){
from=from[type];
to=to[type];
var dir=from<to?1:-1;
for(;from!=to;from+=dir){
var item={};
item[type]=from;
t._highlightSingle(item,toHL);
}
};
if(_1e3===null){
t._highlightSingle(_1e1,1);
}else{
if(t._inRange(_1e1[type],_1e2[type],_1e3[type])){
_1e4(_1e3,_1e1,0);
}else{
if(t._inRange(_1e2[type],_1e1[type],_1e3[type])){
_1e4(_1e3,_1e2,0);
_1e3=_1e2;
}
_1e4(_1e1,_1e3,1);
}
}
t._currentItem=_1e1;
t._focus(_1e1);
}
},_end:function(){
var t=this,g=t.grid;
if(t._selecting){
t._fixFF();
t._endAutoScroll();
t._selecting=0;
t._marking=1;
g.autoScroll.enabled=false;
var d=t._addToSelected(t._startItem,t._currentItem,t._toSelect);
t._lastToSelect=t._toSelect;
t._lastStartItem=t._startItem;
t._lastEndItem=t._currentItem;
t._startItem=t._currentItem=t._isRange=null;
_1da.when(d,function(){
dom.setSelectable(g.domNode,true);
t._marking=0;
t._onSelectionChange();
});
}
},_highlightSingle:function(_1e5,_1e6){
_1e6=_1e6?this._toSelect:this._isSelected(_1e5);
this._doHighlight(_1e5,_1e6);
},_onSelectionChange:function(){
var t=this,_1e7=t.getSelected();
t.onSelectionChange(_1e7,t._lastSelectedIds);
t._lastSelectedIds=_1e7;
},_inRange:function(_1e8,_1e9,end,_1ea){
return ((_1e8>=_1e9&&_1e8<=end)||(_1e8>=end&&_1e8<=_1e9))&&(_1ea||_1e8!=end);
},_fixFF:function(_1eb){
if(_1db("ff")){
_1d8(".gridxSortNode",this.grid.headerNode).style("overflow",_1eb?"visible":"");
}
}});
});
},"gridx/core/_Module":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Deferred","dojo/_base/connect","dojo/aspect"],function(_1ec,lang,_1ed,_1ee,_1ef,_1f0){
var _1f1=lang.isFunction,c="connect",_1f2=_1ec([],{constructor:function(grid,args){
var t=this;
t.grid=grid;
t.model=grid.model;
t.loaded=new _1ee;
t._cnnts=[];
t._sbscs=[];
lang.mixin(t,args);
},destroy:function(){
var f=_1ed.forEach;
f(this._cnnts,_1ef.disconnect);
f(this._sbscs,_1ef.unsubscribe);
},arg:function(_1f3,_1f4,_1f5){
if(arguments.length==2&&_1f1(_1f4)){
_1f5=_1f4;
_1f4=undefined;
}
var t=this,g=t.grid,r=t[_1f3];
if(!t.hasOwnProperty(_1f3)){
var _1f6=t.name+_1f3.substring(0,1).toUpperCase()+_1f3.substring(1);
if(g[_1f6]===undefined){
if(_1f4!==undefined){
r=_1f4;
}
}else{
r=g[_1f6];
}
}
t[_1f3]=(_1f5&&!_1f5(r))?_1f4:r;
return r;
},aspect:function(obj,e,_1f7,_1f8,pos){
var cnnt=_1f0[pos||"after"](obj,e,lang.hitch(_1f8||this,_1f7),1);
this._cnnts.push(cnnt);
return cnnt;
},connect:function(obj,e,_1f9,_1fa,flag){
var t=this,cnnt,g=t.grid,s=_1fa||t;
if(obj===g&&typeof e=="string"){
cnnt=_1ef[c](obj,e,function(){
var a=arguments;
if(g._eventFlags[e]===flag){
if(_1f1(_1f9)){
_1f9.apply(s,a);
}else{
if(_1f1(s[_1f9])){
s[_1f9].apply(s,a);
}
}
}
});
}else{
cnnt=_1ef[c](obj,e,s,_1f9);
}
t._cnnts.push(cnnt);
return cnnt;
},batchConnect:function(){
for(var i=0,args=arguments,len=args.length;i<len;++i){
if(lang.isArrayLike(args[i])){
this[c].apply(this,args[i]);
}
}
},subscribe:function(_1fb,_1fc,_1fd){
var s=_1ef.subscribe(_1fb,_1fd||this,_1fc);
this._sbscs.push(s);
return s;
}}),mods=_1f2._modules={};
_1f2.register=function(_1fe){
var p=_1fe.prototype;
return mods[p.name||p.declaredClass]=_1fe;
};
_1f2._markupAttrs=["id","name","field","width","dataType","!formatter","!decorator","!sortable"];
return _1f2;
});
},"gridx/core/Column":function(){
define(["dojo/_base/declare"],function(_1ff){
return _1ff([],{constructor:function(grid,id){
this.grid=grid;
this.model=grid.model;
this.id=id;
},index:function(){
var c=this.def();
return c?c.index:-1;
},def:function(){
return this.grid._columnsById[this.id];
},cell:function(row,isId,_200){
return this.grid.cell(row,this,isId,_200);
},cells:function(_201,_202,_203){
var t=this,g=t.grid,_204=[],_205=g.rowCount(_203),i=_201||0,end=_202>=0?_201+_202:_205;
for(;i<end&&i<_205;++i){
_204.push(g.cell(i,t,0,_203));
}
return _204;
},name:function(){
return this.def().name||"";
},setName:function(name){
this.def().name=name;
return this;
},field:function(){
return this.def().field||null;
},getWidth:function(){
return this.def().width;
}});
});
},"dojo/DeferredList":function(){
define("dojo/DeferredList",["./_base/kernel","./_base/Deferred","./_base/array"],function(dojo,_206,_207){
dojo.DeferredList=function(list,_208,_209,_20a,_20b){
var _20c=[];
_206.call(this);
var self=this;
if(list.length===0&&!_208){
this.resolve([0,[]]);
}
var _20d=0;
_207.forEach(list,function(item,i){
item.then(function(_20e){
if(_208){
self.resolve([i,_20e]);
}else{
_20f(true,_20e);
}
},function(_210){
if(_209){
self.reject(_210);
}else{
_20f(false,_210);
}
if(_20a){
return null;
}
throw _210;
});
function _20f(_211,_212){
_20c[i]=[_211,_212];
_20d++;
if(_20d===list.length){
self.resolve(_20c);
}
};
});
};
dojo.DeferredList.prototype=new _206();
dojo.DeferredList.prototype.gatherResults=function(_213){
var d=new dojo.DeferredList(_213,false,true,false);
d.addCallback(function(_214){
var ret=[];
_207.forEach(_214,function(_215){
ret.push(_215[1]);
});
return ret;
});
return d;
};
return dojo.DeferredList;
});
},"gridx/modules/HScroller":function(){
define(["dojo/_base/declare","dojo/dom-style","dojo/_base/sniff","dojo/_base/Deferred","dojo/query","dojo/dom-geometry","dojox/html/metrics","../core/_Module"],function(_216,_217,_218,_219,_21a,_21b,_21c,_21d){
return _216(_21d,{name:"hScroller",getAPIPath:function(){
return {hScroller:this};
},constructor:function(){
var t=this,g=t.grid,n=g.hScrollerNode;
g._initEvents(["H"],["Scroll"]);
t.domNode=n;
t.container=n.parentNode;
t.stubNode=n.firstChild;
},preload:function(){
var t=this,g=t.grid,n=g.hScrollerNode;
if(!g.autoWidth){
g.vLayout.register(t,"container","footerNode",0);
n.style.display="block";
t.batchConnect([g.columnWidth,"onUpdate","refresh"],[n,"onscroll","_onScroll"]);
if(_218("ie")){
n.style.height=(_21c.getScrollbar().h+1)+"px";
}
}
},scroll:function(left){
var dn=this.domNode;
if((_218("webkit")||_218("ie")<8)&&!this.grid.isLeftToRight()){
left=dn.scrollWidth-dn.offsetWidth-left;
}
if((_218("ff"))&&!this.grid.isLeftToRight()&&left>0){
left=-left;
}
dn.scrollLeft=left;
},scrollToColumn:function(_21e){
var _21f=this.grid.header.innerNode,_220=_21a("table",_21f)[0],_221=_220.rows[0].cells,left=0,_222=0,ltr=this.grid.isLeftToRight(),_223=this.domNode.scrollLeft;
if(!ltr&&(_218("webkit")||_218("ie")<8)){
_223=this.domNode.scrollWidth-_223-_21f.offsetWidth;
}
_223=Math.abs(_223);
for(var i=0;i<_221.length;i++){
_222+=_221[i].offsetWidth;
if(_221[i].getAttribute("colid")==_21e){
break;
}
left+=_221[i].offsetWidth;
}
if(left<_223){
this.scroll(left);
}else{
if(_222>_223+_21f.offsetWidth){
this.scroll(_222-_21f.offsetWidth);
}
}
},refresh:function(){
var t=this,g=t.grid,ltr=g.isLeftToRight(),_224=ltr?"marginLeft":"marginRight",_225=ltr?"marginRight":"marginLeft",lead=g.hLayout.lead,tail=g.hLayout.tail,w=(g.domNode.clientWidth||_217.get(g.domNode,"width"))-lead-tail,_226=_21b.getBorderExtents(g.header.domNode).w,bn=g.header.innerNode,pl=_217.get(bn,ltr?"paddingLeft":"paddingRight")||0,s=t.domNode.style,sw=bn.firstChild.offsetWidth+pl,_227=s.display,_228=(sw<=w)?"none":"block";
s[_224]=lead+pl+"px";
s[_225]=tail+"px";
if(pl>0){
s.width=(w-pl<0?0:w-pl)+"px";
}
t.stubNode.style.width=(sw-pl<0?0:sw-pl)+"px";
s.display=_228;
if(_227!=_228){
g.vLayout.reLayout();
}
},_lastLeft:0,_onScroll:function(e){
var t=this,s=t.domNode.scrollLeft;
if((_218("webkit")||_218("ie")<8)&&!t.grid.isLeftToRight()){
s=t.domNode.scrollWidth-t.domNode.offsetWidth-s;
}
if(t._lastLeft!=s){
t._lastLeft=s;
t._doScroll();
}
},_doScroll:function(_229){
var t=this,g=t.grid;
g.bodyNode.scrollLeft=t.domNode.scrollLeft;
g.onHScroll(t._lastLeft);
}});
});
},"gridx/modules/VScroller":function(){
define("gridx/modules/VScroller",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/_base/sniff","dojo/_base/query","dojo/dom-geometry","dojo/keys","dojox/html/metrics","../core/_Module"],function(_22a,_22b,_22c,_22d,_22e,_22f,keys,_230,_231){
var st="scrollTop";
return _22a(_231,{name:"vScroller",forced:["body","vLayout","columnWidth"],optional:["pagination"],getAPIPath:function(){
return {vScroller:this};
},constructor:function(){
var t=this,g=t.grid,dn=t.domNode=g.vScrollerNode;
t.stubNode=dn.firstChild;
if(g.autoHeight){
dn.style.display="none";
if(_22d("ie")<8){
dn.style.width="0px";
}
}else{
var w=_230.getScrollbar().w,ltr=g.isLeftToRight();
dn.style.width=w+"px";
dn.style[ltr?"right":"left"]=-w+"px";
if(_22d("ie")<8){
t.stubNode.style.width=w;
}
}
},preload:function(args){
this.grid.hLayout.register(null,this.domNode,1);
},load:function(args,_232){
var t=this,g=t.grid,bd=g.body,dn=t.domNode,bn=g.bodyNode;
t.batchConnect([t.domNode,"onscroll","_doScroll"],[bn,"onmousewheel","_onMouseWheel"],[g.mainNode,"onkeypress","_onKeyScroll"],_22d("ff")&&[bn,"DOMMouseScroll","_onMouseWheel"]);
t.aspect(g,"_onResizeEnd","_onBodyChange");
t.aspect(bd,"onForcedScroll","_onForcedScroll");
t.aspect(bd,"onRender","_onBodyChange");
if(!g.autoHeight){
t.aspect(bd,"onEmpty",function(){
var ds=dn.style;
ds.display="none";
ds.width="";
if(_22d("ie")<8){
ds.width=t.stub.style.width="0px";
}
g.hLayout.reLayout();
g.hScroller.refresh();
});
}
_232.then(function(){
t._updatePos();
_22b.when(t._init(args),function(){
t.domNode.style.width="";
t.loaded.callback();
});
});
},scrollToRow:function(_233,_234){
var d=new _22b(),bn=this.grid.bodyNode,dn=this.domNode,dif=0,n=_22e("[visualindex=\""+_233+"\"]",bn)[0],_235=function(_236){
setTimeout(function(){
d.callback(_236);
},5);
};
if(n){
var no=n.offsetTop,bs=bn[st];
if(_234){
dn[st]=no;
_235(true);
return d;
}else{
if(no<bs){
dif=no-bs;
}else{
if(no+n.offsetHeight>bs+bn.clientHeight){
dif=no+n.offsetHeight-bs-bn.clientHeight;
}else{
_235(true);
return d;
}
}
}
dn[st]+=dif;
}
_235(!!n);
return d;
},_init:function(){
this._onForcedScroll();
},_update:function(){
var t=this,g=t.grid;
if(!g.autoHeight){
var bd=g.body,bn=g.bodyNode,_237=bd.renderCount<bd.visualCount||bn.scrollHeight>bn.clientHeight,ds=t.domNode.style;
scrollBarWidth=_230.getScrollbar().w+(_22d("webkit")?1:0);
if(_22d("ie")<8){
var w=_237?scrollBarWidth+"px":"0px";
t.stubNode.style.width=w;
ds.width=w;
}else{
ds.width="";
}
ds.display=_237?"":"none";
t._updatePos();
}
g.hLayout.reLayout();
},_updatePos:function(){
var g=this.grid,dn=this.domNode,ds=dn.style,ltr=g.isLeftToRight(),_238=_22f.getBorderExtents(g.mainNode);
ds[ltr?"right":"left"]=-(dn.offsetWidth+(ltr?_238.r:_238.l))+"px";
},_doScroll:function(){
this.grid.bodyNode[st]=this.domNode[st];
},_onMouseWheel:function(e){
if(this.grid.vScrollerNode.style.display!="none"){
var _239=typeof e.wheelDelta==="number"?e.wheelDelta/3:(-40*e.detail);
this.domNode[st]-=_239;
_22c.stop(e);
}
},_onBodyChange:function(){
var t=this,g=t.grid;
t._update();
setTimeout(function(){
if(!g.bodyNode){
return;
}
t.stubNode.style.height=g.bodyNode.scrollHeight+"px";
t._doScroll();
g.vScrollerNode[st]=g.vScrollerNode[st]||0;
},0);
},_onForcedScroll:function(){
var t=this,bd=t.grid.body;
return t.model.when({start:bd.rootStart,count:bd.rootCount},function(){
bd.renderRows(0,bd.visualCount);
});
},_onKeyScroll:function(evt){
var t=this,g=t.grid,bd=g.body,bn=g.bodyNode,_23a=g.focus,sn=t.domNode,_23b;
if(bn.childNodes.length&&(!_23a||_23a.currentArea()=="body")){
if(evt.keyCode==keys.HOME){
sn[st]=0;
_23b=bn.firstChild;
}else{
if(evt.keyCode==keys.END){
sn[st]=sn.scrollHeight-sn.offsetHeight;
_23b=bn.lastChild;
}else{
if(evt.keyCode==keys.PAGE_UP){
if(!sn[st]){
_23b=bn.firstChild;
}else{
sn[st]-=sn.offsetHeight;
}
}else{
if(evt.keyCode==keys.PAGE_DOWN){
if(sn[st]>=sn.scrollHeight-sn.offsetHeight){
_23b=bn.lastChild;
}else{
sn[st]+=sn.offsetHeight;
}
}else{
return;
}
}
}
}
if(_23a){
if(_23b){
bd._focusCellRow=parseInt(_23b.getAttribute("visualindex"),10);
_23a.focusArea("body",1);
}else{
setTimeout(function(){
var _23c=bn.childNodes,_23d=0,end=_23c.length-1,_23e=_22f.position(bn),i,p,_23f=function(idx){
var rn=_23c[idx],pos=_22f.position(rn);
if(evt.keyCode==keys.PAGE_DOWN){
var prev=rn.previousSibling;
if((!prev&&pos.y>=_23e.y)||pos.y==_23e.y){
return 0;
}else{
if(!prev){
return -1;
}else{
var _240=_22f.position(prev);
if(_240.y<_23e.y&&_240.y+_240.h>=_23e.y){
return 0;
}else{
if(_240.y>_23e.y){
return 1;
}else{
return -1;
}
}
}
}
}else{
var post=rn.nextSibling;
if((!post&&pos.y+pos.h<=_23e.y+_23e.h)||pos.y+pos.h==_23e.y+_23e.h){
return 0;
}else{
if(!post){
return 1;
}else{
var _241=_22f.position(post);
if(_241.y<=_23e.y+_23e.h&&_241.y+_241.h>_23e.y+_23e.h){
return 0;
}else{
if(_241.y>_23e.y+_23e.h){
return 1;
}else{
return -1;
}
}
}
}
}
};
while(_23d<=end){
i=Math.floor((_23d+end)/2);
p=_23f(i);
if(p<0){
_23d=i+1;
}else{
if(p>0){
end=i-1;
}else{
_23b=_23c[i];
break;
}
}
}
if(_23b){
bd._focusCellRow=parseInt(_23b.getAttribute("visualindex"),10);
_23a.focusArea("body",1);
}
},0);
}
}
_22c.stop(evt);
}
}});
});
},"gridx/core/util":function(){
define("gridx/core/util",{biSearch:function(arr,comp){
var i=0,j=arr.length,k;
for(k=Math.floor((i+j)/2);i+1<j;k=Math.floor((i+j)/2)){
if(comp(arr[k])>0){
j=k;
}else{
i=k;
}
}
return arr.length&&comp(arr[i])>=0?i:j;
}});
},"gridx/core/model/_Extension":function(){
define("gridx/core/model/_Extension",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/aspect"],function(_242,lang,_243,_244){
return _242([],{constructor:function(_245){
var t=this,i=t.inner=_245._model;
t._cnnts=[];
t.model=_245;
_245._model=t;
if(i){
t.aspect(i,"onDelete","_onDelete");
t.aspect(i,"onNew","_onNew");
t.aspect(i,"onSet","_onSet");
}
},destroy:function(){
_243.forEach(this._cnnts,function(cnnt){
cnnt.remove();
});
},aspect:function(obj,e,_246,_247,pos){
var cnnt=_244[pos||"after"](obj,e,lang.hitch(_247||this,_246),1);
this._cnnts.push(cnnt);
return cnnt;
},_onNew:function(){
this.onNew.apply(this,arguments);
},_onSet:function(){
this.onSet.apply(this,arguments);
},_onDelete:function(){
this.onDelete.apply(this,arguments);
},onNew:function(){
},onDelete:function(){
},onSet:function(){
},_call:function(_248,args){
var t=this,m=t[_248],n=t.inner;
return m?m.apply(t,args||[]):n&&n._call(_248,args);
},_mixinAPI:function(){
var i,m=this.model,args=arguments,api=function(_249){
return function(){
return m._model._call(_249,arguments);
};
};
for(i=args.length-1;i>=0;--i){
m[args[i]]=api(args[i]);
}
}});
});
},"dojox/html/metrics":function(){
define("dojox/html/metrics",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/sniff","dojo/ready","dojo/_base/unload","dojo/_base/window","dojo/dom-geometry"],function(_24a,lang,has,_24b,_24c,_24d,_24e){
var dhm=lang.getObject("dojox.html.metrics",true);
var _24f=lang.getObject("dojox");
dhm.getFontMeasurements=function(){
var _250={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
if(has("ie")){
_24d.doc.documentElement.style.fontSize="100%";
}
var div=_24d.doc.createElement("div");
var ds=div.style;
ds.position="absolute";
ds.left="-100px";
ds.top="0";
ds.width="30px";
ds.height="1000em";
ds.borderWidth="0";
ds.margin="0";
ds.padding="0";
ds.outline="0";
ds.lineHeight="1";
ds.overflow="hidden";
_24d.body().appendChild(div);
for(var p in _250){
ds.fontSize=p;
_250[p]=Math.round(div.offsetHeight*12/16)*16/12/1000;
}
_24d.body().removeChild(div);
div=null;
return _250;
};
var _251=null;
dhm.getCachedFontMeasurements=function(_252){
if(_252||!_251){
_251=dhm.getFontMeasurements();
}
return _251;
};
var _253=null,_254={};
dhm.getTextBox=function(text,_255,_256){
var m,s;
if(!_253){
m=_253=_24d.doc.createElement("div");
var c=_24d.doc.createElement("div");
c.appendChild(m);
s=c.style;
s.overflow="scroll";
s.position="absolute";
s.left="0px";
s.top="-10000px";
s.width="1px";
s.height="1px";
s.visibility="hidden";
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
_24d.body().appendChild(c);
}else{
m=_253;
}
m.className="";
s=m.style;
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
if(arguments.length>1&&_255){
for(var i in _255){
if(i in _254){
continue;
}
s[i]=_255[i];
}
}
if(arguments.length>2&&_256){
m.className=_256;
}
m.innerHTML=text;
var box=_24e.position(m);
box.w=m.parentNode.scrollWidth;
return box;
};
var _257={w:16,h:16};
dhm.getScrollbar=function(){
return {w:_257.w,h:_257.h};
};
dhm._fontResizeNode=null;
dhm.initOnFontResize=function(_258){
var f=dhm._fontResizeNode=_24d.doc.createElement("iframe");
var fs=f.style;
fs.position="absolute";
fs.width="5em";
fs.height="10em";
fs.top="-10000px";
fs.display="none";
if(has("ie")){
f.onreadystatechange=function(){
if(f.contentWindow.document.readyState=="complete"){
f.onresize=f.contentWindow.parent[_24f._scopeName].html.metrics._fontresize;
}
};
}else{
f.onload=function(){
f.contentWindow.onresize=f.contentWindow.parent[_24f._scopeName].html.metrics._fontresize;
};
}
f.setAttribute("src","javascript:'<html><head><script>if(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}</script></head><body></body></html>'");
_24d.body().appendChild(f);
dhm.initOnFontResize=function(){
};
};
dhm.onFontResize=function(){
};
dhm._fontresize=function(){
dhm.onFontResize();
};
_24c.addOnUnload(function(){
var f=dhm._fontResizeNode;
if(f){
if(has("ie")&&f.onresize){
f.onresize=null;
}else{
if(f.contentWindow&&f.contentWindow.onresize){
f.contentWindow.onresize=null;
}
}
dhm._fontResizeNode=null;
}
});
_24b(function(){
try{
var n=_24d.doc.createElement("div");
n.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
_24d.body().appendChild(n);
_257.w=n.offsetWidth-n.clientWidth;
_257.h=n.offsetHeight-n.clientHeight;
_24d.body().removeChild(n);
delete n;
}
catch(e){
}
if("fontSizeWatch" in _24a.config&&!!_24a.config.fontSizeWatch){
dhm.initOnFontResize();
}
});
return dhm;
});
},"gridx/modules/AutoScroll":function(){
define("gridx/modules/AutoScroll",["dojo/_base/declare","dojo/_base/window","dojo/dom-geometry","../core/_Module"],function(_259,win,_25a,_25b){
return _25b.register(_259(_25b,{name:"autoScroll",constructor:function(){
this.connect(win.doc,"mousemove","_onMouseMove");
},getAPIPath:function(){
return {autoScroll:this};
},enabled:false,vertical:true,horizontal:true,margin:20,_timeout:100,_step:10,_maxMargin:100,_onMouseMove:function(e){
var t=this;
if(t.arg("enabled")){
var d1,d2,g=t.grid,m=t.arg("margin"),pos=_25a.position(g.bodyNode);
if(t.arg("vertical")&&g.vScroller){
d1=e.clientY-pos.y-m;
d2=d1+2*m-pos.h;
t._vdir=d1<0?d1:(d2>0?d2:0);
}
if(t.arg("horizontal")&&g.hScroller){
d1=e.clientX-pos.x-m;
d2=d1+2*m-pos.w;
t._hdir=d1<0?d1:(d2>0?d2:0);
}
if(!t._handler){
t._scroll();
}
}
},_scroll:function(){
var t=this;
if(t.arg("enabled")){
var dir,a,_25c,g=t.grid,m=t._maxMargin,s=t._step,v=t._vdir,h=t._hdir;
if(t.arg("vertical")&&v){
dir=v>0?1:-1;
a=Math.min(m,Math.abs(v))/s;
a=(a<1?1:a)*s*dir;
g.vScroller.domNode.scrollTop+=a;
_25c=1;
}
if(t.arg("horizontal")&&h){
dir=h>0?1:-1;
a=Math.min(m,Math.abs(h))/s;
a=(a<1?1:a)*s*dir;
g.hScroller.domNode.scrollLeft+=a;
_25c=1;
}
if(_25c){
t._handler=setTimeout(function(){
t._scroll();
},t._timeout);
return;
}
}
delete t._handler;
}}));
});
},"gridx/core/model/cache/_Cache":function(){
define("gridx/core/model/cache/_Cache",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","../_Extension"],function(_25d,_25e,lang,_25f,_260){
var _261=lang.hitch,_262=lang.mixin,_263=_25e.indexOf;
function _264(size){
this._size[""]=parseInt(size,10);
};
function _265(d,_266,_267){
try{
var t=this,i=0,item;
for(;item=_267[i];++i){
t._addRow(t.store.getIdentity(item),_266+i,t._itemToObject(item),item);
}
d.callback();
}
catch(e){
d.errback(e);
}
};
return _25d(_260,{constructor:function(_268,args){
var t=this;
t.setStore(args.store);
t.columns=args._columnsById;
t._mixinAPI("byIndex","byId","indexToId","idToIndex","size","treePath","parentId","hasChildren","children","keep","free");
},destroy:function(){
this.inherited(arguments);
this.clear();
},setStore:function(_269){
var t=this,c="aspect",old=_269.fetch;
t.clear();
t.store=_269;
if(!old&&_269.notify){
t[c](_269,"notify",function(item,id){
if(item===undefined){
t._onDelete(id);
}else{
if(id===undefined){
t._onNew(item);
}else{
t._onSet(item);
}
}
});
}else{
t[c](_269,old?"onSet":"put","_onSet");
t[c](_269,old?"onNew":"add","_onNew");
t[c](_269,old?"onDelete":"remove","_onDelete");
}
},clear:function(){
var t=this;
t._filled=0;
t._priority=[];
t._struct={};
t._cache={};
t._size={};
t._struct[""]=[];
t._size[""]=-1;
},byIndex:function(_26a,_26b){
this._init("byIndex",arguments);
return this._cache[this.indexToId(_26a,_26b)];
},byId:function(id){
this._init("byId",arguments);
return this._cache[id];
},indexToId:function(_26c,_26d){
this._init("indexToId",arguments);
var _26e=this._struct[this.model.isId(_26d)?_26d:""];
return typeof _26c=="number"&&_26c>=0?_26e&&_26e[_26c+1]:undefined;
},idToIndex:function(id){
this._init("idToIndex",arguments);
var s=this._struct,pid=s[id]&&s[id][0],_26f=_263(s[pid]||[],id);
return _26f>0?_26f-1:-1;
},treePath:function(id){
this._init("treePath",arguments);
var s=this._struct,path=[];
while(id!==undefined){
path.unshift(id);
id=s[id]&&s[id][0];
}
if(path[0]!==""){
path=[];
}else{
path.pop();
}
return path;
},parentId:function(id){
return this.treePath(id).pop();
},hasChildren:function(id){
var t=this,s=t.store,c;
t._init("hasChildren",arguments);
c=t.byId(id);
return s.hasChildren&&s.hasChildren(id,c&&c.item);
},children:function(_270){
this._init("children",arguments);
_270=this.model.isId(_270)?_270:"";
var size=this._size[_270],_271=[],i=0;
for(;i<size;++i){
_271.push(this.indexToId(i,_270));
}
return _271;
},size:function(_272){
this._init("size",arguments);
var s=this._size[this.model.isId(_272)?_272:""];
return s>=0?s:-1;
},onBeforeFetch:function(){
},onAfterFetch:function(){
},onLoadRow:function(){
},onSetColumns:function(_273){
var t=this,id,c,_274,col;
t.columns=_273;
for(id in t._cache){
c=t._cache[id];
for(_274 in _273){
col=_273[_274];
c.data[_274]=t._formatCell(col.id,c.rawData);
}
}
},_itemToObject:function(item){
var s=this.store,obj={};
if(s.fetch){
_25e.forEach(s.getAttributes(item),function(attr){
obj[attr]=s.getValue(item,attr);
});
return obj;
}
return item;
},_formatCell:function(_275,_276){
var col=this.columns[_275];
return col.formatter?col.formatter(_276):_276[col.field||_275];
},_formatRow:function(_277){
var cols=this.columns,res={},_278;
for(_278 in cols){
res[_278]=this._formatCell(_278,_277);
}
return res;
},_addRow:function(id,_279,_27a,item,_27b){
var t=this,st=t._struct,pr=t._priority,pid=t.model.isId(_27b)?_27b:"",ids=st[pid],i;
if(!ids){
throw new Error("Fatal error of cache._addRow: parent item "+pid+" of "+id+" is not loaded");
}
if(!ids[_279+1]){
ids[_279+1]=id;
}else{
if(ids[_279+1]!==id){
throw new Error("Fatal error of cache._addRow: different row id "+id+" and "+ids[_279+1]+" for same row index "+_279);
}
}
st[id]=st[id]||[pid];
if(pid===""){
i=_263(pr,id);
if(i>=0){
pr.splice(i,1);
}
pr.push(id);
}
t._cache[id]={data:t._formatRow(_27a),rawData:_27a,item:item};
t.onLoadRow(id);
},_loadChildren:function(_27c){
var t=this,d=new _25f(),s=t.store,row=t.byId(_27c),_27d=row&&s.getChildren&&s.getChildren(row.item)||[];
_25f.when(_27d,function(_27e){
var i=0,item,len=t._size[_27c]=_27e.length;
for(;i<len;++i){
item=_27e[i];
t._addRow(s.getIdentity(item),i,t._itemToObject(item),item,_27c);
}
d.callback();
},_261(d,d.errback));
return d;
},_storeFetch:function(_27f,_280){
var t=this,s=t.store,d=new _25f(),req=_262({},t.options||{},_27f),_281=_261(t,_264),_282=_261(t,_265,d,_27f.start),_283=_261(d,d.errback);
t._filled=1;
t.onBeforeFetch();
if(s.fetch){
s.fetch(_262(req,{onBegin:_281,onComplete:_282,onError:_283}));
}else{
var _284=s.query(req.query||{},req);
_25f.when(_284.total,_281);
_25f.when(_284,_282,_283);
}
d.then(_261(t,t.onAfterFetch));
return d;
},_onSet:function(item){
var t=this,id=t.store.getIdentity(item),_285=t.idToIndex(id),path=t.treePath(id),old=t._cache[id];
if(path.length){
t._addRow(id,_285,t._itemToObject(item),item,path.pop());
}
t.onSet(id,_285,t._cache[id],old);
},_onNew:function(item,_286){
var t=this,s=t.store,row=t._itemToObject(item),_287=_286&&_286[s.fetch?"item":"parent"],_288=_287?s.getIdentity(_287):"",size=t._size[""];
t.clear();
t.onNew(s.getIdentity(item),0,{data:t._formatRow(row),rawData:row,item:item});
if(!_287&&size>=0){
t._size[""]=size+1;
t.model._onSizeChange();
}
},_onDelete:function(item){
var t=this,s=t.store,st=t._struct,id=s.fetch?s.getIdentity(item):item,path=t.treePath(id);
if(path.length){
var _289,i,j,ids=[id],_28a=path.pop(),sz=t._size,size=sz[""],_28b=_263(st[_28a],id);
st[_28a].splice(_28b,1);
--sz[_28a];
for(i=0;i<ids.length;++i){
_289=st[ids[i]];
if(_289){
for(j=_289.length-1;j>0;--j){
ids.push(_289[j]);
}
}
}
for(i=ids.length-1;i>=0;--i){
j=ids[i];
delete t._cache[j];
delete st[j];
delete sz[j];
}
i=_263(t._priority,id);
if(i>=0){
t._priority.splice(i,1);
}
t.onDelete(id,_28b-1);
if(!_28a&&size>=0){
sz[""]=size-1;
t.model._onSizeChange();
}
}else{
t.onDelete(id);
}
}});
});
},"dojo/dnd/Source":function(){
define("dojo/dnd/Source",["../_base/array","../_base/connect","../_base/declare","../_base/kernel","../_base/lang","../dom-class","../dom-geometry","../mouse","../ready","../topic","./common","./Selector","./Manager"],function(_28c,_28d,_28e,_28f,lang,_290,_291,_292,_293,_294,dnd,_295,_296){
if(!_28f.isAsync){
_293(0,function(){
var _297=["dojo/dnd/AutoSource","dojo/dnd/Target"];
require(_297);
});
}
var _298=_28e("dojo.dnd.Source",_295,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],generateText:true,constructor:function(node,_299){
lang.mixin(this,lang.mixin({},_299));
var type=this.accept;
if(type.length){
this.accept={};
for(var i=0;i<type.length;++i){
this.accept[type[i]]=1;
}
}
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this._lastX=0;
this._lastY=0;
this.sourceState="";
if(this.isSource){
_290.add(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
_290.add(this.node,"dojoDndTarget");
}
if(this.horizontal){
_290.add(this.node,"dojoDndHorizontal");
}
this.topics=[_294.subscribe("/dnd/source/over",lang.hitch(this,"onDndSourceOver")),_294.subscribe("/dnd/start",lang.hitch(this,"onDndStart")),_294.subscribe("/dnd/drop",lang.hitch(this,"onDndDrop")),_294.subscribe("/dnd/cancel",lang.hitch(this,"onDndCancel"))];
},checkAcceptance:function(_29a,_29b){
if(this==_29a){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<_29b.length;++i){
var type=_29a.getItem(_29b[i].id).type;
var flag=false;
for(var j=0;j<type.length;++j){
if(type[j] in this.accept){
flag=true;
break;
}
}
if(!flag){
return false;
}
}
return true;
},copyState:function(_29c,self){
if(_29c){
return true;
}
if(arguments.length<2){
self=this==_296.manager().target;
}
if(self){
if(this.copyOnly){
return this.selfCopy;
}
}else{
return this.copyOnly;
}
return false;
},destroy:function(){
_298.superclass.destroy.call(this);
_28c.forEach(this.topics,function(t){
t.remove();
});
this.targetAnchor=null;
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
_298.superclass.onMouseMove.call(this,e);
var m=_296.manager();
if(!this.isDragging){
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var _29d=this.getSelectedNodes();
if(_29d.length){
m.startDrag(this,_29d,this.copyState(dnd.getCopyKeyState(e),true));
}
}
}
if(this.isDragging){
var _29e=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox=_291.position(this.current,true);
}
if(this.horizontal){
_29e=(e.pageX-this.targetBox.x<this.targetBox.w/2)==_291.isBodyLtr(this.current.ownerDocument);
}else{
_29e=(e.pageY-this.targetBox.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_29e!=this.before){
this._markTargetAnchor(_29e);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
_298.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
_298.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_29f){
if(this!==_29f){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=_296.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_2a0,_2a1,copy){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_2a0?(copy?"Copied":"Moved"):"");
}
var _2a2=this.accept&&this.checkAcceptance(_2a0,_2a1);
this._changeState("Target",_2a2?"":"Disabled");
if(this==_2a0){
_296.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_2a3,_2a4,copy,_2a5){
if(this==_2a5){
this.onDrop(_2a3,_2a4,copy);
}
this.onDndCancel();
},onDndCancel:function(){
if(this.targetAnchor){
this._unmarkTargetAnchor();
this.targetAnchor=null;
}
this.before=true;
this.isDragging=false;
this.mouseDown=false;
this._changeState("Source","");
this._changeState("Target","");
},onDrop:function(_2a6,_2a7,copy){
if(this!=_2a6){
this.onDropExternal(_2a6,_2a7,copy);
}else{
this.onDropInternal(_2a7,copy);
}
},onDropExternal:function(_2a8,_2a9,copy){
var _2aa=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(node,hint){
return _2aa.call(this,_2a8.getItem(node.id).data,hint);
};
}else{
if(copy){
this._normalizedCreator=function(node){
var t=_2a8.getItem(node.id);
var n=node.cloneNode(true);
n.id=dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(node){
var t=_2a8.getItem(node.id);
_2a8.delItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!copy&&!this.creator){
_2a8.selectNone();
}
this.insertNodes(true,_2a9,this.before,this.current);
if(!copy&&this.creator){
_2a8.deleteSelectedNodes();
}
this._normalizedCreator=_2aa;
},onDropInternal:function(_2ab,copy){
var _2ac=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(copy){
if(this.creator){
this._normalizedCreator=function(node,hint){
return _2ac.call(this,this.getItem(node.id).data,hint);
};
}else{
this._normalizedCreator=function(node){
var t=this.getItem(node.id);
var n=node.cloneNode(true);
n.id=dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}
}else{
if(!this.current){
return;
}
this._normalizedCreator=function(node){
var t=this.getItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
this._removeSelection();
this.insertNodes(true,_2ab,this.before,this.current);
this._normalizedCreator=_2ac;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
_298.superclass.onOverEvent.call(this);
_296.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
_298.superclass.onOutEvent.call(this);
_296.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_2ad){
if(this.current==this.targetAnchor&&this.before==_2ad){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_2ad;
if(this.targetAnchor){
this._addItemClass(this.targetAnchor,this.before?"Before":"After");
}
},_unmarkTargetAnchor:function(){
if(!this.targetAnchor){
return;
}
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
},_markDndStatus:function(copy){
this._changeState("Source",copy?"Copied":"Moved");
},_legalMouseDown:function(e){
if(e.type!="touchstart"&&!_292.isLeft(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var node=e.target;node&&node!==this.node;node=node.parentNode){
if(_290.contains(node,"dojoDndHandle")){
return true;
}
if(_290.contains(node,"dojoDndItem")||_290.contains(node,"dojoDndIgnore")){
break;
}
}
return false;
}});
return _298;
});
},"gridx/modules/ColumnWidth":function(){
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/Deferred","dojo/_base/query","dojo/_base/sniff","dojo/dom-geometry","dojo/dom-class","dojo/dom-style","dojo/keys","../core/_Module"],function(_2ae,_2af,_2b0,_2b1,_2b2,_2b3,_2b4,_2b5,keys,_2b6){
return _2ae(_2b6,{name:"columnWidth",forced:["hLayout"],getAPIPath:function(){
return {columnWidth:this};
},constructor:function(){
this._init();
},preload:function(){
var t=this,g=t.grid;
t._ready=new _2b0();
t.batchConnect([g.hLayout,"onUpdateWidth","_onUpdateWidth"],[g,"setColumns","_onSetColumns"]);
},load:function(){
this._adaptWidth();
this.loaded.callback();
},"default":60,autoResize:false,onUpdate:function(){
},_init:function(){
var t=this,g=t.grid,dn=g.domNode,cols=g._columns;
_2af.forEach(cols,function(col){
if(!col.hasOwnProperty("declaredWidth")){
col.declaredWidth=col.width=col.width||"auto";
}
});
if(g.autoWidth){
_2af.forEach(cols,function(c){
if(c.declaredWidth=="auto"){
c.width=t.arg("default")+"px";
}
});
}else{
if(t.arg("autoResize")){
_2b4.add(dn,"gridxPercentColumnWidth");
_2af.forEach(cols,function(c){
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
var _2b7=g.hScrollerNode.style.display=="none";
t._adaptWidth(!_2b7,1);
if(!t.arg("autoResize")&&_2b7){
_2b1(".gridxCell",g.bodyNode).forEach(function(_2b8){
var col=g._columnsById[_2b8.getAttribute("colId")];
if(t.arg("autoResize")||!col.declaredWidth||col.declaredWidth=="auto"||(/%$/).test(col.declaredWidth)){
_2b8.style.width=col.width;
}
});
}
t.onUpdate();
}
},_adaptWidth:function(skip,_2b9){
var t=this,g=t.grid,dn=g.domNode,_2ba=g.header,ltr=g.isLeftToRight(),_2bb=ltr?"marginLeft":"marginRight",_2bc=ltr?"marginRight":"marginLeft",lead=g.hLayout.lead,tail=g.hLayout.tail,_2bd=_2ba.innerNode,bs=g.bodyNode.style,hs=_2bd.style,_2be=_2b3.getBorderExtents(_2ba.domNode).w,_2bf=_2be,_2c0=0,_2c1=(dn.clientWidth||_2b5.get(dn,"width"))-lead-tail-_2be,_2c2=_2b1(".gridxCell",_2bd)[0],_2c3=_2c2?_2b3.getMarginBox(_2c2).w-_2b3.getContentBox(_2c2).w:0,_2c4=!dn.offsetHeight;
if(_2bf===0){
_2bf=1;
}else{
_2c0=2;
}
hs[_2bb]=lead+"px";
hs[_2bc]=(tail>_2bf?tail-_2bf:0)+"px";
g.mainNode.style[_2bb]=lead+"px";
g.mainNode.style[_2bc]=tail+"px";
_2c1=_2c1<0?0:_2c1;
if(skip){
t.onUpdate();
return;
}
if(g.autoWidth){
var _2c5=_2b1("th.gridxCell",_2bd),_2c6=0;
_2c5.forEach(function(node){
var w=_2b5.get(node,"width");
if(!_2b2("safari")||!_2c4){
w+=_2c3;
}
_2c6+=w;
var c=g._columnsById[node.getAttribute("colid")];
if(c.width=="auto"||(/%$/).test(c.width)){
node.style.width=c.width=w+"px";
}
});
bs.width=_2c6+"px";
dn.style.width=(lead+tail+_2c6+_2c0)+"px";
}else{
if(t.arg("autoResize")){
hs.borderWidth=g.vScrollerNode.style.display=="none"?0:"";
}else{
var _2c7=[],cols=g._columns,_2c8=0;
if(_2b2("safari")){
_2c3=0;
}
_2af.forEach(cols,function(c){
if(c.declaredWidth=="auto"){
_2c7.push(c);
}else{
if(/%$/.test(c.declaredWidth)){
var w=parseInt(_2c1*parseFloat(c.declaredWidth,10)/100-_2c3,10);
if(w<0){
w=0;
}
_2ba.getHeaderNode(c.id).style.width=c.width=w+"px";
}
}
});
_2af.forEach(cols,function(c){
if(c.declaredWidth!="auto"){
var _2c9=_2ba.getHeaderNode(c.id),w=_2b2("safari")?parseFloat(_2c9.style.width,10):_2c9.offsetWidth||(_2b5.get(_2c9,"width")+_2c3);
if(/%$/.test(c.declaredWidth)){
c.width=(w>_2c3?w-_2c3:0)+"px";
}
_2c8+=w;
}
});
if(_2c7.length){
var w=_2c1>_2c8?((_2c1-_2c8)/_2c7.length-_2c3):t.arg("default"),ww=parseInt(w,10);
if(_2c1>_2c8){
ww=_2c1-_2c8-(ww+_2c3)*(_2c7.length-1)-_2c3;
}
w=parseInt(w,10);
if(w<0){
w=0;
}
if(ww<0){
ww=0;
}
_2af.forEach(_2c7,function(c,i){
_2ba.getHeaderNode(c.id).style.width=c.width=(i<_2c7.length-1?w:ww)+"px";
});
}
}
}
g.hScroller.scroll(0);
_2ba._onHScroll(0);
g.vLayout.reLayout();
if(!_2b9){
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
},"gridx/core/model/cache/Async":function(){
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","dojo/DeferredList","./_Cache"],function(_2ca,_2cb,lang,_2cc,_2cd,_2ce){
var _2cf=lang.hitch;
function _2d0(self,args){
var d=new _2cc(),i,r,len,pid,_2d1=_2cf(d,d.callback),fail=_2cf(d,d.errback),_2d2=args.range,_2d3=self.store.getChildren;
args.pids=[];
if(_2d3){
for(i=_2d2.length-1;i>=0;--i){
r=_2d2[i];
pid=r.parentId;
if(self.model.isId(pid)){
args.id.push(pid);
args.pids.push(pid);
_2d2.splice(i,1);
}
}
}
var ids=_2d4(self,args.id),mis=[];
if(ids.length){
_2cb.forEach(ids,function(id){
var idx=self.idToIndex(id);
if(idx>=0&&!self.treePath(id).pop()){
_2d2.push({start:idx,count:1});
}else{
mis.push(id);
}
});
_2e9(self,mis).then(function(ids){
if(ids.length&&_2d3){
_2ee(self,ids).then(function(ids){
if(ids.length){
console.warn("Requested row ids are not found: ",ids);
}
_2d1(args);
},fail);
}else{
_2d1(args);
}
},fail);
}else{
_2d1(args);
}
return d;
};
function _2d5(self,args){
var d=new _2cc(),size=self._size[""];
args=_2d6(self,_2d7(self,_2d8(self,_2d9(args))));
var _2da=size>0?_2cb.filter(args.range,function(r){
if(r.count>0&&size<r.start+r.count){
r.count=size-r.start;
}
return r.start<size;
}):args.range;
new _2cd(_2cb.map(_2da,function(r){
return self._storeFetch(r);
}),0,1).then(_2cf(d,d.callback,args),_2cf(d,d.errback));
return d;
};
function _2db(self,args){
var d=new _2cc();
new _2cd(_2cb.map(args.pids,function(pid){
return self._loadChildren(pid);
}),0,1).then(_2cf(d,d.callback,args),_2cf(d,d.errback));
return d;
};
function _2d7(self,args){
var i,req,reqs=self._requests,defs=[];
for(i=reqs.length-1;i>=0;--i){
req=reqs[i];
args.range=_2dc(args.range,req.range);
if(args.range._overlap){
defs.push(req._def);
}
}
args._req=defs.length&&new _2cd(defs,0,1);
reqs.push(args);
return args;
};
function _2dc(_2dd,_2de){
if(!_2de.length||!_2dd.length){
return _2dd;
}
var _2df=[],f=0,r,res=[],mark=function(idx,flag){
_2df[idx]=_2df[idx]||0;
_2df[idx]+=flag;
},_2e0=function(_2e1,flag){
var i,r;
for(i=_2e1.length-1;i>=0;--i){
r=_2e1[i];
mark(r.start,flag);
if(r.count){
mark(r.start+r.count,-flag);
}
}
};
_2e0(_2dd,1);
_2e0(_2de,2);
for(var i=0,len=_2df.length;i<len;++i){
if(_2df[i]){
f+=_2df[i];
if(f===1){
res.push({start:i});
}else{
if(f===3){
res._overlap=true;
}
r=res[res.length-1];
if(r&&!r.count){
r.count=i-r.start;
}
}
}
}
return res;
};
function _2d9(args){
var _2e2=[],r=args.range,i,t,a,b,c,_2e3;
while(r.length>0){
c=a=r.pop();
_2e3=0;
for(i=r.length-1;i>=0;--i){
b=r[i];
if(a.start<b.start){
t=b;
b=a;
a=t;
}
if(b.count){
if(a.start<=b.start+b.count){
if(a.count&&a.start+a.count>b.start+b.count){
b.count=a.start+a.count-b.start;
}else{
if(!a.count){
b.count=null;
}
}
}else{
a=c;
continue;
}
}
r[i]=b;
_2e3=1;
break;
}
if(!_2e3){
_2e2.push(c);
}
}
args.range=_2e2;
return args;
};
function _2d6(self,args){
var r=args.range,_2e4=[],a,b,ps=self.pageSize;
r.sort(function(a,b){
return a.start-b.start;
});
while(r.length){
a=r.shift();
if(r.length){
b=r[0];
if(b.count&&b.count+b.start-a.start<=ps){
b.count=b.count+b.start-a.start;
b.start=a.start;
continue;
}else{
if(!b.count&&b.start-a.start<ps){
b.start=a.start;
continue;
}
}
}
_2e4.push(a);
}
if(_2e4.length==1&&_2e4[0].count<ps){
_2e4[0].count=ps;
}
args.range=_2e4;
return args;
};
function _2d4(self,ids){
var c=self._cache;
return _2cb.filter(ids,function(id){
return !c[id];
});
};
function _2d8(self,args){
var i,j,r,end,_2e5,_2e6=[],_2e7=self._struct[""],_2e8=self._size[""];
for(i=args.range.length-1;i>=0;--i){
r=args.range[i];
end=r.count?r.start+r.count:_2e7.length-1;
_2e5=1;
for(j=r.start;j<end;++j){
var id=_2e7[j+1];
if(!id||!self._cache[id]){
if(_2e5){
_2e6.push({start:j,count:1});
}else{
++_2e6[_2e6.length-1].count;
}
_2e5=0;
}else{
_2e5=1;
}
}
if(!r.count){
if(!_2e5){
delete _2e6[_2e6.length-1].count;
}else{
if(_2e8<0||j<_2e8){
_2e6.push({start:j});
}
}
}
}
args.range=_2e6;
return args;
};
function _2e9(self,ids){
var d=new _2cc(),fail=_2cf(d,d.errback),_2ea=self._struct[""],_2eb=[],_2ec,_2ed;
if(ids.length){
for(var i=1,len=_2ea.length;i<len;++i){
if(!_2ea[i]){
if(_2ed){
_2ec.count++;
}else{
_2ed=1;
_2eb.push(_2ec={start:i-1,count:1});
}
}
}
_2eb.push({start:_2ea.length<2?0:_2ea.length-2});
}
var func=function(ids){
if(ids.length&&_2eb.length){
self._storeFetch(_2eb.shift()).then(function(){
func(_2d4(self,ids));
},fail);
}else{
d.callback(ids);
}
};
func(ids);
return d;
};
function _2ee(self,ids){
var d=new _2cc(),fail=_2cf(d,d.errback),st=self._struct,_2ef=st[""].slice(1),func=function(ids){
if(ids.length&&_2ef.length){
var pid=_2ef.shift();
self._loadChildren(pid).then(function(){
[].push.apply(_2ef,st[pid].slice(1));
func(_2d4(self,ids));
},fail);
}else{
d.callback(ids);
}
};
func(ids);
return d;
};
return _2ca(_2ce,{isAsync:true,constructor:function(_2f0,args){
var cs=args.cacheSize,ps=args.pageSize;
this.cacheSize=cs>=0?cs:-1;
this.pageSize=ps>0?ps:100;
},when:function(args,_2f1){
var t=this,d=args._def=new _2cc(),fail=_2cf(d,d.errback),_2f2=function(e){
t._requests.pop();
fail(e);
};
_2d0(t,args).then(function(args){
_2d5(t,args).then(function(args){
_2db(t,args).then(function(args){
_2cc.when(args._req,function(){
var err;
if(_2f1){
try{
_2f1();
}
catch(e){
err=e;
}
}
t._requests.shift();
if(err){
d.errback(err);
}else{
d.callback();
}
},_2f2);
},_2f2);
},_2f2);
},fail);
return d;
},keep:function(id){
var t=this,k=t._kept;
if(t._cache[id]&&t._struct[id]&&!k[id]){
k[id]=1;
++t._keptSize;
}
},free:function(id){
var t=this;
if(!t.model.isId(id)){
t._kept={};
t._keptSize=0;
}else{
if(t._kept[id]){
delete t._kept[id];
--t._keptSize;
}
}
},clear:function(){
var t=this;
if(t._requests&&t._requests.length){
t._clearLock=1;
return;
}
t.inherited(arguments);
t._requests=[];
t._priority=[];
t._kept={};
t._keptSize=0;
},_init:function(){
},_checkSize:function(){
var t=this,id,cs=t.cacheSize,p=t._priority;
if(t._clearLock){
t._clearLock=0;
t.clear();
}else{
if(cs>=0){
cs+=t._keptSize;
while(p.length>cs){
id=p.shift();
if(t._kept[id]){
p.push(id);
}else{
delete t._cache[id];
}
}
}
}
}});
});
},"gridx/modules/move/Column":function(){
define("gridx/modules/move/Column",["dojo/_base/declare","dojo/_base/query","dojo/_base/array","dojo/keys","../../core/_Module"],function(_2f3,_2f4,_2f5,keys,_2f6){
return _2f3(_2f6,{name:"moveColumn",getAPIPath:function(){
return {move:{column:this}};
},preload:function(){
this.aspect(this.grid,"onHeaderCellKeyDown","_onKeyDown");
},columnMixin:{moveTo:function(_2f7){
this.grid.move.column.moveRange(this.index(),1,_2f7);
return this;
}},moveSelected:true,move:function(_2f8,_2f9){
if(typeof _2f8==="number"){
_2f8=[_2f8];
}
var map=[],i,len,_2fa=this.grid._columns,pos,_2fb=[];
for(i=0,len=_2f8.length;i<len;++i){
map[_2f8[i]]=true;
}
for(i=map.length-1;i>=0;--i){
if(map[i]){
_2fb.unshift(_2fa[i]);
_2fa.splice(i,1);
}
}
for(i=0,len=_2fa.length;i<len;++i){
if(_2fa[i].index>=_2f9){
pos=i;
break;
}
}
if(pos===undefined){
pos=_2fa.length;
}
this._moveComplete(_2fb,pos);
},moveRange:function(_2fc,_2fd,_2fe){
if(_2fe<_2fc||_2fe>_2fc+_2fd){
if(_2fe>_2fc+_2fd){
_2fe-=_2fd;
}
this._moveComplete(this.grid._columns.splice(_2fc,_2fd),_2fe);
}
},onMoved:function(){
},_moveComplete:function(_2ff,_300){
var g=this.grid,map={},_301=g._columns,i,_302={},_303=_300<_301.length?_301[_300].id:null,_304=function(tr){
var _305=_2f4("> .gridxCell",tr).filter(function(_306){
return _302[_306.getAttribute("colid")];
});
if(_303===null){
_305.place(tr);
}else{
_305.place(_2f4("> [colid=\""+_303+"\"]",tr)[0],"before");
}
};
for(i=_2ff.length-1;i>=0;--i){
map[_2ff[i].index]=_300+i;
_302[_2ff[i].id]=1;
}
[].splice.apply(_301,[_300,0].concat(_2ff));
for(i=_301.length-1;i>=0;--i){
_301[i].index=i;
}
_304(_2f4(".gridxHeaderRowInner > table > tbody > tr",g.headerNode)[0]);
_2f4(".gridxRow > table > tbody > tr",g.bodyNode).forEach(_304);
this.onMoved(map);
},_onKeyDown:function(e){
var t=this,g=t.grid,_307=t.arg("moveSelected")&&g.select&&g.select.column,ltr=g.isLeftToRight(),_308=ltr?keys.LEFT_ARROW:keys.RIGHT_ARROW,_309=ltr?keys.RIGHT_ARROW:keys.LEFT_ARROW;
if(e.ctrlKey&&!e.shiftKey&&!e.altKey&&(e.keyCode==_308||e.keyCode==_309)){
var _30a=e.columnIndex,_30b=_307&&_307.isSelected(e.columnId)?_2f5.map(_307.getSelected(),function(id){
return g._columnsById[id].index;
}):[e.columnIndex],node=g.header.getHeaderNode(e.columnId);
if(e.keyCode==_308){
while(_2f5.indexOf(_30b,_30a)>=0){
_30a--;
}
if(_30a>=0){
t.move(_30b,_30a);
g.header._focusNode(node);
}
}else{
if(e.keyCode==_309){
while(_2f5.indexOf(_30b,_30a)>=0){
_30a++;
}
if(_30a<g._columns.length){
t.move(_30b,_30a+1);
g.header._focusNode(node);
}
}
}
}
}});
});
},"dojo/dnd/Container":function(){
define("dojo/dnd/Container",["../_base/array","../_base/declare","../_base/event","../_base/kernel","../_base/lang","../_base/window","../dom","../dom-class","../dom-construct","../Evented","../has","../on","../query","../ready","../touch","./common"],function(_30c,_30d,_30e,_30f,lang,win,dom,_310,_311,_312,has,on,_313,_314,_315,dnd){
var _316=_30d("dojo.dnd.Container",_312,{skipForm:false,allowNested:false,constructor:function(node,_317){
this.node=dom.byId(node);
if(!_317){
_317={};
}
this.creator=_317.creator||null;
this.skipForm=_317.skipForm;
this.parent=_317.dropParent&&dom.byId(_317.dropParent);
this.map={};
this.current=null;
this.containerState="";
_310.add(this.node,"dojoDndContainer");
if(!(_317&&_317._skipStartup)){
this.startup();
}
this.events=[on(this.node,_315.over,lang.hitch(this,"onMouseOver")),on(this.node,_315.out,lang.hitch(this,"onMouseOut")),on(this.node,"dragstart",lang.hitch(this,"onSelectStart")),on(this.node,"selectstart",lang.hitch(this,"onSelectStart"))];
},creator:function(){
},getItem:function(key){
return this.map[key];
},setItem:function(key,data){
this.map[key]=data;
},delItem:function(key){
delete this.map[key];
},forInItems:function(f,o){
o=o||_30f.global;
var m=this.map,e=dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return _313((this.allowNested?"":"> ")+".dojoDndItem",this.parent);
},sync:function(){
var map={};
this.getAllNodes().forEach(function(node){
if(node.id){
var item=this.getItem(node.id);
if(item){
map[node.id]=item;
return;
}
}else{
node.id=dnd.getUniqueId();
}
var type=node.getAttribute("dndType"),data=node.getAttribute("dndData");
map[node.id]={data:data||node.innerHTML,type:type?type.split(/\s*,\s*/):["text"]};
},this);
this.map=map;
return this;
},insertNodes:function(data,_318,_319){
if(!this.parent.firstChild){
_319=null;
}else{
if(_318){
if(!_319){
_319=this.parent.firstChild;
}
}else{
if(_319){
_319=_319.nextSibling;
}
}
}
var i,t;
if(_319){
for(i=0;i<data.length;++i){
t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
_319.parentNode.insertBefore(t.node,_319);
}
}else{
for(i=0;i<data.length;++i){
t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
_30c.forEach(this.events,function(_31a){
_31a.remove();
});
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_31b,node,Ctor){
_31b._skipStartup=true;
return new Ctor(node,_31b);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!dnd.isFormElement(e)){
_30e.stop(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(type,_31c){
var _31d="dojoDnd"+type;
var _31e=type.toLowerCase()+"State";
_310.replace(this.node,_31d+_31c,_31d+this[_31e]);
this[_31e]=_31c;
},_addItemClass:function(node,type){
_310.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_310.remove(node,"dojoDndItem"+type);
},_getChildByEvent:function(e){
var node=e.target;
if(node){
for(var _31f=node.parentNode;_31f;node=_31f,_31f=node.parentNode){
if((_31f==this.parent||this.allowNested)&&_310.contains(node,"dojoDndItem")){
return node;
}
}
}
return null;
},_normalizedCreator:function(item,hint){
var t=(this.creator||this.defaultCreator).call(this,item,hint);
if(!lang.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=dnd.getUniqueId();
}
_310.add(t.node,"dojoDndItem");
return t;
}});
dnd._createNode=function(tag){
if(!tag){
return dnd._createSpan;
}
return function(text){
return _311.create(tag,{innerHTML:text});
};
};
dnd._createTrTd=function(text){
var tr=_311.create("tr");
_311.create("td",{innerHTML:text},tr);
return tr;
};
dnd._createSpan=function(text){
return _311.create("span",{innerHTML:text});
};
dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dnd._defaultCreator=function(node){
var tag=node.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dnd._createTrTd:dnd._createNode(dnd._defaultCreatorNodes[tag]);
return function(item,hint){
var _320=item&&lang.isObject(item),data,type,n;
if(_320&&item.tagName&&item.nodeType&&item.getAttribute){
data=item.getAttribute("dndData")||item.innerHTML;
type=item.getAttribute("dndType");
type=type?type.split(/\s*,\s*/):["text"];
n=item;
}else{
data=(_320&&item.data)?item.data:item;
type=(_320&&item.type)?item.type:["text"];
n=(hint=="avatar"?dnd._createSpan:c)(String(data));
}
if(!n.id){
n.id=dnd.getUniqueId();
}
return {node:n,data:data,type:type};
};
};
return _316;
});
},"gridx/core/model/cache/Sync":function(){
define("gridx/core/model/cache/Sync",["dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","./_Cache"],function(_321,lang,_322,_323){
function _324(self){
var s=self._struct,pids=s[""].slice(1),pid,_325=function(pid){
[].push.apply(pids,s[pid].slice(1));
};
while(pids.length){
pid=pids.shift();
_322.when(self._loadChildren(pid),lang.partial(_325,pid));
}
};
return _321(_323,{keep:function(){
},free:function(){
},when:function(args,_326){
var d=new _322();
try{
if(_326){
_326();
}
d.callback();
}
catch(e){
d.errback(e);
}
return d;
},_init:function(){
var t=this;
if(!t._filled){
t._storeFetch({start:0});
if(t.store.getChildren){
_324(t);
}
t.model._onSizeChange();
}
}});
});
},"gridx/modules/dnd/Column":function(){
define("gridx/modules/dnd/Column",["dojo/_base/declare","dojo/_base/array","dojo/dom-geometry","dojo/dom-class","dojo/_base/query","./_Base","../../core/_Module"],function(_327,_328,_329,_32a,_32b,_32c,_32d){
return _327(_32c,{name:"dndColumn",required:["_dnd","selectColumn","moveColumn"],getAPIPath:function(){
return {dnd:{column:this}};
},preload:function(){
var t=this,g=t.grid;
t.inherited(arguments);
t._selector=g.select.column;
t.connect(g.header,"onRender","_initHeader");
},load:function(){
this._initHeader();
this.loaded.callback();
},accept:[],provide:["grid/columns"],_checkDndReady:function(evt){
var t=this;
if(t._selector.isSelected(evt.columnId)){
t._selectedColIds=t._selector.getSelected();
t.grid.dnd._dnd.profile=t;
return true;
}
return false;
},onDraggedOut:function(){
},_cssName:"Column",_initHeader:function(){
_32b(".gridxCell",this.grid.header.domNode).attr("aria-dragged","false");
},_onBeginDnd:function(_32e){
var t=this;
_32e.delay=t.arg("delay");
_328.forEach(t._selectedColIds,function(id){
_32b("[colid=\""+id+"\"].gridxCell",t.grid.header.domNode).attr("aria-dragged","true");
});
},_getDndCount:function(){
return this._selectedColIds.length;
},_onEndDnd:function(){
_32b("[aria-dragged=\"true\"].gridxCell",this.grid.header.domNode).attr("aria-dragged","false");
},_buildDndNodes:function(){
var gid=this.grid.id;
return _328.map(this._selectedColIds,function(_32f){
return ["<div id='",gid,"_dndcolumn_",_32f,"' gridid='",gid,"' columnid='",_32f,"'></div>"].join("");
}).join("");
},_onBeginAutoScroll:function(){
var _330=this.grid.autoScroll;
this._autoScrollV=_330.vertical;
_330.vertical=false;
},_onEndAutoScroll:function(){
this.grid.autoScroll.vertical=this._autoScrollV;
},_getItemData:function(id){
return id.substring((this.grid.id+"_dndcolumn_").length);
},_calcTargetAnchorPos:function(evt,_331){
var node=evt.target,t=this,g=t.grid,ltr=g.isLeftToRight(),_332=g._columns,ret={height:_331.h+"px",width:"",top:""},func=function(n){
var id=n.getAttribute("colid"),_333=g._columnsById[id].index,_334=n,last=n,_335=_333,_336=_333;
if(t._selector.isSelected(id)){
_335=_333;
while(_335>0&&t._selector.isSelected(_332[_335-1].id)){
--_335;
}
_334=_32b(".gridxHeaderRow [colid='"+_332[_335].id+"']",g.headerNode)[0];
_336=_333;
while(_336<_332.length-1&&t._selector.isSelected(_332[_336+1].id)){
++_336;
}
last=_32b(".gridxHeaderRow [colid='"+_332[_336].id+"']",g.headerNode)[0];
}
if(_334&&last){
var _337=_329.position(_334),_338=_329.position(last),_339=(_337.x+_338.x+_338.w)/2,pre=evt.clientX<_339;
if(pre){
ret.left=(_337.x-_331.x-1)+"px";
}else{
ret.left=(_338.x+_338.w-_331.x-1)+"px";
}
t._target=pre^ltr?_336+1:_335;
}else{
delete t._target;
}
return ret;
};
while(node){
if(_32a.contains(node,"gridxCell")){
return func(node);
}
node=node.parentNode;
}
var _33a=_32b(".gridxRow",g.bodyNode)[0],_33b=_329.position(_33a.firstChild);
if(_33b.x+_33b.w<=evt.clientX){
ret.left=(_33b.x+_33b.w-_331.x-1)+"px";
t._target=_332.length;
}else{
if(_33b.x>=evt.clientX){
ret.left=(_33b.x-_331.x-1)+"px";
t._target=0;
}else{
if(_32b(".gridxCell",_33a).some(function(_33c){
var _33d=_329.position(_33c);
if(_33d.x<=evt.clientX&&_33d.x+_33d.w>=evt.clientX){
node=_33c;
return true;
}
})){
return func(node);
}
}
}
return ret;
},_onDropInternal:function(_33e,copy){
var t=this;
if(t._target>=0){
var _33f=_328.map(t._selectedColIds,function(_340){
return t.grid._columnsById[_340].index;
});
t.grid.move.column.move(_33f,t._target);
}
},_onDropExternal:function(){
}});
});
},"dojo/dnd/Manager":function(){
define("dojo/dnd/Manager",["../_base/array","../_base/declare","../_base/event","../_base/lang","../_base/window","../dom-class","../Evented","../has","../keys","../on","../topic","../touch","./common","./autoscroll","./Avatar"],function(_341,_342,_343,lang,win,_344,_345,has,keys,on,_346,_347,dnd,_348,_349){
var _34a=_342("dojo.dnd.Manager",[_345],{constructor:function(){
this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[];
},OFFSET_X:has("touch")?0:16,OFFSET_Y:has("touch")?-64:16,overSource:function(_34b){
if(this.avatar){
this.target=(_34b&&_34b.targetState!="Disabled")?_34b:null;
this.canDropFlag=Boolean(this.target);
this.avatar.update();
}
_346.publish("/dnd/source/over",_34b);
},outSource:function(_34c){
if(this.avatar){
if(this.target==_34c){
this.target=null;
this.canDropFlag=false;
this.avatar.update();
_346.publish("/dnd/source/over",null);
}
}else{
_346.publish("/dnd/source/over",null);
}
},startDrag:function(_34d,_34e,copy){
_348.autoScrollStart(win.doc);
this.source=_34d;
this.nodes=_34e;
this.copy=Boolean(copy);
this.avatar=this.makeAvatar();
win.body().appendChild(this.avatar.node);
_346.publish("/dnd/start",_34d,_34e,this.copy);
this.events=[on(win.doc,_347.move,lang.hitch(this,"onMouseMove")),on(win.doc,_347.release,lang.hitch(this,"onMouseUp")),on(win.doc,"keydown",lang.hitch(this,"onKeyDown")),on(win.doc,"keyup",lang.hitch(this,"onKeyUp")),on(win.doc,"dragstart",_343.stop),on(win.body(),"selectstart",_343.stop)];
var c="dojoDnd"+(copy?"Copy":"Move");
_344.add(win.body(),c);
},canDrop:function(flag){
var _34f=Boolean(this.target&&flag);
if(this.canDropFlag!=_34f){
this.canDropFlag=_34f;
this.avatar.update();
}
},stopDrag:function(){
_344.remove(win.body(),["dojoDndCopy","dojoDndMove"]);
_341.forEach(this.events,function(_350){
_350.remove();
});
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=this.target=null;
this.nodes=[];
},makeAvatar:function(){
return new _349(this);
},updateAvatar:function(){
this.avatar.update();
},onMouseMove:function(e){
var a=this.avatar;
if(a){
_348.autoScrollNodes(e);
var s=a.node.style;
s.left=(e.pageX+this.OFFSET_X)+"px";
s.top=(e.pageY+this.OFFSET_Y)+"px";
var copy=Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
if(has("touch")){
e.preventDefault();
}
},onMouseUp:function(e){
if(this.avatar){
if(this.target&&this.canDropFlag){
var copy=Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
_346.publish("/dnd/drop/before",this.source,this.nodes,copy,this.target,e);
_346.publish("/dnd/drop",this.source,this.nodes,copy,this.target,e);
}else{
_346.publish("/dnd/cancel");
}
this.stopDrag();
}
},onKeyDown:function(e){
if(this.avatar){
switch(e.keyCode){
case keys.CTRL:
var copy=Boolean(this.source.copyState(true));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
break;
case keys.ESCAPE:
_346.publish("/dnd/cancel");
this.stopDrag();
break;
}
}
},onKeyUp:function(e){
if(this.avatar&&e.keyCode==keys.CTRL){
var copy=Boolean(this.source.copyState(false));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},_setCopyStatus:function(copy){
this.copy=copy;
this.source._markDndStatus(this.copy);
this.updateAvatar();
_344.replace(win.body(),"dojoDnd"+(this.copy?"Copy":"Move"),"dojoDnd"+(this.copy?"Move":"Copy"));
}});
dnd._manager=null;
_34a.manager=dnd.manager=function(){
if(!dnd._manager){
dnd._manager=new _34a();
}
return dnd._manager;
};
return _34a;
});
},"dojo/dnd/Avatar":function(){
define("dojo/dnd/Avatar",["../_base/declare","../_base/window","../dom","../dom-attr","../dom-class","../dom-construct","../hccss","../query"],function(_351,win,dom,_352,_353,_354,has,_355){
return _351("dojo.dnd.Avatar",null,{constructor:function(_356){
this.manager=_356;
this.construct();
},construct:function(){
var a=_354.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_357=this.manager.source,node,b=_354.create("tbody",null,a),tr=_354.create("tr",null,b),td=_354.create("td",null,tr),k=Math.min(5,this.manager.nodes.length),i=0;
if(has("highcontrast")){
_354.create("span",{id:"a11yIcon",innerHTML:this.manager.copy?"+":"<"},td);
}
_354.create("span",{innerHTML:_357.generateText?this._generateText():""},td);
_352.set(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_357.creator){
node=_357._normalizedCreator(_357.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
node=this.manager.nodes[i].cloneNode(true);
if(node.tagName.toLowerCase()=="tr"){
var _358=_354.create("table"),_359=_354.create("tbody",null,_358);
_359.appendChild(node);
node=_358;
}
}
node.id="";
tr=_354.create("tr",null,b);
td=_354.create("td",null,tr);
td.appendChild(node);
_352.set(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
_354.destroy(this.node);
this.node=false;
},update:function(){
_353.toggle(this.node,"dojoDndAvatarCanDrop",this.manager.canDropFlag);
if(has("highcontrast")){
var icon=dom.byId("a11yIcon");
var text="+";
if(this.manager.canDropFlag&&!this.manager.copy){
text="< ";
}else{
if(!this.manager.canDropFlag&&!this.manager.copy){
text="o";
}else{
if(!this.manager.canDropFlag){
text="x";
}
}
}
icon.innerHTML=text;
}
_355(("tr.dojoDndAvatarHeader td span"+(has("highcontrast")?" span":"")),this.node).forEach(function(node){
node.innerHTML=this.manager.source.generateText?this._generateText():"";
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
});
},"gridx/modules/VLayout":function(){
define("gridx/modules/VLayout",["dojo/_base/declare","dojo/DeferredList","../core/_Module"],function(_35a,_35b,_35c){
return _35a(_35c,{name:"vLayout",getAPIPath:function(){
return {vLayout:this};
},preload:function(){
var t=this,g=t.grid;
t.connect(g,"_onResizeEnd",function(_35d,ds){
var d,dl=[];
for(d in ds){
dl.push(ds[d]);
}
new _35b(dl).then(function(){
t.reLayout();
});
});
if(g.autoHeight){
t.connect(g.body,"onRender","reLayout");
}else{
t.connect(g,"setColumns",function(){
setTimeout(function(){
t.reLayout();
},0);
});
}
},load:function(args,_35e){
var t=this;
_35e.then(function(){
if(t._defs&&t._mods){
new _35b(t._defs).then(function(){
t._layout();
t.loaded.callback();
});
}else{
t.loaded.callback();
}
});
},register:function(mod,_35f,_360,_361,_362){
var t=this;
t._defs=t._defs||[];
t._mods=t._mods||{};
t._mods[_360]=t._mods[_360]||[];
t._defs.push(_362||mod.loaded);
t._mods[_360].push({p:_361||0,mod:mod,nodeName:_35f});
},reLayout:function(){
var t=this,_363=0,_364,n;
for(_364 in t._mods){
n=t.grid[_364];
if(n){
_363+=n.offsetHeight;
}
}
t._updateHeight(_363);
},_layout:function(){
var _365=0,t=this,mods=t._mods,_366,n,i,hp,mod,_367;
for(_366 in mods){
n=t.grid[_366];
if(n){
hp=mods[_366];
hp.sort(function(a,b){
return a.p-b.p;
});
for(i=0;i<hp.length;++i){
mod=hp[i].mod;
_367=hp[i].nodeName;
if(mod&&mod[_367]){
n.appendChild(mod[_367]);
}
}
_365+=n.offsetHeight;
}
}
t._updateHeight(_365);
},_updateHeight:function(_368){
var g=this.grid,dn=g.domNode,ms=g.mainNode.style;
if(g.autoHeight){
g.vScroller.loaded.then(function(){
var _369=g.bodyNode.lastChild,_36a=_369?_369.offsetTop+_369.offsetHeight:g.emptyNode.offsetHeight;
dn.style.height=(_36a+_368)+"px";
ms.height=_36a+"px";
});
}else{
if(dn.clientHeight>_368){
ms.height=(dn.clientHeight-_368)+"px";
}
}
}});
});
},"dojo/_base/query":function(){
define("dojo/_base/query",["../query","./NodeList"],function(_36b){
return _36b;
});
},"gridx/modules/HLayout":function(){
define("gridx/modules/HLayout",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/array","dojo/dom-style","dojo/DeferredList","../core/_Module"],function(_36c,_36d,_36e,_36f,_370,_371){
return _36c(_371,{name:"hLayout",getAPIPath:function(){
return {hLayout:this};
},load:function(args,_372){
var t=this;
t.connect(t.grid,"_onResizeEnd",function(_373,ds){
var d,dl=[];
for(d in ds){
dl.push(ds[d]);
}
new _370(dl).then(function(){
t.reLayout();
});
});
_372.then(function(){
t._layout();
});
},lead:0,tail:0,register:function(_374,_375,_376){
var r=this._regs=this._regs||[];
if(!_374){
_374=new _36d();
_374.callback();
}
r.push([_374,_375,_376]);
},reLayout:function(){
var t=this,r=t._regs,lead=0,tail=0;
if(r){
_36e.forEach(r,function(reg){
var w=reg[1].offsetWidth||_36f.get(reg[1],"width");
if(reg[2]){
tail+=w;
}else{
lead+=w;
}
});
t.lead=lead;
t.tail=tail;
t.onUpdateWidth(lead,tail);
}
},onUpdateWidth:function(){
},_layout:function(){
var t=this,r=t._regs;
if(r){
var lead=0,tail=0,dl=_36e.map(r,function(reg){
return reg[0];
});
new _370(dl).then(function(){
_36e.forEach(r,function(reg){
var w=reg[1].offsetWidth||_36f.get(reg[1],"width");
if(reg[2]){
tail+=w;
}else{
lead+=w;
}
});
t.lead=lead;
t.tail=tail;
t.loaded.callback();
});
}else{
t.loaded.callback();
}
}});
});
},"*now":function(r){
r(["dojo/i18n!*preload*gridx/nls/Grid*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("gridx/Grid",["dojo/_base/kernel","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/sniff","dojo/on","dojo/dom-class","dojo/dom-geometry","dojo/_base/query","dojox/html/metrics","dijit/_WidgetBase","dijit/_FocusMixin","dijit/_TemplatedMixin","dojo/text!./templates/Grid.html","./core/Core","./core/model/extensions/Query","./core/_Module","./modules/Header","./modules/Body","./modules/VLayout","./modules/HLayout","./modules/VScroller","./modules/HScroller","./modules/ColumnWidth"],function(_377,_378,_379,lang,has,on,_37a,_37b,_37c,_37d,_37e,_37f,_380,_381,Core,_382,_383,_384,Body,_385,_386,_387,_388,_389){
var _38a=_379.forEach,_38b=function(){
};
var Grid=_378("gridx.Grid",[_37e,_380,_37f,Core],{templateString:_381,coreModules:[_384,Body,_385,_386,_387,_388,_389],coreExtensions:[_382],postCreate:function(){
var t=this;
t.inherited(arguments);
t._eventFlags={};
t.modules=t.coreModules.concat(t.modules||[]);
t.modelExtensions=t.coreExtensions.concat(t.modelExtensions||[]);
_37a.toggle(t.domNode,"gridxRtl",!t.isLeftToRight());
t.lastFocusNode.setAttribute("tabIndex",t.domNode.getAttribute("tabIndex"));
t._initEvents(t._compNames,t._eventNames);
t._init();
t.connect(_37d,"onFontResize",function(){
t.resize();
});
},startup:function(){
if(!this._started){
this.inherited(arguments);
this._deferStartup.callback();
}
},destroy:function(){
this._uninit();
this.inherited(arguments);
},resize:function(_38c){
var t=this,ds={};
if(_38c){
if(t.autoWidth){
_38c.w=undefined;
}
if(t.autoHeight){
_38c.h=undefined;
}
_37b.setMarginBox(t.domNode,_38c);
}
t._onResizeBegin(_38c,ds);
t._onResizeEnd(_38c,ds);
},_onResizeBegin:function(){
},_onResizeEnd:function(){
},_compNames:["Cell","HeaderCell","Row","Header"],_eventNames:["Click","DblClick","MouseDown","MouseUp","MouseOver","MouseOut","MouseMove","ContextMenu","KeyDown","KeyPress","KeyUp"],_initEvents:function(_38d,_38e){
var t=this;
_38a(_38d,function(comp){
_38a(_38e,function(_38f){
var _390="on"+comp+_38f;
t[_390]=t[_390]||_38b;
});
});
},_connectEvents:function(node,_391,_392){
for(var t=this,m=t.model,_393,_394=t._eventNames,len=_394.length,i=0;i<len;++i){
_393=_394[i];
m._cnnts.push(on(node,_393.toLowerCase(),lang.hitch(_392,_391,_393)));
}
},_isConnected:function(_395){
return this[_395]!==_38b;
},_isCopyEvent:function(evt){
return has("mac")?evt.metaKey:evt.ctrlKey;
}});
Grid.markupFactory=function(_396,node,ctor){
if(!_396.structure&&node.nodeName.toLowerCase()=="table"){
_377.deprecated("Column declaration in <th> elements is deprecated,","use \"structure\" attribute in data-dojo-props instead","1.1");
var s=_396.structure=[];
_37c("thead > tr > th",node).forEach(function(th){
var col={};
_38a(_383._markupAttrs,function(attr){
if(attr[0]=="!"){
attr=attr.slice(1);
col[attr]=eval(th.getAttribute(attr));
}else{
col[attr]=th.getAttribute(attr);
}
});
col.name=col.name||th.innerHTML;
s.push(col);
});
}
return new ctor(_396,node);
};
return Grid;
});
