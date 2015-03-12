//>>built
define("gridx/tests/support/data/TreeColumnarTestData",[],function(){
var _1=9973;
var _2=function(_3){
var a=8887;
var c=9643;
var m=8677;
_1=(a*_1+c)%m;
var _4=Math.floor(_1/m*_3);
return _4;
};
var _5="0,1,2,3, ,4,5,6,7, ,8,9,a,b, ,c,d,e,f, ,g,h,i,j, ,k,l,m,n, ,k,o,p,q, ,r,s,t,u, ,v,w,x,y, ,z".split(",");
var _6=function(){
var _7=_2(50),i,_8=[];
for(i=0;i<_7;++i){
_8.push(_5[_2(_5.length)]);
}
return _8.join("");
};
var _9=function(){
return new Date(_2(10000000000000));
};
var _a=function(_b,_c){
return {id:_b+"-"+(_c+1),number:_2(10000),string:_6(),date:_9().toDateString(),time:_9().toTimeString().split(" ")[0],bool:_2(10)<5};
};
var _d=function(_e,_f,_10,_11){
var i,_12,res=[];
var _13=_2(_11);
for(i=0;i<_13;++i){
_12=_a(_e,i);
res.push(_12);
if(_f<_10){
_12.children=_d(_12.id,_f+1,_10,_11);
}
}
return res;
};
return {getData:function(_14,_15){
return {identifier:"id",label:"id",items:_d("item",1,_14,_15)};
},layouts:[[{id:"id",name:"id",field:"id",expandLevel:"all"},{id:"number",name:"number",field:"number"},{id:"string",name:"string",field:"string"},{id:"date",name:"date",field:"date"},{id:"time",name:"time",field:"time"},{id:"bool",name:"bool",field:"bool"}],[{id:"id",name:"id",field:"id"},{id:"number",name:"number",field:"number"},{id:"string",name:"string",field:"string"},{id:"date",name:"date",field:"date"},{id:"time",name:"time",field:"time"},{id:"bool",name:"bool",field:"bool"}]]};
});
