//>>built
define("gridx/mobile/LazyLoad",["dojo/_base/declare","dojo/_base/array","dojo/dom-construct","dojo/dom-class"],function(_1,_2,_3,_4){
return _1(null,{pageSize:20,currentPage:0,totalPages:0,rowCount:910,postMixInProperties:function(){
this.inherited(arguments);
var _5=this.queryOptions;
if(!_5){
this.queryOptions=_5={};
}
_5.start=0;
_5.count=this.pageSize;
},buildRendering:function(){
this.inherited(arguments);
var _6=_3.create("div",{className:"mobileGridxLoadMoreWrapper"},this.bodyPane.containerNode,"last");
this._buttonLoadMore=_3.create("button",{innerHTML:"Load more",className:"mobileGridxLoadMoreButton mblButton"},_6,"last");
this.connect(this._buttonLoadMore,"onclick","loadMore");
},_buildBody:function(){
var _7=this,q=this.query,_8=this.queryOptions;
this.store.fetch({query:q,queryOptions:_8,sort:_8&&_8.sort||[],onComplete:function(_9){
var _a=[];
_2.forEach(_9,function(_b,i){
_a.push(_7._createRow(_b,i));
});
_3.place(_a.join(""),_7._buttonLoadMore.parentNode,"before");
},onError:function(_c){
console.error("Failed to fetch items from store:",_c);
},start:_8&&_8.start,count:_8&&_8.count});
this.currentPage++;
this._updateLoadMoreButton();
},loadMore:function(){
var _d=this;
this._makeButtonBusy();
window.setTimeout(function(){
var _e=_d.pageSize;
if(_d.pageSize*(_d.currentPage+1)>=_d.rowCount){
_e=_d.rowCount-_d.pageSize*_d.currentPage;
}
var _f=_d.queryOptions;
_f.start=_d.currentPage*_d.pageSize;
_f.count=_e;
_d._buildBody();
_d._cancelButtonBusy();
},2000);
},_updateLoadMoreButton:function(){
var btn=this._buttonLoadMore;
if(this.pageSize*this.currentPage>=this.rowCount){
btn.style.display="none";
}else{
btn.style.display="block";
}
},_makeButtonBusy:function(){
var btn=this._buttonLoadMore;
btn.innerHTML="<img src=\""+this._blankGif+"\" class=\"mobileGridxLoadingIcon\"/> Loading...";
btn.disabled=true;
},_cancelButtonBusy:function(){
var btn=this._buttonLoadMore;
btn.innerHTML="Load more";
btn.disabled=false;
}});
});
