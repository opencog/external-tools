/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

//>>built
define("shapes/_CircleMixin",["dojo/_base/declare","dojo/dom-style"],function(_1,_2){
return _1("shapes._CircleMixin",[],{postCreate:function(){
this._updateBorderRadius();
},resize:function(){
this._updateBorderRadius();
},_updateBorderRadius:function(){
var _3=this.domNode;
var bw,rx,ry;
var _4=_2.get(_3,"borderWidth");
if(_4){
bw=parseFloat(_4);
}
var w=_3.offsetWidth;
var h=_3.offsetHeight;
if(isNaN(bw)||bw<0||w<=0||h<=0){
_3.style.borderTopLeftRadius="";
_3.style.borderTopRightRadius="";
_3.style.borderBottomLeftRadius="";
_3.style.borderBottomRightRadius="";
}else{
var rx=(w/2+bw)+"px";
var ry=(h/2+bw)+"px";
var _5=rx+" "+ry;
_3.style.borderTopLeftRadius=_5;
_3.style.borderTopRightRadius=_5;
_3.style.borderBottomLeftRadius=_5;
_3.style.borderBottomRightRadius=_5;
}
}});
});
