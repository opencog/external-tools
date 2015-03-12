/*------------------------
------- VARIABLES --------
------------------------*/
var svg; //The d3 graph is being stored here
var width=800; //Graph starting Width. Dynamically calculated later through
var height=800; ////Graph starting Height. Dynamically calculated later through
var detailsMinimized=false; //Details Window Minimized or not
var navbarTopHeight=65; //NavBarHeight. Dynamically calculated later through
var wh,ww; //Window Width, Window Height
var preferences; // LocalStorage preferences. This things remembers..
var connected = false; //Connected to the server?
var drawedd3 = false; //This is true if the d3 graph has been drawed once

var atomDetailsChanged = false;

//Globals
var atomData = null;
var atomTypes = null;
var filterQuery = new Object();

var nodes = [],links = [];

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
{
    $("#details").draggable({
		stop: function(e,ui) { 
			savePreference("detailsLeft",ui.position.left);
			savePreference("detailsTop",ui.position.top);
		}
	}); 
    $("#toolbox").draggable({
		stop: function(e,ui) { 
			savePreference("toolBoxLeft",ui.position.left);
			savePreference("toolBoxTop",ui.position.top);
		}
	}); //Make the toolbox draggable.
    $("#terminal").draggable({
		stop: function(e,ui) { 
			savePreference("terminalLeft",ui.position.left);
			savePreference("terminalTop",ui.position.top);
		}
	}); //Make the terminal draggable.


	//navbarTopHeight = $('#navbarTop')[0].offsetHeight;
    wh = $(window).height();
	ww = $(window).width();
    render(); //Render some gui elements having to do with height
	loadPreferences(); //Load user's options
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
       	updateD3Graph();
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
       	updateD3Graph();
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
       	updateD3Graph();
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
       	updateD3Graph();
       }
    });
	 
    $("#FilterSTIRangeAmount").html(
    	"Min:" + $("#FilterSTIRange").slider("values",0) +
      " - Max:" + $("#FilterSTIRange").slider("values",1)
     );
 
    $("#ConnectAutoConnect").switchButton({
  		labels_placement: "left",
  		checked: String2Boolean(preferences.ConnectAutoConnect),
  		on_label: "AUTO CONNECT",	
        off_label: "DO NOT AUTO CONNECT",
  		on_callback: function(){preferences.ConnectAutoConnect=true} ,
  		off_callback: function(){preferences.ConnectAutoConnect=false} 
	});
 
    $("#AppearanceforceAnimated").switchButton({
  		labels_placement: "right",
  		checked: String2Boolean(preferences.appearanceforceAnimated),
  		on_callback: AppearanceforceAnimatedOn ,
  		off_callback: AppearanceforceAnimatedOff
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

    $("#atomDetailsFixed").switchButton({
  		labels_placement: "right",
  		checked: false,
  		on_callback: atomDetailsFixedOn ,
  		off_callback: atomDetailsFixedOff
	});

    //Load Terminal
    if (preferences.visibleTerminal)
	   loadTerminal();

    showScreen(preferences.viewer);    
 
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
  
		force.size([width, height]);
			//.start();
	}
}

/*------------------------
-------- EVENTS ----------
------------------------*/
$("#FileImport").click(function()
{
	showScreen("import");
});

$("#FileExport").click(function()
{	
	showScreen("export");
});

$("#ConnectConnectButton").keypress(function(e)
{
    if(e.which == 13) retrieveAtomTypes(); 
});

$("#ConnectConnectButton").click(function()
{
	//Inside this Function we 
	//Connect to the Server Afterwards 
	//cause we need to load the AtomTypes First!
	retrieveAtomTypes(); 


	//Connect
	//ConnectToServer();
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
	filterData();
});

$("#FilterTruthValueStrength").keyup(function()
{	
	savePreference("FilterTruthValueStrength",$("#FilterTruthValueStrength").val());
	filterData();
});

$("#FilterTruthValueConfidence").keyup(function()
{	
	savePreference("FilterTruthValueConfidence",$("#FilterTruthValueConfidence").val());
	filterData();
});

$("#FilterTruthValueCount").keyup(function()
{	
	savePreference("FilterTruthValueCount",$("#FilterTruthValueCount").val());
	filterData();
});

$("#FilterAtomName").keyup(function()
{	
	savePreference("FilterAtomName",$("#FilterAtomName").val());
	filterData();
});

$("#FilterAtomType").change(function()
{	
	savePreference("FilterAtomType",$("#FilterAtomType").val());
	filterData();
});

$("#FilterIncomingSets").click(function()
{	
	savePreference("FilterIncomingSets",eval($(this).prop('checked')));
	filterData();
});

