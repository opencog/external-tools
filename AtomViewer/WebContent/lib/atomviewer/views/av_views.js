/*
 * av_views.js
 *
 * This file contains code for rendering the different views on the atom
 * data.
 *
 * Copyright (C) 2013 OpenCog Foundation
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
 * This function updates all of the views on our data, and is called whenever the
 * data is refreshed.
 */
function updateAllViews()
{
    // Graph view:
    updateGraphView();
    
    // Table view:
    updateTableView();
    
    // Scheme view:
    updateSchemeView();
    
    // JSON view:
    updateJSONView();
}

/*
 * Called to create/refresh the table view.
 */
function updateTableView()
{
    if (av.atom_data != null)
    {
        //TODO
        av.DOM.byId(idTableTab).innerHTML = "<h1 align='center'>(W.I.P. - not yet inplemented)</h1>";
    }
    else
    {
        av.DOM.byId(idTableTab).innerHTML = "<h1 align='center'>(No Data)</h1>";
    }
}

/*
 * Called to create/refresh the scheme view.
 */
function updateSchemeView()
{
    if (av.atom_data != null)
    {
        //TODO
        av.DOM.byId(idSchemeTab).innerHTML = "<h1 align='center'>(W.I.P. - not yet inplemented)</h1>";
    }
    else
    {
        av.DOM.byId(idSchemeTab).innerHTML = "<h1 align='center'>(No Data)</h1>";
    }
}

/*
 * Called to create/refresh the JSON view.
 */
function updateJSONView()
{
    if (av.atom_data != null)
    {
        var atom_list =
        {
            "total" : av.atom_data.length,
            "atoms" : av.atom_data
        };
        av.DOM.byId(idJSONTab).innerHTML = "<pre>" +
            av.JSON.stringify(atom_list, null, '\t') +
            "</pre>";
    }
    else
    {
        av.DOM.byId(idJSONTab).innerHTML = "<h1 align='center'>(No Data)</h1>";
    }
}

/*
 * Handles resize events.
 */
function onResize()
{
    // Only the graph needs resizing, other views update
    // automatically:
    resizeGraph();
}
