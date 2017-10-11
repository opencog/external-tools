/*
 * NetworkComponent
 *
 * Description: Implementation of D3 Directed Force Graph for AtomSpace data.
 *
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {
  NetworkService
} from './network.service';
import {
  Graph
} from './graph';
import {
  AtomsService
} from '../../shared/services/atoms.service';

/*
 * ## Consts ##
 */

 // Force Simulation
const simInterval = 10;  // Milliseconds.
const simForceStrengthNormal = -80, simForceStrengthFast = -120, simForceStrengthSlow = -20;
const simForceStrength = simForceStrengthNormal;

// Link Label alignment style
const inlineLinkText = true;
const dyLinkLabel: string = inlineLinkText ? '0.38em' : '-0.30em';

// Node & Link related consts
const radiusNodeNameless = 6;
const radiusNode = 12;
const opacityNode = 1;
const opacityNodeLabel = 1;
const opacityLink = 0.8;
const opacityLinkLabel = 1;
const opacityHidden = 0;
// const opacityHidden =  0.1;  // For Development only.
const strokeWidthLink = 1;
const strokeWidthLabelShadow = 3;
const strokeWidthNode = 1.5;
const strokeWidthSelectedNode = 3;
const fontLink = 'normal 6px arial';
const fontfamilyNode = 'arial';
const fontweightNode = 'bold';
const maxfontsizeNode = 18;
const maxNodeLabelLength = 9;
const nodeLabelPadding = 0.80;  // Padding factor for text within node circle.
const xtraLevelNeighbors = true;
const nodePositionMargin = 30;  // Margin within D3 rect, in px.
const enableFisheye = false;   // Disabled for now unless can fix issue with rotated label positions.

/*
 * Node radius scaling
 */
const radiusScaleFactorPct = 33;  // 0 to disable.
const radiusScaleMinVal = 10;  // For tipping point approach only.

/* % approach */
// function scaleRadius(rad: number, scaleVal: number) { return rad + (scaleVal * (radiusScaleFactorPct / 100)); }

/* Tipping point approach */
function scaleRadius(rad: number, scaleVal: number) {
  if (scaleVal >= radiusScaleMinVal) { return rad * (1 + (radiusScaleFactorPct / 100)); }
  return rad;
}

/*
 * ## Globals ##
 */
declare var jQuery: any;
declare var d3: any;
let simulation: any = null;
let simulationRunning = false;
let fisheye: any = null;
let widthView = 0;
let heightView = 0;

/*
 * class NetworkComponent
 */
