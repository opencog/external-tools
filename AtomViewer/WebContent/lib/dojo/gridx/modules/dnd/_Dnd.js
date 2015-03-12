//>>built
define("gridx/modules/dnd/_Dnd",["dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/dom-construct","dojo/dom-geometry","dojo/dom-class","dojo/dom-style","dojo/dom","dojo/_base/window","dojo/_base/sniff","dojo/dnd/Source","dojo/dnd/Manager","../../core/_Module","../AutoScroll"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
var _e=_2.hitch;
return _d.register(_1(_d,{name:"_dnd",constructor:function(){
var t=this,g=t.grid,_f=_9.doc;
t.accept=[];
t._profiles={};
t._selectStatus={};
t._node=_4.create("div");
t.batchConnect([g,"onCellMouseOver","_checkDndReady"],[g,"onCellMouseOut","_dismissDndReady"],[g,"onCellMouseDown","_beginDnd"],[_f,"onmouseup","_endDnd"],[_f,"onmousemove","_onMouseMove"]);
t.subscribe("/dnd/cancel","_endDnd");
},load:function(_10){
var t=this,n=t.grid.mainNode;
t._source=new _b(n,{isSource:false,accept:t.accept,getSelectedNodes:function(){
return [0];
},getItem:_e(t,"_getItem"),checkAcceptance:_e(t,"_checkAcceptance"),onDraggingOver:_e(t,"_onDraggingOver"),onDraggingOut:_e(t,"_onDraggingOut"),onDropExternal:_e(t,"_onDropExternal"),onDropInternal:_e(t,"_onDropInternal")});
if(_a("ff")){
t._fixFF(t._source,n);
}
t._source.grid=t.grid;
t._saveSelectStatus();
t.loaded.callback();
},destroy:function(){
this.inherited(arguments);
this._source.destroy();
_4.destroy(this._node);
},getAPIPath:function(){
return {dnd:{_dnd:this}};
},profile:null,register:function(_11,_12){
this._profiles[_11]=_12;
[].push.apply(this.accept,_12.arg("accept"));
},_fixFF:function(_13){
return this.connect(_9.doc,"onmousemove",function(evt){
var pos=_5.position(_13.node),x=evt.clientX,y=evt.clientY,_14=_13._alreadyIn,_15=y>=pos.y&&y<=pos.y+pos.h&&x>=pos.x&&x<=pos.x+pos.w;
if(!_14&&_15){
_13._alreadyIn=1;
_13.onOverEvent();
}else{
if(_14&&!_15){
_13._alreadyIn=0;
_13.onOutEvent();
}
}
});
},_onMouseMove:function(evt){
var t=this;
if(t._alreadyIn&&(t._dnding||t._extDnding)){
t._markTargetAnchor(evt);
}
},_saveSelectStatus:function(_16){
var _17,_18,_19=this.grid.select;
if(_19){
for(_17 in _19){
_18=_19[_17];
if(_18&&_2.isObject(_18)){
this._selectStatus[_17]=_18.arg("enabled");
if(_16!==undefined){
_18.enabled=_16;
}
}
}
}
},_loadSelectStatus:function(){
var _1a,_1b,_1c=this.grid.select;
if(_1c){
for(_1a in _1c){
_1b=_1c[_1a];
if(_1b&&_2.isObject(_1b)){
_1b.enabled=this._selectStatus[_1a];
}
}
}
},_checkDndReady:function(evt){
var t=this,_1d,p;
if(!t._dndReady&&!t._dnding&&!t._extDnding){
for(_1d in t._profiles){
p=t._profiles[_1d];
if(p.arg("enabled")&&p._checkDndReady(evt)){
t.profile=p;
t._saveSelectStatus(false);
_6.add(_9.body(),"gridxDnDReadyCursor");
t._dndReady=1;
return;
}
}
}
},_dismissDndReady:function(){
if(this._dndReady){
this._loadSelectStatus();
this._dndReady=0;
_6.remove(_9.body(),"gridxDnDReadyCursor");
}
},_beginDnd:function(evt){
var t=this;
t._checkDndReady(evt);
if(t._dndReady){
var p=t.profile,m=_c.manager();
t._source.isSource=true;
t._source.canNotDragOut=!p.arg("provide").length;
t._node.innerHTML=p._buildDndNodes();
t._oldStartDrag=m.startDrag;
m.startDrag=_e(t,"_startDrag",evt);
if(t.avatar){
t._oldMakeAvatar=m.makeAvatar;
m.makeAvatar=function(){
return new t.avatar(m);
};
}
m._dndInfo={cssName:p._cssName,count:p._getDndCount()};
p._onBeginDnd(t._source);
_8.setSelectable(t.grid.domNode,false);
}
},_endDnd:function(){
var t=this,m=_c.manager();
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
_8.setSelectable(t.grid.domNode,true);
_6.remove(_9.body(),"gridxDnDReadyCursor");
t.profile._onEndDnd();
t._loadSelectStatus();
}
},_createUI:function(){
_6.add(_9.body(),"gridxDnDCursor");
if(this.grid.autoScroll){
this.profile._onBeginAutoScroll();
this.grid.autoScroll.enabled=true;
}
},_destroyUI:function(){
var t=this;
t._unmarkTargetAnchor();
_6.remove(_9.body(),"gridxDnDCursor");
if(t.grid.autoScroll){
t.profile._onEndAutoScroll();
t.grid.autoScroll.enabled=false;
}
},_createTargetAnchor:function(){
return _4.create("div",{"class":"gridxDnDAnchor"});
},_markTargetAnchor:function(evt){
var t=this;
if(t._extDnding||t.profile.arg("canRearrange")){
var _1e=t._targetAnchor,_1f=_5.position(t.grid.mainNode);
if(!_1e){
_1e=t._targetAnchor=t._createTargetAnchor();
_1e.style.display="none";
t.grid.mainNode.appendChild(_1e);
}
_6.add(_1e,"gridxDnDAnchor"+t.profile._cssName);
var pos=t.profile._calcTargetAnchorPos(evt,_1f);
if(pos){
_7.set(_1e,pos);
_1e.style.display="block";
}else{
_1e.style.display="none";
}
}
},_unmarkTargetAnchor:function(){
var _20=this._targetAnchor;
if(_20){
_20.style.display="none";
_6.remove(_20,"gridxDnDAnchor"+this.profile._cssName);
}
},_startDrag:function(evt,_21,_22,_23){
var t=this;
if(t._dndReady&&_21===t._source){
t._oldStartDrag.call(_c.manager(),_21,t._node.childNodes,_23);
t._dndReady=0;
t._dnding=t._alreadyIn=1;
t._createUI();
t._markTargetAnchor(evt);
}
},_getItem:function(id){
return {type:this.profile.arg("provide"),data:this.profile._getItemData(id)};
},_checkAcceptance:function(_24,_25){
var t=this,_26=function(arr){
var res={};
for(var i=arr.length-1;i>=0;--i){
res[arr[i]]=1;
}
return res;
},_27=_b.prototype.checkAcceptance,res=_27.apply(t._source,arguments);
if(res){
if(_24.grid===t.grid){
return t.profile.arg("canRearrange");
}
if(!_24.canNotDragOut){
for(var _28 in t._profiles){
var p=t._profiles[_28];
var _29=_27.apply({accept:_26(p.arg("accept"))},arguments);
if(p.arg("enabled")&&_29&&(!p.checkAcceptance||p.checkAcceptance.apply(p,arguments))){
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
},_onDropInternal:function(_2a,_2b){
this.profile._onDropInternal(_2a,_2b);
},_onDropExternal:function(_2c,_2d,_2e){
var t=this,_2f=t.profile._onDropExternal(_2c,_2d,_2e);
_3.when(_2f,function(){
if(!_2e){
if(_2c.grid){
_2c.grid.dnd._dnd.profile.onDraggedOut(t._source);
}else{
_2c.deleteSelectedNodes();
}
}
});
}}));
});
