//>>built
define("gridx/modules/Bar",["require","dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dijit/a11y","dojo/dom-construct","../core/_Module","../core/util"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
_2.experimental("gridx/modules/Bar");
return _3(_8,{name:"bar",getAPIPath:function(){
return {bar:this};
},preload:function(){
var t=this,_a=t.plugins={},_b=function(_c,_d,_e){
if(_4.isArray(t.arg(_c))){
var _f=_c+"Node";
t[_f]=_7.toDom("<table class=\"gridxBar\" border=\"0\" cellspacing=\"0\"></table>");
t.grid.vLayout.register(t,_f,_d,_e);
_a[_c]=t._parse(t[_c],t[_f]);
}
};
_b("top","headerNode",-5);
_b("bottom","footerNode",5);
},load:function(_10,_11){
var t=this;
t.loaded.callback();
_11.then(function(){
t._forEachPlugin(function(_12){
if(_12&&_12.startup){
_12.startup();
}
});
t._initFocus();
setTimeout(function(){
t.grid.vLayout.reLayout();
},10);
});
},destroy:function(){
this.inherited(arguments);
this._forEachPlugin(function(_13){
if(_13.destroy){
_13.destroy();
}
});
},_parse:function(_14,_15){
var _16,_17=[],_18=_7.create("tbody"),_19=function(n,def,_1a,_1b){
if(def[_1b]){
n.setAttribute(_1a||_1b,def[_1b]);
delete def[_1b];
}
};
if(!_4.isArray(_14[0])){
_14=[_14];
}
for(var i=0,_1c=_14.length;i<_1c;++i){
var _1d=[],row=_14[i],tr=_7.create("tr");
for(var j=0,_1e=row.length;j<_1e;++j){
var def=this._normalizePlugin(row[j]),td=_7.create("td");
_5.forEach(["colSpan","rowSpan","style"],_4.partial(_19,td,def,0));
_19(td,def,"class","className");
_16=null;
if(def.pluginClass){
var cls=def.pluginClass;
delete def.pluginClass;
try{
_16=new cls(def);
td.appendChild(_16.domNode);
}
catch(e){
console.error(e);
}
}else{
if(def.content){
td.innerHTML=def.content;
}
}
_1d.push(_16);
tr.appendChild(td);
}
_17.push(_1d);
_18.appendChild(tr);
}
_15.appendChild(_18);
return _17;
},_normalizePlugin:function(def){
if(!def||!_4.isObject(def)||_4.isFunction(def)){
def={pluginClass:def};
}else{
def=_4.mixin({},def);
}
if(_4.isString(def.pluginClass)){
try{
def.pluginClass=_1(def.pluginClass);
}
catch(e){
console.error(e);
}
}
if(_4.isFunction(def.pluginClass)){
def.grid=this.grid;
}else{
def.pluginClass=null;
}
return def;
},_forEachPlugin:function(_1f){
function _20(_21){
if(_21){
for(var i=0,_22=_21.length;i<_22;++i){
var row=_21[i];
for(var j=0,_23=row.length;j<_23;++j){
_1f(row[j]);
}
}
}
};
var _24=this.plugins;
_20(_24.top);
_20(_24.bottom);
},_initFocus:function(){
var t=this,f=t.grid.focus;
if(f){
function _25(pos,_26){
if(t[pos+"Node"]){
f.registerArea({name:pos+"bar",priority:_26,focusNode:t[pos+"Node"],doFocus:_4.hitch(t,t._doFocus,pos),doBlur:_4.hitch(t,t._doBlur,pos)});
}
};
_25("top",-10);
_25("bottom",10);
}
},_doFocus:function(pos,evt,_27){
this.grid.focus.stopEvent(evt);
var _28=_6._getTabNavigable(this[pos+"Node"]),_29=_28[_27<0?"last":"first"];
if(_29){
_29.focus();
}
return !!_29;
},_doBlur:function(pos,evt,_2a){
var _2b=_6._getTabNavigable(this[pos+"Node"]);
return evt?evt.target==(_2a<0?_2b.first:_2b.last):true;
}});
});
