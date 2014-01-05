//>>built
define("gridx/mobile/PullRefresh",["dojo/_base/declare","dojo/_base/array","dojo/aspect","dojo/dom-construct","dojo/dom-class","dojo/i18n!./nls/PullRefresh"],function(_1,_2,_3,_4,_5,_6){
return _1(null,{readyToRefresh:false,state:"normal",triggerHeight:50,maxId:20,queryOptions:{sort:[{attribute:"id",descending:true}],start:980,count:20},postMixInProperties:function(){
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
var _7=this;
_3.before(this.bodyPane,"slideTo",function(to,_8,_9){
if((typeof to.y)!="number"){
return;
}
if(to.y==0&&_7.state!="normal"){
to.y=_7.triggerHeight;
if(_7.state=="ready"){
_7._loadNew();
_7._setPullRefreshState("loading");
}
}
});
this.connect(this.bodyPane,"scrollTo",function(to){
if((typeof to.y)!="number"){
return;
}
var _a=_7.pullRefreshWrapper;
if(to.y==0){
if(_7.state=="ready"){
}
}else{
if(to.y>_7.triggerHeight){
if(_7.state=="normal"){
_7._setPullRefreshState("ready");
}
}else{
if(_7.state=="ready"){
_7._setPullRefreshState("normal");
}
}
}
});
},_loadNew:function(){
var _b=this,q=this.query,_c=this.queryOptions;
window.setTimeout(function(){
_c.start-=20;
_b.store.fetch({query:q,queryOptions:_c,sort:_c&&_c.sort||[],onComplete:function(_d){
var _e=[];
_2.forEach(_d,function(_f,i){
_e.push(_b._createRow(_f,i));
});
_4.place(_e.join(""),_b.pullRefreshWrapper,"after");
_b._loadComplete();
},onError:function(err){
console.error("Failed to fetch items from store:",err);
},start:_c&&_c.start,count:_c&&_c.count});
},1500);
},_loadComplete:function(){
this._setPullRefreshState("normal");
this.bodyPane.slideTo({y:0});
},_setPullRefreshState:function(_10){
var _11=this.pullRefreshWrapper,_12=_11.lastChild;
_5.remove(_11,"releaseToRefresh");
_5.remove(_11,"inLoading");
this.state=_10;
switch(_10){
case "normal":
_12.innerHTML=_6.pullToRefresh;
break;
case "ready":
_12.innerHTML=_6.releaseToRefresh;
_5.add(_11,"releaseToRefresh");
break;
case "loading":
_12.innerHTML=_6.waitForLoading;
_5.add(_11,"inLoading");
break;
default:
break;
}
},_buildBody:function(){
this.inherited(arguments);
this.pullRefreshWrapper=_4.create("div",{className:"mobileGridxPullRefreshWrapper"},this.bodyPane.containerNode,"first");
this.pullRefreshWrapper.innerHTML="<img src=\""+this._blankGif+"\"/><span class=\"mobileGridxPullRefreshLabel\">"+_6.pullToRefresh+"</span>";
}});
});
