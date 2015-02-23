//>>built
define("gridx/core/Column",["dojo/_base/declare"],function(_1){
return _1([],{constructor:function(_2,id){
this.grid=_2;
this.model=_2.model;
this.id=id;
},index:function(){
var c=this.def();
return c?c.index:-1;
},def:function(){
return this.grid._columnsById[this.id];
},cell:function(_3,_4,_5){
return this.grid.cell(_3,this,_4,_5);
},cells:function(_6,_7,_8){
var t=this,g=t.grid,_9=[],_a=g.rowCount(_8),i=_6||0,_b=_7>=0?_6+_7:_a;
for(;i<_b&&i<_a;++i){
_9.push(g.cell(i,t,0,_8));
}
return _9;
},name:function(){
return this.def().name||"";
},setName:function(_c){
this.def().name=_c;
return this;
},field:function(){
return this.def().field||null;
},getWidth:function(){
return this.def().width;
}});
});
