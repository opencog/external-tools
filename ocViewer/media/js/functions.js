/*------------------------
------- VARIABLES --------
------------------------*/

//Default Data structure for atom
var Accordions = []; //Storing the accordions preferences
var connectedNode = []; //The connected node

var d3g = null; //Storing the whole d3 graph here
var graph = null; //Storing the graph Viewer
var sigmag = null; //Storing the Sigma Viewer
var tg = null;  //3D graph T(threeD)G(raph)

var svg; //The d3 graph is being stored here
var width=800; //Graph starting Width. Dynamically calculated later through
var height=800; ////Graph starting Height. Dynamically calculated later through
 
var linkToolNode1 = null;
var linkToolNode2 = null;

var navbarTopHeight=65; //NavBarHeight. Dynamically calculated later through
var wh,ww; //Window Width, Window Height
var preferences; // LocalStorage preferences. This things remembers..
var connected = false; //Connected to the server?
var drawedd3 = false; //This is true if the d3 graph has been drawed once
var atomDetailsChanged = false;

var zoom;
var container;
var dragging;

//Globals
var atomData = null;
var atomTypes = null;
var count = null //How many atoms?
var filterQuery = new Object();

var nodes = [],links = [];
var terminal = null;

var selectedNode = null;
var selectedLink = null;
var transitionSpeed = 500;

var advancedFilters = []; //Storing the advanced filters array here after converting from localstorage String with JSON parser.
 
var gui;
var links = [];
var index = 0;
  
var ApperanceforceAnimated;
var cursor = null;
var API_VER = "v1.1";

$(document).ready(function()
{$( "#tabs" ).tabs();
    $("#details").draggable({
		stop: function(e,ui) { 
			savePreference("detailsLeft",ui.position.left);
			savePreference("detailsTop",ui.position.top);
		}
	})
    $("#toolbox").draggable({
		stop: function(e,ui) { 
			savePreference("toolBoxLeft",ui.position.left);
			savePreference("toolBoxTop",ui.position.top);
		}
	})

    $("#terminal").draggable({
		stop: function(e,ui) { 
			savePreference("terminalLeft",ui.position.left);
			savePreference("terminalTop",ui.position.top);
		}
	}).resizable();

	//navbarTopHeight = $('#navbarTop')[0].offsetHeight;
    wh = $(window).height();
	ww = $(window).width();
    
	loadPreferences(); //Load user's options
	showScreen(preferences.viewer);;
  	$("body").css("display","block"); //show the Body when everything has been calculater
 
  	//STI Range
    $("#FilterSTIRange").slider({
      range: true,
      min: 0,
      max: 100,
      values: [preferences.FilterSTIMin, preferences.FilterSTIMax],
      change: function(event, ui) 
      {
        $("#FilterSTIRangeAmount").html("Min:" + ui.values[0]/100 + " - Max:" + ui.values[1]/100);
      	savePreference("FilterSTIMin",$("#FilterSTIRange").slider("values",0));
		savePreference("FilterSTIMax",$("#FilterSTIRange").slider("values",1));
		filterData();
      }
    });
 
    $("#appearanceCharge").slider({
      min: -800,
      max: 0,
      values: [preferences.appearanceCharge],
      change: function(event, ui) 
      {
        $("#appearanceChargeAmount").html("Charge " + ui.values[0]);
      	savePreference("appearanceCharge",$("#appearanceCharge").slider("values",0));
       	d3g.update();
       }
    });

    $("#appearanceFriction").slider({
      min: 0,
      max: 100,
      values: [preferences.appearanceFriction],
      change: function(event, ui) 
      {
        $("#appearanceFrictionAmount").html("Friction " + ui.values[0]/100);
      	savePreference("appearanceFriction",$("#appearanceFriction").slider("values",0));
       	d3g.update();
       }
    });

    $("#appearanceLinkStrength").slider({
      min: 0,
      max: 100,
      values: [preferences.appearanceLinkStrength],
      change: function(event, ui) 
      {
        $("#appearanceLinkStrengthAmount").html("Link Strength " + ui.values[0]/100);
      	savePreference("appearanceLinkStrength",$("#appearanceLinkStrength").slider("values",0));
       	d3g.update();
       }
    });

    $("#appearanceLinkDistance").slider({
	  min: 1,
      max: 150,
      values: [preferences.appearanceLinkDistance],
      change: function(event, ui) 
      {
        $("#appearanceLinkDistanceAmount").html("Link Distance " +  ui.values[0]);
      	savePreference("appearanceLinkDistance",$("#appearanceLinkDistance").slider("values",0));
       	d3g.update();
       }
    });
	  
    $("#FilterSTIRangeAmount").html(
    	"Min:" + $("#FilterSTIRange").slider("values",0) +
      " - Max:" + $("#FilterSTIRange").slider("values",1)
     );
 
    $("#ConnectAutoConnect").switchButton({
  		labels_placement: "left",
  		checked: String2Boolean(preferences.ConnectAutoConnect),
  		on_label: "CONNECT ON LOAD",	
        off_label: "DO NOT CONNECT ON LOAD",
  		on_callback: function(){preferences.ConnectAutoConnect=true} ,
  		off_callback: function(){preferences.ConnectAutoConnect=false} 
	});
 
    $("#AppearanceShowText").switchButton({
  		labels_placement: "right",
  		checked: String2Boolean(preferences.appearanceShowText),
  		on_callback: AppearanceShowTextOn ,
  		off_callback: AppearanceShowTextOff
	});

    $("#AppearanceShowLinks").switchButton({
  		labels_placement: "right",
  		checked: String2Boolean(preferences.appearanceShowLinks),
  		on_callback: AppearanceShowLinksOn ,
  		off_callback: AppearanceShowLinksOff
	});

    $("#AppearanceHoverShowConnections").switchButton({
  		labels_placement: "right",
  		checked: String2Boolean(preferences.appearanceHoverShowConnections),
  		on_callback: AppearanceHoverShowConnectionsOn ,
  		off_callback: AppearanceHoverShowConnectionsOff
	});

    $("#atomDetailsFixed").switchButton({
  		labels_placement: "right",
  		checked: false,
  		on_callback: atomDetailsFixedOn ,
  		off_callback: atomDetailsFixedOff
	});

    //Load Terminal
    if (preferences.visibleTerminal)
	   loadTerminal();
 
 	//getAtomTypes - without them nothing can actually work. They are a basis of declaring an atom.
 	//maybe store locally in the future if server fails to connect...
	retrieveAtomTypes();

	if(String2Boolean(preferences.ConnectAutoConnect))
		getAtoms();

	//render(); //Render some gui elements having to do with height
    render(); 

    //showScreen(preferences.viewer);    
 
});

