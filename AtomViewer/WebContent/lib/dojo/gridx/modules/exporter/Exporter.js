//>>built
define("gridx/modules/exporter/Exporter",["dojo/_base/declare","dojo/_base/lang","../../core/_Module","dojo/_base/Deferred","dojo/_base/array"],function(_1,_2,_3,_4,_5){
function _6(_7,_8,_9,_a){
return !_7[_8]||false!==_7[_8](_9||_a,_a);
};
function _b(_c,_d,_e){
var _f=[],i,_10=0,end=0,ps=_c.progressStep;
if(typeof _c.start=="number"&&_c.start>=0){
_10=_c.start;
}
if(typeof _c.count=="number"&&_c.count>0){
end=_10+_c.count;
}
end=end||_e;
if(_d){
_d=_5.filter(_d,function(idx){
return idx>=_10&&idx<end;
});
if(_d.length&&(!ps||_d.length<=ps)){
_f.push(_d);
}else{
for(i=0;i<_d.length;i+=ps){
_f.push(_d.slice(i,i+ps));
}
}
}else{
var _11=end-_10;
if(!ps||_11<=ps){
_f.push({start:_10,count:_11});
}else{
for(i=_10;i<end;i+=ps){
_f.push({start:i,count:i+ps<end?ps:end-i});
}
}
}
_f.p=0;
return _f;
};
function _12(req,_13){
return _2.isArray(req)?{p:0,row:_13.row(req[0])}:{p:req.start,row:_13.row(req.start)};
};
function _14(req,_15,_16){
var p=_16.p+1,_17=_2.isArray(req);
return p<(_17?req.length:req.start+req.count)?{p:p,row:_15.row(_17?req[p]:p)}:null;
};
return _3.register(_1(_3,{name:"exporter",getAPIPath:function(){
return {"exporter":this};
},_export:function(_18,_19){
var d=new _4(),t=this,_1a=t.model,_1b=t._getColumns(_19),s=t.grid.select,sr=s&&s.row,sc=s&&s.column,_1c,_1d,_1e={columnIds:_1b},_1f=function(){
_6(_18,"afterBody",_1e,_19);
d.callback(_18.getResult());
},_20=_2.hitch(d,d.errback);
try{
_6(_18,"initialize",0,_19);
if(!_19.omitHeader&&_6(_18,"beforeHeader",_1e,_19)){
_5.forEach(_1b,function(cid){
_1e.column=t.grid.column(cid,1);
_6(_18,"handleHeaderCell",_1e,_19);
});
_6(_18,"afterHeader",_1e,_19);
}
if(_6(_18,"beforeBody",_1e,_19)){
if(_19.selectedOnly&&sr&&(!sc||!sc.getSelected().length)){
_1c=_1a.when().then(function(){
_1d=sr.getSelected();
},_20);
}
_4.when(_1c,function(){
var _21,_22=_1d&&_1a.when({id:_1d},function(){
_21=_5.map(_1d,function(id){
return _1a.idToIndex(id);
});
_21.sort(function(a,b){
return a-b;
});
},_20);
_4.when(_22,function(){
var dd=new _4(),_23=_1a.size();
t._fetchRows(d,_18,_1e,_19,dd,_b(_19,_21,_23));
dd.then(_1f,_20);
},_20);
},_20);
}else{
d.callback(_18.getResult());
}
}
catch(e){
_20(e);
}
return d;
},_fetchRows:function(_24,_25,_26,_27,d,_28){
var t=this,g=t.grid,f=_27.filter,_29=_26.columnIds,req=_28[_28.p++],_2a=_2.hitch(d,d.errback),_2b=function(){
_24.progress(_28.p/_28.length);
t.model.when(req,function(){
for(var r=_12(req,g);r&&r.row;r=_14(req,g,r)){
_26.row=r.row;
if((!f||f(r.row))&&_6(_25,"beforeRow",_26,_27)){
for(var i=0;i<_29.length;++i){
var col=g.column(_29[i],1),_2c=_26.cell=g.cell(r.row,col);
_26.column=col;
_26.data=t._format(_27,_2c);
_6(_25,"handleCell",_26,_27);
}
_6(_25,"afterRow",_26,_27);
}
}
}).then(function(){
t._fetchRows(_24,_25,_26,_27,d,_28);
},_2a);
};
if(req){
if(_28.length>1){
setTimeout(_2b,10);
}else{
_2b();
}
}else{
d.callback();
}
},_format:function(_2d,_2e){
var fs=_2d.formatters,cid=_2e.column.id;
if(fs&&_2.isFunction(fs[cid])){
return fs[cid](_2e);
}else{
if(_2d.useStoreData){
return _2e.rawData()||"";
}
}
return _2e.data()||"";
},_getColumns:function(_2f){
var g=this.grid,_30=g._columnsById,s=g.select,sc=s&&s.column,_31;
if(_2.isArrayLike(_2f.columns)&&_2f.columns.length){
_31=_5.filter(_2f.columns,function(cid){
return _30[cid];
});
_31.sort(function(a,b){
return _30[a].index-_30[b].index;
});
}else{
_31=_5.map(g._columns,function(c){
return c.id;
});
}
return _31;
}}));
});
