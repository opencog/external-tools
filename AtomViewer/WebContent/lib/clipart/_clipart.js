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
define("clipart/_clipart",["dojo/_base/declare","dijit/_WidgetBase"],function(_1,_2){
return _1("clipart._clipart",[_2],{_url:null,postCreate:function(){
if(!this._url){
var _3=this.declaredClass.lastIndexOf(".");
if(_3<0){
_3=0;
}
this._url=this.declaredClass.substr(_3+1)+".svg";
}
var dj=this.domNode.ownerDocument.defaultView.dojo;
this.url=dj.moduleUrl("clipart",this._url);
this.domNode.setAttribute("src",this.url);
}});
});
