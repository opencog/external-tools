//>>built
define("gridx/mobile/StoreObserver",["dojo/_base/declare","dojo/dom-construct","dojo/_base/array","dojo/query"],function(_1,_2,_3,_4){
return _1(null,{onSet:function(_5,_6,_7,_8){
var _9=this.store.getIdentity(_5);
var _a=_4("*[rowId=\""+_9+"\"] table",this.bodyNode)[0];
var _b=0;
for(_b=0;_b<this.columns.length;_b++){
if(this.columns[_b].field==_6){
break;
}
}
if(_b<this.columns.length){
_a.rows[0].cells[_b].innerHTML=this._getCellContent(this.columns[_b],_5);
}
},onNew:function(_c,_d){
},onDelete:function(_e){
},onStoreClose:function(_f){
},onError:function(){
},_buildBody:function(){
this.inherited(arguments);
},_removeRow:function(_10,idx){
_2.destroy(this.bodyNode.firstChild.childNodes[idx]);
},_insertRow:function(_11,idx){
_2.place(this._createRow(_11,idx),this.bodyNode.firstChild,idx);
}});
});
