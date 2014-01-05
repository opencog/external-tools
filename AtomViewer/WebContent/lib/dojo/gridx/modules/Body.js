//>>built
define("gridx/modules/Body",["dojo/_base/declare","dojo/_base/query","dojo/_base/array","dojo/_base/lang","dojo/json","dojo/dom-construct","dojo/dom-class","dojo/_base/Deferred","dojo/_base/sniff","dojo/keys","../core/_Module","../core/util","dojo/i18n!../nls/Body"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
return _1(_b,{name:"body",optional:["tree"],getAPIPath:function(){
return {body:this};
},constructor:function(){
var t=this,m=t.model,g=t.grid,dn=t.domNode=g.bodyNode,_e=function(){
t.refresh();
};
if(t.arg("rowHoverEffect")){
_7.add(dn,"gridxBodyRowHoverEffect");
}
g.emptyNode.innerHTML=t.arg("loadingInfo",_d.loadingInfo);
g._connectEvents(dn,"_onMouseEvent",t);
t.aspect(m,"onDelete","_onDelete");
t.aspect(m,"onSet","_onSet");
t.aspect(g,"onRowMouseOver","_onRowMouseOver");
t.aspect(g,"onCellMouseOver","_onCellMouseOver");
t.aspect(g,"onCellMouseOut","_onCellMouseOver");
t.connect(g.bodyNode,"onmouseleave",function(){
_2("> .gridxRowOver",t.domNode).removeClass("gridxRowOver");
});
t.connect(g.bodyNode,"onmouseover",function(e){
if(e.target==g.bodyNode){
_2("> .gridxRowOver",t.domNode).removeClass("gridxRowOver");
}
});
t.aspect(g,"setStore",_e);
},preload:function(){
this._initFocus();
},load:function(_f){
var t=this,m=t.model,g=t.grid,_10=function(){
t.aspect(m,"onSizeChange","_onSizeChange");
t.loaded.callback();
};
m.when({},function(){
t.rootCount=t.rootCount||m.size();
t.visualCount=g.tree?g.tree.getVisualSize(t.rootStart,t.rootCount):t.rootCount;
_10();
}).then(null,function(e){
t._loadFail(e);
_10();
});
},destroy:function(){
this.inherited(arguments);
this.domNode.innerHTML="";
},rowMixin:{node:function(){
return this.grid.body.getRowNode({rowId:this.id});
},visualIndex:function(){
var t=this,id=t.id;
return t.grid.body.getRowInfo({rowId:id,rowIndex:t.index(),parentId:t.model.parentId(id)}).visualIndex;
}},cellMixin:{node:function(){
return this.grid.body.getCellNode({rowId:this.row.id,colId:this.column.id});
}},rowHoverEffect:true,stuffEmptyCell:true,renderWholeRowOnSet:false,compareOnSet:function(v1,v2){
return typeof v1=="object"&&typeof v2=="object"?_5.stringify(v1)==_5.stringify(v2):v1===v2;
},getRowNode:function(_11){
if(this.model.isId(_11.rowId)&&_9("ie")){
return this._getRowNode(_11.rowId);
}else{
var _12=this._getRowNodeQuery(_11);
return _12&&_2("> "+_12,this.domNode)[0]||null;
}
},_getRowNode:function(id){
for(var i=0,_13=this.domNode.childNodes,row;row=_13[i];++i){
if(row.getAttribute("rowid")==id){
return row;
}
}
return null;
},getCellNode:function(_14){
var t=this,_15=_14.colId,_16=t.grid._columns,r=t._getRowNodeQuery(_14);
if(r){
if(!_15&&_16[_14.colIndex]){
_15=_16[_14.colIndex].id;
}
var c=" [colid='"+_15+"'].gridxCell";
if(t.model.isId(_14.rowId)&&_9("ie")){
var _17=t._getRowNode(_14.rowId);
return _2(c,_17)[0]||null;
}else{
return _2(r+c,t.domNode)[0]||null;
}
}
return null;
},getRowInfo:function(_18){
var t=this,m=t.model,g=t.grid,id=_18.rowId;
if(m.isId(id)){
_18.rowIndex=m.idToIndex(id);
_18.parentId=m.parentId(id);
}
if(typeof _18.rowIndex=="number"&&_18.rowIndex>=0){
_18.visualIndex=g.tree?g.tree.getVisualIndexByRowInfo(_18.parentId,_18.rowIndex,t.rootStart):_18.rowIndex-t.rootStart;
}else{
if(typeof _18.visualIndex=="number"&&_18.visualIndex>=0){
if(g.tree){
var _19=g.tree.getRowInfoByVisualIndex(_18.visualIndex,t.rootStart);
_18.rowIndex=_19.start;
_18.parentId=_19.parentId;
}else{
_18.rowIndex=t.rootStart+_18.visualIndex;
}
}else{
return _18;
}
}
_18.rowId=m.isId(id)?id:m.indexToId(_18.rowIndex,_18.parentId);
return _18;
},refresh:function(_1a){
var t=this;
delete t._err;
return t.model.when({}).then(function(){
var rs=t.renderStart,rc=t.renderCount;
if(typeof _1a=="number"&&_1a>=0){
_1a=rs>_1a?rs:_1a;
var _1b=rs+rc-_1a,n=_2("> [visualindex=\""+_1a+"\"]",t.domNode)[0],_1c=[],_1d=[];
if(n){
var _1e=t._buildRows(_1a,_1b,_1c,_1d);
if(_1e){
_6.place(_1e,n,"before");
}
}
while(n){
var tmp=n.nextSibling,_1f=parseInt(n.getAttribute("visualindex"),10),id=n.getAttribute("rowid");
_6.destroy(n);
if(_1f>=_1a+_1b){
t.onUnrender(id);
}
n=tmp;
}
_3.forEach(_1d,t.onAfterRow,t);
_8.when(t._buildUncachedRows(_1c),function(){
t.onRender(_1a,_1b);
t.onForcedScroll();
});
}else{
t.renderRows(rs,rc,0,1);
t.onForcedScroll();
}
},function(e){
t._loadFail(e);
});
},refreshCell:function(_20,_21){
var d=new _8(),t=this,m=t.model,g=t.grid,col=g._columns[_21],_22=col&&t.getCellNode({visualIndex:_20,colId:col.id});
if(_22){
var _23,_24=t.getRowInfo({visualIndex:_20}),idx=_24.rowIndex,pid=_24.parentId;
m.when({start:idx,count:1,parentId:pid},function(){
_23=m.byIndex(idx,pid);
if(_23){
_24.rowId=m.indexToId(idx,pid);
var _25=g.tree&&_23.data[col.id]===undefined;
var _26=g.cell(_24.rowId,col.id,1);
_22.innerHTML=t._buildCellContent(_26,_25);
t.onAfterCell(_26);
}
}).then(function(){
d.callback(!!_23);
});
return d;
}
d.callback(false);
return d;
},rootStart:0,rootCount:0,renderStart:0,renderCount:0,visualStart:0,visualCount:0,autoUpdate:true,autoChangeSize:true,updateRootRange:function(_27,_28){
var t=this,_29=t.grid.tree,vc=t.visualCount=_29?_29.getVisualSize(_27,_28):_28;
t.rootStart=_27;
t.rootCount=_28;
if(t.renderStart+t.renderCount>vc){
t.renderStart=vc-t.renderCount;
if(t.renderStart<0){
t.renderStart=0;
t.renderCount=vc;
}
}
if(!t.renderCount&&vc){
t.onForcedScroll();
}
},renderRows:function(_2a,_2b,_2c,_2d){
var t=this,g=t.grid,str="",_2e=[],_2f=[],n=t.domNode,en=g.emptyNode,_30=t.arg("emptyInfo",_d.emptyInfo),_31="";
if(t._err){
return;
}
if(_2b>0){
en.innerHTML=t.arg("loadingInfo",_d.loadingInfo);
en.style.zIndex="";
if(_2c!="top"&&_2c!="bottom"){
t.model.free();
}
str=t._buildRows(_2a,_2b,_2e,_2f);
if(_2c=="top"){
t.renderCount+=t.renderStart-_2a;
t.renderStart=_2a;
_6.place(str,n,"first");
}else{
if(_2c=="bottom"){
t.renderCount=_2a+_2b-t.renderStart;
_6.place(str,n,"last");
}else{
t.renderStart=_2a;
t.renderCount=_2b;
var _32=_2d?n.scrollTop:0;
n.scrollTop=0;
if(_9("ie")){
while(n.childNodes.length){
n.removeChild(n.firstChild);
}
}
n.innerHTML=str;
if(_32){
n.scrollTop=_32;
}
n.scrollLeft=g.hScrollerNode.scrollLeft;
_31=str?"":_30;
if(!str){
en.style.zIndex=1;
}
t.onUnrender();
}
}
_3.forEach(_2f,t.onAfterRow,t);
_8.when(t._buildUncachedRows(_2e),function(){
en.innerHTML=_31;
t.onRender(_2a,_2b);
});
}else{
if(!{top:1,bottom:1}[_2c]){
n.scrollTop=0;
if(_9("ie")){
while(n.childNodes.length){
n.removeChild(n.firstChild);
}
}
n.innerHTML="";
en.innerHTML=_30;
en.style.zIndex=1;
t.onUnrender();
t.onEmpty();
t.model.free();
}
}
},unrenderRows:function(_33,_34){
if(_33>0){
var t=this,i=0,id,bn=t.domNode;
if(_34=="post"){
for(;i<_33&&bn.lastChild;++i){
id=bn.lastChild.getAttribute("rowid");
t.model.free(id);
bn.removeChild(bn.lastChild);
t.onUnrender(id);
}
}else{
var tp=bn.scrollTop;
for(;i<_33&&bn.firstChild;++i){
id=bn.firstChild.getAttribute("rowid");
t.model.free(id);
tp-=bn.firstChild.offsetHeight;
bn.removeChild(bn.firstChild);
t.onUnrender(id);
}
t.renderStart+=i;
bn.scrollTop=tp>0?tp:0;
}
t.renderCount-=i;
t.model.when();
}
},onAfterRow:function(){
},onAfterCell:function(){
},onRender:function(){
},onUnrender:function(){
},onDelete:function(){
},onSet:function(){
},onMoveToCell:function(){
},onEmpty:function(){
},onForcedScroll:function(){
},collectCellWrapper:function(){
},_getRowNodeQuery:function(_35){
var r;
if(this.model.isId(_35.rowId)){
r="[rowid='"+_35.rowId+"']";
}else{
if(typeof _35.rowIndex=="number"&&_35.rowIndex>=0){
r="[rowindex='"+_35.rowIndex+"']";
if(_35.parentId){
r+="[parentid='"+_35.parentId+"']";
}
}else{
if(typeof _35.visualIndex=="number"&&_35.visualIndex>=0){
r="[visualindex='"+_35.visualIndex+"']";
}
}
}
return r&&r+".gridxRow";
},_buildRows:function(_36,_37,_38,_39){
var t=this,i,end=_36+_37,s=[],g=t.grid,m=t.model,w=t.domNode.scrollWidth;
for(i=_36;i<end;++i){
var _3a=t.getRowInfo({visualIndex:i}),row=g.row(_3a.rowId,1);
s.push("<div class=\"gridxRow ",i%2?"gridxRowOdd":"","\" role=\"row\" visualindex=\"",i);
if(row){
m.keep(row.id);
s.push("\" rowid=\"",row.id,"\" rowindex=\"",_3a.rowIndex,"\" parentid=\"",_3a.parentId,"\">",t._buildCells(row),"</div>");
_39.push(row);
}else{
s.push("\"><div class=\"gridxRowDummy\" style=\"width:",w,"px;\"></div></div>");
_3a.start=_3a.rowIndex;
_3a.count=1;
_38.push(_3a);
}
}
return s.join("");
},_buildUncachedRows:function(_3b){
var t=this;
return _3b.length&&t.model.when(_3b,function(){
try{
_3.forEach(_3b,t._buildRowContent,t);
}
catch(e){
t._loadFail(e);
}
}).then(null,function(e){
t._loadFail(e);
});
},_loadFail:function(e){
console.error(e);
var en=this.grid.emptyNode;
en.innerHTML=this.arg("loadFailInfo",_d.loadFailInfo);
en.style.zIndex=1;
this.domNode.innerHTML="";
this._err=1;
},_buildRowContent:function(_3c){
var t=this,n=_2("> [visualindex=\""+_3c.visualIndex+"\"]",t.domNode)[0];
if(n){
var row=t.grid.row(_3c.rowIndex,0,_3c.parentId);
if(row){
t.model.keep(row.id);
n.setAttribute("rowid",row.id);
n.setAttribute("rowindex",_3c.rowIndex);
n.setAttribute("parentid",_3c.parentId||"");
n.innerHTML=t._buildCells(row);
t.onAfterRow(row);
}else{
throw new Error("Row is not in cache:"+_3c.rowIndex);
}
}
},_buildCells:function(row){
var col,_3d,_3e,cls,_3f,i,len,t=this,g=t.grid,_40=g._columns,_41=row.data(),_42=g.focus&&(g.focus.currentArea()=="body"),sb=["<table class=\"gridxRowTable\" role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr>"];
for(i=0,len=_40.length;i<len;++i){
col=_40[i];
_3e=g.tree&&_41[col.id]===undefined;
_3d=g.cell(row.id,col.id,1);
cls=(_4.isFunction(col["class"])?col["class"](_3d):col["class"])||"";
_3f=(_4.isFunction(col.style)?col.style(_3d):col.style)||"";
sb.push("<td aria-describedby=\"",(g.id+"-"+col.id).replace(/\s+/,""),"\" class=\"gridxCell ");
if(_3e){
sb.push("gridxPaddingCell");
}
if(_42&&t._focusCellRow===row.visualIndex()&&t._focusCellCol===i){
sb.push("gridxCellFocus");
}
sb.push(cls,"\" aria-readonly=\"true\" role=\"gridcell\" tabindex=\"-1\" colid=\"",col.id,"\" style=\"width: ",col.width,"; ",_3f,"\">",t._buildCellContent(_3d,_3e),"</td>");
}
sb.push("</tr></table>");
return sb.join("");
},_buildCellContent:function(_43,_44){
var r="",col=_43.column,row=_43.row,_45=_43.data();
if(!_44){
var s=col.decorator?col.decorator(_45,row.id,row.visualIndex()):_45;
r=this._wrapCellData(s,row.id,col.id);
}
return (r===""||r===null||r===undefined)&&(_9("ie")<8||this.arg("stuffEmptyCell"))?"&nbsp;":r;
},_wrapCellData:function(_46,_47,_48){
var _49=[];
this.collectCellWrapper(_49,_47,_48);
var i=_49.length-1;
if(i>0){
_49.sort(function(a,b){
a.priority=a.priority||0;
b.priority=b.priority||0;
return a.priority-b.priority;
});
}
for(;i>=0;--i){
_46=_49[i].wrap(_46,_47,_48);
}
return _46;
},_onMouseEvent:function(_4a,e){
var g=this.grid,_4b="onCell"+_4a,_4c="onRow"+_4a;
if(g._isConnected(_4b)||g._isConnected(_4c)){
this._decorateEvent(e);
if(e.rowId){
if(e.columnId){
g[_4b](e);
}
g[_4c](e);
}
}
},_decorateEvent:function(e){
var n=e.target||e.originalTarget,g=this.grid,tag;
for(;n&&n!=g.bodyNode;n=n.parentNode){
tag=n.tagName&&n.tagName.toLowerCase();
if(tag=="td"&&_7.contains(n,"gridxCell")){
var col=g._columnsById[n.getAttribute("colid")];
e.cellNode=n;
e.columnId=col.id;
e.columnIndex=col.index;
}
if(tag=="div"&&_7.contains(n,"gridxRow")){
e.rowId=n.getAttribute("rowid");
e.parentId=n.getAttribute("parentid");
e.rowIndex=parseInt(n.getAttribute("rowindex"),10);
e.visualIndex=parseInt(n.getAttribute("visualindex"),10);
return;
}
}
},_onSet:function(id,_4d,_4e,_4f){
var t=this;
if(t.autoUpdate&&_4e){
var g=t.grid,row=g.row(id,1),_50=row&&row.node();
if(_50){
var _51=_4e.data,_52=_4f.data,_53=g._columns,_54=t.arg("renderWholeRowOnSet"),_55=t.arg("compareOnSet");
if(_54){
_50.innerHTML=t._buildCells(row);
t.onAfterRow(row);
t.onSet(row);
t.onRender(_4d,1);
}else{
_3.forEach(_53,function(col){
if(!_55(_51[col.id],_52[col.id])){
var _56=g.tree&&_51[col.id]===undefined,_57=row.cell(col.id,1);
_57.node().innerHTML=t._buildCellContent(_57,_56);
t.onAfterCell(_57);
}
});
}
}
}
},_onDelete:function(id){
var t=this;
if(t.autoUpdate){
var _58=t.getRowNode({rowId:id});
if(_58){
var sn,_59=0,_5a=parseInt(_58.getAttribute("rowindex"),10),pid=_58.getAttribute("parentid"),_5b={},_5c=[_58],rid,ids=[id],_5d;
_5b[id]=1;
for(sn=_58.nextSibling;sn&&_5b[sn.getAttribute("parentid")];sn=sn.nextSibling){
rid=sn.getAttribute("rowid");
ids.push(rid);
_5c.push(sn);
_5b[rid]=1;
}
for(;sn;sn=sn.nextSibling){
if(sn.getAttribute("parentid")==pid){
sn.setAttribute("rowindex",parseInt(sn.getAttribute("rowindex"),10)-1);
}
_5d=parseInt(sn.getAttribute("visualindex"),10)-_5c.length;
sn.setAttribute("visualindex",_5d);
_7.toggle(sn,"gridxRowOdd",_5d%2);
++_59;
}
t.renderCount-=_5c.length;
_3.forEach(_5c,_6.destroy);
_3.forEach(ids,t.onUnrender,t);
if(t.autoChangeSize&&t.rootStart===0&&!pid){
t.updateRootRange(0,t.rootCount-1);
}
t.onDelete(id,_5a);
t.onRender(_5a,_59);
}
}
},_onSizeChange:function(_5e,_5f){
var t=this;
if(t.autoChangeSize&&t.rootStart===0&&(t.rootCount===_5f||_5f<0)){
t.updateRootRange(0,_5e);
t.refresh();
}
},_onRowMouseOver:function(e){
var _60=_2("> div.gridxRowOver",this.domNode)[0],_61=this.getRowNode({rowId:e.rowId});
if(_60!=_61){
if(_60){
_7.remove(_60,"gridxRowOver");
}
if(_61){
_7.add(_61,"gridxRowOver");
}
}
},_onCellMouseOver:function(e){
_7.toggle(e.cellNode,"gridxCellOver",e.type=="mouseover");
},_focusCellCol:0,_focusCellRow:0,_initFocus:function(){
var t=this,g=t.grid,ltr=g.isLeftToRight(),bn=g.bodyNode,_62=g.focus,c="connect";
if(_62){
_62.registerArea({name:"body",priority:1,focusNode:bn,scope:t,doFocus:t._doFocus,doBlur:t._blurCell,onFocus:t._onFocus,onBlur:t._blurCell});
t[c](g.mainNode,"onkeypress",function(evt){
if(_62.currentArea()=="body"&&(!g.tree||!evt.ctrlKey)){
_62._noBlur=1;
var dk=_a,arr={},dir=ltr?1:-1;
arr[dk.LEFT_ARROW]=[0,-dir,evt];
arr[dk.RIGHT_ARROW]=[0,dir,evt];
arr[dk.UP_ARROW]=[-1,0,evt];
arr[dk.DOWN_ARROW]=[1,0,evt];
t._moveFocus.apply(t,arr[evt.keyCode]||[]);
_62._noBlur=0;
}
});
t[c](g,"onCellClick",function(evt){
t._focusCellRow=evt.visualIndex;
t._focusCellCol=evt.columnIndex;
});
t[c](t,"onRender",function(_63,_64){
if(t._focusCellRow>=_63&&t._focusCellRow<_63+_64&&_62.currentArea()=="body"){
t._focusCell();
}
});
t[c](g.emptyNode,"onfocus",function(){
_62.focusArea("body");
});
}
},_doFocus:function(evt){
return this._focusCell(evt)||this._focusCell(0,-1,-1);
},_focusCell:function(evt,_65,_66){
var t=this,g=t.grid;
g.focus.stopEvent(evt);
_66=_66>=0?_66:t._focusCellCol;
_65=_65>=0?_65:t._focusCellRow;
var _67=g._columns[_66].id,n=t.getCellNode({visualIndex:_65,colId:_67});
if(n){
var _68=_2(".gridxCellFocus",t.domNode)[0];
if(n!=_68){
if(_68){
_7.remove(_68,"gridxCellFocus");
}
_7.add(n,"gridxCellFocus");
t._focusCellRow=_65;
t._focusCellCol=_66;
g.header._focusHeaderId=_67;
}
g.hScroller.scrollToColumn(_67);
if(_9("ie")<8){
var _69=g.bodyNode.scrollLeft;
n.focus();
g.bodyNode.scrollLeft=_69;
}else{
n.focus();
}
}else{
if(!g.rowCount()){
g.emptyNode.focus();
return true;
}
}
return n;
},_moveFocus:function(_6a,_6b,evt){
if(_6a||_6b){
var r,c,t=this,g=t.grid,_6c=g._columns,vc=t.visualCount;
g.focus.stopEvent(evt);
r=t._focusCellRow+_6a;
r=r<0?0:(r>=vc?vc-1:r);
c=t._focusCellCol+_6b;
c=c<0?0:(c>=_6c.length?_6c.length-1:c);
g.vScroller.scrollToRow(r).then(function(){
t._focusCell(0,r,c);
t.onMoveToCell(r,c,evt);
});
}
},_nextCell:function(r,c,dir,_6d){
var d=new _8(),g=this.grid,cc=g._columns.length,rc=this.visualCount;
do{
c+=dir;
if(c<0||c>=cc){
r+=dir;
c=c<0?cc-1:0;
if(r<0){
r=rc-1;
c=cc-1;
}else{
if(r>=rc){
r=0;
c=0;
}
}
}
}while(!_6d(r,c));
g.vScroller.scrollToRow(r).then(function(){
d.callback({r:r,c:c});
});
return d;
},_blurCell:function(){
var n=_2(".gridxCellFocus",this.domNode)[0];
if(n){
_7.remove(n,"gridxCellFocus");
}
return true;
},_onFocus:function(evt){
for(var n=evt.target,t=this;n&&n!=t.domNode;n=n.parentNode){
if(_7.contains(n,"gridxCell")){
var _6e=t.grid._columnsById[n.getAttribute("colid")].index;
while(!_7.contains(n,"gridxRow")){
n=n.parentNode;
}
return t._focusCell(0,parseInt(n.getAttribute("visualindex"),10),_6e);
}
}
return false;
}});
});
