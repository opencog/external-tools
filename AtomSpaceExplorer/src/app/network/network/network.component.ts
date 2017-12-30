/*
 * NetworkComponent
 *
 * Description: Implementation of D3 Directed Force Graph for AtomSpace data.
 *
 */
import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { NetworkService } from './network.service';
import { Graph } from './graph';
import { AtomsService } from '../../shared/services/atoms.service';

/*
 * ## Interfaces ##
 */
interface Menus {
  mainMenu: any;
  nodeMenu: any;
}

/*
 * ## Consts ##
 */

const appVersion = '0.11.01 Beta (Dec-28-2017)';

// Force Simulation
// const simForceStrengthNormal = -80, simForceStrengthFast = -120, simForceStrengthSlow = -20;
const simForceStrengthNormal = -60, simForceStrengthFast = -100, simForceStrengthSlow = -20;
const simForceStrength = simForceStrengthNormal;
const isDblClickPinAndRepulse = true;
const simForceStrengthHighNodeCharge = -2000;
const reheatFactorMax = 6;

// Node & Link related consts
const isNodesConstrainedToClientArea = false;
const dyLinkLabel = '0.38em';
const radiusNodeNameless = 6;
const radiusNode = 12;
const opacityNode = 1;
const opacityNodeLabel = 1;
const opacityLink = 0.8;
const opacityLinkLabel = 1;
const opacityHidden = 0;
// const opacityHidden =  0.1;  // For Development only.
const strokeWidthLink = 1;
const strokeWidthHoverLink = 2;
const strokeWidthLabelShadow = 3;
const strokeWidthNode = 1.5;
const strokeWidthSelectedNode = 3;
const strokeWidthHoverNode = 3;
const colorSelectedNode = '#00B5AD';
const colorHoverNode = '#BFECE9';
const colorHoverLink = '#68d3ce';  // '#7AD8D3';
const fontLink = 'normal 6px arial';
const fontfamilyNode = 'arial';
const fontweightNode = 'bold';
const maxfontsizeNode = 18;
const maxNodeLabelLength = 9;
const nodeLabelPadding = 0.80;  // Padding factor for text within node circle.
const isXtraLevelNeighbors = true;
const nodePositionMargin = 30;  // Margin within D3 rect, in px.
const isFisheye = false;   // Disabled for now unless can fix issue with rotated label positions.
const isPruneFilteredNodes = true;  // Remove filtered nodes from DOM. Provides performance benefit when filtered.
const maxNodeFilterSize = 20;
const maxLinkFilterSize = 20;
const filterTypeAll = 'Unfiltered';

// Node radius scaling
const radiusScaleFactorPct = 50;  // 0 to disable.
const isScaleRadiusTippingPoint = true;  // true for fixed larger size with tipping point approach, false for scaled approach.
const radiusScaleMinVal = 10;  // For tipping point approach only.

// Other
const defaultTransitionDuration = 1000;

/*
 * ## Globals ##
 */
declare var d3: any;
let simulation: any = null;
let isSimulationRunning = false;
let reheatFactor = 1;
let fisheye: any = null;
let widthView = 0;
let heightView = 0;
let filterMenuInitialized = false;

/*
 * Class NetworkComponent
 */
