//>>built
define("gridx/tests/support/stores/ItemFileWriteStore",["dojo/data/ItemFileWriteStore","./MockServerStore"],function(_1,_2){
return function(_3){
var _4=_3.maxLevel?_3.dataSource.getData(_3.maxLevel,_3.maxChildrenCount):_3.dataSource.getData(_3.size);
return new (_3.isAsync?_2:_1)({data:_4});
};
});
