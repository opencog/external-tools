//>>built
define("gridx/mobile/Grid",["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/aspect","dojo/string","dojo/dom-class","dojox/mobile/_DataMixin","dojox/mobile/Pane","dojox/mobile/ScrollablePane"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
_1.experimental("gridx/mobile/Grid");
var _b=_2("gridx.mobile.Grid",[_9,_8],{autoHeight:true,showHeader:false,vScroller:true,hScroller:false,columns:null,setStore:function(_c,_d,_e){
this.inherited(arguments);
this._buildBody();
},setColumns:function(_f){
this.columns=_f;
this.buildGrid();
},postMixInProperties:function(){
this.inherited(arguments);
this.queryOptions=this.queryOptions||{};
this.query=this.query||{};
},buildGrid:function(){
this._buildHeader();
this._buildBody();
this.resize();
},_buildHeader:function(){
if(!this.showHeader){
this.headerNode.style.display="none";
return;
}else{
this.headerNode.style.display="block";
}
var arr=["<div class=\"mobileGridxHeaderRow\"><table><tr>"];
_4.forEach(this.columns,function(col){
arr.push("<th class=\"mobileGridxHeaderCell ",col.cssClass||"",col.align?" align-"+col.align:"",col.width?"\" style=\"width:"+col.width+";\"":"",">",col.title,"</th>");
});
arr.push("</tr></table></div>");
this.headerNode.innerHTML=arr.join("");
},_buildBody:function(){
var _10=this,q=this.query,opt=this.queryOptions;
this.store.fetch({query:q,queryOptions:opt,sort:opt&&opt.sort||[],onComplete:function(_11){
var arr=[];
_4.forEach(_11,function(_12,i){
arr.push(_10._createRow(_12,i));
});
_10.bodyPane.containerNode.innerHTML=arr.join("");
},onError:function(err){
console.error("Failed to fetch items from store:",err);
},start:opt&&opt.start,count:opt&&opt.count});
},_createRow:function(_13,i){
var _14=!(i%2);
var _15=this.store.getIdentity(_13);
var arr=["<div class=\"mobileGridxRow "+(_14?"mobileGridxRowOdd":"")+"\""," rowId=\""+_15+"\"","><table><tr>"];
_4.forEach(this.columns,function(col){
var _16=this._getCellContent(col,_13);
arr.push("<td class=\"mobileGridxCell ",((col.cssClass||col.align)?((col.cssClass||"")+(col.align?" align-"+col.align:"")):""),"\"",(col.width?" style=\"width:"+col.width+";\"":""),">",_16,"</td>");
},this);
arr.push("</tr></table></div>");
return arr.join("");
},_getCellContent:function(col,_17){
var f=col.formatter,obj=this._itemToObject(_17);
if(col.template){
return _6.substitute(col.template,obj);
}else{
return f?f(obj,col):obj[col.field];
}
},buildRendering:function(){
this.inherited(arguments);
_7.add(this.domNode,"mobileGridx");
this.domNode.innerHTML="<div class=\"mobileGridxHeader\"></div><div class=\"mobileGridxBody\"></div><div class=\"mobileGridxFooter\"></div>";
this.headerNode=this.domNode.childNodes[0];
this.bodyNode=this.domNode.childNodes[1];
this.footerNode=this.domNode.childNodes[2];
this.containerNode=this.bodyNode;
var _18=(this.vScroller?"v":"")+(this.hScroller?"h":"");
if(!_18){
_18="v";
}
this.bodyPane=new _a({scrollDir:_18},this.bodyNode);
if(this.showHeader){
var h=this.headerNode;
this.connect(this.bodyPane,"scrollTo",function(to){
if((typeof to.x)!="number"){
return;
}
h.firstChild.style.webkitTransform=this.bodyPane.makeTranslateStr({x:to.x});
});
this.connect(this.bodyPane,"slideTo",function(to,_19,_1a){
this.bodyPane._runSlideAnimation({x:this.bodyPane.getPos().x},{x:to.x},_19,_1a,h.firstChild,2);
});
this.connect(this.bodyPane,"stopAnimation",function(){
_7.remove(h.firstChild,"mblScrollableScrollTo2");
});
}
},resize:function(){
this.inherited(arguments);
var h=this.domNode.offsetHeight;
if(this.autoHeight){
this.domNode.style.height="auto";
var n=this.domNode,p=n.parentNode;
h=this.bodyPane.getScreenSize().h;
_4.forEach(p.childNodes,function(_1b){
if(_1b==n){
return;
}
h-=(_1b.offsetHeight||0);
});
}
h=h-this.headerNode.offsetHeight-this.footerNode.offsetHeight;
this.bodyNode.style.height=h+"px";
},startup:function(){
this.inherited(arguments);
this.bodyPane.startup();
},_itemToObject:function(_1c){
var _1d=this.store,arr=_1d.getAttributes(_1c),res={};
_4.forEach(arr,function(key){
res[key]=_1d.getValue(_1c,key);
});
return res;
}});
return _b;
});