@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements AfterViewInit, OnInit, OnDestroy {
  private nodeTypes = [];
  private linkTypes = [];
  private menus: Menus;
  private divTooltip = null;
  private isSuppressTooltip = true;
  private marginTT = 30;
  private atoms: any;
  private isInitialLoad = true;
  private parsedJson: Graph = <Graph>{};
  private isSelectedNode = false;  // variable to show/hide the information bar.
  private selectedNodeData = null; // data for information bar.
  private isDrilledNodes = false;  // variable to show/hide the show whole data button on dblclick of node.
  private isDetailedTooltips = false;
  private d3zoom = d3.zoom();  // zoom behaviour.
  private zoomScale = 1;  // variable to control the scale of zoom.
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
  private name: any;
  private handle: any;

  static ___this;
  static this() { return this.___this; }

  /*
  * scaleRadius - Calculate radius for Nodes
  */
  static scaleRadius(rad: number, scaleVal: number) {
    if (isScaleRadiusTippingPoint) {
      // Tipping point approach
      if (scaleVal >= radiusScaleMinVal) { return rad * (1 + (radiusScaleFactorPct / 100)); }
      return rad;
    } else {
      // % approach
      return rad + (scaleVal * (radiusScaleFactorPct / 100));
    }
  }

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
  ngOnInit(): void {
    // console.log('ngOnInit()');

    NetworkComponent.___this = this;

    // Initialize menus
    this.menus = this.initContextMenus();

    // Define div for the tooltip
    if (this.divTooltip === null) {
      this.divTooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
    }
  }

  /*
   * Cleanup
   */
  ngOnDestroy(): void {
    // console.log('ngOnDestroy()');
    this.pauseSimulation();

    if (this.divTooltip) {
      this.divTooltip = null;
    }
  }

  /*
   * Post-Init
   */
  ngAfterViewInit() {
    this.parsedJson = this.networkService.getParsedJson(this.atoms.result.atoms);
    if (this.atoms.result.atoms.length) {
      let resultStr = 'Loaded ' + this.atoms.result.atoms.length + ' atoms';
      if (typeof this.atoms.result.complete !== 'undefined') { resultStr += ', complete=' + this.atoms.result.complete; }
      if (typeof this.atoms.result.skipped !== 'undefined') { resultStr += ', skipped=' + this.atoms.result.skipped; }
      this.getFilters(this.parsedJson);
      console.log(resultStr);
    }

    this.draw_graph();
    isSimulationRunning = true;
    this.isInitialLoad = false;
  }

  /*
   * panToCenter() - Reset panning to center.
   */
  panToCenter() {
    const scale = this.zoomScale;
    let x = -((scale - 1) / 2) * widthView;
    const y = -((scale - 1) / 2) * heightView;
    x *= 0.70193340494092373791621911922664;
    // console.log('panToCenter(): transform: ' + x + ', ' + y + ', ' + scale);

    const __this = this;
    const view = d3.select('svg');
    // console.log('panToCenter(): transform(before)=' + d3.zoomTransform(view.node()));
    view.transition()
      .attr('transform', 'translate(' + x + ',' + y + ').scale(' + scale + ')')
      .on('end', function () {
        view.call(__this.d3zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
        // console.log('panToCenter(): transform(after)=' + d3.zoomTransform(view.node()));
      });
  }

  /*
   * panNodeToCenter() - Center the specified node in the D3 client rectangle.
   */
  panNodeToCenter(d) {
    const scale = this.zoomScale;
    const x = (widthView / 2) - (d.x * scale);
    const y = (heightView / 2) - (d.y * scale);
    // console.log('panNodeToCenter(): transform: ' + x + ', ' + y + ', ' + scale);

    const __this = this;
    const view = d3.select('svg');
    // console.log('panNodeToCenter(): transform(before)=' + d3.zoomTransform(view.node()));
    view.transition()
      .attr('transform', 'translate(' + x + ',' + y + ').scale(' + scale + ')')
      .on('end', function () {
        view.call(__this.d3zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
        // console.log('panNodeToCenter(): transform(after)=' + d3.zoomTransform(view.node()));
      });
  }

  /*
   * removeNodeDecorators() - Remove all decorator indications on Node.
   */
  removeNodeDecorators() {
    // Undo Selection indication
    d3.selectAll('circle')
      .style('r', function (d) {
        let r = d.name === '' ? radiusNodeNameless : radiusNode;
        r = NetworkComponent.scaleRadius(r, d.av.sti);  // Node Weighting by STI.
        return r;
      }).style('stroke', '#fff');
  }

  /*
   * Click Handler: Pause Force Simulation
   */
  pauseSimulation() {
    if (simulation) {
      simulation.stop();
      isSimulationRunning = false;
      reheatFactor = 1;
    }
  }

  /*
   * Click Handler: Continue (paused) Force Simulation. Or if already running, add some heat.
   */
  playSimulation() {
    if (simulation) {
      if (!isSimulationRunning) {  // Not running
        simulation.restart();
        isSimulationRunning = true;
      } else {  // Already running
        reheatFactor = Math.min(reheatFactorMax, reheatFactor + 1);  // Pump up the volume, within limits.
        // console.log('reheatFactor=', reheatFactor);

        simulation
          .alpha(1)
          .alphaTarget(0.1 * reheatFactor)
          .force('charge', d3.forceManyBody().strength(simForceStrength * reheatFactor).distanceMax(400))
          .restart();
      }
    }
  }

  /*
   * Click Handler: Completely Restart Force Simulation anew
   */
  restartSimulation() {
    this.pauseSimulation();
    this.closeSelectedNodeProps();
    this.isDrilledNodes = false;
    filterMenuInitialized = false;

    // Reset to original data, just in case data has been pruned
    this.parsedJson = this.networkService.getParsedJson(this.atoms.result.atoms);

    // Draw graph
    this.draw_graph();
    isSimulationRunning = true;
  }

  /*
   * Click Handler: Zoom In
   */
  zoomIn(duration: number) {
    // Adjust scale variable within constraints
    if (this.zoomScale < 1) {
      this.zoomScale = 1;
    } else if (this.zoomScale < 4) {
      this.zoomScale += 1;
    }
    const view = d3.select('svg');
    view.transition().duration(duration).call(this.d3zoom.scaleTo, this.zoomScale);
    // console.log('zoomIn(): Changed scale from ' + currZoomScale + ' to ' + this.scale);
  }

  /*
   * Click Handler: Zoom Out
   */
  zoomOut(duration: number) {
    // Adjust scale variable within constraints
    if (this.zoomScale === 1) {
      this.zoomScale = 0.5;
    } else if (this.zoomScale > 1) {
      this.zoomScale -= 1;
    }
    const view = d3.select('svg');
    view.transition().duration(duration).call(this.d3zoom.scaleTo, this.zoomScale);
    // console.log('zoomOut(): Changed scale from ' + currZoomScale + ' to ' + this.scale);
  }

  /*
   * Click Handler: Restore default Zoom level
   */
  zoomReset(duration: number) {
    this.zoomScale = 1;  // variable to control the scale of zoom.
    const view = d3.select('svg');
    view.transition().duration(duration).call(this.d3zoom.scaleTo, this.zoomScale);
    this.panToCenter.call(this);
  }

  /*
   * Click Handler: Toggle detailed tooltips on and off
   */
  toggleTooltips() {
    // console.log('Detailed Tooltips checkbox clicked');
    this.isDetailedTooltips = !this.isDetailedTooltips;
  }

  /*
   * Click Handler: Hide the Popup Selected Node Information Table
   */
  closeSelectedNodeProps() {
    // Node selection
    this.isSelectedNode = false;
    this.selectedNodeData = null;

    // Node filtering
    filterMenuInitialized = false;
    this.clearFilters();

    // Undo Selection indication
    this.removeNodeDecorators();
  }

  /*
   * onLoadFiltering() - Load Filtering menu
   */
  onLoadFiltering(event) {
    // console.log('onloadFiltering() ' + event);
    if (filterMenuInitialized) { return; }
    // console.log('onloadFiltering() - building menu ' + event);

    // Build Filter menu
    $('#filtermenu').empty();
    $('#filtermenu').append('<div class=\'header\'><i class=\'tags icon\'></i><span>Filter on Selection</span></div>\
      <div class=\'divider\'></div>');
    this.nodeTypes.forEach(type => { $('#filtermenu').append('<div class=\'item\'><span>' + type + '</span></div>'); });
    $('#filtermenu').append('<div class=\'divider\'></div>');
    this.linkTypes.forEach(type => { $('#filtermenu').append('<div class=\'item\'><span>' + type + '</span></div>'); });
    $('#filtermenu').append('<div class=\'divider\'></div><div class=\'item\'><span>Unfiltered</span></div>');
    // .click(function(e) { NetworkComponent.this().filterByNode(e.target.innerText); });

    filterMenuInitialized = true;
  }

  /*
   * onClickFiltering() - Click Handler for Filtering menu
   */
  onClickFiltering(event) {
    // console.log('onClickFiltering() ' + event);
    if (event.target.innerText) {
      NetworkComponent.this().filterByNode(event.target.innerText);
    }
  }

  /*
   * Click Handler: Filter by Node
   *
   * Description: Show or Hide nodes with links as per whether they are currently filtered or not.
   */
  filterByNode(type) {
    // console.log('filterByNode(type): ' + type);

    // Clear Filter
    if (type === filterTypeAll) {
      // this.showAll();
      this.clearFilters();
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
        // return (neighboring(d, this.selectedNodeData) && (d.type === type || type === filterTypeAll)) ||
        d.id === this.selectedNodeData.id ? opacityNode : opacityHidden;
    });

    // Show/hide neighboring Node Labels
    this.nodeLabel.style('opacity', (d) => {
      return (neighboring(d, this.selectedNodeData) && d.type === type) ||
        // return (neighboring(d, this.selectedNodeData) && (d.type === type || type === filterTypeAll)) ||
        d.id === this.selectedNodeData.id ? opacityNodeLabel : opacityHidden;
    });

    // Show/hide Links
    this.link.style('opacity', (o) => {
      // return (o.source === this.selectedNodeData || o.target === this.selectedNodeData) ? 1 : 0;
      if ((o.source === this.selectedNodeData) && o.target.type === type) {
        // if ((o.source === this.selectedNodeData) && (o.target.type === type || type === filterTypeAll)) {
        return opacityLink;
      } else if ((o.target === this.selectedNodeData) && o.source.type === type) {
        // } else if ((o.target === this.selectedNodeData) && (o.source.type === type || type === filterTypeAll)) {
        return opacityLink;
      } else {
        return opacityHidden;
      }
    });

    // Show/hide Link Shadow text
    this.linkLabelShadow.style('opacity', (o) => {
      // return (o.source === this.selectedNodeData || o.target === this.selectedNodeData) ? 1 : 0;
      if ((o.source === this.selectedNodeData) && o.target.type === type) {
        // if ((o.source === this.selectedNodeData) && (o.target.type === type || type === filterTypeAll)) {
        return opacityLinkLabel;
      } else if ((o.target === this.selectedNodeData) && o.source.type === type) {
        // } else if ((o.target === this.selectedNodeData) && (o.source.type === type || type === filterTypeAll)) {
        return opacityLinkLabel;
      } else {
        return opacityHidden;
      }
    });

    // Show/hide Link text
    this.linkLabel.style('opacity', (o) => {
      // return (o.source === this.selectedNodeData || o.target === this.selectedNodeData) ? 1 : 0;
      if ((o.source === this.selectedNodeData) && o.target.type === type) {
        //  if ((o.source === this.selectedNodeData) && (o.target.type === type || type === filterTypeAll)) {
        return opacityLinkLabel;
      } else if ((o.target === this.selectedNodeData) && o.source.type === type) {
        // } else if ((o.target === this.selectedNodeData) && (o.source.type === type || type === filterTypeAll)) {
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

    if (isSimulationRunning) { simulation.stop(); }

    // Get Data
    this.parsedJson = this.networkService.getParsedJson(this.atoms.result.atoms);
    // console.log(this.parsedJson);

    this.closeSelectedNodeProps();
    this.isDrilledNodes = false;
    filterMenuInitialized = false;

    this.draw_graph();

    if (isSimulationRunning) { simulation.restart(); }
  }

 /*
  * getFilters() - Extract unique Node types and Link types from AtomSpace data for filtering menu
  */
  private getFilters(parsedJson) {
    const len = parsedJson.nodes.length;
    for (let i = 0; i < len; i++) {
      const obj = parsedJson.nodes[i];
      if (obj.name !== '') {
        // Node
        if (this.nodeTypes.indexOf(obj.type) === -1) {
          if (this.nodeTypes.length < maxNodeFilterSize) {
            this.nodeTypes.push(obj.type);
          } else {
            console.log('Dropping Node filter for \'' + obj.type + '\' because exceeded maxNodeFilterSize (' + maxNodeFilterSize + ')');
          }
          // console.log('Node type push(' + obj.type + ')');
        }
      } else {
        // Link
        if (this.linkTypes.indexOf(obj.type) === -1) {
          if (this.linkTypes.length < maxLinkFilterSize) {
            this.linkTypes.push(obj.type);
          } else {
            console.log('Dropping Link filter for \'' + obj.type + '\' because exceeded maxLinkFilterSize (' + maxLinkFilterSize + ')');
          }
          // console.log('Link type push(' + obj.type + ')');
        }
      }
    }
    this.nodeTypes.sort();
    this.linkTypes.sort();
  }

  /*
   * Clear filters (unhide hidden nodes and links)
   */
  private clearFilters() {
    // console.log('clearFilters()');

    // Unpin and reset charge of all nodes
    this.node.each(function (d) { d.fx = d.fy = null; });
    simulation.force('charge', d3.forceManyBody().strength(function (d) {
      d.charge = simForceStrength;
      return simForceStrength;
    }));
    if (isSimulationRunning) { simulation.restart(); }

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

    // If there's a selected node, restore it's selection indication
    const __this = this;
    if (this.isSelectedNode) {
      this.node.each(function (d) {
        if (d.id === __this.selectedNodeData.id) {
          d3.select(this).style('stroke-width', strokeWidthSelectedNode);
          d3.select(this).style('stroke', colorSelectedNode);
        }
      });
    }
  }

  /*
   * Main D3 Graph rendering function
   */
  private draw_graph() {
    // console.log('draw_graph()');

    // Clear everything out of the DOM
    this.svg = d3.select('svg');
    this.svg.selectAll('*').remove();
    this.isSuppressTooltip = true;
    filterMenuInitialized = false;

    // Get SVG element width and height
    widthView = document.getElementById('svgcanvas').clientWidth;
    heightView = document.getElementById('svgcanvas').clientHeight;
    if (widthView === 0 && heightView === 0) {  // Firefox
      const rect = document.getElementById('svgcanvas').getBoundingClientRect();
      widthView = rect.width;
      heightView = rect.height;
    }

    // Node color scheme
    const colorScheme = d3.scaleOrdinal(d3.schemeCategory20);

    // Enable Fisheye Distortion
    if (isFisheye) {
      fisheye = d3.fisheye.circular()
        .radius(200)
        .distortion(2);
    }

    // Set up Force Simulation
    const defaultAlphaDecay = 1 - Math.pow(0.001, 1 / 300);  // ~0.0228.
    const alphaDecay = this.atoms.result.atoms.length < 50 ? 0.008 : defaultAlphaDecay;
    if (simulation) { simulation.stop(); }  // Make sure simulation is stopped, else get nodes "explosion" effect.
    simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function (d) { return d.id; }).distance(100))  // .strength(1))
      .force('charge', d3.forceManyBody().strength(simForceStrength).distanceMax(250))
      // .force('charge', d3.forceManyBody().theta(0.8))
      .force('center', d3.forceCenter(widthView / 2, heightView / 2))
      .force('collide', d3.forceCollide().radius(function (d) {
        let r = (d.name === '') ? radiusNodeNameless : radiusNode;
        r = NetworkComponent.scaleRadius(r, d.av.sti);  // Node Weighting by STI.
        return r;
      }))
      .alphaDecay(alphaDecay);

    // Set up Rect within SVG window
    this.svg.append('rect')
      .attr('width', widthView)
      .attr('height', heightView)
      .style('fill', 'none')
      .style('pointer-events', 'all');

    // Add group under svg element
    const g = this.svg.append('g').attr('class', 'svg-grp');

    // Set up zooming for this element
    function zoomHandler() {
      // console.log('zoomHandler() scale before=' + this.zoomScale);
      this.zoomScale = d3.event.transform.k;  // Keep zoomScale in sync.
      g.attr('transform', d3.event.transform);
      // console.log('zoomHandler() scale after=' + this.zoomScale);
    }
    // function zoomWheelDelta() {
    //   const delta = -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 500;
    //   // console.log('zoomWheelDelta(): ' + delta);
    //   this.zoomScale = this.zoomScale + delta;  // Keep zoomScale in sync.
    //   return delta;
    // }

    // Set up main context menu on svg client area
    this.svg.on('contextmenu', d3.contextMenu(this.menus.mainMenu));

    // Build up the graph...

    // Links
    this.link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(this.parsedJson.links)
      .enter()
      .append('line')
      .attr('class', 'lines')
      .attr('stroke-width', strokeWidthLink)
      // Handle tooltips
      .on('mouseover', (d) => linkMouseOver.call(this, d))
      .on('mouseout', (d) => linkMouseOut.call(this, d));

    // Link edgepath
    this.textPath = g.append('g')
      .attr('class', 'edgepath-grp')
      .selectAll('.edgepath')
      .data(this.parsedJson.links)
      .enter()
      .append('path')
      .attr('class', 'edgepath')
      .attr('id', function (d, i) {
        return 'edgepath' + i;
      })
      .style('user-select', 'none');

    // Link Label Shadows
    this.linkLabelShadow = g.append('g')
      .attr('class', 'edgelabelshadow-grp')
      .selectAll('.edgelabel')
      .data(this.parsedJson.links)
      .enter()
      .append('text')
      .style('user-select', 'none')
      .style('font', fontLink)
      .style('line-height', '150%')
      .style('stroke-width', strokeWidthLabelShadow)
      .attr('class', 'edgelabelshadow')
      .attr('dy', dyLinkLabel)  // Adjust position of text vs link line.
      .attr('id', function (d, i) {
        return 'edgelabelshadow' + i;
      });

    // Link Labels
    this.linkLabel = g.append('g')
      .attr('class', 'edgelabel-grp')
      .selectAll('.edgelabel')
      .data(this.parsedJson.links)
      .enter()
      .append('text')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .style('font', fontLink)
      .style('line-height', '150%')
      // .style("fill", "white")  // Text color
      .attr('class', 'edgelabel')
      .attr('dy', dyLinkLabel)  // Adjust position of text vs link line.
      .attr('id', function (d, i) {
        return 'edgelabel' + i;
      });

    // Position label shadow midway along the link
    this.linkLabelShadow.append('textPath')
      .attr('xlink:xlink:href', function (d, i) {
        return '#edgepath' + i;
      })
      .style('text-anchor', 'middle')
      .style('user-select', 'none')
      .attr('startOffset', '50%')
      .text(function (d) {
        return d.name;
      })
      // Handle tooltips (also over link text to make it easier to get tooltip to open)
      .on('mouseover', (d) => linkMouseOver.call(this, d))
      .on('mouseout', (d) => linkMouseOut.call(this, d));

    // Position label midway along the link
    this.linkLabel.append('textPath')
      .attr('xlink:xlink:href', function (d, i) {
        return '#edgepath' + i;
      })
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
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
      .on('contextmenu', d3.contextMenu(this.menus.nodeMenu))
      // .attr('r', function (d) {
      //   let r = (d.name === '') ? radiusNodeNameless : radiusNode;
      //   r = this.scaleRadius(r, d.av.sti);  // Node Weighting by STI.
      //   // console.log('Appending circle \'' + d.name + '\' radius=' + r);
      //   return r;
      // })
      .attr('r', (d) => {
        let r = (d.name === '') ? radiusNodeNameless : radiusNode;
        r = NetworkComponent.scaleRadius(r, d.av.sti);  // Node Weighting by STI.
        // console.log('Appending circle \'' + d.name + '\' radius=' + r);
        return r;
      })
      .attr('fill', function (d) {
        // If node already has color, use it. Else get from color scheme
        d.color = d.color ? d.color : colorScheme(d.group);
        return d.color;
      })
      // Handle tooltips
      .on('mouseover', (d) => nodeMouseOver.call(this, d))
      .on('mouseout', (d) => nodeMouseOut.call(this, d))
      // Enable node dragging
      .call(d3.drag().subject((d) => d)
        .on('start', (d) => nodeDragStarted.call(this, d))
        .on('drag', (d) => nodeDragging.call(this, d))
        .on('end', (d) => nodeDragEnded.call(this, d)));

    // Node Text
    this.nodeLabel = g.append('g')
      .attr('class', 'nodelabel-grp')
      .selectAll('.mytext')
      .data(this.parsedJson.nodes)
      .enter()
      .append('text')

      // Size font per node radius, including to truncate text with ellipsis if too long
      .text(function (d) {
        const len = d.name.length;
        if (len === 0) {
          return '';
        } else if (len > maxNodeLabelLength) {
          return d.name.substr(0, maxNodeLabelLength - 3) + '...';
        } else { return d.name; }
      })
      .style('font-family', fontfamilyNode)
      .style('font-weight', fontweightNode)
      .style('font-size', '1px')
      .each(getSizeNodeLabel)
      .style('font-size', function () {
        return Math.min(d3.select(this).attr('data-scale'), maxfontsizeNode) + 'px';
      })
      // .style('font-size', function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + 'px'; })
      .attr('class', 'node-labels')
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .style('fill', '#fff');  // Text color inside nodes.

    // Setup Node and D3 client area handlers
    this.node.on('click', (d) => nodeSingleClick.call(this, d));
    this.node.on('dblclick', (d) => nodeDoubleClick.call(this, d));
    d3.select(window).on('resize', () => graphResize.call(this));
    d3.select(window).on('keydown', () => graphKeydown.call(this));
    d3.select(window).on('mousemove', () => graphMousemove.call(this));

    // Set up zooming after all elements are added to svg group, else those elements
    // won't stay in sync during certain operations like programmatic panning transforms
    this.svg.call(this.d3zoom
      .scaleExtent([1 / 2, 4])
      .duration(defaultTransitionDuration)
      // .wheelDelta( () => zoomWheelDelta.call(this))
      .on('zoom', () => zoomHandler.call(this)));

    // Reapply scale if it has been changed from default
    if (this.zoomScale !== 1) {
      const view = d3.select('svg');
      view.transition().duration(defaultTransitionDuration).call(this.d3zoom.scaleTo, this.zoomScale);
    }

    /*
     * Force Simulation
     */
    simulation
      .nodes(this.parsedJson.nodes)
      .on('tick', () => graphTick.call(this));

    // Simulation Links
    simulation.force('link')
      .links(this.parsedJson.links);

    /*
     * Node Drag implementation
     */
    function nodeDragStarted(d) {  // Note that this gets invoked by drags or clicks.
      // console.log('nodeDragStarted(): d3.event.active=\'' + d3.event.active + '\'' );

      // Set alphaTarget during layout update so that node positions will update smoothly
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }

      d.fx = d.x;
      d.fy = d.y;

      d3.event.sourceEvent.stopPropagation();
    }
    function nodeDragging(d) {  // Note that this gets invoked by drags or clicks.
      // console.log('nodeDragging(): d3.event.active=\'' + d3.event.active + '\'' );
      // console.log('  d3.event.sourceEvent.movementX=\'' + d3.event.sourceEvent.movementX + '\'' );
      // console.log('  d3.event.sourceEvent.movementY=\'' + d3.event.sourceEvent.movementY + '\'' );
      // console.log('  w=' + widthView + ', h=' + heightView);

      if (isNodesConstrainedToClientArea) {
        d.fx = Math.max(nodePositionMargin, Math.min(widthView - nodePositionMargin, d3.event.x));
        d.fy = Math.max(nodePositionMargin, Math.min(heightView - nodePositionMargin, d3.event.y));
      } else {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
    }
    function nodeDragEnded(d) {  // Note that this gets invoked by drags or clicks.
      // console.log('nodeDragEnded(): d3.event.active=\'' + d3.event.active + '\'' );

      // Let simulation cool back down
      if (!d3.event.active) { simulation.alphaTarget(0); }

      // If simulation already paused, keep it paused
      if (isSimulationRunning === false) { this.pauseSimulation(); }

      // Leave node pinned if dragged (or clicked or double-clicked) w/CTRL key
      if (!d3.event.sourceEvent.ctrlKey) {
        d.fx = d.fy = null;  // Only unpin if not w/CTRL key.
      }

      // Apply high charge to node if dragged (or clicked or double-clicked) w/Shift key
      if (d3.event.sourceEvent.shiftKey) {
        simulation.force('charge', d3.forceManyBody().strength(function (o) {
          return d.id === o.id ? simForceStrengthHighNodeCharge : simForceStrength;
        }));
        d.charge = simForceStrengthHighNodeCharge;
        if (isSimulationRunning) { simulation.restart(); }
      }
    }

    /*
     * ## draw_graph() Functions ##
     */

    /*
     * graphTick.() - Adjust positions of all the Force Simulation elements
     */
    function graphTick() {
      // console.log('graphTick(): Simulation Force alpha: ' +
      //   simulation.alpha());  // Simulation stops automatically when alpha drops below 0.001.

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
          if (isNodesConstrainedToClientArea) {
            return d.x = Math.max(nodePositionMargin, Math.min(widthView - nodePositionMargin, d.x));
          } else {
            return d.x;
          }
        })
        .attr('cy', function (d) {
          if (isNodesConstrainedToClientArea) {
            return d.y = Math.max(nodePositionMargin, Math.min(heightView - nodePositionMargin, d.y));
          } else {
            return d.y;
          }
        });

      // Update Node Label position
      this.nodeLabel
        .attr('x', function (d) { return d.x; })
        .attr('y', function (d) { return d.y; })
        .attr('dy', '0.35em');
    }
    /* End Simulation On-Tick function */

    /*
     * Node Mouse In/Out implementation
     */
    function nodeMouseOver(d) {
      // Hide tooltip when dragging
      if (d3.event.buttons !== 0) {
        // console.log('mouseover node, dragging');
        this.divTooltip.transition().duration(0).style('opacity', 0);
        return;
      }

      // Check for active tooltip transition
      if (this.isSuppressTooltip) { return; }

      // Else show tooltip
      this.divTooltip.html(buildNodeTooltip(d, this.isDetailedTooltips));
      const evt = d3.event, wTT = this.divTooltip.node().firstChild.clientWidth, hTT = this.divTooltip.node().firstChild.clientHeight;
      const xTT = evt.pageX < (window.innerWidth - wTT) - this.marginTT ? evt.pageX + 12 : (evt.pageX - 12) - wTT;
      const yTT = evt.pageY < window.innerHeight - hTT ? evt.pageY - 12 : (evt.pageY + 12) - hTT;
      this.divTooltip.style('left', xTT + 'px').style('top', yTT + 'px');  // To avoid easing from previous position which is distracting.
      this.divTooltip.transition()
        // .delay(100)
        // .duration(100)
        .style('opacity', 0.90)
        .style('left', xTT + 'px')
        .style('top', yTT + 'px');

      drawNodeDecorators.call(this, d, true);
    }
    function nodeMouseOut(d) {
      // Hide tooltip when mouse out from Node
      this.divTooltip.transition().duration(0).style('opacity', 0);

      drawNodeDecorators.call(this, d, false);
    }

    /*
     * Link Mouse In/Out implementation
     */
    function linkMouseOver(d) {
      // Hide tooltip when dragging
      if (d3.event.buttons !== 0) {
        // console.log('mouseover link, dragging');
        this.divTooltip.transition().duration(0).style('opacity', 0);
        return;
      }

      // Check for active tooltip transition
      if (this.isSuppressTooltip) { return; }

      // Else show tooltip
      this.divTooltip.html(buildLinkTooltip(d, this.isDetailedTooltips));
      const evt = d3.event, wTT = this.divTooltip.node().firstChild.clientWidth, hTT = this.divTooltip.node().firstChild.clientHeight;
      const xTT = evt.pageX < (window.innerWidth - wTT) - this.marginTT ? evt.pageX + 12 : (evt.pageX - 12) - wTT;
      const yTT = evt.pageY < window.innerHeight - hTT ? evt.pageY - 12 : (evt.pageY + 12) - hTT;
      this.divTooltip.style('left', xTT + 'px').style('top', yTT + 'px');  // To avoid easing from previous position which is distracting.
      this.divTooltip.transition()
        // .delay(100)
        // .duration(100)
        .style('opacity', 0.90)
        .style('left', xTT + 'px')
        .style('top', yTT + 'px');

      drawLinkDecorators.call(this, d, true);
    }
    function linkMouseOut(d) {
      // Hide tooltip when mouse out from Node
      this.divTooltip.transition().duration(0).style('opacity', 0);

      drawLinkDecorators.call(this, d, false);
    }

    /*
     * Node On-Single-Click function
     */
    function nodeSingleClick(d) {
      // console.log('Click: ', d);

      // Hide tooltip in case visible
      this.divTooltip.transition().duration(0).style('opacity', 0);

      // If this node already selected, then unselect
      if (this.isSelectedNode === true && this.selectedNodeData === d) {
        this.removeNodeDecorators();

        this.isSelectedNode = false;
        this.selectedNodeData = null;
        filterMenuInitialized = false;

        // If simulation already paused, keep it paused
        if (isSimulationRunning === false) { this.pauseSimulation(); }

        return;
      }

      // Data values
      this.name = d.name;
      this.handle = d.id;
      this.type = d.type;
      this.av = d.av;
      this.tv = d.tv;

      // Display node info popup
      this.selectedNodeData = d;
      this.isSelectedNode = true;

      drawNodeDecorators.call(this, d, false);

      // If simulation already paused, keep it paused
      if (isSimulationRunning === false) { this.pauseSimulation(); }
    }
    /* End Node On-Single-Click function */

    /*
     * Node On-Double-Click function
     */
    function nodeDoubleClick(d) {
      // console.log('Doubleclick: ', d);

      this.isDrilledNodes = true;
      this.selectedNodeData = d;
      this.isSelectedNode = true;

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
      if (isXtraLevelNeighbors) {
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
        if (isXtraLevelNeighbors) {
          return neighboring(d, o) || (d.id === o.id) || (neigh.indexOf(o.id) !== -1) ? opacityNode : opacityHidden;
        } else {
          return neighboring(d, o) || (d.id === o.id) ? opacityNode : opacityHidden;
        }
      });
      // console.log(neigh);

      // Node Label
      this.nodeLabel.style('opacity', function (o) {
        if (isXtraLevelNeighbors) {
          return neighboring(d, o) || (d.id === o.id) || (neigh.indexOf(o.id) !== -1) ? opacityNodeLabel : opacityHidden;
        } else {
          return neighboring(d, o) || (d.id === o.id) ? opacityNodeLabel : opacityHidden;
        }
      });

      // Link
      this.link.style('opacity', function (o) {
        if (isXtraLevelNeighbors) {
          return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) !== -1) &&
            (neighlink.indexOf(o.source.id) !== -1)) || ((neigh.indexOf(o.source.id) !== -1) &&
              (neighlink.indexOf(o.target.id) !== -1)) ? opacityLink : opacityHidden;
        } else {
          return o.source === d || o.target === d ? opacityLink : opacityHidden;
        }
      });

      // Link Text Shadow
      this.linkLabelShadow.style('opacity', function (o) {
        if (isXtraLevelNeighbors) {
          return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) !== -1) &&
            (neighlink.indexOf(o.source.id) !== -1)) || ((neigh.indexOf(o.source.id) !== -1) &&
              (neighlink.indexOf(o.target.id) !== -1)) ? 1 : opacityHidden;
        } else {
          return o.source === d || o.target === d ? 1 : opacityHidden;
        }
      });

      // Link Text
      this.linkLabel.style('opacity', function (o) {
        if (isXtraLevelNeighbors) {
          return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) !== -1) &&
            (neighlink.indexOf(o.source.id) !== -1)) || ((neigh.indexOf(o.source.id) !== -1) &&
              (neighlink.indexOf(o.target.id) !== -1)) ? opacityLinkLabel : opacityHidden;
        } else {
          return o.source === d || o.target === d ? opacityLinkLabel : opacityHidden;
        }
      });

      // If enabled, remove hidden nodes from DOM. Provides better user-experience with larger data sets
      if (isPruneFilteredNodes) {
        const nodesFiltered = [], linksFiltered = [];
        const isRunning = isSimulationRunning;

        this.node.each(function (o) {
          if (d3.select(this).style('opacity') === opacityHidden.toString()) {
            // console.log('Node ' + o.name + ' is hidden');
          } else {
            nodesFiltered.push(o);
          }

        });
        this.link.each(function (o) {
          if (d3.select(this).style('opacity') === opacityHidden.toString()) {
            // console.log('Link ' + o.name + ' is hidden');
          } else {
            linksFiltered.push(o);
          }
        });
        // console.log('nodesFiltered: ' + nodesFiltered);
        // console.log('linksFiltered: ' + linksFiltered);

        // this.parsedJson.nodes = this.parsedJson.nodes.filter(function(d) { return !.d.hidden;});
        this.parsedJson.nodes = nodesFiltered;
        this.parsedJson.links = linksFiltered;

        this.draw_graph();
        drawNodeDecorators.call(this, d, false);

        // If double-clicked w/Shift key, apply high charge force to this node
        if (d3.event.shiftKey) {
          simulation.force('charge', d3.forceManyBody().strength(function (o) {
            return d.id === o.id ? simForceStrengthHighNodeCharge : simForceStrength;
          }));
          d.charge = simForceStrengthHighNodeCharge;
          if (isRunning) { simulation.restart(); }
        }
      } else {
        // TODO: Try removing charge from all hidden nodes?
      }  /* End isPruneFilteredNodes block */

      // this.panNodeToCenter.call(this, d);
      // d3.event.stopPropagation();  // Else double-click interferes with panning. TODO: But causes jumpiness.
    }
    /* End Node On-Double-Click function */

    /*
     * graphResize() - On-Resize function
     */
    function graphResize() {
      // console.log('Resize (before): w=' + widthView + ', h=' + heightView);

      if (document.getElementById('svgcanvas') === null) { return; }

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
      if (isSimulationRunning === true) {
        simulation.force('center', d3.forceCenter(widthView / 2, heightView / 2));
      } else {
        this.playSimulation();

        simulation.force('center', d3.forceCenter(widthView / 2, heightView / 2));

        // Workaround: Commented out because if don't leave simulation running, recentering simulation not working during resize
        // this.pauseSimulation();
      }
    }

    /*
     * graphKeydown() - On-Keydown function
     */
    function graphKeydown() {
      const e = d3.event;
      switch (e.keyCode) {
        // Cancel menu: ESC key
        case 27:
          this.divTooltip.transition().duration(0).style('opacity', 0);  // Hide tooltip.
          d3.select('.d3-context-menu').style('display', 'none');  // Close menu.
          break;
        // Pause/Play/Restart: Pause (Break) key
        case 19:
          if (!simulation) { break; }
          if (e.shiftKey) {
            // With Shift key to restart
            this.restartSimulation();
          } else {
            // Else Play or Pause
            if (isSimulationRunning === true) {
              this.pauseSimulation();
            } else {
              this.playSimulation();
            }
          }
          break;
        // Zoom in: + key
        case 107:
          this.zoomIn(defaultTransitionDuration);
          break;
        // Zoom out: - key
        case 109:
          this.zoomOut(defaultTransitionDuration);
          break;
        // Reset zoom: * key
        case 106:
          this.zoomReset(defaultTransitionDuration);
          break;
        // Stealth version number: Ctrl-Alt-v key
        case 86:
          if (e.altKey && e.ctrlKey) {
            alert('Version ' + appVersion);
          }
          break;
      }
    }

    /*
     * graphMousemove() - On-Mouse-Move function
     */
    function graphMousemove() {
      // Tooltips are initially suppressed to avoid possible immediate tooltip popup if node or link slides under cursor after a data fetch
      this.isSuppressTooltip = false;

      if (isSimulationRunning || fisheye === null || !isFisheye) { return; }

      // Update focal point of distortion
      // console.log('mousemove: ' + d3.mouse(this));
      fisheye.focus(d3.mouse(this));

      // Update Node position
      this.node.each(function (d) { d.fisheye = fisheye(d); })
        .attr('cx', function (d) { return d.fisheye.x; })
        .attr('cy', function (d) { return d.fisheye.y; })
        // .attr("r", function(d) { return d.fisheye.z * 4.5; }); // TODO: Use z to scale up the radius
        ;

      // Update Node Label position
      this.nodeLabel
        .attr('x', function (d) { return d.fisheye.x; })
        .attr('y', function (d) { return d.fisheye.y; })
        .attr('dy', function (d) { return '0.35em'; });

      // Update Link positions
      this.link
        .attr('x1', function (d) { return d.source.fisheye.x; })
        .attr('y1', function (d) { return d.source.fisheye.y; })
        .attr('x2', function (d) { return d.target.fisheye.x; })
        .attr('y2', function (d) { return d.target.fisheye.y; });

      // Update Link Label positions
      // TODO: Transformed (rotated) text goes in wrong position
      this.textPath.attr('d', function (d) {
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
      this.linkLabelShadow.attr('transform', function (d) {
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

      // Update Link Label rotation
      this.linkLabel.attr('transform', function (d) {
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
    }

    /*
     * drawNodeDecorators() - Draw applicable decorator indications on Node.
     */
    function drawNodeDecorators(d, isOver) {
      const __this = this;
      d3.selectAll('circle')
        .style('stroke-width', function (o) {
          if (isOver) {
            if (o.id === d.id) {
              return strokeWidthHoverNode;  // Mouse-over Node.
            } else if (__this.isSelectedNode && (o.id === __this.selectedNodeData.id)) {
              return strokeWidthSelectedNode;  // Selected Node.
            } else {
              return strokeWidthNode;  // Usual style.
            }
          } else {
            if (__this.isSelectedNode && (o.id === __this.selectedNodeData.id)) {
              return strokeWidthSelectedNode;  // Selected Node.
            } else {
              return strokeWidthNode;  // Usual style.
            }
          }})
        .style('stroke', function (o) {
          if (isOver) {
            if (o.id === d.id) {
              return colorHoverNode;  // Mouse-over Node.
            } else if (__this.isSelectedNode && (o.id === __this.selectedNodeData.id)) {
              return colorSelectedNode;  // Selected Node.
            } else {
              return '#fff';  // Usual style.
            }
          } else {
            if (__this.isSelectedNode && (o.id === __this.selectedNodeData.id)) {
              return colorSelectedNode;  // Selected Node.
            } else {
              return '#fff';  // Usual style.
            }
          }
        });
    }

    /*
     * drawLinkDecorators() - Draw applicable decorator indications on Link.
     */
    function drawLinkDecorators(d, isOver) {
      d3.selectAll('.lines')
        .style('stroke-width', function (o: any) {
          if (isOver) {
            return o.id === d.id ? strokeWidthHoverLink : strokeWidthLink;
          } else {
            return strokeWidthLink;
          }})
        .style('stroke', function (o) {
          if (isOver) {
            if (o.id === d.id) {
              return colorHoverLink;  // Mouse-over Link.
            } else {
              return '#000';  // Usual style.
            }
          } else {
            return '#000';  // Usual style.
          }
        });
    }

    /*
    * buildNodeTooltip - Construct html for tooltips
    */
    function buildNodeTooltip(d, verbose) {
      let headText = '';
      if (verbose) {
        headText = (d.name === '') ? d.type : d.type + '<hr>' + d.name;
      } else {
        headText = (d.name === '') ? d.type + ' (' + d.id + ')' : d.type + ' (' + d.id + ')' + '<hr>' + d.name;
      }
      return getTooltipHTML(d, headText, verbose);
    }

    /*
    * buildLinkTooltip - Construct html for tooltips
    */
    function buildLinkTooltip(d, verbose) {
      const headText = verbose ? d.name : d.name + ' (' + d.id + ')';
      return getTooltipHTML(d, headText, verbose);
    }

    /*
    * getTooltipHTML - Get the html for tooltips
    */
    function getTooltipHTML(d, headText, verbose) {
      if (verbose) {
        return '<div class=\'html-detailed-tooltip\'> <table class=\'ui celled striped table\'> <thead> <tr> <th colspan=\'2\'>' +
          headText + '</th> </tr> </thead> <tbody> <tr> <td class=\'collapsing\'> <span>Handle</span> </td> <td>' + d.id +
          '</td> </tr> <tr> <td> <span>LTI</span> </td> <td>' + d.av.lti + '</td> </tr> <tr> <td> <span>STI</span> </td> <td>' + d.av.sti +
          '</td> </tr> <tr> <td> <span>VLTI</span> </td> <td>' + d.av.vlti + '</td> </tr> <tr> <td> <span>Confidence</span> </td> <td>' +
          d.tv.details.confidence + '</td> </tr> <tr> <td> <span>Strength</span> </td> <td>' + d.tv.details.strength +
          '</td> </tr> </tbody> </table> </div>';
      } else {
        return '<div class=\'html-tooltip\'> <table class=\'ui celled striped table\'> <tbody> <tr> <td nowrap>' + headText +
          '</td> </tr> </tbody> </table> </div>';
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
      radius = NetworkComponent.scaleRadius(radius, d.av.sti);  // Node Weighting by STI.

      const offset = Number(d3text.attr('dy'));
      const textWidth = this.getComputedTextLength();
      const availWidth = radius * 2 * nodeLabelPadding;
      const dataScale = availWidth / textWidth;
      // console.log('getSizeNodeLabel() ' + d.name + ': radius=' + radius + ', data-scale=' + dataScale);
      d3text.attr('data-scale', dataScale);  // Sets the data attribute, which is read in the next step.
    }
  }  /* End draw_graph() */

  /*
   * initContextMenus()
   */
  private initContextMenus() {
    const __this = this;

    // Main context menu
    const mainMenu = [{
      title: function (d) {
        if (!__this.isSelectedNode) {
          return 'Recenter Panning';
        } else {
          let menutext = 'Pan Selected Node to center';
          menutext += __this.selectedNodeData.name ? ': \'' + __this.selectedNodeData.name + '\'' : '';
          return menutext;
        }
      },
      action: function(elm, d, i) {
        if (!__this.isSelectedNode) {
          __this.panToCenter.call(__this);
        } else {
          // However, if a Node is selected, center that Node
          __this.panNodeToCenter.call(__this, __this.selectedNodeData);
        }
      }
    },
    {
      title: 'Unpin all Nodes',
      action: function (elm, d, i) {
        __this.node.each(function (o) {
          o.fx = null;
          o.fy = null;
        });
      }
    }, {
      title: 'Reset Charge of all Nodes',
      action: function (elm, d, i) {
        simulation.force('charge', d3.forceManyBody().strength(function (o) {
          o.charge = simForceStrength;
          return simForceStrength;
        }));
        if (isSimulationRunning) {
          simulation.restart();
        }
      }
    }];
    // Node context menu
    const nodeMenu = [
      {
        // Pin/Unpin Command
        title: function (d) {
          __this.divTooltip.style('opacity', 0); // Hide tooltip.
          if (d.fx == null) {
            return 'Pin (Ctrl-Click or Ctrl-Drag)';
          } else {
            return 'Unpin (Click or Drag)';
          }
        },
        action: function (elm, d, i) {
          if (d.fx == null) {
            d.fx = d.x;
            d.fy = d.y;
            // If Pinned w/Shift key, also apply high charge force to this node
            if (d3.event.shiftKey) {
              simulation.force('charge', d3.forceManyBody().strength(function (o) {
                return d.id === o.id ? simForceStrengthHighNodeCharge : simForceStrength;
              }));
              d.charge = simForceStrengthHighNodeCharge;
              // if (isSimulationRunning) { simulation.restart(); }
            }
            simulation.alphaTarget(0.1).restart();
          } else {
            d.fx = d.fy = null;
          }
        }
      }, {
        // Apply High Charge / Restore Normal Charge Command
        title: function (d) {
          __this.divTooltip.style('opacity', 0); // Hide tooltip.
          if (d.charge && d.charge === simForceStrengthHighNodeCharge) {
            return 'Restore Normal Charge (Click or Drag)';
          } else {
            return 'Apply High Charge (Shift-Click or Shift-Drag)';
          }
        },
        action: function (elm, d, i) {
          if (d.charge && d.charge === simForceStrengthHighNodeCharge) {
            simulation.force('charge', d3.forceManyBody().strength(function (o) {
              return simForceStrength;
            }));
            d.charge = simForceStrength;
            if (isSimulationRunning) {
              simulation.restart();
            }
          } else {
            simulation.force('charge', d3.forceManyBody().strength(function (o) {
              return d.id === o.id ? simForceStrengthHighNodeCharge : simForceStrength;
            }));
            d.charge = simForceStrengthHighNodeCharge;
            // If CTRL key, also pin this node
            if (d3.event.ctrlKey) {
              d.fx = d.x;
              d.fy = d.y;
            }
            // if (isSimulationRunning) { simulation.restart(); }
            simulation.alphaTarget(0.1).restart();
          }
        }
      },
      {
        title: 'Pan to center',
        action: function(elm, d, i) {
          __this.panNodeToCenter.call(__this, d);
        },
      }
    ];
    return { mainMenu, nodeMenu };
  } /* End initContextMenus() */
}
/* End Class NetworkComponent */
