//>>built
define("gridx/tests/support/data/TreeNestedTestData",[],function(){
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
var _a=function(_b,_c,_d){
return {id:_b+"-"+(_c+1),number:_d<=1?_2(10000):undefined,string:_d<=2?_6():undefined,date:_d<=3?_9().toDateString():undefined,time:_9().toTimeString().split(" ")[0],bool:_2(10)<5};
};
var _e=function(_f,_10,_11,_12){
var i,_13,res=[];
var _14=_2(_12);
for(i=0;i<_14;++i){
_13=_a(_f,i,_10);
res.push(_13);
if(_10<_11){
_13.children=_e(_13.id,_10+1,_11,_12);
}
}
return res;
};
return {getData:function(_15,_16){
var _17={identifier:"id",label:"id",items:_e("item",1,_15,_16)};
return _17;
},layouts:[[{id:"number",name:"number",field:"number",expandLevel:1},{id:"string",name:"string",field:"string",expandLevel:2},{id:"date",name:"date",field:"date",expandLevel:3},{id:"time",name:"time",field:"time"},{id:"bool",name:"bool",field:"bool"},{id:"id",name:"id",field:"id"}],[{id:"number",name:"number",field:"number"},{id:"string",name:"string",field:"string"},{id:"date",name:"date",field:"date"},{id:"time",name:"time",field:"time"},{id:"bool",name:"bool",field:"bool"},{id:"id",name:"id",field:"id"}]]};
});
