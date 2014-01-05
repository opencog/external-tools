//>>built
define("gridx/modules/Dod",["dojo/_base/kernel","../core/_Module","dojo/_base/declare","dojo/_base/html","dojo/_base/fx","dojo/fx","dojo/query"],function(_1,_2,_3,_4,_5,fx,_6){
return _3(_2,{name:"dod",required:["body"],useAnimation:true,duration:750,defaultShow:false,showExpando:true,autoClose:false,load:function(_7,_8){
_1.experimental("gridx/modules/Dod");
this._rowMap={};
this.connect(this.grid.body,"onAfterRow","_onAfterRow");
this.connect(this.grid.bodyNode,"onclick","_onBodyClick");
if(this.grid.columnResizer){
this.connect(this.grid.columnResizer,"onResize","_onColumnResize");
}
this.loaded.callback();
},getAPIPath:function(){
return {dod:this};
},rowMixin:{showDetail:function(){
this.grid.dod.show(this);
},hideDetail:function(){
this.grid.dod.hide(this);
},toggleDetail:function(){
this.grid.dod.toggle(this);
},refreshDetail:function(){
this.grid.dod.refreshDetail(this);
},isDetailShown:function(){
return this.grid.dod.isShown(this);
}},show:function(_9){
var _a=this._row(_9);
if(_a.dodShown||_a.inAnim||!_9.node()){
return;
}
_a.dodShown=true;
var _b=this._getExpando(_9);
if(_b){
_b.firstChild.innerHTML="-";
}
var _c=_9.node(),w=_c.scrollWidth;
if(!_a.dodLoadingNode){
_a.dodLoadingNode=_1.create("div",{className:"gridxDodLoadNode",innerHTML:"Loading..."});
}
if(!_a.dodNode){
_a.dodNode=_1.create("div",{className:"gridxDodNode"});
}
_4.place(_a.dodLoadingNode,_c,"last");
_4.place(_a.dodNode,_c,"last");
_4.style(_a.dodLoadingNode,"width",w+"px");
_4.style(_a.dodNode,"width",w+"px");
_4.addClass(_c,"gridxDodShown");
_4.style(_a.dodNode,"display","none");
if(_a.dodLoaded){
this._detailLoadComplete(_9);
return;
}else{
_4.style(_a.dodLoadingNode,"display","block");
}
if(this.grid.rowHeader){
var _d=_6("[rowid=\""+_9.id+"\"].gridxRowHeaderRow",this.grid.rowHeader.bodyNode)[0];
_1.style(_d.firstChild,"height",_1.style(_9.node(),"height")+"px");
}
var df=new _1.Deferred(),_e=this;
this.detailProvider(this.grid,_9.id,_a.dodNode,df);
df.then(_1.hitch(this,"_detailLoadComplete",_9),_1.hitch(this,"_detailLoadError",_9));
},hide:function(_f){
var _10=this._row(_f),g=this.grid;
if(!_10.dodShown||_10.inAnim||!_f.node()){
return;
}
_4.removeClass(_f.node(),"gridxDodShown");
_4.style(_10.dodLoadingNode,"display","none");
if(this.grid.rowHeader){
var _11=_6("[rowid=\""+_f.id+"\"].gridxRowHeaderRow",this.grid.rowHeader.bodyNode)[0];
_1.style(_11.firstChild,"height",_1.style(_f.node(),"height")-1+"px");
}
var _12=this._getExpando(_f);
if(_12){
_12.firstChild.innerHTML="+";
}
_10.inAnim=true;
fx.wipeOut({node:_10.dodNode,duration:this.arg("duration"),onEnd:function(){
_10.dodShown=false;
_10.inAnim=false;
g.body.onRender();
}}).play();
if(this.grid.rowHeader){
var _11=_6("[rowid=\""+_f.id+"\"].gridxRowHeaderRow",this.grid.rowHeader.bodyNode)[0];
_5.animateProperty({node:_11.firstChild,duration:this.arg("duration"),properties:{height:{start:_11.offsetHeight,end:_11.offsetHeight-_10.dodNode.scrollHeight,units:"px"}}}).play();
}
_10.defaultShow=false;
},toggle:function(row){
if(this.isShown(row)){
this.hide(row);
}else{
this.show(row);
}
},refresh:function(row){
var _13=this._row(row);
_13.dodLoaded=false;
this.show(row);
},isShown:function(row){
var _14=this._row(row);
return !!_14.dodShown;
},onShow:function(row){
},onHide:function(row){
},_rowMap:null,_lastOpen:null,_row:function(row){
var id=row.id||row;
return this._rowMap[id]||(this._rowMap[id]={});
},_onBodyClick:function(e){
if(!_4.hasClass(e.target,"gridxDodExpando")&&!_4.hasClass(e.target,"gridxDodExpandoText")){
return;
}
var _15=e.target;
while(_15&&!_4.hasClass(_15,"gridxRow")){
_15=_15.parentNode;
}
var idx=_4.attr(_15,"rowindex");
this.toggle(this.grid.row(parseInt(idx)));
},_onAfterRow:function(row){
var _16=this._row(row);
if(this.arg("showExpando")){
var tbl=_1.query("table",row.node())[0];
var _17=tbl.rows[0].cells[0];
var _18=_1.create("span",{className:"gridxDodExpando",innerHTML:"<span class=\"gridxDodExpandoText\">"+(this.defaultShow?"-":"+")+"</span>"},_17,"first");
}
if(this.isShown(row)||(this.arg("defaultShow")&&_16.dodShown===undefined)){
_16.dodShown=false;
_16.defaultShow=true;
this.show(row);
}
},_onColumnResize:function(){
_1.query(".gridxDodNode",this.grid.bodyNode).forEach(function(_19){
_4.style(_19,"width",_19.parentNode.firstChild.offsetWidth+"px");
});
},_detailLoadComplete:function(row){
var _1a=this._row(row),g=this.grid;
if(!this.isShown(row)){
return;
}
_1a.dodLoaded=true;
if(_1a.defaultShow){
_4.style(_1a.dodNode,"display","block");
g.body.onRender();
}else{
if(_1.style(_1a.dodLoadingNode,"display")=="block"){
_4.marginBox(_1a.dodNode,{h:_4.marginBox(_1a.dodLoadingNode).h});
_4.style(_1a.dodNode,"display","block");
}
_1a.inAnim=true;
fx.wipeIn({node:_1a.dodNode,duration:this.arg("duration"),onEnd:function(){
_1a.inAnim=false;
g.body.onRender();
}}).play();
if(this.grid.rowHeader){
var _1b=_6("[rowid=\""+row.id+"\"].gridxRowHeaderRow",this.grid.rowHeader.bodyNode)[0];
_5.animateProperty({node:_1b.firstChild,duration:this.arg("duration"),properties:{height:{start:_1b.offsetHeight,end:row.node().firstChild.offsetHeight+_1a.dodNode.scrollHeight,units:"px"}}}).play();
}
}
_4.style(_1a.dodLoadingNode,"display","none");
},_detailLoadError:function(row){
var _1c=this._row(row);
_1c.dodLoaded=false;
if(!this.isShown(row)){
return;
}
_1c.dodLoadingNode.innerHTML="Error: failed to load detail.";
},_showLoading:function(row){
var _1d=this._row(row);
var _1e=_1d.dodLoadingNode;
_1e.innerHTML="Loading...";
},_getExpando:function(row){
if(!this.showExpando){
return null;
}
var tbl=_1.query("table",row.node())[0];
var _1f=tbl.rows[0].cells[0];
return _1f.firstChild;
},_hideLoading:function(row){
},endFunc:function(){
}});
});
