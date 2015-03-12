//>>built
define("gridx/modules/Tree",["dojo/_base/kernel","dojo/_base/declare","dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/_base/lang","dojo/_base/Deferred","dojo/DeferredList","dojo/query","dojo/keys","../core/util","../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
_1.experimental("gridx/modules/Tree");
function _d(_e){
var n=_e.firstChild;
return n&&n.className&&_4.contains(n,"gridxTreeExpandoCell")&&!_4.contains(n,"gridxTreeExpandoLoading");
};
_c._markupAttrs.push("!expandLevel");
return _2(_c,{name:"tree",constructor:function(){
this._clear();
},getAPIPath:function(){
return {tree:this};
},preload:function(){
var t=this,g=t.grid;
if(t.model.treeMarkMode){
t.model.treeMarkMode("",true);
}
g.domNode.setAttribute("role","treegrid");
t.batchConnect([g.body,"collectCellWrapper","_createCellWrapper"],[g.body,"onAfterRow","_onAfterRow"],[g,"onCellClick","_onCellClick"],[g,"setStore","_clear"]);
t._initExpandLevel();
t._initFocus();
if(g.persist){
var id,_f=g.persist.registerAndLoad("tree",function(){
return {openInfo:t._openInfo,parentOpenInfo:t._parentOpenInfo};
});
if(_f&&_f.openInfo&&_f.parentOpenInfo){
var _10=t._openInfo=_f.openInfo,_11=t._parentOpenInfo=_f.parentOpenInfo;
for(id in _10){
_10[id].openned=_11[id];
}
t._persisted=1;
}
}
},load:function(_12){
var t=this;
if(t._persisted){
t.loaded.callback();
}else{
t.model.when({},function(){
t._openInfo[""].count=t.model.size();
}).then(function(){
t.loaded.callback();
});
}
},rowMixin:{canExpand:function(){
return this.grid.tree.canExpand(this.id);
},isExpanded:function(){
return this.grid.tree.isExpanded(this.id);
},expand:function(){
return this.grid.tree.expand(this.id);
},collapse:function(){
return this.grid.tree.collapse(this.id);
},expandRecursive:function(){
return this.grid.expandRecursive(this.id);
},collapseRecursive:function(){
return this.grid.collapseRecursive(this.id);
}},nested:false,expandoPadding:18,expandLevel:1/0,onExpand:function(id){
},onCollapse:function(id){
},canExpand:function(id){
var t=this,m=t.model,_13=m.treePath(id).length,_14=t.arg("expandLevel");
return m.hasChildren(id)&&(!(_14>0)||_13<=_14);
},isExpanded:function(id){
return !!this._openInfo[id];
},expand:function(id,_15){
var d=new _7(),t=this;
if(id&&!t.isExpanded(id)){
t.model.when({parentId:id,start:0},function(){
t._logicExpand(id);
}).then(function(){
_7.when(t._updateBody(id,_15),function(){
d.callback();
t.onExpand(id);
});
});
}else{
d.callback();
}
return d;
},collapse:function(id,_16){
var d=new _7(),t=this;
if(id&&t.isExpanded(id)){
t._logicCollapse(id);
_7.when(t._updateBody(id,_16),function(){
d.callback();
t.onCollapse(id);
});
}else{
d.callback();
}
return d;
},expandRecursive:function(id,_17){
var t=this,m=t.model,d=new _7();
t.expand(id,1).then(function(){
var i,dl=[],_18=m.size(id);
m.when({start:0,parentId:id},function(){
for(i=0;i<_18;++i){
var _19=m.indexToId(i,id);
dl.push(t.expandRecursive(_19,1));
}
}).then(function(){
new _8(dl).then(function(){
_7.when(t._updateBody(id,_17),function(){
d.callback();
});
});
});
});
return d;
},collapseRecursive:function(id,_1a){
var d=new _7(),_1b=_6.hitch(d,d.callback),_1c=_6.hitch(d,d.errback),t=this,_1d=t._openInfo[id||""],i,dl=[];
if(_1d){
for(i=_1d.openned.length-1;i>=0;--i){
dl.push(t.collapseRecursive(_1d.openned[i],1));
}
new _8(dl).then(function(){
if(id){
t.collapse(id,_1a).then(_1b,_1c);
}else{
_7.when(t._updateBody("",_1a),_1b,_1c);
}
});
}else{
_1b();
}
return d;
},refresh:function(){
var t=this,m=t.model,d=new _7(),_1e=_6.hitch(d,d.callback),_1f=_6.hitch(d,d.errback),id,ids=[],_20=[],_21=t.grid.body;
for(id in t._openInfo){
if(m.isId(id)){
ids.push(id);
_20.push({parentId:id,start:0});
}
}
t._clear();
m.when(_20,function(){
var _22=t._openInfo[""].count=m.size();
_3.forEach(ids,t._logicExpand,t);
_21.visualCount=t.getVisualSize(0,_22);
}).then(function(){
_21.refresh().then(_1e,_1f);
},_1f);
return d;
},getRowInfoByVisualIndex:function(_23,_24){
var t=this,_25=t._openInfo[""].openned,_26,i;
for(i=0;i<_25.length;++i){
_26=t._openInfo[_25[i]];
if(_26.index<_24){
_23+=_26.count+1;
}else{
break;
}
}
var _27={parentId:"",preCount:0};
while(!_27.found){
_27=t._getChild(_23,_27);
}
return _27;
},getVisualIndexByRowInfo:function(_28,_29,_2a){
var _2b=this._getAbsoluteVisualIndex(_28,_29);
return _2b>=0?_2b-this._getAbsoluteVisualIndex("",_2a):null;
},getVisualSize:function(_2c,_2d,_2e){
var _2f=this._openInfo[_2e||""];
if(_2f){
var i,len=_2f.openned.length,_30,_31=_2d;
for(i=0;i<len;++i){
_30=this._openInfo[_2f.openned[i]];
if(_30.index>=_2c&&_30.index<_2c+_2d){
_31+=_30.count;
}
}
return _31;
}
return 0;
},_clear:function(){
var _32=[];
this._openInfo={"":{id:"",parentId:null,index:-1,count:0,openned:_32}};
this._parentOpenInfo={"":_32};
},_initExpandLevel:function(){
var _33=this.grid._columns;
if(!_3.some(_33,function(col){
return col.expandLevel;
})){
if(this.arg("nested")){
_3.forEach(_33,function(col,i){
col.expandLevel=i+1;
});
}else{
_33[0].expandLevel=1;
}
}
},_createCellWrapper:function(_34,_35,_36){
var t=this,col=t.grid._columnsById[_36];
if(col.expandLevel){
var _37=t.arg("nested"),_38=t.model.treePath(_35).length,_39=t.arg("expandLevel");
if((!_37||col.expandLevel==_38)&&(!(_39>0)||_38<=_39+1)){
var _3a=t.model.hasChildren(_35),_3b=t.isExpanded(_35),pad=0,_3c=t.arg("expandoPadding"),ltr=t.grid.isLeftToRight();
if(!_37){
pad=(_38-1)*_3c;
}
if(_38==_39+1){
if(_37){
return;
}
_3a=false;
}
_34.push({priority:0,wrap:function(_3d){
return ["<div class='gridxTreeExpandoCell ",_3b?"gridxTreeExpandoCellOpen":"","' style='padding-",ltr?"left":"right",": ",pad+_3c,"px;'>","<span class='gridxTreeExpandoIcon ",_3a?"":"gridxTreeExpandoIconNoChildren","' ","style='margin-",ltr?"left":"right",": ",pad,"px;'>","<span class='gridxTreeExpandoInner'>",_3b?"-":"+","</span></span><span class='gridxTreeExpandoContent'>",_3d,"</span></span>"].join("");
}});
}
}
},_onCellClick:function(e){
if(_d(e.cellNode)){
var t=this,pos=_5.position(_9(".gridxTreeExpandoIcon",e.cellNode)[0]);
if(e.clientX>=pos.x&&e.clientX<=pos.x+pos.w&&e.clientY>=pos.y&&e.clientY<=pos.y+pos.h){
if(t.isExpanded(e.rowId)){
t.collapse(e.rowId);
}else{
t.expand(e.rowId);
}
}
}
},_updateBody:function(id,_3e){
var t=this,_3f=t.grid.body;
_3f.updateRootRange(_3f.rootStart,_3f.rootCount);
if(!_3e){
var _40=_3f.getRowNode({rowId:id}),n,_41,_42=t.isExpanded(id);
if(_40){
n=_9(".gridxTreeExpandoCell",_40)[0];
if(n){
_41=_9(".gridxTreeExpandoIcon",n)[0];
_41.firstChild.innerHTML="o";
_4.add(n,"gridxTreeExpandoLoading");
}
}
var _43=id?t.getVisualIndexByRowInfo(t.model.treePath(id).pop(),t.model.idToIndex(id),_3f.rootStart):-1;
return _3f.refresh(_43+1).then(function(){
if(n){
_40.setAttribute("aria-expanded",_42?"true":"false");
_41.firstChild.innerHTML=_42?"-":"+";
_4.remove(n,"gridxTreeExpandoLoading");
_4.toggle(n,"gridxTreeExpandoCellOpen",_42);
}
});
}
return null;
},_getAbsoluteVisualIndex:function(_44,_45){
var _46=this._openInfo[_44||""];
if(_46){
var _47=0,_48=this._openInfo,_49=function(_4a){
_47+=_45;
var _4b,i;
for(i=0;i<_4a.openned.length;++i){
_4b=_48[_4a.openned[i]];
if(_4b.index<_45){
_47+=_4b.count;
}else{
break;
}
}
_45=_4a.index;
if(_4a.id){
_47++;
}
return _48[_4a.parentId];
};
while(_46){
_46=_49(_46);
}
return _47;
}
return -1;
},_logicExpand:function(id){
var t=this,m=t.model,_4c=m.treePath(id),_4d=_4c.length,_4e=t.arg("expandLevel");
if(m.hasChildren(id)&&(!(_4e>0)||_4d<=_4e)){
var _4f=_4c.pop(),_50=t._openInfo,poi=t._parentOpenInfo,_51=poi[_4f]=poi[_4f]||[];
poi[id]=poi[id]||[];
if(!_50[id]){
var _52=m.idToIndex(id);
if(_52>=0){
var _53=m.size(id),i=_b.biSearch(_51,function(_54){
return _50[_54].index-_52;
});
if(_51[i]!==id){
_51.splice(i,0,id);
}
for(i=poi[id].length-1;i>=0;--i){
_53+=_50[poi[id][i]].count;
}
_50[id]={id:id,parentId:_4f,index:_52,count:_53,openned:poi[id]};
var _55=_50[_4f];
while(_55){
_55.count+=_53;
_55=_50[_55.parentId];
}
}
}
}
},_logicCollapse:function(id){
var t=this,_56=t._openInfo[id];
if(_56){
var _57=t._openInfo,_58=t.model.treePath(id).pop(),_59=t._parentOpenInfo[_58],i=_b.biSearch(_59,function(_5a){
return _57[_5a].index-_56.index;
}),_5b=_56.count;
_59.splice(i,1);
_56=_57[_58];
while(_56){
_56.count-=_5b;
_56=_57[_56.parentId];
}
delete _57[id];
}
},_getChild:function(_5c,_5d){
var _5e=this._openInfo[_5d.parentId],i,len,_5f=_5d.preCount+_5e.index+1,_60={found:true,visualIndex:_5c,count:1};
for(i=0,len=_5e.openned.length;i<len;++i){
var _61=_5e.openned[i],_62=this._openInfo[_61],_63=_62.index+_5f;
if(_63===_5c){
return _6.mixin({parentId:_5e.id,start:_62.index},_60);
}else{
if(_63>_5c){
break;
}else{
if(_63+_62.count>=_5c){
return {parentId:_61,preCount:_5f};
}
}
}
_5f+=_62.count;
}
return _6.mixin({parentId:_5e.id,start:_5c-_5f},_60);
},_onAfterRow:function(row){
var _64=this.model.hasChildren(row.id);
if(_64){
row.node().setAttribute("aria-expanded",this.isExpanded(row.id));
}
},_initFocus:function(){
this.connect(this.grid,"onCellKeyPress","_onKey");
},_onKey:function(e){
var t=this;
if(e.keyCode==_a.ESCAPE){
var m=t.model,_65=m.treePath(e.rowId),_66=_65.pop(),_67=_65.length,_68=t.grid;
if(_66){
var i,col,_69;
for(i=_68._columns.length-1;i>=0;--i){
col=_68._columns[i];
if(col.expandLevel&&(!t.arg("nested")||col.expandLevel==_67)){
break;
}
}
m.when({id:_66},function(){
_69=_68.body.getVisualIndex({parentId:_65.pop(),rowIndex:m.idToIndex(_66)}).visualIndex;
}).then(function(){
_68.vScroller.scrollToRow(_69).then(function(){
_68.body._focusCell(null,_69,col.index);
});
});
}
}else{
if(e.ctrlKey&&_d(e.cellNode)){
var ltr=t.grid.isLeftToRight();
if(e.keyCode==(ltr?_a.LEFT_ARROW:_a.RIGHT_ARROW)&&t._openInfo[e.rowId]){
t.collapse(e.rowId);
}else{
if(e.keyCode==(ltr?_a.RIGHT_ARROW:_a.LEFT_ARROW)&&!t._openInfo[e.rowId]){
t.expand(e.rowId);
}
}
}
}
}});
});
