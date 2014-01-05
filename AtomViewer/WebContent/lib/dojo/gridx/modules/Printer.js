//>>built
define("gridx/modules/Printer",["../core/_Module","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/xhr","dojo/_base/array","dojo/_base/sniff","dojo/_base/window"],function(_1,_2,_3,_4,_5,_6,_7,_8){
var _9,_a=_3.hitch;
function _b(_c){
var d=new _4(),_d=_a(d,d.callback);
if(_c){
_5.get({url:_c}).then(_d,function(){
console.warn("Failed to load resource: ",_c);
_d("");
});
}else{
_d("");
}
return d;
};
function _e(_f){
var w,_10=function(w){
var doc=w.document;
doc.open();
doc.write(_f);
doc.close();
};
if(!window.print){
console.warn("Print function is not available");
return;
}else{
if(_7("chrome")||_7("opera")){
w=window.open("javascript:''","","status=0,menubar=0,location=0,toolbar=0,width=1,height=1,resizable=0,scrollbars=0");
_10(w);
w.print();
w.close();
}else{
if(!_9){
_9=_8.doc.createElement("iframe");
_9.frameBorder=0;
var s=_9.style;
s.position="absolute";
s.width=s.height="1px";
s.right=s.bottom=0;
s.border="none";
s.overflow="hidden";
if(!_7("ie")){
s.visibility="hidden";
}
_8.body().appendChild(_9);
}
w=_9.contentWindow;
_10(w);
w.focus();
w.print();
}
}
};
return _2(_1,{name:"printer",forced:["exportTable"],getAPIPath:function(){
return {printer:this};
},print:function(_11){
return this.toHTML(_11).then(_e);
},toHTML:function(_12){
var t=this,d=new _4();
_b(_12.styleSrc).then(function(_13){
t.grid.exporter.toTable(_12).then(function(str){
d.callback(t._wrap(_12,_13,str));
},_a(d,d.errback),_a(d,d.progress));
});
return d;
},_wrap:function(_14,_15,_16){
return ["<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"><html ",this.grid.isLeftToRight()?"":"dir=\"rtl\"","><head><title>",_14.title||"","</title><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"></meta><style type=\"text/css\">",_15,"</style><style type=\"text/css\">",_14.style||"","</style>",_14.customHead||"","</head><body>",_14.description||"",_16,"</body></html>"].join("");
}});
});
