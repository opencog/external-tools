import {
    Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy
} from '@angular/core';
import {NetworkService} from "./network.service";
import {Graph} from "./graph";
import {AtomsService} from "../../shared/services/atoms.service";

declare var d3:any;

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements AfterViewInit, OnInit {

  private atoms: any;
  private initialLoad = true;
  private parsedJson:Graph = <Graph>{};
  public message:any; //variable to store node info on node click
  selected = false; //variable to show/hide the information bar
  zoom = d3.zoom(); //zoom behaviour
  filtered = false; //variable to show/hide the show whole data button on dblclick of node.
  scale = 1; //variable to control the scale of zoom.
  selectedNodeData:any;
  svg:any;
  width:any;
  height:any;
  node:any;
  link:any;
  label:any;
  textPath:any;
  linkLabel:any;
  types:string[];
  type:any;
  av:any;
  tv:any;
  handle:any;



    constructor(private networkService: NetworkService, private atomsService: AtomsService) {
    this.atomsService.editItem
        .subscribe(res => {
            this.atoms = res;
        });
}

  ngAfterViewInit() {
    this.draw_graph();
    this.initialLoad = false;
  }
    ngOnInit(): void {

    }


  //to be finished
  filterByNode(type){
    if (type === 'all') {
      this.show();
      return;
    }
    let linkedByIndex = {};
    this.link.each(function(d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
        linkedByIndex[d.target.index + "," + d.source.index] = 1;
    });

    function neighboring(a, b) {
        return linkedByIndex[a.index + "," + b.index];
    }

    this.node.style('opacity',(d) => {
      return (neighboring(d,this.selectedNodeData) && d.type == type) || d.id === this.selectedNodeData.id?1:0;
    });

    this.label.style('opacity',(d) => {
      return (neighboring(d,this.selectedNodeData) && d.type == type) || d.id === this.selectedNodeData.id?1:0;
    });

    this.link.style("opacity", (o) => {
          // return (o.source === this.selectedNodeData || o.target === this.selectedNodeData) ? 1 : 0;
          if ((o.source === this.selectedNodeData) && o.target.type === type) {
            return 1;
          }else if ((o.target === this.selectedNodeData) && o.source.type === type) {
            return 1;
          }else{
            return 0;
          }
    });

    this.linkLabel.style("opacity", (o) => {
          // return (o.source === this.selectedNodeData || o.target === this.selectedNodeData) ? 1 : 0;
          if ((o.source === this.selectedNodeData) && o.target.type === type) {
            return 1;
          }else if ((o.target === this.selectedNodeData) && o.source.type === type) {
            return 1;
          }else{
            return 0;
          }
    });

  }

  //zoom in fuction
  zoomIn() {
    let view = d3.select("rect");
    if (this.scale < 4) {//to limit the scale variable to scale extent limit.
      this.scale += 1;
    }
    view.transition().duration(1000).call(this.zoom.scaleTo, this.scale);
  }

  //zoom out fuction
  zoomOut() {
    let view = d3.select("rect");
    if (this.scale > 0) {//to limit the scale variable to scale extent limit.
      this.scale -= 1;
    }
    view.transition().duration(1000).call(this.zoom.scaleTo, this.scale);
  }

  //function to show the whole data(original visual)
  show() {
    //set properties to their original form
    this.link.style("stroke-width", 1).style("opacity", 1);
    this.node.style("r", function (d) {
        if(d.name == ''){
            return 6;
        }else {
            return 12;
        }
    }).style("opacity", 1).style("stroke", "#fff");
    d3.selectAll("text").style("opacity", 1);
    d3.selectAll(".edgelabel").style("font", "normal 5px Arial");
    this.filtered = false;
  }
  
  //function to hide the information bar 
  close(){
    this.selected = false;
    d3.selectAll("circle").style("r", function (d) {
        if(d.name == ''){
            return 6;
        }else {
            return 12;
        }
    }).style("stroke", "#fff");
    
  }

  private draw_graph(){

    this.svg = d3.select("svg");
    this.svg.selectAll("*").remove();
    let width = +this.svg.attr("width");
    let height = +this.svg.attr("height");

    let color = d3.scaleOrdinal(d3.schemeCategory20);

    let simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100))
        .force("charge", d3.forceManyBody().strength(-80))
        .force("center", d3.forceCenter(width / 2, height / 2));

    this.svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .call(this.zoom
            .scaleExtent([1 / 2, 4])
            .on("zoom", zoomed))
            .on("wheel.zoom", null);

    let g = this.svg.append("g");

    function zoomed() {
      g.attr("transform", d3.event.transform);
    }
    


       this.parsedJson = this.networkService.getParsedJson(this.atoms.result.atoms);
       // console.log(this.parsedJson);
      this.link = g.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(this.parsedJson.links)
          .enter().append("line")
          .attr("stroke-width", 1);

      this.node = g.append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(this.parsedJson.nodes)
          .enter().append("circle")
          .attr("r", function (d) {
              if(d.name == ''){
                  return 6;
              }else {
                  return 12;
              }
          })
          .attr("fill", function(d) {return color(d.group); })
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      this.label = g.append("g").selectAll(".mytext")
          .data(this.parsedJson.nodes)
          .enter()
          .append("text")
          .text(function(d){
              if(d.name !== ''){
                  return d.name.substr(0,2);
              }else{
                  return '';
              }
          })
          .attr('class', 'node-labels')
          .style("text-anchor", "middle")
          .style("pointer-events", "none")
          .style("fill", "#fff")
          .style("font-family", "Arial")
          .style("font-size", 12)
          .style("font-style", "Bold");
      this.textPath = g.append("g").selectAll(".edgepath")
            .data(this.parsedJson.links)
            .enter()
            .append('path')
            .attr('class','edgepath',)
            .attr('id',function (d, i) {return 'edgepath' + i})
            .style("pointer-events", "none");
      this.linkLabel = g.append("g").selectAll(".edgelabel")
            .data(this.parsedJson.links)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .style("font", "normal 5px Arial")
            .attr('class','edgelabel')
            .attr('id', function (d, i) {return 'edgelabel' + i});
      this.linkLabel.append('textPath')
            .attr('xlink:xlink:href', function (d, i) {return '#edgepath' + i})
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(function (d) {return d.name;});
      this.node.append("title")
          .text(function(d) { return d.name; });

      this.node.on("click",(d) => {
        this.handle = d.id;
        this.type = d.type;
        this.av = d.av;
        this.tv = d.tv;
        this.selected = true;
        this.selectedNodeData = d;
        d3.selectAll("circle").style("r", 12).style("stroke-width", 1.5).style("stroke","#fff");
        this.node.style("stroke-width", function(o) {
          return o.id === d.id? 2:1.5;
        }).style("stroke", function(o) {
          return o.id === d.id? "red":"#fff";
        }).style("r",function(o) {
          return o.id === d.id? 18:12;
        })
      });
      //selection function when node is double clicked
      this.node.on("dblclick", (d) => {
          this.filtered = true;
          var opacity = 0;
          var linkedByIndex = {};
          this.link.each(function(d) {
              linkedByIndex[d.source.index + "," + d.target.index] = 1;
              linkedByIndex[d.target.index + "," + d.source.index] = 1;
          });
          function neighboring(a, b) {
              return linkedByIndex[a.index + "," + b.index];
          }
          var neighbourLinks = []
          var neighlink = []
          var neigh = []
          this.node.each(function(k){
              if (neighboring(d,k) && k.name == "") {
                  neighbourLinks.push(k);
              }
          });
          for(let i = 0;i<neighbourLinks.length;i++){
              neighlink.push(neighbourLinks[i].id);
              this.node.each(function(l){
                  if (neighboring(neighbourLinks[i], l)) {
                      neigh.push(l.id);
                  }
              });
          }
          this.node.style("r", function(o) {
              return neighboring(d, o) || (d.id === o.id) ||(neigh.indexOf(o.id) != -1)? 18 : 10;
          }).style("opacity", function(o){
              return neighboring(d, o) || (d.id === o.id) || (neigh.indexOf(o.id) != -1) ? 1 : opacity;
          });

          console.log(neigh);
          this.label.style("opacity", function(o){
              return neighboring(d, o) || (d.id === o.id) || (neigh.indexOf(o.id) != -1) ? 1 : opacity;
          });
          this.link.style("opacity", function(o) {
              return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) != -1) && (neighlink.indexOf(o.source.id) != -1)) || ((neigh.indexOf(o.source.id) != -1) && (neighlink.indexOf(o.target.id) != -1))? 1 : opacity;
          }).style("stroke-width", function(o){
              return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) != -1) && (neighlink.indexOf(o.source.id) != -1)) || ((neigh.indexOf(o.source.id) != -1) && (neighlink.indexOf(o.target.id) != -1))? 2 : 1;
          });
          this.linkLabel.style("opacity", function(o) {
              return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) != -1) && (neighlink.indexOf(o.source.id) != -1)) || ((neigh.indexOf(o.source.id) != -1) && (neighlink.indexOf(o.target.id) != -1))? 1 : opacity;
          }).style("font", function(o){
              return o.source === d || o.target === d || ((neigh.indexOf(o.target.id) != -1) && (neighlink.indexOf(o.source.id) != -1)) || ((neigh.indexOf(o.source.id) != -1) && (neighlink.indexOf(o.target.id) != -1))? "normal 12px Arial" : "normal 8px Arial";
          });
          this.node.each(function(o) {
              d.fixed = false;
              d.x = ( d.id === o.id ) ? width/2:d.x;
              d.y = ( d.id === o.id ) ? height/2:d.y;
          });
      });
      simulation
          .nodes(this.parsedJson.nodes)
          .on("tick", ()=>{
            this.link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
                        
        this.textPath.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });

        this.linkLabel.attr('transform', function (d) {
            if (d.target.x < d.source.x) {
                let bbox = this.getBBox();
                let rx = bbox.x + bbox.width / 2;
                let ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            }
            else {
                return 'rotate(0)';
            }
        });

        this.node
            .attr("cx", function(d) { return d.x = Math.max(12, Math.min(width - 12, d.x)); })
            .attr("cy", function(d) { return d.y = Math.max(12, Math.min(height - 12, d.y)); });
        this.label
            .attr("x", function(d){ return d.x; })
            .attr("y", function (d) {return d.y + 4; });
          });

      simulation.force("link")
          .links(this.parsedJson.links);

      setInterval(function(){simulation.alpha(0.1);},10);



    //dragability functionality implementations
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = Math.max(12, Math.min(width - 12, d3.event.x));
      d.fy = Math.max(12, Math.min(height - 12, d3.event.y));
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

}
