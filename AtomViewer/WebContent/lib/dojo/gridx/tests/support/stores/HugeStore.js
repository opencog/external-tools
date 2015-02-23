//>>built
define("gridx/tests/support/stores/HugeStore",["dojox/data/QueryReadStore"],function(_1){
return function(_2){
return new _1({url:_2.path+"/test_hugeStore.php?totalsize="+_2.size});
};
});