$("#FilterOutgoingSets").click(function()
{	
	savePreference("FilterOutgoingSets",eval($(this).prop('checked')));
	filterData();
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
	else
	{
		 
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
	cursor = $('#screen-d3').awesomeCursor('sdfsdf');
	savePreference("selectedTool","pointer");
});

$("#toolboxAddNode").click(function()
{
	$(".toolboxIcon").removeClass("toolboxIconSelected");
	$(this).addClass("toolboxIconSelected");
	cursor = $('#screen-d3').awesomeCursor('fa fa-plus-circle', {color: 'white'});
	savePreference("selectedTool","addNode");
});

$("#toolboxRemoveNode").click(function()
{
	$(".toolboxIcon").removeClass("toolboxIconSelected");
	$(this).addClass("toolboxIconSelected");
	cursor = $('#screen-d3').awesomeCursor('fa fa-minus-circle', {color: 'white'});
	savePreference("selectedTool","removeNode");
});

$("#toolboxAddLink").click(function()
{
	$(".toolboxIcon").removeClass("toolboxIconSelected");
	$(this).addClass("toolboxIconSelected");
	cursor = $('#screen-d3').awesomeCursor('fa fa-link', {color: 'white'});
	savePreference("selectedTool","addLink");
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
	 
	$.ajax(
	{
		url: preferences.cogserver + 'api/v1.1/atoms' + queryString,
		type: 'PUT',
    	dataType: "jsonp",
    	processData: false,
    	crossDomain: true ,
    	headers:
    	{
    		"X-Requested-With" : ""
    	},
    	data:
    	{
    		ok:"ok"
    	}
	})
	.success(function(dataset) 
	{
		alert("ok");
	});
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

$("#detailsClose").keydown(function()
{
	savePreference("visibleAtomDetails",false);
	checkBoxLi("visibleAtomDetailsi",false);
	$("#details").css("visibility","hidden");
});

$("#toolboxClose").keydown(function()
{
	savePreference("visibleToolbox",false);
	checkBoxLi("visibleToolboxi",false);
	$("#toolbox").css("visibility","hidden");
});



function AppearanceforceAnimatedOn()
{
	if (drawedd3) node.classed("fixed", function (d){ d.fixed = false;});
	savePreference("appearanceforceAnimated",true);
 
}

function AppearanceforceAnimatedOff()
{
	if (drawedd3) node.classed("fixed", function (d){ d.fixed = true;});
	savePreference("appearanceforceAnimated",false);
}

function AppearanceShowTextOn()
{
	if (drawedd3) 
		node.select("text").style("visibility", "visible");

	savePreference("appearanceShowText",true);

}

function AppearanceShowTextOff()
{
	if (drawedd3)
		node.select("text").style("visibility", "hidden");

	savePreference("appearanceShowText",false);  
}

function AppearanceShowLinksOn()
{
	savePreference("appearanceShowLinks",true);
}

function AppearanceShowLinksOff()
{
	savePreference("appearanceShowLinks",false);
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

	//This function switchs between screens
	$('div[id^="screen"]').hide();

	if (preferences.visibleAtomDetails)
	{
		$("#details").show();
		$("#toolbox").show();
  		$("#terminal").show();
 	}

	if (screen!="d3") 
	{
		if (drawedd3)
			force.stop();

 		//Save RAM :)
    	$("#screen-json").html("");
    	$("#screen-table").html("");
    	$("#screen-scheme").html("");

    	if (screen=="table")
    		updateTableView()
    	else if (screen=="scheme")
    		updateSchemeView();
    	else if (screen=="json")
    		updateJSONView();
 
  		$("#details").hide();
  		$("#toolbox").hide();
  		$("#terminal").hide();
	}
	else
	{
		updateD3Graph();
	}

	
	$("#screen-"+screen).show();

	 
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

	if (preferences.appearanceforceAnimated==undefined)
	    preferences.appearanceforceAnimated = true;
 
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
	$("#ConnectCogServer").attr("placeholder",preferences.cogserver);
 	//sshowScreen(preferences.viewer); //get the last user prefered viewer

 	//Load stored positions of GUI enviroment etc
 	$("#details").css("left",preferences.detailsLeft+"px").css("top",preferences.detailsTop+"px");
 	$("#toolbox").css("left",preferences.toolBoxLeft+"px").css("top",preferences.toolBoxTop+"px");
 	$("#terminal").css("left",preferences.terminalLeft+"px").css("top",preferences.terminalTop+"px");

 	$("#toolbox"+preferences.selectedTool).addClass("selectedIcon");

 	render(); //render stuff
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
			SelectAtom(d3.select("#id_"+atomHandle));
		}
		else
			alert("Please connect first");
	}



function loadTerminal()
{
	 $('#terminalText').terminal(function(command, term)
	    {
			if (command == 'test')
				term.echo("you just typed 'test'");
			else
				term.echo('unknown command');
		}
		, { prompt: '>', name: 'test' });
}

/*---- CONNECTION -----*/
/*---------------------*/
/*---------------------*/
function ConnectToServer()
{
	//GUI Stuff
	$("#ConnectConnectButton").disabled = true;
	$("#ConnectionStatus").html("Establishing Connection...")
 
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
    	crossDomain: true ,
    	headers :
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
		
		connected = true; 	
	 	atomData =  dataset.result.atoms;
    	nodes = atomData;
	    if (atomData.length == 0)
	    {
	       $("#ConnectionStatus").html("The Cogserver returned no atoms for the given filter/search.");
	        atomData = null;
	    }
	    else
	    {
	        $("#ConnectionStatus").html("<span class='success'><i class='fa fa-check-circle'></i> Successfully retrieved " + atomData.length.toString() + " atoms.</span>");
	        if (drawedd3)
	        	createD3GraphView(atomData);
	        else
	        { 
	        	render();
	        	showScreen(preferences.viewer);
	        	createD3GraphView(atomData);
	    	}
	    }
   
	
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
    	crossDomain: true , 
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
		ConnectToServer();
     
	})
	.fail(function()
	{ 
		connected = false;
		$("#ConnectionStatus").html("<span class='fail'><i class='fa fa-exclamation-circle'></i> Connection Failed!</span>")
 
	});
  
}

