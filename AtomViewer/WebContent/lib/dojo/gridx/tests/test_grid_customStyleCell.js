//>>built
require(["dojo/store/Memory","gridx/Grid","gridx/core/model/cache/Sync","gridx/tests/support/modules"],function(){
function _1(_2){
return ["height: 28px; background-color: rgb(",_2.column.index()*8%255,",",_2.row.index()*28%255,",",_2.column.index()*_2.row.index(),");"].join("");
};
items=[];
layout=[];
var cn=30;
var rn=10;
var i;
for(i=0;i<rn;++i){
items.push({id:i+1});
}
for(i=0;i<cn;++i){
layout.push({id:i+1,name:i+1,width:"20px",style:_1});
}
});
