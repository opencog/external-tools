//>>built
require({cache:{"url:gridx/tests/support/GridConfig.html":"<div class='gridxConfig'>\n\t<div class='dojoxGridConfigBtns'>\n\t\t<button data-dojo-type='dijit.form.Button' data-dojo-attach-event='onClick: _onCreate'>Create Grid</button>\n\t\t<button data-dojo-type='dijit.form.Button' data-dojo-attach-event='onClick: onDestroy'>Destroy Grid</button>\n\t</div>\n\t<div data-dojo-type='gridx.tests.support.TestPane' data-dojo-attach-point='tp'></div>\n</div>\n"}});
define("gridx/tests/support/GridConfig",["dojo/_base/declare","dojo/_base/array","dojo/_base/json","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/text!./GridConfig.html","dijit/form/CheckBox","dijit/form/RadioButton","dijit/form/TextBox","dijit/form/Select","dijit/form/NumberTextBox","./TestPane"],function(_1,_2,_3,_4,_5,_6,_7){
return _1("gridx.tests.support.GridConfig",[_4,_5,_6],{templateString:_7,stores:{},caches:{},gridAttrs:{},modules:{},modelExts:{},getID:function(_8,_9){
return this.id+"_"+_8+"_"+_9;
},postCreate:function(){
this.inherited(arguments);
this.tp.addTestSet("Modules",this._createMods());
this.tp.addTestSet("Attributes",this._createArgs());
this.tp.addTestSet("Other Settings",["<h2>Stores & Structures</h2>",this._createStores(),"<h2>Caches</h2>",this._createCaches(),"<h2>Model Extensions</h2>",this._createExts(),""].join(""));
},startup:function(){
if(!this._started){
this.inherited(arguments);
var _a,_b,_c,_d;
this.connect(dijit.byId(this.getID("all","modules")),"onChange","_selectAllMods");
for(_a in this.stores){
this.connect(dijit.byId(this.getID("rb",_a)),"onChange",dojo.hitch(this,"_onChangeCheckBox",_a,"rb",this.stores[_a]));
}
for(_c in this.gridAttrs){
this.connect(dijit.byId(this.getID("cbattr",_c)),"onChange",dojo.hitch(this,"_onChangeCheckBox",_c,"cbattr",this.gridAttrs[_c]));
}
var _e=function(_f,_10){
t._onChangeCheckBox(_10,"cb",_f);
t._requireDepends(_f,_10);
};
for(_d in this.modules){
var t=this;
var _11=t.modules[_d];
this.connect(dijit.byId(this.getID("cb",_d)),"onChange",dojo.hitch(this,_e,_11,_d));
}
}
},_requireDepends:function(_12,_13){
var _14;
var _15=[];
for(var _16 in _12){
var mod=_12[_16];
var _17=mod.prototype;
var dep=(_17.forced||[]).concat(_17.required||[]);
_14=_17.name;
_15=_15.concat(dep);
}
if(dijit.byId(this.getID("cb",_13)).get("checked")){
if(_15.length){
var res=[];
for(var _18 in this.modules){
var m=this.modules[_18];
for(_16 in m){
if(_2.indexOf(_15,m[_16].prototype.name)>=0){
res.push(_18);
break;
}
}
}
var t=this;
_2.forEach(res,function(_19){
dijit.byId(t.getID("cb",_19)).set("checked",true);
});
}
}else{
var _12=[],_18;
for(_18 in this.modules){
var mod=this.modules[_18];
if(dijit.byId(this.getID("cb",_18)).get("checked")){
var _16=dijit.byId(this.getID("select",_18)).get("value");
var _17=mod[_16].prototype;
var dep=(_17.forced||[]).concat(_17.required||[]);
if(_2.indexOf(dep,_14)>=0){
dijit.byId(this.getID("cb",_18)).set("checked",false);
}
}
}
}
},getHandle:function(_1a,_1b){
return dijit.byId(this.getID({"store":"rb","layout":"select","cache":"rb","attr":"cbattr","attrValue":"selectattr","ext":"cb","mod":"cb","modImpl":"select"}[_1a],_1b));
},_createStores:function(){
var sb=["<table>"];
for(var _1c in this.stores){
var _1d=this.stores[_1c];
sb.push("<tr><td><div data-dojo-type=\"dijit.form.RadioButton\" ","id=\"",this.getID("rb",_1c),"\" ","name=\"",this.getID("rb","store"),"\" ",_1d.defaultCheck?"checked=\"true\"":"","></div><label for=\"",this.getID("rb",_1c),"\">",_1c,"</label>","</td><td><select data-dojo-type=\"dijit.form.Select\" ","id=\"",this.getID("select",_1c),"\" ",_1d.defaultCheck?"":"disabled=\"true\"",">");
var f=0;
for(var _1e in _1d.layouts){
sb.push("<option value='",_1e,"' selected='",!f++,"'>",_1e,"</option>");
}
sb.push("</select></td></tr>");
}
sb.push("</table>");
return sb.join("");
},_createCaches:function(){
var sb=["<table>"];
for(var _1f in this.caches){
var _20=this.caches[_1f];
sb.push("<tr><td><div data-dojo-type='dijit.form.RadioButton' ","id='",this.getID("rb",_1f),"' ","name='",this.getID("rb","cache"),"' ",_20.defaultCheck?"checked='true'":"","></div><label for='",this.getID("rb",_1f),"'>",_1f,"</label>","</td></tr>");
}
sb.push("</table>");
return sb.join("");
},_createArgs:function(){
var sb=["<table>"];
for(var _21 in this.gridAttrs){
var _22=this.gridAttrs[_21];
sb.push("<tr><td><div dojoType='dijit.form.CheckBox' ","id='",this.getID("cbattr",_21),"' ",_22.defaultCheck?"checked='true'":"","></div><label for='",this.getID("cbattr",_21),"'>",_21,"</label>","</td><td>");
switch(_22.type){
case "bool":
sb.push("<select dojoType='dijit.form.Select' id='",this.getID("selectattr",_21),"' ",_22.defaultCheck?"":"disabled='true'","><option value='ture'>true</option>","<option value='false'>false</option>","</select>");
break;
case "enum":
sb.push("<select dojoType='dijit.form.Select' id='",this.getID("selectattr",_21),"' ",_22.defaultCheck?"":"disabled='true'",">");
for(var _23 in _22.values){
sb.push("<option value='",_22.values[_23],"'>",_23,"</option>");
}
sb.push("</select>");
break;
case "string":
case "json":
sb.push("<input dojoType='dijit.form.TextBox' id='",this.getID("selectattr",_21),"' ",_22.defaultCheck?" ":"disabled='true' ","value='",_22.value,"'","/>");
break;
case "number":
sb.push("<input dojoType='dijit.form.NumberTextBox' id='",this.getID("selectattr",_21),"' ",_22.defaultCheck?" ":"disabled='true' ","value='",_22.value,"'","/>");
break;
}
sb.push("</td></tr>");
}
sb.push("</table>");
return sb.join("");
},_createExts:function(){
var sb=["<table>"];
for(var _24 in this.modelExts){
sb.push("<tr><td><div dojoType='dijit.form.CheckBox' ","id='",this.getID("cb",_24),"' ","extName='",_24,"' ","></div><label for='",this.getID("cb",_24),"'>",_24,"</label>","</td></tr>");
}
sb.push("</table>");
return sb.join("");
},_createMods:function(){
var sb=["<table class=\"gridxConfigAllMods\"><tr><td>","<div data-dojo-type=\"dijit.form.CheckBox\" ","id=\"",this.getID("all","modules"),"\" ","></div><label for=\"",this.getID("all","modules"),"\">Select All Modules</label>","</td></tr></table><table>"];
for(var _25 in this.modules){
var mod=this.modules[_25];
sb.push("<tr><td><div dojoType='dijit.form.CheckBox' ","id='",this.getID("cb",_25),"' ","modName='",_25,"' ",mod.defaultCheck?"checked='true' disabled='true'":"","></div><label for='",this.getID("cb",_25),"'>",_25,"</label>","</td><td><select dojoType='dijit.form.Select' ","id='",this.getID("select",_25),"' ",mod.defaultCheck?"":"disabled='true'",">");
var f=0;
for(var _26 in mod){
if(_26==="defaultCheck"){
continue;
}
sb.push("<option value='",_26,"'>",_26,"</option>");
}
sb.push("</select></td></tr>");
}
return sb.join("");
},_onChangeCheckBox:function(_27,_28,obj){
var b=dijit.byId(this.getID(_28,_27));
var _29=b.get("checked");
dijit.byId(this.getID(_28=="cbattr"?"selectattr":"select",_27)).set("disabled",!_29);
if(obj.onChange){
obj.onChange(_29,this);
}
},_getStoreLayout:function(){
var _2a,_2b,_2c;
for(_2c in this.stores){
if(dijit.byId(this.getID("rb",_2c)).get("checked")){
_2a=this.stores[_2c].store;
var _2d=dijit.byId(this.getID("select",_2c)).get("value");
_2b=this.stores[_2c].layouts[_2d];
break;
}
}
return {store:_2a,structure:_2b};
},_getCache:function(){
var _2e,_2f;
for(_2f in this.caches){
if(dijit.byId(this.getID("rb",_2f)).get("checked")){
_2e=this.caches[_2f].cache;
break;
}
}
return _2e;
},_getAttrs:function(){
var _30={},_31;
for(_31 in this.gridAttrs){
var _32=this.gridAttrs[_31];
if(dijit.byId(this.getID("cbattr",_31)).get("checked")){
switch(_32.type){
case "bool":
case "number":
case "string":
_30[_31]=dijit.byId(this.getID("selectattr",_31)).get("value");
break;
case "enum":
var _33=dijit.byId(this.getID("selectattr",_31)).get("value");
_30[_31]=_32[_33];
break;
case "json":
_30[_31]=_3.fromJson(dijit.byId(this.getID("selectattr",_31)).get("value"));
break;
}
}
}
return _30;
},_getExts:function(){
var _34=[],_35;
for(_35 in this.modelExts){
if(dijit.byId(this.getID("cb",_35)).get("checked")){
_34.push(this.modelExts[_35]);
}
}
return _34;
},_getMods:function(){
var _36=[],_37;
for(_37 in this.modules){
var mod=this.modules[_37];
if(dijit.byId(this.getID("cb",_37)).get("checked")){
var _38=dijit.byId(this.getID("select",_37)).get("value");
_36.push(mod[_38]);
}
}
return _36;
},getGridArgs:function(){
var ret=dojo.mixin(this._getAttrs(),this._getStoreLayout(),{cacheClass:this._getCache(),modelExtensions:this._getExts(),modules:this._getMods()});
return ret;
},_selectAllMods:function(_39){
var _3a;
for(_3a in this.modules){
if(!this.modules[_3a].defaultCheck){
dijit.byId(this.getID("cb",_3a)).set("checked",_39);
}
}
},_onCreate:function(){
this.onCreate(this.getGridArgs());
},onCreate:function(){
},onDestroy:function(){
}});
});
