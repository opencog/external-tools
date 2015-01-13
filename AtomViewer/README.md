AtomSpace Viewer - README
=========================

Introduction
------------
The AtomSpace Viewer is a tool that allows you to dynamically visualize the atoms from a running CogServer instance. See the help file (av_help.html) for instructions on how to configure and use the Viewer. You'll first need to set up the [REST API](http://wiki.opencog.org/w/Web_interface) for your OpenCog build.

To run the Viewer, download the entire AtomViewer directory tree, including all sub-folders. Then open atom_viewer.html (from the WebContent folder) in your web browser. The AtomSpace Viewer can be run as a standalone app in the brower, it does not need to be hosted on a web server. There are no external dependencies either, but you should use the latest version of a modern web browser that supports HTML5 and CORS (e.g. Chrome, Firefox, Internet Explorer, etc.).

Development
-----------
The AtomSpace Visualizer is written entirely in JavaScript and HTML5, and was designed so that it can run standalone in just the web browser, or easily be added to a more comprehensive "workbench" type web application later. It uses the [Dojo Toolkit](http://dojotoolkit.org/) for the user interface, and the [JavaScript InfoVis Toolkit](http://philogb.github.io/jit/index.html) for graphing.

The project is configured for Eclipse (Kepler) web development. The [Aptana Studio 3](http://www.aptana.com/) plugin for Eclipse is recommended (but not required). Chrome and Firefox are the recommended browers for testing and debugging.

TODO (High Priority)
--------------------
* Implement the atom edit feature (including delete function).
* Implement auto-update feature. Ideally this should use the ZMQ atom change notification system (http://wiki.opencog.org/w/AtomSpace_Event_Publisher), but there are some performance issues with that at present (see https://github.com/opencog/opencog/pull/447). Could use a timer and polling for the short-term instead.
* For search/filter results, include option to also show the other atoms that are within N links of the search results. An option already exists to include the incoming and outgoing sets of the search results. This could be extended to be recursive to N degrees.
* Add a visual feature to distinguish directed edges
* Add a tree-like layout for semi-hierarchical data (e.g. from NLP & PLN)

TODO (Medium Priority)
----------------------
* Implement the Scheme views. This would need an addition to the REST API to return the equivalent of the "list -a" console command.  
* Beef up error handling (e.g. 404 not found for atom search by handle, etc.)
* Use gradient or similar method for node colors, based on importance or other configurable attribute.
* Thin out the Dojo libraries and CSS to remove unused parts, compress files.

TODO (Nice to Have)
-------------------
* Pattern matching, e.g. ﬁnd atoms satisfying some predicate.
* Neighborhood search, e.g. ﬁnd atoms that are within some radius of a given centroid atom.
* Find atoms based on some temporal or spatial association.
* Add more views (e.g. 3d graph, pinpoint graph (>350 atoms), patterns, etc.)
* Add cancel button to stop atom retrieval.
* Implement the Analysis feature (atom stats, etc.)

Using Docker
------------------
1. build and run opencog conatiner. Make sure the name of the running container to be "opencog"
2. Start the restapi
From this directory
3. docker build -t $USER/visualizer .
4. docker run --rm --name apache -p 80:80 -v $PWD/WebContent:/var/www/visualizer/ --link opencog:link -it $USER/visualizer
From within the container
4. sudo service apache2 start
5. env
Take note of the IP Address of LINK_PORT_5000_TCP_ADDR
6. in the web browser address go to localhost
7. change the cogserver ip address to the ip address you noted above
8. Connect/Refresh


