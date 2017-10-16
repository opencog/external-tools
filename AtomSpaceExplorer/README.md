AtomSpace Explorer
====================
The AtomSpace Explorer is a visualization tool for OpenCog data. Atoms are fetched from the CogServer via
the REST API, then displayed as a two dimensional graph in the browser.

## Features
- Fetch data from user provided AtomSpace REST api URL.
- Visualize the AtomSpace data with D3.js Force Directed graph.
- Links display link-type as inline labels.
- Node names are shown within Nodes with auto-sizing text. Also, the Node name is auto-truncated with ellipsis if necessary.
- Nodes are shown in 3 sizes
    - Small: For blank Node.name.
    - Medium: For non-blank Node.name.
    - Large: For Node.av.sti >= radiusScaleMinVal  (currently 10).
- Click on an Atom to view it's properties. Use close icon ('X') to dismiss properties. Or reclick same node to dismiss properties. 
- Double click on an Atom to filter AtomSpace to that Atom along with two levels of neighboring Atoms.
- Buttons to Pause / Play / Restart Force Simulation and  to Zoom In, Zoom Out, and Reset Zoom.
- Keyboard shortcuts for all of the above buttons are indicated in the corresponding button tooltips.
- Filtering buttons appear when an Atom is selected or double-clicked (TODO filtering capability needs to be updated).
- D3 client area and Node context (right-click) menus.
- Individual Nodes are pinnable into fixed location. Ctrl-click, Ctrl-drag, or right-click Pin (Unpin) a Node. Right-click D3 client area has command to unpin all nodes.
- D3 client area & SVG canvas dynamically sized relative to browser window size, including auto-resize of Force Simulation. Scrollbars are avoided within of min width, min height or width-to-height ratios.
- Tooltips for all Navbar and Visualizer command buttons.
- Node tooltips verbosity is controlled via a toggle checkbox. In verbose mode, the detail level is the same as the selected Node properties table. Both methods can be used together, which provides a convenient way to compare details between a baseline selected Node, and other Nodes via hovering over them.
- Languages dropdown supports, English, Chinese, French, German, Italian, Japanese and Spanish. Localizations currently implemented for Navbar only.

The AtomSpace Explorer app was based upon the Mozi Visualizer Demo app (which was in turn based on the Glimpse visualizer).

As the initial commit of the AtomSpace Explorer has substantial changes, there's a more detailed list of the changes and new additions below.

## Requirements
1. node v6.0.0 or above 

This project was originally generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Setup
```
sh
# inside the root directory of this file
npm install #install all dependencies

npm start # will start the visualizer at port 4200
```

## Usage
1 - Navigate to [http://localhost:4200/](http://localhost:4200/)
2 - A 'Fetch Results From AtomSpace' prompt is displayed for an AtomSpace api url. Enter a valid url.
    I.E http://255.255.255.255>:5000/api/v1.1/atoms, then click on Fetch within the prompt dialog to
    graph the data. At any time, return to the **Fetch** button on the navbar to fetch new data from 
    an AtomSpace api url.
3 - Alternatively, if you go straight to the **Visualize** button on the navbar, built-in sample data 
    will be displayed in the graph.

## Revision History
### Oct-15-2017 - sshermz - HTML Tooltips, plus a few minor features and bug fixes
- New Feature: Intelligent HTML formatted tooltips, with normal and verbose modes. Verbose mode is selected via new Tooltips toggle checkbox, which has been added underneath the other D3 graph command buttons. The toggle checkbox is styled to match the Semantic UI teal theme. In Verbose mode, the same level of detail, that's in the right-side Node properties box, is shown. However the tooltips are more convenient for quickly surveying details amongst many Nodes without requiring any clicks. Can also use to compare other Nodes to the selected Node. Default non-verbose tooltips are improved to the same new style, and show both the name if available, like before, but now also always show the type. In other words, now all Nodes show tooltips, dynamically showing what information is available.
- New Feature: Node properties dialog now also shows Node Name, if there is one.
- Improvement: Right-justified the Node properties 'X' close icon, as is standard for a close button. Also added circular border to make it's purpose more clear. Also did minor node properties table fixes, cleanups & style refinements.
- New Feature: Added Esc key handling for cancelling context menus. As a bonus, also added new shortcut keys within the new key handling function for various graph command buttons: Space bar pauses and resumes D3 Force Simulation. Enter restarts D3 Force Simulation. Numpad +/- for Zooming. Numpad * for resetting zoom level. And the graph command button tooltips have been updated to indicate all of these shortcuts to help make them self-evident.
- Bug Fix: Fixed main context menu which wasn't always available when D3 rect was offset by panning.
- Bug Fix: Fixed a couple of navbar tooltip positions.
- Also added some disabled node centering and pan recentering code, but disabled for now as it doesn't work when zoomed in.
- Minor refactoring.
### Oct-10-2017 - sshermz - Initial Commit
#### *Changes from the Mozi Visualizer Demo app*
- Changed adjacent link labels to inline, which required adding matching SVG shadow text elements to overwrite link line beneath labels.
- Node name auto-sizing and auto-truncating with ellipsis.
- Node emphasis for nodes with STI (larger radius).
- Added Node properties dismissal via reclick on same Node.
- Added ability to pause, resume and restart the Force Simulation with new buttons for each.
- Added reset zoom button.
- Rebranded app to AtomSpace Explorer, including change of main icon to OpenCog icon, and change of default Angular icon in browser tab to small Cog icon.
- Changed Navbar "Network" to "Visualize", and changed the Semantic-UI icons for Fetch and Visualize. Added hyperlink to http://opencog.org/ from Navbar OpenCog icon.
- Fixed Navbar buttons alignment to fully left-justified Icon/Fetch/Visualize, and fully right-justified Language dropdown.
- Partial fixes to Filter dropdown - Changed redundant "Show All" vs ("Show All Data") to "Clear Filter" (with an added divider). However, "Clear Filter" is still doing "Show All Data" like before. TODO to fix this to only remove current filter, and not show all data when filtered to a node and 2 levels of neighbors via a double-click. BTW, perhaps there should be more than the 3 hard-coded filter types? 
- Added meaningful tooltips to all Navbar elements, and to all Graph buttons.
- Added context (right-click) menus for D3 client rect, and for Nodes.
- Added Pin/Unpin feature which is accessible via CTRL actions and via the context menus. Also an Unpin all for the D3 client rect area.
- Added dynamic resizing for ui-grid and below elements.
- Added tooltips to all buttons.
- Changed Node properties dialog border to match the teal of the Semantic UI graph buttons.
- Added new translations to French, German, Italian, Japanese and Spanish, as previously only English and Chinese was implemented.
- Refactoring of hard-coded values in D3 graphing code to consts.
- Fixed TSLint for project.
- TSLint fixes to D3 graphing code.
- Added detailed code comments to D3 graphing code. Plus renaming of various D3/Visualizer related classes, vars and functions for readability.
- Added D3/Visualizer classnames and/or ids to some classes to aid debugging.
- Added new built-in samples (selection is currently changed at compile time).
- Miscellaneous refactoring and bug fixes of D3 graphing code.
- Added Fisheye distortion feature, but disabled for now due to issue with positioning of rotated (transformed) link labels.
