//>>built
define("gridx/core/util",{biSearch:function(_1,_2){
var i=0,j=_1.length,k;
for(k=Math.floor((i+j)/2);i+1<j;k=Math.floor((i+j)/2)){
if(_2(_1[k])>0){
j=k;
}else{
i=k;
}
}
return _1.length&&_2(_1[i])>=0?i:j;
}});
