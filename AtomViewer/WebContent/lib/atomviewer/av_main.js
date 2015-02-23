/*
 * av_main.js
 *
 * This file contains the main application code, event handlers, etc.
 *
 * Copyright (C) 2013, 2014 OpenCog Foundation
 * All Rights Reserved
 *
 * Written by Scott Jones <troy.scott.j@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License v3 as
 * published by the Free Software Foundation and including the exceptions
 * at http://opencog.org/wiki/Licenses
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program; if not, write to:
 * Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */


/*
 * App initialization.
 */
require(["dojo/ready", "dojo/dom", "dijit/registry", "dojo/json", "dojo/request/xhr", "dojo/request/script"],
function(ready, dom, registry, json, xhr, script)
{
    ready(function()
    {
        // logic that requires that Dojo is fully initialized should go here

        // Save object references for later use:
        av.DOM = dom;
        av.Registry = registry;
        av.JSON = json;
        av.XHR = xhr;
        av.Script = script;

        // Set viewer to virgin state:        
        resetAtomViewer();
    });
});


/*
 * Event handlers.
 * 
 * Note that if handling events from top level menu items in Dojo,
 * you have to process the onmouseup (or down) event, since onmouseclick
 * is handled by Dojo (child menu items can use onmouseclick).
 */

function onClickHelp()
{
    // Show help page in separate window:
    window.open("av_help.html");
}

function onClickAbout()
{
    require(["dijit/Dialog", "dojo/domReady!"], function(Dialog)
    {
        aboutDialog = new Dialog(
        {
            title : "About Atom Viewer",
            content : ABOUT_CONTENT,
            style : "width: 300px"
        });
        
        aboutDialog.show();
    }); 
}

function onClickConfigAutoUpdate(tbtn)
{
    if (tbtn.checked)
    {
        tbtn.setLabel("AutoUpdate ON");

        // TODO turn on polling/cogserver event processing. Remember
        // to update selected atom automatically too.
    } else
    {
        tbtn.setLabel("AutoUpdate OFF");

        // TODO turn off polling/cogserver event processing
    }
    // TODO
    alert("Not yet implemented...");
}

function onClickRefresh()
{
    resetAtomViewer();
    
    // Clear atom types too, in case the new connection has different types:
    // TODO: the current REST API method returns all known atom types, so they
    // won't change even if connection changes. So comment this out until a
    // future change in the API allows pulling only the currently instantiated
    // atom types.
    // av.Registry.byId("idFilterType").store.data = [];
    // av.Registry.byId("idFilterType").reset();
    
    var url = createCogServerRequest();
    retrieveAtomsFromCogServer(url);
}

function onAtomEdit()
{
    // TODO
    alert("Not yet implemented...");
}

function onSelectType()
{
    // User clicked the combobox for selecting atom type for searching. We
    // use this event to query the CogServer for types and populate the
    // combobox, if it hasn't been done already.
    var cbTypesData = av.Registry.byId("idFilterType").store.data;
    if (cbTypesData.length == 0)
    {
        // List is empty, need to populate
        retrieveAtomTypes();
    }
}

function onApplyFilters()
{
    resetAtomViewer();
    retrieveAtomsFromCogServer(createCogServerRequest());
}

function onClearFilters()
{
    // Clear filter settings:
    av.Registry.byId("idFilterCBAttFocus").reset();
    av.Registry.byId("idFilterSTIMin").reset();
    av.Registry.byId("idFilterSTIMax").reset();;
    av.Registry.byId("idFilterTVMinStrength").reset();;
    av.Registry.byId("idFilterTVMinConfidence").reset();;
    av.Registry.byId("idFilterTVMinCount").reset();;
    av.Registry.byId("idFilterType").reset();
    av.Registry.byId("idFilterName").reset();
    
    resetAtomViewer();
}

/*
 * Note that for searches, we treat them as one-time queries, rather
 * than as persistently applied like filters.
 */