$(window).resize(function() 
{
	//Getting the new values of the window size
	wh = $(window).height();
	ww = $(window).width();
	render();
});
 
function render()
{
	wh = $(window).height();
	ww = $(window).width();

 	$('#leftMenu').height(wh - navbarTopHeight);
 	$('#leftMenuInner').height(wh - navbarTopHeight);
 	$('#leftMenuInner').slimScroll({
	    position: 'right',
	    height: wh - navbarTopHeight + 'px',
	    railVisible: true,
	    alwaysVisible: false
	});
 
	$('#mainContent').height(wh - navbarTopHeight);
 	width = $('#mainContent')[0].offsetWidth;
	height = $('#mainContent')[0].offsetHeight;
 
	$('div[id^="screen"]').height(wh - navbarTopHeight);
 
	if (drawedd3)
	{	
		d3.select('#visualizerInner') 
	   	.attr('width', width)
	   	.attr('height', height)
  
		//force.size([width, height]);
			//.start();
	}
}

/*------------------------
-------- EVENTS ----------
------------------------*/
$(".accordion-toggle").click(function()
{
	thisOpen = (!$($(this).attr("href")).hasClass("in"));

	if (thisOpen)
	{
		Accordions.push($(this).attr("href").replace("#",""));
		preferences.Accordions;
	}
	else
	{
    	index = Accordions.indexOf($(this).attr("href").replace("#",""));
		Accordions.splice(index, 1);
	}
	savePreference("Accordions",JSON.stringify(Accordions));
})

$("#FileImport").click(function()
{
	showScreen("import");
	savePreference("viewer","import");
});

$("#FileExport").click(function()
{	
	showScreen("export");
	savePreference("viewer","export");
});

$("#ConnectConnectButton").keypress(function(e)
{
    if(e.which == 13) retrieveAtomTypes(); 
});

$("#ConnectConnectButton").click(function()
{
	 
	if (atomTypes==null)
	{
		retrieveAtomTypes();
		getAtoms();
	}
	else
	{

	}
 
});


$("#ConnectConnectButton").click(function()
{
	refresh();
});

$("#SearchButton").click(function()
{
	SearchAtom($("#SearchField").val());
});

$("#visibleLeftSideBar").click(function()
{
	if (preferences.visibleLeftSideBar==1)
		savePreference("visibleLeftSideBar",0);
	else
		savePreference("visibleLeftSideBar",1);

	updateGUIPreferences();
});

$("#visibleAtomDetails").click(function()
{
	 if (preferences.visibleAtomDetails==1)
		savePreference("visibleAtomDetails",0);
	else
		savePreference("visibleAtomDetails",1);

	updateGUIPreferences();
});

$("#visibleTerminal").click(function()
{
	 if (preferences.visibleTerminal==1)
		savePreference("visibleTerminal",0);
	else
		savePreference("visibleTerminal",1);

	updateGUIPreferences();
});

$("#visibleToolbox").click(function()
{
	 if (preferences.visibleToolbox==1)
		savePreference("visibleToolbox",0);
	else
		savePreference("visibleToolbox",1);

	updateGUIPreferences();
});

$("#SettingsClearPreferences").click(function()
{	
	forgetPreferences();
	updateGUIPreferences();
});

$("[viewer]").click(function(){
	view = $(this).attr("viewer");
	savePreference("viewer",view);
	updateGUIPreferences();
	showScreen(preferences.viewer);
});

$("#toggleForceStart").click(function(){
	 force.stop();
})

$("#HelpHowToUse").click(function()
{	
	showScreen("help");
});

$("#HelpAbout").click(function()
{	
	showScreen("about");
});

$("#AboutCloseButton").click(function()
{	
	$('div[id^="screen"]').css("display","none");
	$("#screen-"+preferences.viewer).css("display","block");
});

$("#FilterAttentionalFocusOnly").click(function()
{	
	savePreference("FilterAttentionalFocusOnly",eval($(this).prop('checked')));
	$("#ConnectConnectButton").prop("disabled",false);
	//filterData();
});

$("#FilterTruthValueStrength").keyup(function()
{	
	savePreference("FilterTruthValueStrength",$("#FilterTruthValueStrength").val());
	$("#ConnectConnectButton").prop("disabled",false);
	//filterData();
});

