//>>built
define("gridx/modules/pagination/_PaginationBarBase",["dojo/_base/declare","dojo/_base/array","../../core/_Module"],function(_1,_2,_3){
return _1(_3,{name:"paginationBar",required:["vLayout"],forced:["pagination"],getAPIPath:function(){
return {paginationBar:this};
},preload:function(){
var t=this,g=t.grid,_4=g.vLayout,p=g.pagination;
t._pagers=[];
if(t._exist("top")){
_4.register(t,"_topPagerNode","headerNode",-5);
}
if(t._exist("bottom")){
_4.register(t,"_bottomPagerNode","footerNode",5);
}
if(!p.arg("initialPageSize")){
p.initialPageSize=t.arg("sizes")[0];
}
},load:function(_5,_6){
var t=this;
_6.then(function(){
t._init();
t.loaded.callback();
});
},destroy:function(){
this.inherited(arguments);
_2.forEach(this._pagers,function(_7){
_7.destroyRecursive();
});
},sizes:[10,25,50,100,0],position:"bottom",sizeSwitch:true,stepper:true,description:true,refresh:function(){
_2.forEach(this._pagers,function(_8){
_8.refresh();
});
this.grid.vLayout.reLayout();
},_exist:function(_9,_a){
var v=this.arg(_a||"position");
v=v&&String(v).toLowerCase();
return v&&((v!="top"&&v!="bottom")||v==_9);
},_init:function(){
var t=this;
_2.forEach(["top","bottom"],function(_b){
if(t._exist(_b)){
var _c=t.arg("pagerClass"),_d=new _c({pagination:t.grid.pagination,module:t,position:_b,focusPriority:{top:-5,bottom:5}[_b]});
t._pagers.push(_d);
t["_"+_b+"PagerNode"]=_d.domNode;
}
});
}});
});
