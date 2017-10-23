AtomSpace Explorer
====================
The AtomSpace Explorer is a visualization tool for OpenCog data. Atoms are fetched from the CogServer via the AtomSpace REST API, then displayed as a two dimensional graph in the browser.

![AtomSpace Explorer](src/assets/img/AtomSpace-Explorer.jpg)

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
- A Filtering dropdown appears when an Atom is selected or double-clicked.
- D3 client area and Node context (right-click) menus.
- Individual Nodes are pinnable into fixed location. Ctrl-click, Ctrl-double-click, Ctrl-drag, or use right-click menu to Pin/Unpin a Node. Right-click the D3 client area to access a menu command to Unpin all Nodes.
- Increased Force Simulation Charge can be applied to individual Nodes. Shift-click, Shift-double-click, Shift-drag, or use right-click menu to apply/remove high charge force to/from a Node. Right-click the client area to access a menu command to remove high charge from all Nodes. With suitable data, like single Nodes with many children subtrees, this is nice for spreading (repulsing) out neighboring nodes more forcefully in a radial fashion from that central, highly-charged Node.
- D3 Graph client area and SVG canvas is dynamically-sized relative to the browser window size, including auto-resize of Force Simulation. Scrollbars are avoided within certain limits of minimum width, height, and width-to-height ratios.
- Tooltips for all Navbar and Visualizer command buttons.
- Node tooltips verbosity is controlled via a toggle checkbox. In verbose mode, the detail level is the same as the selected Node properties table. Both methods can be used together, which provides a convenient way to compare details between a baseline selected Node, and other Nodes via hovering over them.
- Languages dropdown supports, English, Chinese, French, German, Italian, Japanese and Spanish. Localizations are currently implemented for Navbar text labels only.

The AtomSpace Explorer app was based upon the Mozi Visualizer Demo app (which was in turn based on the Glimpse visualizer).

As the initial commit of the AtomSpace Explorer has substantial changes, there's a more detailed list of the changes and new additions below under the Oct-10-2017 "Initial Commit" section of the Revision History.

## Requirements
1. node v6.0.0 or above 

This project was originally generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Setup
```
sh                                  # Inside the root directory of this file
npm install                         # Install all dependencies.
npm start                           # Start the app on the default AngularJS port 4200.

npm start -- --port=[port-number]   # Start the app at [port-number].
npm start -- --port=8080            # Example with port number 8080.

Alternatively, you can permanently change the default port by inserting the following to angular-cli.json, at the top of the "defaults" block:
  "defaults": {                     #    Existing line.
    "serve": {                      # <- Inserted line.
      "port": 8080                  # <- Inserted line. Example port 8080. Set port number as desired.
    },                              # <- Inserted line.
    "styleExt": "css",              #    Existing line.

```

## Usage
1 - Navigate to [http://localhost:4200/](http://localhost:4200/)
2 - A 'Fetch Results From AtomSpace' prompt is displayed for an AtomSpace api url. Enter a valid url.
    I.E http://255.255.255.255>:5000/api/v1.1/atoms, then click on Fetch within the prompt dialog to
    graph the data. At any time, return to the **Fetch** button on the navbar to fetch new data from 
    an AtomSpace api url.
3 - Alternatively, if you go straight to the **Visualize** button on the navbar, built-in sample data 
    will be displayed in the graph.

## Known Issues
- Filtering capability is preliminary and needs to be developed further. For example, filter types in the dropdown should be generated dynamically (after parsing them from the data?).
- D3 graphs are creating up by building all the elements in the DOM. Therefore, there are limits to the number of nodes and links that are performant. Remediations are TBD.
- Sample data should be externalized.

## Revision History
### Oct-21-2017 - sshermz - Apply High Charge to Node feature, filtering improvements, performance fix and refactoring.
- New Feature: Apply very high force simulation charge to a specific Node, thereby strongly repulsing all of it's neighbors. With suitable data, like single Nodes with many children subtrees, this is nice for spreading (repulsing) out neighboring nodes more forcefully in a radial fashion from that central, highly-charged Node. Available on Node right-click menu. Can also apply with Shift key when selecting, clicking, double-clicking or dragging Nodes.
- Feature Change: Added more filter types in Filtering dropdown. Longer-term, need to generate dynamically and/or provide type in filter so user can enter any filter type.
- Feature Change: Changed STI weighted Node size scale up factor from 33% to 50%, to make it a bit more noticeable.
- Performance: Double-click filtering previously hid Nodes and Links > 2 levels away from double-clicked Node. Those hidden Nodes/Links remained in the DOM, affecting performance and also the Force Simuation behavior. Now when you double-click, the non-neighboring Nodes and Links are pruned from the DOM, providing a much nicer and performant user experience with the double-click-filtered data.
- Bug Fix: Filtering dropdown now supports returning to default Unfiltered state. Workaround that cleared the Node selection and closed the filter dropdown was removed.
- Bug Fix: Replaced Enter key shortcut to restart with Shift-Pause, as Enter key also invokes a button when the focus is on that button.
- Refactoring: Refactoring of D3 graphing code.
### Oct-17-2017 - sshermz - Package updates (Angular 4, etc), plus minor feature & bug fixes.
- Updated Angular 2 to Angular 4, and other packages to latest where ever possible. Fixes as necessary due to deprecations, including to MaterialModule. Also some TSLint fixes. Fixes #97.
- New Feature: Keep in paused mode if drag Node while paused (Simulation will tick while dragging, but will now repause when the drag is completed).
- Bug Fix: Revised some shortcut keys. Space bar interferes with the tabbing/space bar method of operating the UI, so now using Pause key to Pause / Unpause the Force Simulation, instead of the Space bar.
- Bug fix: Added Esc key handling for cancelling context menus (for real this time!).
- Documentation: How to override default port number added to README.md.
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
