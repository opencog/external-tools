//>>built
define("gridx/mobile/Sort",["dojo/_base/declare","dojo/_base/array"],function(_1,_2){
return _1(null,{sort:function(_3){
if(_3&&(_3.length||_3.attribute)){
this.queryOptions.sort=_3.length?_3:[_3];
}else{
this.queryOptions.sort=null;
}
this._buildBody();
this.updateSortIndicators();
},_buildHeader:function(){
this.inherited(arguments);
this.connect(this.headerNode,"onclick",function(_4){
var _5=_4.target;
if(!/th/i.test(_5.tagName)){
return;
}
var _6=this.columns[_5.cellIndex],_7=this.queryOptions.sort;
if(_7){
_7=_7.length?_7[0]:_7;
}else{
_7={};
}
if(_7.attribute!=_6.field){
_7={attribute:_6.field,descending:false};
}else{
if(_7.descending){
_7.attribute=null;
}else{
if(!_7.descending){
_7.descending=true;
}
}
}
this.sort(_7);
},this);
},updateSortIndicators:function(){
var _8=this.columns,_9=this.queryOptions.sort,ht=this.headerNode.firstChild.firstChild;
if(_9){
_9=_9.length?_9[0]:_9;
}else{
_9={};
}
_2.forEach(ht.rows[0].cells,function(_a,i){
var _b=_a.innerHTML.replace(/ *[↑↓]$/g,"");
var _c=_8[_a.cellIndex];
if(_c.field==_9.attribute){
_b+=_9.descending?" ↓":" ↑";
}
_a.innerHTML=_b;
});
}});
});