$("#FilterTruthValueConfidence").keyup(function()
{	
	savePreference("FilterTruthValueConfidence",$("#FilterTruthValueConfidence").val());
	$("#ConnectConnectButton").prop("disabled",false);
	//filterData();
});

$("#FilterTruthValueCount").keyup(function()
{	
	savePreference("FilterTruthValueCount",$("#FilterTruthValueCount").val());
	$("#ConnectConnectButton").prop("disabled",false);
	//filterData();
});

$("#FilterAtomName").keyup(function()
{	
	savePreference("FilterAtomName",$("#FilterAtomName").val());
	$("#ConnectConnectButton").prop("disabled",false);
	//filterData();
});

$("#FilterAtomType").change(function()
{	
	savePreference("FilterAtomType",$("#FilterAtomType").val());
	$("#ConnectConnectButton").prop("disabled",false);
	//filterData();
});

$("#FilterIncomingSets").click(function()
{	
	savePreference("FilterIncomingSets",eval($(this).prop('checked')));
	$("#ConnectConnectButton").prop("disabled",false);
	//filterData();
});

$("#FilterOutgoingSets").click(function()
{	
	savePreference("FilterOutgoingSets",eval($(this).prop('checked')));
	$("#ConnectConnectButton").prop("disabled",false);
	//filterData();
});

$("#AdvancedFilterExecute").click(function()
{	
	connected = true;
	if (connected)
	{
		$.ajax(
		{
			url: preferences.cogserver + 'api/v1.1/scheme',
			type: 'POST',
			data:
			{
				command: $("#AdvancedFilterFilter").val()
			},
			dataType:'application/json'
		})
		.done(function(dataset) 
		{
			alert("ok");
		})
		.success(function(dataset) 
		{
			connected = false;
			alert("ok");
		})
		.fail(function(d)
		{ 	 
			connected = false;
			$("#ConnectConnectButton").prop('disabled', false);
			$("#ConnectionStatus").html("<span class='fail'><i class='fa fa-exclamation-circle'></i> Connection Failed!</span>");
		});
	} 
});

$("#AdvancedFilterFilter").keyup(function()
{	
	if ($.trim($(this).val()) != "")
	{
		$("#AdvancedFilterExecute").removeAttr("disabled");
		$("#AdvancedFilterRemember").removeAttr("disabled");
	}
	else
	{
		$("#AdvancedFilterExecute").attr("disabled","disabled");
		$("#AdvancedFilterRemember").attr("disabled","disabled");
	}
});

$("#AdvancedFilterRemember").click(function()
{	
 	var advancedFilter = [];
 	var counter = advancedFilters.length;
 	advancedFilter[0] = counter; //id
 	title = prompt("New filter name?");
	advancedFilter[1] = title;
	advancedFilter[2] = $("#AdvancedFilterFilter").val();
	advancedFilters.push(advancedFilter);
	savePreference("advancedFilters",JSON.stringify(advancedFilters));
	savePreference("AdvancedFilterSelected",counter);
	$("#AdvancedFilterSavedFilters").val(title).change();
	updateAdvancedFilters();
});

$("#AdvancedFilterForget").click(function()
{	
	if (preferences.AdvancedFilterSelected==null)
		return;

	if (confirm("Are you sure?"))
	{
 		var index =-1;
 		for(var i = 0; i < advancedFilters.length; i++)
 		{
   			if(advancedFilters[i][0] == preferences.AdvancedFilterSelected ) 
     			index = i;
     			break;
		}

		if (index > -1) 
		    advancedFilters.splice(index, 1);
		
		savePreference("AdvancedFilterSelected",null);
		$("#AdvancedFilterFilter").val("");
		savePreference("advancedFilters",JSON.stringify(advancedFilters));
		updateAdvancedFilters();
	}
});

$("#toolboxPointer").click(function()
{
	$(".toolboxIcon").removeClass("toolboxIconSelected");
	$(this).addClass("toolboxIconSelected");
	cursor = null;
	$('#screen-d3').css("cursor","default");
	$('.node circle').css("cursor","pointer");
	savePreference("selectedTool","pointer");
});

$("#toolboxAddNode").click(function()
{
	$(".toolboxIcon").removeClass("toolboxIconSelected");
	$(this).addClass("toolboxIconSelected");
	cursor = $('#screen-d3').awesomeCursor('fa fa-plus-circle', {color: 'white'});
	$('.node circle').css("cursor","pointer");
	savePreference("selectedTool","addNode");
});

$("#toolboxRemoveNode").click(function()
{
	$(".toolboxIcon").removeClass("toolboxIconSelected");
	$(this).addClass("toolboxIconSelected");
	$('#screen-d3').awesomeCursor('fa fa-minus-circle', {color: 'white'});
	$('.node circle').awesomeCursor('fa fa-minus-circle', {color: 'white'});
	savePreference("selectedTool","removeNode");
});

$("#toolboxAddLink").click(function()
{
	$(".toolboxIcon").removeClass("toolboxIconSelected");
	$(this).addClass("toolboxIconSelected");
	$('.node circle').awesomeCursor('fa fa-link', {color: 'white'});
	savePreference("selectedTool","addLink");
});

$("#toolboxRemoveLink").click(function()
{
	$(".toolboxIcon").removeClass("toolboxIconSelected");
	$(this).addClass("toolboxIconSelected");
	$('.link ').awesomeCursor('fa fa-unlink', {color: 'white'});
	savePreference("selectedTool","removeLink");
});

