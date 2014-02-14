/*
 * av_common.js
 *
 * This file contains the common objects and variables that are referenced
 * throughout the other application files.
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
 * This object serves as a container or the various object references
 * that are used throughout the application.
 */
var av =
{
    DOM : null,         // Dojo Document Object Model reference (dojo/dom)
    Registry : null,    // Dijit widget registry reference (dijit/registry)
    JSON : null,        // JSON manipulation object (dojo/json)
    XHR : null,         // XMLHttpRequest object (dojo/request/xhr)
    Script : null,      // script object for JSONP (dojo/request/script)
    atom_data : null    // Atom data reference (in JSON format)
};

/*
 * Constants.
 */
var API_VER = "api/v1.1/";  // REST API version (appended to the URL)
var ABOUT_CONTENT =
    "<div align='center'><h2>OpenCog AtomSpace Visualization Tool</h2>" +
    "<h4>Version: 0.9</h4>" +
    "<h5>Copyright (C) 2013 <a href='http://www.opencog.org' target='_blank'>OpenCog Foundation</a></h5></div>";