function onSearchHandle()
{
    // Get the base URL:
    var url = av.DOM.byId("idConfigCogServer").value + API_VER;

    // Append handle param:
    var handle = av.Registry.byId("idSearchHandle").value;
    if (handle != "")
    {
        resetAtomViewer();
        url += "atoms/" + handle;

        // Include Incoming and Outgoing Sets if checked:
        query.includeIncoming = av.Registry.byId("idFilterCBIncomingSets").checked;
        query.includeOutgoing = av.Registry.byId("idFilterCBOutgoingSets").checked;
        queryString = EncodeQueryData(query);
        url = url + "?" + queryString;             
        
        retrieveAtomsFromCogServer(url);
    }
}

/*
 * This function retrieves the atoms from the CogServer. 
 */
function retrieveAtomsFromCogServer(url)
{
    setStatusMsg("Retreiving atoms...");
    
    // Disable data retrieval buttons during update:
    disableDataButtons(true);
    
    // First try using XHR (XMLHttpRequest), which is preferred. If that fails
    // for some reason (such as client is a browser that does not support CORS),
    // then use JSONP.

    av.XHR(url,
    {
        handleAs: "json",
        method: "GET",
        headers: {"X-Requested-With": ""}   // prevents Dojo sending OPTIONS pre-flight request
    }).then(function(data)
    {
        // Success - get the data:
        receiveAtomData(data);
        
        // Restore buttons:
        disableDataButtons(false);
    }, function(err)
    {
        // TODO check error condition and handle more intelligently before passing
        // to JSONP method..
        setStatusMsg(err.toString() + " (Retrying...)");
        
        // TODO / BUG: this should not be called here, it should be in the
        // success/failure cases below, but there's a bug where the failure
        // function isn't called for JSONP, we have to re-enable buttons here.
        disableDataButtons(false);
        
        // XHR failed, so try JSONP method:
        if (/\?/.test(url))
            url += "&callback=receiveAtomData";
        else
            url += "?callback=receiveAtomData";
            
        av.Script.get(url).then(function()
        {
            // Success. No progress events with JSONP, so just max out the
            // progress bar:
            av.Registry.byId("idCtrlProgressBar").update({maximum: 100, progress: 100});
            disableDataButtons(false);
        }, function(err)
        {
            // TODO / BUG: for some reason, dojo/request/script apparently never calls
            // this error handler, even when the JSONP request fails.
            setStatusMsg(err.toString());
            disableDataButtons(false);
        });
    }, function(evt)
    {
        // Update progress bar (if the browser supports XHR2):
        // TODO: find out why we're only getting 1 or 2 updates even for big data sets..
        av.Registry.byId("idCtrlProgressBar").update({maximum: evt.total, progress: evt.loaded});
    });
    
}

/*
 * This function is called when the asynch retrieval of atoms is complete.
 * We save a reference to the atom data and update all views.
 */
function receiveAtomData(json_atoms)
{
    // Collection of atoms
    av.atom_data = json_atoms.result.atoms;
    
    if (av.atom_data.length == 0)
    {
        // This can happen when we successfully connect to the CogServer, but
        // there are no atoms returned, either because none fit the given
        // search/filter parameters, or the AtomSpace is empty.
        setStatusMsg("The Cogserver returned no atoms for the given filter/search.");
        av.atom_data = null;
    }
    else
    {
        setStatusMsg("Successfully retrieved " + av.atom_data.length.toString()
            + " atoms.");
          updateAllViews();
    }
    
}

/*
 * Usage:
 *   var data = { 'key1': 'value1', 'key2': 'value2', 'key3': value3 };
 *   var querystring = EncodeQueryData(data);
 */
function EncodeQueryData(data)
{
   var ret = [];
   for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
   return ret.join("&");
}
 
/*
 * This helper function constructs the URL for making the request to the
 * CogSever for the atom collection, applying any filters if configured.
 */