$("#AdvancedFilterSavedFilters").change(function()
{
	if ($(this).val()!=-1)
	{
		savePreference("AdvancedFilterSelected",$(this).val());
		$("#AdvancedFilterFilter").val(advancedFilters[preferences.AdvancedFilterSelected][2]);
		$("#AdvancedFilterForget").prop("disabled",false);
 		$("#AdvancedFilterExecute").prop("disabled",false);
 		$("#AdvancedFilterRemember").prop("disabled",false);
 	}
 	else
 	{	
 		savePreference("AdvancedFilterSelected",null);
		$("#AdvancedFilterFilter").val("");
		$("#AdvancedFilterForget").prop("disabled",true);
		$("#AdvancedFilterExecute").prop("disabled",true);
		$("#AdvancedFilterRemember").prop("disabled",true);
 	}
});

$("#atomDetailsUpdate").click(function()
{
	//UPDATING ATOM
  	echo("[[b;white;black]Updating atom: ]" + selectedNode.handle + " " + selectedNode.name);
    var node = new Object();
    node.handle = selectedNode.handle;
    node.type = $("#detailsAtomType").val();
    node.name =  $("#detailsAtomName").val();
    var truthValue = new Object;
    truthValue.type = "simple";
    var truthValueDetails = new Object();
    truthValueDetails.strength = $("#detailsAtomConfidence").val();
    truthValueDetails.count = $("#detailsAtomCount").val();
    truthValue.details = truthValueDetails;
    node.truthValue = truthValue;
	truthvalue = {'type': 'simple', 'details': {'strength': 0.006, 'count': 0.8}};
	attentionvalue = {'sti': 5, 'lti': 3, 'vlti': true};
	atom_update = {'truthvalue': truthvalue, 'attentionvalue': attentionvalue};
 
	$.ajax(
	{
		url: preferences.cogserver + 'api/v1.1/atoms/' + selectedNode.handle,
		method: 'PUT',
		type:'PUT',
		data:atom_update 
		//contentType:'application/x-www-form-urlencoded; charset=UTF-8'
    	//data:selectedNode 
	})
	.success(function(dataset) 
	{
		echo("[[b;green;black]Update was successfull.]");
		atomDetailsChanged = false;
		$("#atomDetailsUpdate").prop("disabled",true);
	})
	.fail(function(dataset)
	{
		echo("[[b;red;black]Updating failed.]");
	});

	atomDetailsChanged = false;
});

$("#detailsLinkSourceButton").click(function()
{
	selectedNode  = selectedLink.source;
	node.classed("selectedNode",false);
	link.classed("selectedLink",false);
	d3.select("#node_" + selectedLink.source.handle).classed("selectedNode",true);
 	showSelectedLink(selectedLink.source);
});
 
$("#detailsLinkTargetButton").click(function()
{
	selectedNode  = selectedLink.target;
	node.classed("selectedNode",false);
	link.classed("selectedLink",false);
	d3.select("#node_" + selectedLink.target.handle).classed("selectedNode",true);
	showSelectedLink(selectedLink.target);
});
 
$("#atomDetailsDelete").click(function()
{
	//DELETING ATOM
	deleteNode(selectedNode);
});
 
$(".atomDetailsForm").change(function()
{
	atomDetailsChanged = true;
	$("#atomDetailsUpdate").prop("disabled",false);
});

$(".atomDetailsForm").keydown(function()
{
	atomDetailsChanged = true;
	$("#atomDetailsUpdate").prop("disabled",false);
});
 
$("#terminalClose").click(function()
{
	savePreference("visibleTerminal",false);
	checkBoxLi("visibleTerminali",false);
	$("#terminal").css("visibility","hidden");
});

$("#detailsClose").click(function()
{
	savePreference("visibleAtomDetails",false);
	checkBoxLi("visibleAtomDetailsi",false);
	$("#details").css("visibility","hidden");
});

$("#toolboxClose").click(function()
{
	savePreference("visibleToolbox",false);
	checkBoxLi("visibleToolboxi",false);
	$("#toolbox").css("visibility","hidden");
});
  
$("#exportExportButton").click(function()
{ 
	gefxObject = new updateGEFXView();
	download ('data.gefx', gefxObject.generate(atomData));	
});


function AppearanceShowTextOn()
{
	d3.selectAll(".text").style("visibility", "visible");
	savePreference("appearanceShowText",true);
}

function AppearanceShowTextOff()
{
	d3.selectAll(".text").style("visibility", "hidden");
	savePreference("appearanceShowText",false);  
}

function AppearanceShowLinksOn()
{
	d3.selectAll(".link").style("visibility", "visible");
	savePreference("appearanceShowLinks",true);
}

function AppearanceShowLinksOff()
{
	d3.selectAll(".link").style("visibility", "hidden");
	savePreference("appearanceShowLinks",false);
}

function AppearanceHoverShowConnectionsOn()
{
	savePreference("appearanceHoverShowConnections",true);
}

function AppearanceHoverShowConnectionsOff()
{
	savePreference("appearanceHoverShowConnections",false);
}

function atomDetailsFixedOn()
{
	if (selectedNode!=null)
		selectedNode.fixed = true;
}

function atomDetailsFixedOff()
{
	if (selectedNode!=null)
		selectedNode.fixed = false;
}

