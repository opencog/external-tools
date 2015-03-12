//>>built
define("gridx/tests/support/stores/JsonRestStore",["dojo","dojox/data/JsonRestStore"],function(_1,_2){
return function(_3){
_1.xhrPost({url:_3.path+"/test_jsonRestStore.php?totalsize="+_3.size,sync:true});
return new _2({idAttribute:"id",target:_3.path+"/test_jsonRestStore.php"});
};
});