@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements AfterViewInit, OnInit {
  private atoms: any;
  private initialLoad = true;
  private parsedJson: Graph = <Graph>{};
  public message: any;  // variable to store node info on node click.
  private selectedNode = false;  // variable to show/hide the information bar.
  private selectedNodeData: any; // data for information bar.
  private filteredNodes = false;  // variable to show/hide the show whole data button on dblclick of node.
  private zoom = d3.zoom();  // zoom behaviour.
  private scale = 1;  // variable to control the scale of zoom.
  private svg: any;
  private node: any;
  private link: any;
  private nodeLabel: any;
  private linkLabel: any;
  private linkLabelShadow: any;
  private textPath: any;
  private types: string[];
  private type: any;
  private av: any;
  private tv: any;
  private handle: any;
  // private currentfilter: any = "Unfiltered";

  /*
   * Constructor
   */
  constructor(private networkService: NetworkService, private atomsService: AtomsService) {
    this.atomsService.editItem
      .subscribe(res => {
        this.atoms = res;
      });
  }

  /*
   * Init
   */
  ngOnInit(): void { }

  /*
   * Post-Init
   */
  ngAfterViewInit() {
    this.draw_graph();
    this.initialLoad = false;
  }

 /*
  * ## Click Handlers ##
  */

 /*
  * Click Handler: Pause Force Simulation
  */
  pause() {
    if (simulation) {
      simulation.stop();
      simulationRunning = false;
    }
  }

  /*
  * Click Handler: Continue (paused) Force Simulation. Does not reheat.
  */
  play() {
    if (simulation) {
      simulation.restart();
      simulationRunning = true;
    }
  }

  /*
  * Click Handler: Completely Restart Force Simulation anew
  */
  restart() {
    this.pause();
    this.closeSelectedNodeProps();
    this.filteredNodes = false;
    this.selectedNode = false;
    this.scale = 1;
    this.draw_graph();
  }

  /*
  * Click Handler: Zoom In
  */
  zoomIn(duration: number) {
    const currScale = this.scale;
    const view = d3.select('rect');
    if (this.scale < 4) {  // to limit the scale variable to scale extent limit.
      this.scale += 1;
    }
    view.transition().duration(duration).call(this.zoom.scaleTo, this.scale);
    // console.log('zoomIn(): Changed scale from ' + currScale + ' to ' + this.scale);
  }

  /*
  * Click Handler: Zoom Out
  */
  zoomOut(duration: number) {
    const currScale = this.scale;
    const view = d3.select('rect');
    if (this.scale > 1) {  // to limit the scale variable to scale extent limit.
      this.scale -= 1;
    }
    view.transition().duration(duration).call(this.zoom.scaleTo, this.scale);
    // console.log('zoomOut(): Changed scale from ' + currScale + ' to ' + this.scale);
  }

  /*
  * Click Handler: Restore default Zoom level
  */
  zoomReset(duration: number) {
    const view = d3.select('rect');
    this.scale = 1;  // variable to control the scale of zoom.
    view.transition().duration(duration).call(this.zoom.scaleTo, this.scale);
  }

  /*
   * Click Handler: Hide the Popup Selected Node Information Table
   */
  closeSelectedNodeProps() {
    this.selectedNode = false;

    // Undo Selection indication
    d3.selectAll('circle')
    .style('r', function (d) {
      let r = d.name === '' ? radiusNodeNameless : radiusNode;
      r = scaleRadius(r, d.av.sti);  // Node Weighting.
      return r;
    }).style('stroke', '#fff');
  }

  /*
   * Click Handler: Filter by Node
   *
   * Description: Show or Hide nodes with links as per whether they are currently filtered or not.
   */
  filterByNode(type) {
    // console.log('filterByNode(type): ' + type);

    // Clear Filter
    if (type === 'all') {
      // Workaround: Currently same as Show All Data
      this.closeSelectedNodeProps();
      this.showAll();
      this.filteredNodes = false;
      this.selectedNode = false;

      // TODO: Filter menu should remain, but go back to default, unfiltered state.
      // Selection should update appropriately too, taking into account whether there
      // is currently a double-click selection or not.
      //
      // Reset filter instead of closing it (none of these work)
      // this.currentfilter = "Filter";
      // $("#filtermenu").dropdown({placeholder:''});

      return;
    }

    // Build link map
    const linkedByIndex = {};
    this.link.each(function (d) {
      linkedByIndex[d.source.index + ',' + d.target.index] = true;
      linkedByIndex[d.target.index + ',' + d.source.index] = true;
    });

    // Function for testing if neighbor against link map
    function neighboring(a, b) {
      return linkedByIndex[a.index + ',' + b.index];
    }

    // Show/hide neighboring Nodes
    this.node.style('opacity', (d) => {
      return (neighboring(d, this.selectedNodeData) && d.type === type) ||
        d.id === this.selectedNodeData.id ? opacityNode : opacityHidden;
    });

    // Show/hide neighboring Node Labels
    this.nodeLabel.style('opacity', (d) => {
      return (neighboring(d, this.selectedNodeData) && d.type === type) ||
        d.id === this.selectedNodeData.id ? opacityNodeLabel : opacityHidden;
    });

    // Show/hide Links
    this.link.style('opacity', (o) => {
      // return (o.source === this.selectedNodeData || o.target === this.selectedNodeData) ? 1 : 0;
      if ((o.source === this.selectedNodeData) && o.target.type === type) {
        return opacityLink;
      } else if ((o.target === this.selectedNodeData) && o.source.type === type) {
        return opacityLink;
      } else {
        return opacityHidden;
      }
    });

    // Show/hide Link Shadow text
    if (inlineLinkText === true) {
      this.linkLabelShadow.style('opacity', (o) => {
        // return (o.source === this.selectedNodeData || o.target === this.selectedNodeData) ? 1 : 0;
        if ((o.source === this.selectedNodeData) && o.target.type === type) {
            return opacityLinkLabel;
        } else if ((o.target === this.selectedNodeData) && o.source.type === type) {
          return opacityLinkLabel;
        } else {
          return opacityHidden;
        }
      });
    }

    // Show/hide Link text
    this.linkLabel.style('opacity', (o) => {
      // return (o.source === this.selectedNodeData || o.target === this.selectedNodeData) ? 1 : 0;
       if ((o.source === this.selectedNodeData) && o.target.type === type) {
          return opacityLinkLabel;
      } else if ((o.target === this.selectedNodeData) && o.source.type === type) {
        return opacityLinkLabel;
      } else {
        return opacityHidden;
      }
    });
  }
  /* End Filter by Node */

  /*
   * Click Handler: Show all data
   */
  showAll() {
    // console.log('showAll()');

    this.zoomReset(100);

    // Set properties to their original form...

    // Links
    this.link.style('stroke-width', strokeWidthLink).style('opacity', opacityLink);

    // Nodes
    this.node.style('opacity', opacityNode).style('stroke', '#fff');

    // Opacity of all text
    d3.selectAll('text.node-labels').style('opacity', opacityNodeLabel);
    d3.selectAll('text.edgelabel').style('opacity', opacityLinkLabel);
    d3.selectAll('text.edgelabelshadow').style('opacity', opacityLinkLabel);

    // Link Label shadow text size and text spacing from link line
    d3.selectAll('.edgelabelshadow').style('font', fontLink).attr('dy', dyLinkLabel);

    // Link Label text size and text spacing from link line
    d3.selectAll('.edgelabel').style('font', fontLink).attr('dy', dyLinkLabel);

    this.filteredNodes = false;
    this.selectedNode = false;
  }

  /* End Click Handlers */

  /*
   * Main D3 Graph rendering function
   */
  private draw_graph() {
    // console.log('draw_graph()');

    const __this = this;

    // Main context menu
    const mainMenu = [{
      title: 'Unpin All Nodes',
      action: function(elm, d, i) {
        __this.node.each(function (o) {
          o.fx = null;
          o.fy = null;
        });
      }
    }];

    // Node context menu
    const nodeMenu = [{
      /* TODO: Show Details Command
      title: function(d) {
        return 'Show Details for ' + d.name;
      },
      action: function(elm, d, i) {
        // TODO - Show Details Popup
      }
    }, {*/
      // Pin/Unpin Command
      title: function(d) {
        if (d.fx == null) {
          return 'Pin (Ctrl-Click or Ctrl-Drag) ' + d.name;
        } else {
          return 'Unpin (Click or Drag) ' + d.name;
        }
      },
      action: function(elm, d, i) {
        if (d.fx == null) {  // Pin
          d.fx = d.x;
          d.fy = d.y;
        } else {  // Unpin
          d.fx = null;
          d.fy = null;
        }
      },
    }];

    this.svg = d3.select('svg');
    this.svg.selectAll('*').remove();

    // Get SVG element width and height
    widthView = document.getElementById('svgcanvas').clientWidth;
    heightView = document.getElementById('svgcanvas').clientHeight;
    if (widthView === 0 && heightView === 0) {  // Firefox
      const rect = document.getElementById('svgcanvas').getBoundingClientRect();
      widthView = rect.width;
      heightView = rect.height;
    }

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    // Enable Fisheye Distortion
    if (enableFisheye) {
      fisheye = d3.fisheye.circular()
      .radius(200)
      .distortion(2);
    }

    // Set up Force Simulation
    simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function (d) { return d.id; }).distance(100))
      .force('charge', d3.forceManyBody().strength(simForceStrength))
      .force('center', d3.forceCenter(widthView / 2, heightView / 2));

    // Set up Rect for rendering graph within SVG window
    this.svg.append('rect')
      .attr('width', widthView)
      .attr('height', heightView)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('contextmenu', d3.contextMenu(mainMenu))
      .call(this.zoom
      .scaleExtent([1 / 2, 4])
      .on('zoom', zoomed))
      .on('wheel.zoom', null);  // Disable zoom by mouse wheel.

    // Add group under svg element
    const g = this.svg.append('g').attr('class', 'svg-grp');

    // Set up zooming for this element
    function zoomed() { g.attr('transform', d3.event.transform); }

    // Build up the graph...

    // Get Data
    this.parsedJson = this.networkService.getParsedJson(this.atoms.result.atoms);
    // console.log(this.parsedJson);

    // Links
    this.link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(this.parsedJson.links)
      .enter().append('line')
      .attr('stroke-width', strokeWidthLink);

    // Link edgepath
    this.textPath = g.append('g').attr('class', 'edgepath-grp').selectAll('.edgepath')
      .data(this.parsedJson.links)
      .enter()
      .append('path')
      .attr('class', 'edgepath')
      .attr('id', function (d, i) {
        return 'edgepath' + i;
      })
      .style('pointer-events', 'none');

    // Link Label Shadows
    if (inlineLinkText === true) {
      this.linkLabelShadow = g.append('g').attr('class', 'edgelabelshadow-grp').selectAll('.edgelabel')
        .data(this.parsedJson.links)
        .enter()
        .append('text')
        .style('pointer-events', 'none')
        .style('font', fontLink)
        .style('line-height', '150%')
        // .attr("y", ".31em")
        .style('stroke-width', strokeWidthLabelShadow)
        .attr('class', 'edgelabelshadow')
        .attr('dy', dyLinkLabel)  // Adjust position of text vs link line.
        .attr('id', function (d, i) {
          return 'edgelabelshadow' + i;
      });
    }

    // Link Labels
    this.linkLabel = g.append('g').attr('class', 'edgelabel-grp').selectAll('.edgelabel')
      .data(this.parsedJson.links)
      .enter()
      .append('text')
      .style('pointer-events', 'none')
      .style('font', fontLink)
      .style('line-height', '150%')
      // .style("fill", "white")  // Text color
      .attr('class', 'edgelabel')
      .attr('dy', dyLinkLabel)  // Adjust position of text vs link line.
      .attr('id', function (d, i) {
        return 'edgelabel' + i;
      });

    // Position label shadow midway along the link
    if (inlineLinkText === true) {
      this.linkLabelShadow.append('textPath')
        .attr('xlink:xlink:href', function (d, i) {
          return '#edgepath' + i;
        })
        .style('text-anchor', 'middle')
        .style('pointer-events', 'none')
        .attr('startOffset', '50%')
        .text(function (d) {
          return d.name;
        });
    }

    // Position label midway along the link
    this.linkLabel.append('textPath')
      .attr('xlink:xlink:href', function (d, i) {
        return '#edgepath' + i;
      })
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .attr('startOffset', '50%')
      .text(function (d) {
        return d.name;
      });

    // Nodes
    this.node = g.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(this.parsedJson.nodes)
    .enter().append('circle')
    .on('contextmenu', d3.contextMenu(nodeMenu))
    .attr('r', function (d) {
      let r = (d.name === '') ? radiusNodeNameless : radiusNode;
      r = scaleRadius(r, d.av.sti);  // Node Weighting.
      // console.log('Appending circle \'' + d.name + '\' radius=' + r);
      return r;
    })
    .attr('fill', function (d) {
      return color(d.group);
    })
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

    // Node Text
    this.nodeLabel = g.append('g').attr('class', 'nodelabel-grp').selectAll('.mytext')
      .data(this.parsedJson.nodes)
      .enter()
      .append('text')

      // Size font per node radius, including to truncate text with ellipsis if too long
      .text(function (d) {
        const len = d.name.length;
        if (len === 0) { return '';
        } else if (len > maxNodeLabelLength) { return d.name.substr(0, maxNodeLabelLength - 3) + '...';
        } else { return d.name; }
      })
      .style('font-family', fontfamilyNode)
      .style('font-weight', fontweightNode)
      .style('font-size', '1px')
      .each(getSizeNodeLabel)
      .style('font-size', function() { return Math.min(d3.select(this).attr('data-scale'), maxfontsizeNode) + 'px'; })
      // .style('font-size', function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + 'px'; })
      .attr('class', 'node-labels')
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .style('fill', '#fff');  // Text color inside nodes.

    // Enable tooltip with complete (non-truncated) name
    this.node.append('title')
      .text(function (d) {
        return d.name;
      });

    /*
     * Node On-Single-Click function
     */
    this.node.on('click', (d) => {
      // console.log('Click: ', d);

      // If this node already selected, then unselect
      if (this.selectedNode === true && this.selectedNodeData === d) {
        d3.selectAll('circle').style('stroke-width', strokeWidthNode).style('stroke', '#fff');
        this.selectedNode = false;

        // If simulation already paused, keep it paused
        if (simulationRunning === false) { this.pause(); }

        return;
      }

      // Data values
      this.handle = d.id;
      this.type = d.type;
      this.av = d.av;
      this.tv = d.tv;
      this.selectedNodeData = d;

      // Display node info popup
      this.selectedNode = true;

      // Add selection indication to the selected node
      // d3.selectAll('circle').style('stroke-width', strokeWidthNode).style('stroke', '#fff');
      this.node.style('stroke-width', function(o) {
        return o.id === d.id ? strokeWidthSelectedNode : strokeWidthNode;
      }).style('stroke', function (o) {
        return o.id === d.id ? 'red' : '#fff';
      });

      // If simulation already paused, keep it paused
      // d3.event.preventDefault();
      if (simulationRunning === false) { this.pause(); }
    });
    /* End Node On-Single-Click function */

    /*
     * Node On-Mouse-Move function  (Placeholder for future usage)
     *
    this.node.on('mousemove', (d) => {
      console.log('Mousemove: ', d);
      d3.event.preventDefault();
    });*/
    /* End Node On-Mouse-Move function */

    /*
     * Node On-Double-Click function
     */
    this.node.on('dblclick', (d) => {
      //  console.log('Doubleclick: ', d);

      this.filteredNodes = true;
      this.selectedNodeData = d;
      this.selectedNode = true;

      // Build link map
      const linkedByIndex = {};
      this.link.each(function (k) {
        linkedByIndex[k.source.index + ',' + k.target.index] = true;
        linkedByIndex[k.target.index + ',' + k.source.index] = true;
      });

      // Additional level of links
      const neighbourLinks = [];
      const neighlink = [];
      const neigh = [];
      if (xtraLevelNeighbors) {
        this.node.each(function (k) {
          if (neighboring(d, k) && k.name === '') {
            neighbourLinks.push(k);
          }
        });
        for (let i = 0; i < neighbourLinks.length; i++) {
          neighlink.push(neighbourLinks[i].id);
          this.node.each(function (l) {
            if (neighboring(neighbourLinks[i], l)) {
              neigh.push(l.id);
            }
          });
        }
      }

      // Function for testing if neighbor against link map
      function neighboring(a, b) {
        return linkedByIndex[a.index + ',' + b.index];
      }

      // Node
      this.node.style('opacity', function (o) {
        if (xtraLevelNeighbors) {
          return neighboring(d, o) || (d.id === o.id) || (neigh.indexOf(o.id) !== -1) ? opacityNode : opacityHidden;
        } else {
          return neighboring(d, o) || (d.id === o.id) ? opacityNode : opacityHidden;
        }
      });
      // console.log(neigh);

      // Node Label
      this.nodeLabel.style('opacity', function (o) {
        if (xtraLevelNeighbors) {
          return neighboring(d, o) || (d.id === o.id) || (neigh.indexOf(o.id) !== -1) ? opacityNodeLabel : opacityHidden;
        } else {
          return neighboring(d, o) || (d.id === o.id) ? opacityNodeLabel : opacityHidden;
        }
      });

      // Link
      this.link.style('opacity', function (o) {
        if (xtraLevelNeighbors) {
           return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) !== -1) &&
             (neighlink.indexOf(o.source.id) !== -1)) || ((neigh.indexOf(o.source.id) !== -1) &&
             (neighlink.indexOf(o.target.id) !== -1)) ? opacityLink : opacityHidden;
        } else {
          return o.source === d || o.target === d ? opacityLink : opacityHidden;
        }
      });

      // Link Text Shadow
      if (inlineLinkText === true) {
        this.linkLabelShadow.style('opacity', function (o) {
          if (xtraLevelNeighbors) {
            return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) !== -1) &&
              (neighlink.indexOf(o.source.id) !== -1)) || ((neigh.indexOf(o.source.id) !== -1) &&
              (neighlink.indexOf(o.target.id) !== -1)) ? 1 : opacityHidden;
          } else {
            return o.source === d || o.target === d ? 1 : opacityHidden;
          }
        });
      }
      // Link Text
      this.linkLabel.style('opacity', function (o) {
        if (xtraLevelNeighbors) {
          return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) !== -1) &&
            (neighlink.indexOf(o.source.id) !== -1)) || ((neigh.indexOf(o.source.id) !== -1) &&
            (neighlink.indexOf(o.target.id) !== -1)) ? opacityLinkLabel : opacityHidden;
        } else {
          return o.source === d || o.target === d ? opacityLinkLabel : opacityHidden;
        }
      });

      this.node.each(function (o) {
        d.x = (d.id === o.id) ? widthView / 2 : d.x;
        d.y = (d.id === o.id) ? heightView / 2 : d.y;
      });

      // Make sure that the selection indication is added to the selected node
      // d3.selectAll('circle').style('stroke-width', strokeWidthNode).style('stroke', '#fff');
      this.node.style('stroke-width', function(o) {
        return o.id === d.id ? strokeWidthSelectedNode : strokeWidthNode;
      }).style('stroke', function (o) {
        return o.id === d.id ? 'red' : '#fff';
      });
    });
    /* End Node On-Double-Click function */

    /*
     * On-Resize function
     */
    d3.select(window).on('resize', function() {
      // console.log('Resize (before): w=' + widthView + ', h=' + heightView);

      // Resize the D3 rect to the new SVG window size
      const view = d3.select('rect');
      widthView = document.getElementById('svgcanvas').clientWidth;
      heightView = document.getElementById('svgcanvas').clientHeight;
      if (widthView === 0 && heightView === 0) {  // Firefox
        const rect = document.getElementById('svgcanvas').getBoundingClientRect();
        widthView = rect.width;
        heightView = rect.height;
      }

      view.attr('width', widthView).attr('height', heightView);
      // console.log('Resize (after): w=' + widthView + ', h=' + heightView);

      // Recenter Force Simulation within new window size
      if (simulationRunning === true) {
        simulation.force('center', d3.forceCenter(widthView / 2, heightView / 2));
      }
    });

    /*
     * On-Mouse-Move function
     */
    this.svg.on('mousemove', function() {
      if (simulationRunning || fisheye === null || !enableFisheye) { return; }

      // Update focal point of distortion
      // console.log('mousemove: ' + d3.mouse(this));
      fisheye.focus(d3.mouse(this));

      // Update Node position
      __this.node.each(function (d) { d.fisheye = fisheye(d); })
        .attr('cx', function(d) { return d.fisheye.x; })
        .attr('cy', function(d) { return d.fisheye.y; })
        // .attr("r", function(d) { return d.fisheye.z * 4.5; }); // TODO: Use z to scale up the radius
      ;

      // Update Node Label position
      __this.nodeLabel
        .attr('x', function (d) { return d.fisheye.x; })
        .attr('y', function (d) { return d.fisheye.y; })
        .attr('dy', function (d) { return '0.35em'; });

      // Update Link positions
      __this.link
        .attr('x1', function(d) { return d.source.fisheye.x; })
        .attr('y1', function(d) { return d.source.fisheye.y; })
        .attr('x2', function(d) { return d.target.fisheye.x; })
        .attr('y2', function(d) { return d.target.fisheye.y; });

      // Update Link Label positions
      // TODO: Transformed (rotated) text goes in wrong position
      __this.textPath.attr('d', function (d) {
        if (d.target.fisheye.x < d.source.fisheye.x) {
          // Broken
          return 'M ' + d.source.fisheye.x + ' ' + d.source.fisheye.y + ' L ' + d.target.fisheye.x + ' ' + d.target.fisheye.y;
        } else {
          // Okay
          return 'M ' + d.source.fisheye.x + ' ' + d.source.fisheye.y + ' L ' + d.target.fisheye.x + ' ' + d.target.fisheye.y;
        }
      });

      /* Needed?
      // Update Link Label Shadow rotation
      if (inlineLinkText === true)
      {
        __this.linkLabelShadow.attr('transform', function (d) {
          if (d.target.x < d.source.x) {
            const bbox = this.getBBox();
            // console.log('Simulation transform (' + d.name + '): ' + bbox.x + ',' + bbox.y + ',' + bbox.width + ',' + bbox.height);
            const rx = bbox.fisheye.x + bbox.width / 2;
            const ry = bbox.fisheye.y + bbox.height / 2;
            return 'rotate(180 ' + rx + ' ' + ry + ')';
          } else {
            return 'rotate(0)';
          }
        });
      }

      // Update Link Label rotation
      __this.linkLabel.attr('transform', function (d) {
        if (d.target.x < d.source.x) {
          const bbox = this.getBBox();
          // console.log('Simulation transform (' + d.name + '): ' + bbox.x + ',' + bbox.y + ',' + bbox.width + ',' + bbox.height);
          const rx = bbox.fisheye.x + bbox.width / 2;
          const ry = bbox.fisheye.y + bbox.height / 2;
          return 'rotate(180 ' + rx + ' ' + ry + ')';
        } else {
          return 'rotate(0)';
        }
      });*/
    });

    /*
     * Force Simulation
     */
    simulation
      .nodes(this.parsedJson.nodes)
      .on('tick', () => {
        // Update Link positions
        this.link
          .attr('x1', function (d) { return d.source.x; })
          .attr('y1', function (d) { return d.source.y; })
          .attr('x2', function (d) { return d.target.x; })
          .attr('y2', function (d) { return d.target.y; });

        // Update Link Label positions
        this.textPath.attr('d', function (d) {
          return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });

        // Update Link Label Shadow rotation
        if (inlineLinkText === true) {
          this.linkLabelShadow.attr('transform', function (d) {
            if (d.target.x < d.source.x) {
              const bbox = this.getBBox();
              // console.log('Simulation transform (' + d.name + '): ' + bbox.x + ',' + bbox.y + ',' + bbox.width + ',' + bbox.height);
              const rx = bbox.x + bbox.width / 2;
              const ry = bbox.y + bbox.height / 2;
              return 'rotate(180 ' + rx + ' ' + ry + ')';
            } else {
              return 'rotate(0)';
            }
          });
        }

        // Update Link Label rotation
        this.linkLabel.attr('transform', function (d) {
          if (d.target.x < d.source.x) {
            const bbox = this.getBBox();
            // console.log('Simulation transform (' + d.name + '): ' + bbox.x + ',' + bbox.y + ',' + bbox.width + ',' + bbox.height);
            const rx = bbox.x + bbox.width / 2;
            const ry = bbox.y + bbox.height / 2;
            return 'rotate(180 ' + rx + ' ' + ry + ')';
          } else {
            return 'rotate(0)';
          }
        });

        // Update Node position
        this.node
          .attr('cx', function (d) {
            return d.x = Math.max(nodePositionMargin, Math.min(widthView - nodePositionMargin, d.x));
          })
          .attr('cy', function (d) {
            return d.y = Math.max(nodePositionMargin, Math.min(heightView - nodePositionMargin, d.y));
          });

        // Update Node Label position
        this.nodeLabel
          .attr('x', function(d){ return d.x; })
          .attr('y', function (d) {return d.y; })
          .attr('dy', '0.35em');

        // this.node.each(d3.collide(0.5));
      });
    /* End Simulation On-Tick function */

    // Simulation Links
    simulation.force('link')
      .links(this.parsedJson.links);

    // Start simulation timer
    // d3.timer(function () { simulation.alpha(0.1); }, simInterval);
    setInterval(function() { simulation.alpha(0.1); }, simInterval);

    simulationRunning = true;

    /*
     * Simulation dragability implementations
    */
    // let realDrag = false;
    function dragstarted(d) {  // Note that this gets invoked by drags or clicks.
      // console.log('dragstarted(): d3.event.active=\'' + d3.event.active + '\'' );

      // Set alphaTarget during layout update so that node positions will update smoothly
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }

      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {  // Note that this gets invoked by drags or clicks.
      // console.log('dragged(): d3.event.active=\'' + d3.event.active + '\'' );
      // console.log('  d3.event.sourceEvent.movementX=\'' + d3.event.sourceEvent.movementX + '\'' );
      // console.log('  d3.event.sourceEvent.movementY=\'' + d3.event.sourceEvent.movementY + '\'' );
      // console.log('  w=' + widthView + ', h=' + heightView);

      d.fx = Math.max(nodePositionMargin, Math.min(widthView - nodePositionMargin, d3.event.x));
      d.fy = Math.max(nodePositionMargin, Math.min(heightView - nodePositionMargin, d3.event.y));

      // Dragging automatically restarts simulation, so update simulationRunning to correct state
      //
      // Workaround required because: 1) D3 drag gestures invoke d3.force.resume(), which cannot be disabled
      // 2) Single/double clicks fire all the drag events too. Also no way to disable. Hence, only way to
      //  distinguish "real" drag events from single/double clicks is to watch for X, Y movement during drag.
      if (d3.event.sourceEvent.movementX !== 0 || d3.event.sourceEvent.movementY !== 0) {
        simulationRunning = true;
        // realDrag = true;
      } else {
        // console.log('  invoked by click (not an actual drag)');
      }

    }
    function dragended(d) {  // Note that this gets invoked by drags or clicks.
      // console.log('dragended(): d3.event.active=\'' + d3.event.active + '\'' );

      // Let simulation cool back down
      if (!d3.event.active) { simulation.alphaTarget(0); }

      // Leave node pinned if dragged (or clicked or double-clicked) w/CTRL key
      const e = d3.event.sourceEvent;
      if (!e.ctrlKey) {
        d.fx = null;
        d.fy = null;
      }
    }

    /*
    * getSizeNodeLabel() - Calculate text size against attentionvalue.sti, and sets data-scale attribute.
    */
    function getSizeNodeLabel(d) {
      if (d.name === '') { return; }
      const d3text = d3.select(this);

      // TODO
      // let radius = Number(?circ?.attr("r"));  // Retrieve Node radius.

      // Workaround
      let radius = radiusNode;
      // console.log('getSizeNodeLabel() ' + d.name + ': radius before scaling=' + radius);
      radius = scaleRadius(radius, d.av.sti);  // Node Weighting.

      const offset = Number(d3text.attr('dy'));
      const textWidth = this.getComputedTextLength();
      const availWidth = radius * 2 * nodeLabelPadding;
      const dataScale = availWidth / textWidth;
      // console.log('getSizeNodeLabel() ' + d.name + ': radius=' + radius + ', data-scale=' + dataScale);
      d3text.attr('data-scale', dataScale);  // Sets the data attribute, which is read in the next step.
    }
  }
  /* End draw_graph() */

}
/* End class NetworkComponent */