function showScreen(screen)
{
  	//render();
  	render();
	$('div[id^="screen"]').css("display","none");
	$("#screen-"+screen).css("display","block");
 	
	if (screen=="d3")
	{
		d3g = new d3graph("#screen-d3");
		d3g.addNodes(atomData);	 
	}
	else if (screen=="3d")
	{
		if (tg==null)
			tg = new threedgraph("screen-3d");	 
	}
	else if (screen=="sigma")
	{
		render();
		if (sigmag==null)
			sigmag = new sigmaGraph("screen-sigma");  
		else
		{
			gefxSigmaObject = new updateGEFXView();
	    	//gefxData = gefxSigmaObject.generate(atomData);
			//sigmag.parseGefx(gefxData);	
			sigmag.addNodes(atomData);
		}
	}
	else if (screen=="table")
	{
		updateTableView();
		$("#details").hide();
  		$("#toolbox").hide();
	}
	else if (screen=="scheme")
	{
		updateSchemeView();
		$("#details").hide();
  		$("#toolbox").hide(); 
	}
	else if (screen=="json")
	{
		updateJSONView();
		$("#details").hide();
  		$("#toolbox").hide(); 
	}
 	else if (screen=="gexf")
	{

		gefxSigmaObject = new updateGEFXView();
	    gefxData = gefxSigmaObject.generate(atomData); 
	    console.log(gefxData);
	    $("#screen-gexf").html("." + gefxData);
	}

	if (preferences.visibleAtomDetails)
	{
		$("#details").show();
		$("#toolbox").show();
  		$("#terminal").show();
 	}
 
}
 
/*------------------------
------- FUNCTIONS --------
--------------------------
/*---- PREFERENCES -----*/
/*---------------------*/
/*---------------------*/
function loadPreferences()
{ 
	preferences = window.localStorage;
  
	if (!preferences.Accordions)
		preferences.Accordions = [];
	else
		Accordions = JSON.parse(preferences.Accordions);

	//Defaults
	if (!preferences.cogserver)
	    preferences.cogserver = 'http://localhost:5000/';

	if (!preferences.viewer)
	    preferences.viewer = "d3";

	if (preferences.visibleLeftSideBar==undefined)
	    preferences.visibleLeftSideBar = 1;

	if (preferences.visibleAtomDetails==undefined)
	    preferences.visibleAtomDetails = false;

	if (preferences.visibleToolbox==undefined)
	    preferences.visibleToolbox = false;

	if (preferences.visibleTerminal==undefined)
	    preferences.visibleTerminal = false;
	 
	if (preferences.FilterAttentionalFocusOnly==undefined)
	    preferences.FilterAttentionalFocusOnly = false;

	if  (!preferences.FilterSTIMin)
	    preferences.FilterSTIMin = 0;

	if (!preferences.FilterSTIMax)
	    preferences.FilterSTIMax = 5000;

	if (!preferences.FilterTruthValueStrength)
	    preferences.FilterTruthValueStrength = "";

	if (!preferences.FilterTruthValueConfidence)
	    preferences.FilterTruthValueConfidence = "";

	if (!preferences.FilterTruthValueCount)
	    preferences.FilterTruthValueCount = "";

	if (!preferences.FilterAtomName)
	    preferences.FilterAtomName = "";

	if (!preferences.FilterAtomType)
	    preferences.FilterAtomType = 0;

	if (preferences.FilterIncomingSets==undefined)
	    preferences.FilterIncomingSets = 0;

	if (preferences.FilterOutgoingSets==undefined)
	    preferences.FilterOutgoingSets = 0;
	
	if (preferences.appearanceAnimate==undefined)
	    preferences.appearanceAnimate = 1;

	if (preferences.appearanceShowText==undefined)
	    preferences.appearanceShowText = true;

	if (preferences.appearanceCharge==undefined)
	    preferences.appearanceCharge = -800;
 
	if (preferences.appearanceFriction==undefined)
	    preferences.appearanceFriction = 100; // /100

	if (preferences.appearanceLinkStrength==undefined)
	    preferences.appearanceLinkStrength = 100; // /100

	if (preferences.appearanceLinkDistance==undefined)
	    preferences.appearanceLinkDistance = 70;

	if (preferences.appearanceShowLinks==undefined)
	    preferences.appearanceShowLinks = false;

	if (preferences.appearanceHoverShowConnections==undefined)
	    preferences.appearanceHoverShowConnections = false;
 
	//if (preferences.selectedTool == undefined)
		preferences.selectedTool = "pointer"; //always load the pointer at start...
	// pointer	// addNode	// removeNode	// addLink

	if (!preferences.advancedFilters)
	    preferences.advancedFilters = [];
	else
		advancedFilters = JSON.parse(preferences.advancedFilters);

	if (preferences.detailsLeft == undefined)
		preferences.detailsLeft = 100;

	if (preferences.detailsTop == undefined)
		preferences.detailsTop = 100;

	if (preferences.toolBoxLeft == undefined)
		preferences.toolBoxLeft = 100;

	if (preferences.toolBoxTop == undefined)
		preferences.toolBoxTop = 100;

	if (preferences.terminalLeft == undefined)
		preferences.terminalLeft = 100;

	if (preferences.terminalTop == undefined)
		preferences.terminalTop = 100;

	 if(!preferences.AdvancedFilterSelected)
	 	preferences.AdvancedFilterSelected = null;
 
	updateGUIPreferences();
}

