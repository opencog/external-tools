//>>built
define("gridx/modules/pagination/Pagination",["dojo/_base/declare","dojo/_base/array","../../core/_Module"],function(_1,_2,_3){
return _1(_3,{name:"pagination",forced:["body"],getAPIPath:function(){
return {pagination:this};
},rowMixin:{getPage:function(){
return this.grid.pagination.pageOfIndex(this.index());
},indexInPage:function(){
return this.grid.pagination.indexInPage(this.index());
}},preload:function(){
this.grid.body.autoChangeSize=false;
},load:function(){
var t=this;
t._pageSize=t.arg("initialPageSize")||t._pageSize;
t._page=t.arg("initialPage",t._page,function(_4){
return _4>=0;
});
t.model.when({},function(){
t._updateBody(1);
t.connect(t.model,"onSizeChange","_onSizeChange");
t.loaded.callback();
});
},pageSize:function(){
var s=this._pageSize;
return s>0?s:this.model.size();
},isAll:function(){
return this._pageSize===0;
},pageCount:function(){
return this.isAll()?1:Math.max(Math.ceil(this.model.size()/this.pageSize()),1);
},currentPage:function(){
return this._page;
},firstIndexInPage:function(_5){
if(!_5&&_5!==0){
_5=this._page;
}else{
if(!(_5>=0)){
return -1;
}
}
var _6=_5*this.pageSize();
return _6<this.model.size()?_6:-1;
},lastIndexInPage:function(_7){
var t=this,_8=t.firstIndexInPage(_7);
if(_8>=0){
var _9=_8+t.pageSize()-1,_a=t.model.size();
return _9<_a?_9:_a-1;
}
return -1;
},pageOfIndex:function(_b){
return this.isAll()?0:Math.floor(_b/this.pageSize());
},indexInPage:function(_c){
return this.isAll()?_c:_c%this.pageSize();
},filterIndexesInPage:function(_d,_e){
var _f=this.firstIndexInPage(_e),end=this.lastIndexInPage(_e);
return _f<0?[]:_2.filter(_d,function(_10){
return _10>=_f&&_10<=end;
});
},gotoPage:function(_11){
var t=this,_12=t._page;
if(_11!=_12&&t.firstIndexInPage(_11)>=0){
t._page=_11;
t._updateBody();
t.onSwitchPage(_11,_12);
}
},setPageSize:function(_13){
var t=this,_14=t._pageSize;
if(_13!=_14&&_13>=0){
var _15=t.firstIndexInPage(),_16=-1;
t._pageSize=_13;
if(t._page>=t.pageCount()){
_16=t._page;
t._page=t.pageOfIndex(_15);
}
t._updateBody();
t.onChangePageSize(_13,_14);
if(_16>=0){
t.onSwitchPage(t._page,_16);
}
}
},onSwitchPage:function(){
},onChangePageSize:function(){
},_page:0,_pageSize:10,_updateBody:function(_17){
var t=this,bd=t.grid.body,_18=t.model.size(),_19=t.pageSize(),_1a=t.firstIndexInPage();
if(_18===0||_1a<0){
_1a=0;
_19=0;
}else{
if(_18-_1a<_19){
_19=_18-_1a;
}
}
bd.updateRootRange(_1a,_19);
if(!_17){
bd.refresh();
}
},_onSizeChange:function(_1b){
var t=this;
if(_1b===0){
t._page=0;
t.grid.body.updateRootRange(0,0);
}else{
var _1c=t.firstIndexInPage();
if(_1c<0){
if(t._page!==0){
var _1d=t._page;
t._page=0;
t.onSwitchPage(0,_1d);
}
}
t._updateBody();
}
}});
});
