//>>built
define("gridx/modules/Focus",["dojo/_base/declare","dojo/_base/array","dojo/_base/connect","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","dojo/_base/event","dojo/keys","../core/_Module","../core/util"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
return _1(_9,{name:"focus",getAPIPath:function(){
return {focus:this};
},constructor:function(){
var t=this,g=t.grid;
t._areas={};
t._tabQueue=[];
t._focusNodes=[];
t._onDocFocus=function(_b){
if(!t._noBlur){
if(_5("ie")){
_b.target=_b.srcElement;
}
t._onFocus(_b);
}
};
t.batchConnect([g.domNode,"onkeydown","_onTabDown"],[g.domNode,"onfocus","_focus"],[g.lastFocusNode,"onfocus","_focus"],[g,"onBlur","_doBlur"]);
if(_5("ie")){
_6.doc.attachEvent("onfocusin",t._onDocFocus);
}else{
_6.doc.addEventListener("focus",t._onDocFocus,true);
}
},destroy:function(){
var t=this;
t._areas=null;
t._areaQueue=null;
t._focusNodes=[];
t._queueIdx=-1;
if(_5("ie")){
_6.doc.detachEvent("onfocusin",t._onDocFocus);
}else{
_6.doc.removeEventListener("focus",t._onDocFocus,true);
}
t.inherited(arguments);
},registerArea:function(_c){
if(_c&&_c.name&&typeof _c.priority=="number"){
var t=this,tq=t._tabQueue,_d=function(fn){
_c[fn]=_c[fn]?_4.hitch(_c.scope||_c,_c[fn]):function(){
return true;
};
};
if(t._areas[_c.name]){
t.removeArea(_c.name);
}
_d("doFocus");
_d("doBlur");
_d("onFocus");
_d("onBlur");
_c.connects=_c.connects||[];
t._areas[_c.name]=_c;
var i=_a.biSearch(tq,function(a){
return a.p-_c.priority;
});
if(tq[i]&&tq[i].p===_c.priority){
tq[i].stack.unshift(_c.name);
t._focusNodes[i]=_c.focusNode||t._focusNodes[i];
}else{
tq.splice(i,0,{p:_c.priority,stack:[_c.name]});
t._focusNodes.splice(i,0,_c.focusNode);
}
}
},focusArea:function(_e,_f){
var t=this,_10=t._areas[_e];
if(_10){
var _11=t._areas[t.currentArea()];
if(_11&&_11.name===_e){
if(_f){
_11.doFocus();
}
return true;
}else{
if(!_11||_11.doBlur()){
if(_11){
t.onBlurArea(_11.name);
}
if(_10.doFocus()){
t.onFocusArea(_10.name);
t._updateCurrentArea(_10);
return true;
}
t._updateCurrentArea();
}
}
}
return false;
},currentArea:function(){
var a=this._tabQueue[this._queueIdx];
return a?a.stack[this._stackIdx]:"";
},tab:function(_12,evt){
var t=this,_13=t._areas,_14=_13[t.currentArea()];
if(!_12){
return _14?_14.name:"";
}
var cai=t._queueIdx+_12,dir=_12>0?1:-1,tq=t._tabQueue;
if(_14){
var _15=_14.doBlur(evt,_12),_16=_13[_15];
if(_15){
t.onBlurArea(_14.name);
}
if(_16&&_16.doFocus(evt,_12)){
t.onFocusArea(_16.name);
t._updateCurrentArea(_16);
return _16.name;
}else{
if(!_15){
return _14.name;
}
}
}
for(;cai>=0&&cai<tq.length;cai+=dir){
var i,_17=tq[cai].stack;
for(i=0;i<_17.length;++i){
var _18=_17[i];
if(_13[_18].doFocus(evt,_12)){
t.onFocusArea(_18);
t._queueIdx=cai;
t._stackIdx=i;
return _18;
}
}
}
t._tabingOut=1;
if(_12<0){
t._queueIdx=-1;
t.grid.domNode.focus();
}else{
t._queueIdx=tq.length;
t.grid.lastFocusNode.focus();
}
return "";
},removeArea:function(_19){
var t=this,_1a=t._areas[_19];
if(_1a){
if(t.currentArea()===_19){
t._updateCurrentArea();
}
var i=_a.biSearch(t._tabQueue,function(a){
return a.p-_1a.priority;
}),j,_1b=t._tabQueue[i].stack;
for(j=_1b.length-1;j>=0;--j){
if(_1b[j]===_1a.name){
_1b.splice(j,1);
break;
}
}
if(!_1b.length){
t._tabQueue.splice(i,1);
t._focusNodes.splice(i,1);
}
_2.forEach(_1a.connects,_3.disconnect);
delete t._areas[_19];
return true;
}
return false;
},stopEvent:function(evt){
if(evt){
_7.stop(evt);
}
},onFocusArea:function(){
},onBlurArea:function(){
},_queueIdx:-1,_stackIdx:0,_onTabDown:function(evt){
if(evt.keyCode===_8.TAB){
this.tab(evt.shiftKey?-1:1,evt);
}
},_onFocus:function(evt){
var t=this,i,j,_1c,_1d,dn=t.grid.domNode,n=evt.target,_1e=t._areas[t.currentArea()];
while(n&&n!==dn){
i=_2.indexOf(t._focusNodes,n);
if(i>=0){
_1c=t._tabQueue[i].stack;
for(j=0;j<_1c.length;++j){
_1d=t._areas[_1c[j]];
if(_1d.onFocus(evt)){
if(_1e&&_1e.name!==_1d.name){
_1e.onBlur(evt);
t.onBlurArea(_1e.name);
}
t.onFocusArea(_1d.name);
t._queueIdx=i;
t._stackIdx=j;
return;
}
}
return;
}
n=n.parentNode;
}
if(n==dn&&_1e){
t._doBlur(evt,_1e);
}
},_focus:function(evt){
var t=this;
if(t._tabingOut){
t._tabingOut=0;
}else{
if(evt.target==t.grid.domNode){
t._queueIdx=-1;
t.tab(1);
}else{
if(evt.target===t.grid.lastFocusNode){
t._queueIdx=t._tabQueue.length;
t.tab(-1);
}
}
}
},_doBlur:function(evt,_1f){
var t=this;
if(!_1f&&t.currentArea()){
_1f=t._areas[t.currentArea()];
}
if(_1f){
_1f.onBlur(evt);
t.onBlurArea(_1f.name);
t._updateCurrentArea();
}
},_updateCurrentArea:function(_20){
var t=this,tq=t._tabQueue;
if(_20){
var i=t._queueIdx=_a.biSearch(tq,function(a){
return a.p-_20.priority;
}),_21=tq[i].stack;
t._stackIdx=_2.indexOf(_21,_20.name);
}else{
t._queueIdx=null;
t._stackIdx=0;
}
}});
});