function updateGUIPreferences()
{

	//ACCORDEON
	if (Accordions!=[])
	{
		for (var i=0;i<Accordions.length;i++)
			$("#"+Accordions[i]).addClass("in");
	}
	//VIEW MENU 
	if (preferences.visibleLeftSideBar==true)
	{
		checkBoxLi("visibleLeftSideBari",true)
		$("#leftMenu").css("display","block");
		$("#mainContent").addClass("col-sm-9");
		$("#mainContent").removeClass("col-sm-12");
	}
	else
	{
		checkBoxLi("visibleLeftSideBari",false)
		$("#leftMenu").css("display","none");
		$("#mainContent").addClass("col-sm-12");
		$("#mainContent").removeClass("col-sm-9");
	}

	if (preferences.visibleAtomDetails==true)
	{
		checkBoxLi("visibleAtomDetailsi",true)
		$("#details").css("display","block");
		$("#details").css("visibility","visible");
	}
	else
	{ 
		checkBoxLi("visibleAtomDetailsi",false);
		$("#details").css("display","none");
		$("#details").css("visibility","hidden");
	}

	if (preferences.visibleToolbox==true)
	{
		checkBoxLi("visibleToolboxi",true)
		$("#toolbox").css("display","block");
		$("#toolbox").css("visibility","visible");
	}
	else
	{ 
		checkBoxLi("visibleToolboxi",false);
		$("#toolbox").css("display","none");
		$("#toolbox").css("visibility","hidden");
	}

	if (preferences.visibleTerminal==true)
	{
		checkBoxLi("visibleTerminali",true)
		$("#terminal").css("display","block");
		$("#terminal").css("visibility","visible");

	}
	else
	{ 
		checkBoxLi("visibleTerminali",false);
		$("#terminal").css("display","none");
		$("#terminal").css("visibility","hidden");
	 
	}
 	 
	//FILTER PANEL
 	$("#FilterAttentionalFocusOnly").prop("checked",eval(preferences.FilterAttentionalFocusOnly));
	$("#FilterSTIMin").val(preferences.FilterSTIMin);
	$("#FilterSTIMax").val(preferences.FilterSTIMax);
	$("#FilterTruthValueStrength").val(preferences.FilterTruthValueStrength);
	$("#FilterTruthValueConfidence").val(preferences.FilterTruthValueConfidence);
	$("#FilterTruthValueCount").val(preferences.FilterTruthValueCount);
	$("#FilterAtomName").val(preferences.FilterAtomName);
	$("#FilterAtomType").val(preferences.FilterAtomType);
	$("#FilterIncomingSets").prop("checked",eval(preferences.FilterIncomingSets));
	$("#FilterOutgoingSets").prop("checked",eval(preferences.FilterOutgoingSets));

	//ADVANCED FILTERS
 	updateAdvancedFilters();
 
	//Appearance
	$("#appearanceChargeAmount").html("Charge " + preferences.appearanceCharge);
	$("#appearanceLinkStrengthAmount").html("Link Strength " + preferences.appearanceLinkStrength/100);
	$("#appearanceFrictionAmount").html("Friction " + preferences.appearanceFriction/100);
	$("#appearanceLinkDistanceAmount").html("Link Distance " + preferences.appearanceLinkDistance);
 	
 	//Viewer
	$("[viewer]").children().addClass("fa-square-o");
	$("[viewer]").children().removeClass("fa-check-square-o");
	$("[viewer="+preferences.viewer+"]").children().removeClass("fa-square-o");
	$("[viewer="+preferences.viewer+"]").children().addClass("fa-check-square-o");
 	
	//SIDEBAR
	//CONNECTION
	$("#ConnectCogServer").attr("value",preferences.cogserver);
 	//sshowScreen(preferences.viewer); //get the last user prefered viewer

 	//Load stored positions of GUI enviroment etc
 	$("#details").css("left",preferences.detailsLeft+"px").css("top",preferences.detailsTop+"px");
 	$("#toolbox").css("left",preferences.toolBoxLeft+"px").css("top",preferences.toolBoxTop+"px");
 	$("#terminal").css("left",preferences.terminalLeft+"px").css("top",preferences.terminalTop+"px");

 	$("#toolbox"+preferences.selectedTool).addClass("selectedIcon");

 	//render stuff
}

function checkBoxLi(name,value)
{
	if (value)
	{
		$("#"+name).addClass("fa-check-square-o");
		$("#"+name).removeClass("fa-square-o");
	}
	else
	{
		$("#"+name).removeClass("fa-check-square-o");
		$("#"+name).addClass("fa-square-o");
	}
}

function savePreference(id,value)
{
	preferences[id] = value;
}

function forgetPreferences()
{
	if (confirm("Are you sure?"))
		{
			preferences.clear();
			loadPreferences();
			location.reload();
		}
}

function updateAdvancedFilters()
{
	
	if (advancedFilters.length == 0)
    {
    	$("<option />", {value: -1, text: "--None--"}).appendTo($("#AdvancedFilterSavedFilters"));
    	$("#AdvancedFilterSavedFilters").attr("disabled","disabled");
    }
    else
    {
		$("#AdvancedFilterSavedFilters").removeAttr("disabled");
		$("#AdvancedFilterSavedFilters").html("");
	 	$("#AdvancedFilterSavedFilters").append($("<option></option>")
			    .attr("value", -1).text("--None--"));

		$.each(advancedFilters, function(value,key)
		{
			$("#AdvancedFilterSavedFilters").append($("<option></option>")
			    .attr("value", key[0]).text(key[1]));
  
		});
	}
}

/*---- GUI-D3 CONNECTION -----*/
/*----------------------------*/
/*----------------------------*/
function SearchAtom(atomHandle)
{
	if (connected)
	{
		selectedNodeIs = d3.select("#id_"+atomHandle);
		SelectAtom(d3g.select("#id_"+atomHandle));
	}
	else
		alert("Please connect first");
}

