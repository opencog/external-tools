//>>built
define("gridx/tests/support/data/ComputerData",["dijit/ProgressBar"],function(_1){
var _2=["Acai","Aceola","Apple","Apricots","Avocado","Banana","Blackberry","Blueberries","Camu Camu berry","Cherries","Coconut","Cranberry","Cucumber","Currents","Dates","Durian","Fig","Goji berries","Gooseberry","Grapefruit","Grapes","Jackfruit","Kiwi","Kumquat","Lemon","Lime","Lucuma","Lychee","Mango","Mangosteen","Melon","Mulberry","Nectarine","Orange","Papaya","Passion Fruit","Peach","Pear","Pineapple","Plum","Pomegranate","Pomelo","Prickly Pear","Prunes","Raspberries","Strawberries","Tangerine/Clementine","Watermelon"];
var _3=["Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"];
var _4=["Windows XP","Windows 7","Redhat Linux 6","Macintosh 10.5.4","Ubuntu Linux 11.10","Ubuntu Linux 11.04","AIX","iOS","Google Chrome OS","Xenix","Solaris","FreeBSD"];
var _5=["Normal","Warning","Critical"];
var _6=[0.2,0.5,0.7,0.3,0.4,0.9,0.6,0.8,0.1];
return {getData:function(_7){
_7=_7===undefined?100:_7;
var _8={identifier:"id",label:"id",items:[]};
for(var i=0;i<_7;++i){
_8.items.push({id:i+1,order:i+1,name:_2[i%_2.length],server:_3[i%_3.length],platform:_4[i%_4.length],status:_5[i%_5.length],progress:_6[i%_6.length]});
}
return _8;
},layouts:[[{id:"id",field:"id",name:"Identity",width:"80px"},{id:"name",field:"name",name:"Name",width:"100px"},{id:"server",field:"server",name:"Server",width:"100px"},{id:"platform",field:"platform",name:"Platform",width:"160px"},{id:"status",field:"status",name:"Status",width:"100px",decorator:function(_9){
return ["<span class='",{normal:"testDataNormalStatus",warning:"testDataWarningStatus",critical:"testDataCriticalStatus"}[_9.toLowerCase()],"'></span>",_9].join("");
}},{id:"progress",field:"progress",name:"Progress",width:"200px",widgetsInCell:true,decorator:function(){
return "<div data-dojo-type='dijit.ProgressBar' data-dojo-props='minimum: 0, maximum: 1' class='gridxHasGridCellValue' style='width: 100%;'></div>";
}}],[{id:"id",field:"id",name:"System ID",width:"80px",formatter:function(_a){
return "System "+_a.id;
}},{id:"name",field:"name",name:"Name",width:"100px"},{id:"server",field:"server",name:"Server",width:"100px"},{id:"platform",field:"platform",name:"Platform",width:"160px",formatter:function(_b){
if(_b.platform=="Ubuntu Linux 11.04"||_b.platform=="Windows XP"){
return _b.platform+" (to be upgraded...)";
}
return _b.platform;
}},{id:"status",field:"status",name:"Status",width:"100px",decorator:function(_c){
return ["<span class='",{normal:"testDataNormalStatus",warning:"testDataWarningStatus",critical:"testDataCriticalStatus"}[_c.toLowerCase()],"'></span>",_c].join("");
}},{id:"progress",field:"progress",name:"Progress",width:"200px",widgetsInCell:true,decorator:function(){
return "<div data-dojo-type='dijit.ProgressBar' data-dojo-props='minimum: 0, maximum: 1' class='gridxHasGridCellValue' style='width: 100%;'></div>";
}}]]};
});