/*----- ATOM HANDLING ----*/
/*------------------------*/
/*------------------------*/

function showSelectedLink(link)
{
 	
	$("#detailsContent").css("display","none");
	$("#detailsContentNone").css("display","none");
	$("#detailsLinkContent").css("display","block");

	$("#linkDetailsSource").val();
	$("#linkDetailsTarget").val();
 
}

function showSelectedAtom(atom)
{
 
	if (atom.fixed)
		$("#atomDetailsFixed").switchButton({ checked: true });
	else
		$("#atomDetailsFixed").switchButton({ checked: false });

	$("#detailsContent").css("display","block");
	$("#detailsLinkContent").css("display","none");
	$("#detailsContentNone").css("display","none");

	if (atom.name!="")
		$("#detailsBar").html("Details: " + atom.name);
	else
		$("#detailsBar").html("Details: " + atom.handle + " " + atom.type);

	$("#detailsAtomName").val(atom.name);
	$("#detailsAtomType").val( atom.type);
	$("#detailsAtomHandle").val(atom.handle);
	$("#detailsAtomLTI").val(atom.attentionvalue.lti);
	$("#detailsAtomSTI").val(atom.attentionvalue.sti);
	$("#detailsAtomVLTI").val( atom.attentionvalue.vlti);
	$("#detailsAtomCount").val(atom.truthvalue.details.count);
	$("#detailsAtomConfidence").val(atom.truthvalue.details.confidence);
	$("#detailsAtomStrength").val(atom.truthvalue.details.strength);
}
  

function clearAtomDetails()
{
	$("#detailsBar").html("Details");
	$(".atomDetailsForm").val("");
	$("#detailsAtomType").val("--None--");
	$("#detailsContent").css("display","none");
	$("#detailsLinkContent").css("display","none");
	$("#detailsContentNone").css("display","block");
}


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

function deleteNode(node)
{
if (confirm("Are you sure that you want to delete node:" + node.name))
	{
	
		nodes.splice(findNode(node),1);
	 	updateD3Graph(nodes);
		//alert(findNode(node));
		//ConnectToServer();
/*
		$.ajax(
		{
			url: preferences.cogserver + 'api/v1.1/scheme',
			type: 'DELETE',
			contentType:'json',
			//access-control-request-method
			headers: 
			{
				"Access-Control-Request-Method":"DELETE",
				"X-Requested-With" : ""
			},
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
			ConnectToServer();
		})
		.fail(function(data)
		{
			ConnectToServer();
		});
	*/}

}

function filterData()
{
	 
	//Clear All screens
	//$("#screen-d3").html("");
	$("#screen-json").html("");
	$("#screen-table").html("");
	$("#screen-scheme").html("");

	//Resend query and do the new drawings etc
	ConnectToServer();
}

function String2Boolean(string)
{
	string = (string=="true") ?  true :  false;
	return string;
}