/*---- CONNECTION -----*/
/*---------------------*/
/*---------------------*/
function getAtoms()
{
	//GUI Stuff
	$("#ConnectConnectButton").disabled = true;
	$("#ConnectionStatus").html("Establishing Connection...")
 	echo("Establishing Connection...");
	connected = false;

	width = $('#mainContent')[0].offsetWidth;
	height = $('#mainContent')[0].offsetHeight;
 	
	// Generate the Filters Query
    if ($("#FilterAttentionalFocusOnly").prop("checked")=="true")
        filterQuery.filterby = "attentionalfocus";
    else
    {
        if (preferences.FilterSTIMin  != "" || preferences.FilterSTIMax != "")
        {
            // In case user specifies max but not min
            if (preferences.FilterSTIMin  == "")
                preferences.FilterSTIMin  = "0";
            
            filterQuery.stimin = preferences.FilterSTIMin;

            if (preferences.FilterSTIMax  != "")
                filterQuery.stimax = preferences.FilterSTIMax;
        }
    }

    if ($("#FilterTruthValueStrength").val() != "")
        filterQuery.tvStrengthMin = $("#FilterTruthValueStrength").val();

    if ($("#FilterTruthValueConfidence").val() != "")
        filterQuery.tvConfidenceMin = $("#FilterTruthValueConfidence").val();

    if ($("#FilterTruthValueCount").val() != "")
        filterQuery.tvCountMin = $("#FilterTruthValueCount").val();
   
    if ($("#FilterAtomName").val() != "")
        filterQuery.name = $("#FilterAtomName").val();

    if (($("#FilterAtomType").val() != null) && ($("#FilterAtomType").val() != 0))
        filterQuery.type = $("#FilterAtomType").val();
    else
    	filterQuery.type = null;
 
    filterQuery.includeIncoming = $("#FilterIncomingSets").prop("checked");
    filterQuery.includeOutgoing = $("#FilterOutgoingSets").prop("checked"); 

    var ret = [];
    
    for (var d in filterQuery)
    	if (encodeURIComponent(filterQuery[d])!= 'null')
    		ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(filterQuery[d]));
    
    queryString =  "?" + ret.join("&");

	$.ajax(
	{
		url: preferences.cogserver + 'api/v1.1/atoms' + queryString,
		type: 'GET',
    	dataType: "jsonp",
    	processData: false,
    	crossDomain: true,
    	headers:
    	{
    		"X-Requested-With" : ""
    	}
	})
	.success(function(dataset) 
	{
		//GUI Stuff
		$("#ConnectCogServer").disabled = true;	
		$("#ConnectCogServer").prop('disabled', true);
	 	$("#ConnectionStatus").html("<span class='success'><i class='fa fa-check-circle'></i> Connected!</span>")
		echo("[[b;green;black]Connected]");

		connected = true; 	
	 	atomData =  dataset.result.atoms;
    	nodes = atomData;
    	count = atomData.length;
		
	    if (atomData.length == 0)
	    {
	       $("#ConnectionStatus").html("The Cogserver returned no atoms for the given filter/search.");
	       echo("The Cogserver returned no atoms for the given filter/search.");
	       atomData = null;
	    }
	    else
	    {
	        $("#ConnectionStatus").html("<span class='success'><i class='fa fa-check-circle'></i> Successfully retrieved " + atomData.length.toString() + " atoms.</span>");
	        echo("[[b;green;black]Successfully retrieved " + atomData.length.toString() + " atoms.]");
	    }

	     
	    showScreen(preferences.viewer);
	})
	.fail(function()
	{ 
		connected = false;
		$("#ConnectConnectButton").prop('disabled', false);
		$("#ConnectionStatus").html("<span class='fail'><i class='fa fa-exclamation-circle'></i> Connection Failed!</span>")
	});

	//Remember Server
	if ($("#ConnectCogServer").val()!="")
		savePreference("cogserver",$("#ConnectCogServer").val());

}

function retrieveAtomTypes()
{
    
    $.ajax(
	{
		url: preferences.cogserver + 'api/'+API_VER+'/types',
		type: 'GET',
    	dataType: "jsonp",
    	processData: false,
    	crossDomain: true, 
    	headers :
    	{
    		"X-Requested-With" : ""
    	}
	})
	 
	.success(function(types) 
	{
 
 		atomTypes = types;
 		atomTypes.types.sort();
 		 
    	if (atomTypes.length == 0)
    	{
    		$("<option />", {value: -1, text: "Empty"}).appendTo($("#FilterAtomType"));
    		$("#FilterAtomType").attr("disabled","disabled");
    	}
    	else
    	{
    		$("#FilterAtomType").removeAttr("disabled");
    		$("#FilterAtomTypeNoneValue").remove();
		 	$("#FilterAtomType").append($("<option></option>")
				    .attr("value", 0).text("--None--"));

			$.each(atomTypes.types, function(value,key)
			{
				$("#FilterAtomType").append($("<option></option>")
				    .attr("value", key).text(key));

				$("#detailsAtomType").append($("<option></option>")
				    .attr("value", key).text(key));

				//if (preferences.FilterAtomType)
					$("#FilterAtomType").val(preferences.FilterAtomType);
			});
		}
		//getAtoms();
	})
	.fail(function()
	{ 
		echo("Could not get AtomTypes. Check connectivity with server");
		connected = false;
		$("#ConnectionStatus").html("<span class='fail'><i class='fa fa-exclamation-circle'></i> Could not get AtomTypes. Check connectivity with server</span>")
 
	});
}

