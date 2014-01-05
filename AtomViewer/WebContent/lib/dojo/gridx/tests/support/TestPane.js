//>>built
define("gridx/tests/support/TestPane",["dojo/_base/declare","dijit/layout/ContentPane","dijit/layout/AccordionContainer","dijit/form/Button"],function(_1,_2,_3){
return _1("gridx.tests.support.TestPane",_3,{addTestSet:function(_4,_5){
this.addChild(new _2({title:_4,content:_5}));
}});
});
