External Tools
==============
This repository contains stand-alone tools that are independent of the main OpenCog source tree. Examples of the kinds of tools that might be added to this repository:
 - visualization tools for viewing AtomSpace contents
 - workbench type tools for controlling and monitoring OpenCog (e.g. http://wiki.opencog.org/w/OpenCog_Workbench)
 - performance, diagnostic, and statistical reporting tools

The visualizer has been updated with a new GUI using Bootstrap, Jquery and the D3 libraries in order to provide a more intergrated experience. Also deeper connections between the GUI and the actual server data are being implemented. 

These external tools will typically interface with OpenCog via the REST API (http://wiki.opencog.org/w/Web_interface), and be developed as web applications (though this is not a requirement).