function createCogServerRequest()
{
    console.log("Enter createCogServerRequest");

    // Get the base URL:
    var url = av.DOM.byId("idConfigCogServer").value + API_VER;

    url += "atoms";

    // TODO: we should be able to combine all filters...currently only certain
    // combinations are allowed, due to the way the REST API works.
    
    // Filters for AttentionalFocus and STI Range
    // AttentionalFocus filter
    if (av.Registry.byId("idFilterCBAttFocus").checked)
    {
        query.filterby = "attentionalfocus";
    }
    else
    {
        // Otherwise, check for STI Range filter:
        var min = av.Registry.byId("idFilterSTIMin").value;
        var max = av.Registry.byId("idFilterSTIMax").value;
        if (min != "" || max != "")
        {
            query.filterby = "stirange";
        }

        if (min != "" || max != "")
        {
            // In case user specifies max but not min
            if (min == "")
                min = "0";
            
            query.stimin = min;

            if (max != "")
                query.stimax = max;
        }
    }

    // Filters for TruthValue attributes
    if (av.Registry.byId("idFilterTVMinStrength").value != "")
        query.tvStrengthMin = av.Registry.byId("idFilterTVMinStrength").value;
    if (av.Registry.byId("idFilterTVMinConfidence").value != "")
        query.tvConfidenceMin = av.Registry.byId("idFilterTVMinConfidence").value;
    if (av.Registry.byId("idFilterTVMinCount").value != "")
        query.tvCountMin = av.Registry.byId("idFilterTVMinCount").value;
    
    // Filter by Type
    if (av.Registry.byId("idFilterType").value != "")
        query.type = av.Registry.byId("idFilterType").value;

    // Filter by Name
    if (av.Registry.byId("idFilterName").value != "")
        query.name = av.Registry.byId("idFilterName").value;

    // Include Incoming and Outgoing Sets
    query.includeIncoming = av.Registry.byId("idFilterCBIncomingSets").checked;
    query.includeOutgoing = av.Registry.byId("idFilterCBOutgoingSets").checked;

    // Encode the query string
    queryString = EncodeQueryData(query);

    url = url + "?" + queryString;             

    console.log("URL: " + url);
    return url;
}

/*
 * Helper function to set our status message.
 */
function setStatusMsg(msg)
{
    var statusMsg = av.DOM.byId("idCtrlStatusMsg");
    statusMsg.innerHTML = msg;
}

/*
 * Helper function to reset all views/status to initial state.
 */
function resetAtomViewer()
{
    av.Registry.byId("idCtrlProgressBar").update({maximum: 100, progress: 0});
    av.atom_data = null;
    //jsonobj=null;
    resetAtomDetails();
    resetQueryParameters();
    updateAllViews();
    setStatusMsg("Waiting for connection...");
}

/*
 * Helper function to reset atom details pane.
 */
function resetAtomDetails()
{
    av.Registry.byId("idAtomName").reset();
    av.Registry.byId("idAtomType").reset();
    av.Registry.byId("idAtomHandle").reset();
    av.Registry.byId("idAvLTI").reset();
    av.Registry.byId("idAvSTI").reset();
    av.Registry.byId("idAvVLTI").reset();
    av.Registry.byId("idTvCount").reset();
    av.Registry.byId("idTvConfidence").reset();
    av.Registry.byId("idTvStrength").reset();
}

function resetQueryParameters()
{
    window.query = new Object();
}

/*
 * Helper function to disable/enable the buttons that cause data retrieval.
 * This function should be called at the start and end of any asynch data
 * retrieval in order to prevent multiple out of synch updates. 
 * 
 * @param disabled - true to disable the buttons, false to enable.
 */
function disableDataButtons(disabled)
{
    //av.Registry.byId("idBtnCtrlRefresh").setDisabled(disabled);
    av.Registry.byId("idBtnApplyFilters").setDisabled(disabled);
    av.Registry.byId("idBtnClearFilters").setDisabled(disabled);
}

/*
 * This function retrieves the atom types from the CogServer.
 */
function retrieveAtomTypes()
{
    var url = av.DOM.byId("idConfigCogServer").value + API_VER + "types";
    av.XHR(url,
    {
        handleAs : "json",
        method : "GET",
        headers :
        {
            "X-Requested-With" : ""
        }
    }).then(function(data)
    {
        data.types = data.types.sort();
       
        // Success - save types to the combobox:
        var cbTypesData = av.Registry.byId("idFilterType").store.data;
        for (var i = 0; i < data.types.length; i++)
        {
            cbTypesData.push({name: data.types[i]});
        }
    }, function(err)
    {
        alert("Unable to retrieve atom types...check server configuration.");
    }); 
}
