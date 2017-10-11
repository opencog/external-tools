import { Injectable } from '@angular/core';
import {Graph} from "./graph";
import {Link} from "./link";
import {Node} from "./node";
declare var d3:any;
@Injectable()
export class NetworkService {
  nodes:Node[] = [];
  links:Link[] = [];
  constructor() { }
  public getParsedJson(atoms):Graph{
    let parsedJson: Graph = <Graph>{};
    this.getNodes(atoms);
    this.getLinks(atoms);
    parsedJson.nodes = this.nodes;
    parsedJson.links = this.links;
    return parsedJson;
  }
  private getNodes(atoms){
    this.nodes = []
    for(let i = 0;i<atoms.length;i++){
      let node:Node = <Node>{};
      if (atoms[i].name != '') {
        node.id = atoms[i].handle;
        node.name = atoms[i].name;
        node.group = atoms[i].type;
        node.type = atoms[i].type;
        node.av = atoms[i].attentionvalue;
        node.tv = atoms[i].truthvalue;
        this.nodes.push(node);
      }
    }
  }
  private isInNodes(handle,nodes){
    for(let i = 0;i < nodes.length;i++){
      if (nodes[i].id == handle.toString()) {
        return true;
      }
    }
  }
  private getLinks(atoms){
    this.links = []
    for(let i = 0; i < atoms.length ;i++){
      if (atoms[i].name == '') {
        let outgoing = atoms[i].outgoing;
        let incoming = atoms[i].incoming;
        let label = atoms[i].type;
        let handle = atoms[i].handle;
        let av = atoms[i].attentionvalue;
        let tv = atoms[i].truthvalue;
        if (outgoing.length == 1) {
          let linkNode:Node = <Node>{};
          let link:Link = <Link>{};
          link.source = handle;
          link.target = outgoing[0];
          link.name = label;
          linkNode.id = handle;
          linkNode.name = '';
          linkNode.group = label;
          linkNode.type = label;
          linkNode.av = av;
          linkNode.tv = tv;
          this.links.push(link);
          this.nodes.push(linkNode);
        } else if (outgoing.length == 2) {
          if (incoming.length == 0) {
            let link:Link = <Link>{};
            link.source = outgoing[0];
            link.target = outgoing[1];
            link.name = label;
            this.links.push(link);
          }else {
            let linkNode:Node = <Node>{};
            let link1:Link = <Link>{};
            let link2:Link = <Link>{};
            linkNode.id = handle;
            linkNode.name = '';
            linkNode.group = label;
            linkNode.type = label;
            linkNode.av = av;
            linkNode.tv = tv;
            link1.source = handle;
            link1.target = outgoing[0];
            link1.name = label;
            link2.source = handle;
            link2.target = outgoing[1];
            link2.name = label;
            this.nodes.push(linkNode);
            this.links.push(link1);
            this.links.push(link2);
          }
        }else if (outgoing.length > 2) {
          let linkNode:Node = <Node>{};
          linkNode.id = handle;
          linkNode.name = '';
          linkNode.group = label;
          linkNode.type = label;
          linkNode.av = av;
          linkNode.tv = tv;
          this.nodes.push(linkNode);
          for(let k = 0; k < outgoing.length; k++){
            let link:Link = <Link>{};
            link.source = handle;
            link.target = outgoing[k];
            link.name = label;
            this.links.push(link);
          }
        }
      }

    }
  }
}