/*----- ATOM HANDLING ----*/
/*------------------------*/
/*------------------------*/
function defaultAtom()
{
	
	var tempAtom = 
	{
	    'handle': null,
	    'name': '',
	    'type': 'ConceptNode',
	    'outgoing': [],
	    'incoming': [],
	    'fixed':false,
	    'truthvalue':
	    {
			'type': 'simple',
			'details':
			{
			    'count': '0',
			    'confidence': '0',
			    'strength': '0'
			}
	    },
	    'attentionvalue':
	    {
			'lti': 0,
			'sti': 0,
			'vlti': false
	    }
	}

	var tempAtom =  
	{
		'type': 'ConceptNode',
		'name': 'Frog',
		'truthvalue':
		{
			'type': 'simple',
			'details':
			{
				'strength': 0.8,
				'count': 0.2
			}
		}
	}
	return tempAtom;
}

function showSelectedLink(link)
{
  
 	$("#detailsBarTitle").html("Link: " + link.name);

	$("#detailsContent").css("display","none");
	$("#detailsContentNone").css("display","none");
	$("#detailsLinkContent").css("display","block");

	$("#detailsLinkSource").val(link.source.handle);
	$("#detailsLinkTarget").val(link.target.handle);
	
	echo("\nSelected link: \n[[b;red;black]Name: " + link.name + "]\nSource:" + link.source.handle + "\nTarget:" + link.target.handle + "\n");
}

function showSelectedAtom(atom)
{
 
 	selectedNode = atom;

	if (atom.fixed)
		$("#atomDetailsFixed").switchButton({ checked: true });
	else
		$("#atomDetailsFixed").switchButton({ checked: false });

	$("#detailsContent").css("display","block");
	$("#detailsLinkContent").css("display","none");
	$("#detailsContentNone").css("display","none");

	if (atom.name!="")
		$("#detailsBarTitle").html("Atom: " + atom.name);
	else
		$("#detailsBarTitle").html("Atom: " + atom.handle + " " + atom.type);

	$("#detailsAtomName").val(atom.name);
	$("#detailsAtomType").val( atom.type);
	$("#detailsAtomHandle").val(atom.handle);
	$("#detailsAtomLTI").val(atom.attentionvalue.lti);
	$("#detailsAtomSTI").val(atom.attentionvalue.sti);
	$("#detailsAtomVLTI").val( atom.attentionvalue.vlti);
	$("#detailsAtomCount").val(atom.truthvalue.details.count);
	$("#detailsAtomConfidence").val(atom.truthvalue.details.confidence);
	$("#detailsAtomStrength").val(atom.truthvalue.details.strength);


	echo("\nSelected atom: \n[[b;red;black]id: " + atom.handle 
		+ "]\nName: " + atom.name 
		+ "\nIncoming:" + atom.incoming 
		+ "\nOutcoming:" + atom.outgoing 
		+ "\n");
 
}
  
/*
 * clearAtomDetails name
 *
 * Clear the atoms Details in the AtomDetails window.
 *
 * @param null
 * @return void
 */
function clearAtomDetails()
{
	$("#detailsBar").html("Details");
	$(".atomDetailsForm").val("");
	$("#detailsAtomType").val("--None--");
	$("#detailsContent").css("display","none");
	$("#detailsLinkContent").css("display","none");
	$("#detailsContentNone").css("display","block");
}

/*
 * findNode
 *
 * Returns the index of a specific  node
 *
 * @param node: the selected node
 * @return integer: the index of the node
 */
function findNode(node)
{
 	index = -1;
	for (var i=0; i<nodes.length; i++)
	{
		if (nodes[i].handle==node.handle)
			{
				index = i;
				break;
			}		 
	}
	return index;
}

function findNodebyHandle(handle)
{
 	finalNode = null;
	for (var i=0; i<nodes.length; i++)
	{
		if (nodes[i].handle==handle)
			{
				finalNode = nodes[i];
				break;
			}		 
	}
	return finalNode;
}

function deleteNode(node)
{
	//if (confirm("Are you sure that you want to delete node:" + node.name))
	{
		$.ajax(
		{
			url: preferences.cogserver + 'api/v1.1/atoms/' + node.handle,
			type: 'DELETE',
			dataType: "json",
	    	processData: false,
	    	crossDomain: true, 
			data:
			{
				id: node.handle 
			} 	 
		})
		.success(function(data)
		{
			//removeNodeFromTheGraph
			d3g.removeNode(node.index);
			d3g.showAll();
		})
		.fail(function(data)
		{
			//Failed
		});
	}
}

function refresh()
{
	 
	//Clear All screens
	$("#ConnectConnectButton").prop("disabled",true);
	atomData = null;
	selectedNode = null;
	selectedatom = null;
	//$("#screen-d3").html("");
	$("#screen-json").html("");
	$("#screen-table").html("");
	$("#screen-scheme").html("");

	//Resend query and do the new drawings etc
	getAtoms();
}

function String2Boolean(string)
{
	string = (string=="true") ?  true :  false;
	return string;
}

function download(filename, text) 
{
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);
	pom.style.display = 'none';
	document.body.appendChild(pom);
	pom.click();
	document.body.removeChild(pom);
}


function handleError(evt) {
    if (evt.message)
      echo("Error: "+evt.message +"  at linenumber: "+evt.lineno+" of file: "+evt.filename);
    else
      echo("Error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
}

window.addEventListener("error", handleError, true);