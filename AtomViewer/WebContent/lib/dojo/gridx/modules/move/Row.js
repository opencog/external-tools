//>>built
define("gridx/modules/move/Row",["dojo/_base/declare","dojo/_base/array","dojo/keys","../../core/_Module","../../core/model/extensions/Move"],function(_1,_2,_3,_4,_5){
return _1(_4,{name:"moveRow",modelExtensions:[_5],constructor:function(){
this.connect(this.model,"onMoved","_onMoved");
},getAPIPath:function(){
return {move:{row:this}};
},preload:function(){
this.aspect(this.grid,"onRowKeyDown","_onKeyDown");
},rowMixin:{moveTo:function(_6,_7){
this.grid.move.row.move([this.index()],_6,_7);
return this;
}},moveSelected:true,move:function(_8,_9,_a){
var m=this.model;
m.moveIndexes(_8,_9);
if(!_a){
m.when();
}
},moveRange:function(_b,_c,_d,_e){
var m=this.model;
m.move(_b,_c,_d);
if(!_e){
m.when();
}
},onMoved:function(){
},_onMoved:function(){
this.grid.body.refresh();
this.onMoved();
},_onKeyDown:function(e){
var t=this,g=t.grid,_f=g.select&&g.select.row;
if(e.ctrlKey&&!e.shiftKey&&!e.altKey&&(e.keyCode==_3.UP_ARROW||e.keyCode==_3.DOWN_ARROW)){
var _10=e.rowIndex,_11=function(_12){
if(e.keyCode==_3.UP_ARROW){
while(_2.indexOf(_12,_10)>=0){
_10--;
}
if(_10>=0){
t.move(_12,_10);
}
}else{
while(_2.indexOf(_12,_10)>=0){
_10++;
}
if(_10<g.body.rootStart+g.body.rootCount){
t.move(_12,_10+1);
}
}
};
if(t.arg("moveSelected")&&_f&&_f.isSelected(e.rowId)){
var _13=_f.getSelected();
g.model.when({id:_13},function(){
var _14=_2.map(_13,function(id){
return g.model.idToIndex(id);
});
_11(_14);
});
}else{
_11([g.model.idToIndex(e.rowId)]);
}
}
}});
});
