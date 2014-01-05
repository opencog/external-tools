//>>built
define("gridx/core/model/extensions/Query",["dojo/_base/declare","../_Extension"],function(_1,_2){
return _1(_2,{name:"query",priority:40,constructor:function(_3,_4){
this._mixinAPI("query");
if(_4.query){
this.query(_4.query,_4.queryOptions);
}
},query:function(){
this.model._addCmd({name:"_cmdQuery",scope:this,args:arguments});
},_cmdQuery:function(){
var a=arguments,_5=a[a.length-1],m=this.model,c=m._cache,op=c.options=c.options||{};
op.query=_5[0];
op.queryOptions=_5[1];
m._msg("storeChange");
c.clear();
}});
});
