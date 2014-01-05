//>>built
define("gridx/tests/support/stores/test_tree_jsonRestStore",["dijit","dojo","dojox","dojo/require!dojox/data/JsonRestStore"],function(_1,_2,_3){
_2.require("dojox.data.JsonRestStore");
_2.xhrPost({url:"test_tree_jsonRestStore.php",sync:true});
var _4=new _3.data.JsonRestStore({idAttribute:"id",target:"test_tree_jsonRestStore.php"});
_4.fetch({start:0,onComplete:function(_5){
var _6=_4.getValues(_5[3],"children").slice();
_6=_2.filter(_6,function(_7){
return false;
});
_4.setValues(_5[3],"children",_6);
_4.setValues(_5[4],"children",_6);
_4.save({onComplete:function(){
_4.fetch({query:{parentId:"item-4-2"},start:0,onComplete:function(_8){
}});
}});
}});
});
