//>>built
define("gridx/tests/support/common",["dijit","dojo","dojox"],function(_1,_2,_3){
(function(){
var w=window,d=document,l=w.location,h=l.href,i=h.indexOf("?"),q=i>-1,b="RTL",p=q&&h.substr(i+1).split(/#/)[0].split(/&/)[0].split("="),v=d.getElementsByTagName("html")[0].dir=p&&p[0]=="dir"&&(p[1]||"").replace(/[^\w]/g,"").toUpperCase()==b?b:"";
v=v==b?"":b;
p=d.createElement("a");
p.innerHTML="<button style='position:fixed;top:0;right:0;width:5em;'>"+(v||"LTR")+"</button>";
p.firstChild.onclick=function(){
l.href=(q?h.substr(0,i):h)+(v&&"?dir="+v);
};
w.onload=function(){
d.body.appendChild(p.firstChild);
};
})();
});
