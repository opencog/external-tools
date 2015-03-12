//>>built
define("gridx/core/Row",["dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred"],function(_1,_2,_3){
return _1([],{constructor:function(_4,id){
this.grid=_4;
this.model=_4.model;
this.id=id;
},index:function(){
return this.model.idToIndex(this.id);
},parent:function(){
return this.grid.row(this.model.parentId(this.id),1);
},cell:function(_5,_6){
return this.grid.cell(this,_5,_6);
},cells:function(_7,_8){
var t=this,g=t.grid,_9=[],_a=g._columns,_b=_a.length,i=_7||0,_c=_8>=0?_7+_8:_b;
for(;i<_c&&i<_b;++i){
_9.push(g.cell(t.id,_a[i].id,1));
}
return _9;
},data:function(){
return this.model.byId(this.id).data;
},rawData:function(){
return this.model.byId(this.id).rawData;
},item:function(){
return this.model.byId(this.id).item;
},setRawData:function(_d){
var t=this,s=t.grid.store,_e=t.item(),_f,d;
if(s.setValue){
d=new _3();
try{
for(_f in _d){
s.setValue(_e,_f,_d[_f]);
}
s.save({onComplete:_2.hitch(d,d.callback),onError:_2.hitch(d,d.errback)});
}
catch(e){
d.errback(e);
}
}
return d||_3.when(s.put(_2.mixin(_2.clone(_e),_d)));
}});
});
