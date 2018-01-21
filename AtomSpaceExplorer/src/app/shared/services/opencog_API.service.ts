/**
 * Created by kal on 7/12/17.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { configs } from '../../app.config';

@Injectable()
export class OpencogAPIService {
  private atomspace_api = configs.atomspace_api;

  constructor(private http: Http) {
  }

  private getJson(res: Response) {
    return res.json();
  }

  getAtoms(url) {
    if (url.endsWith('.json')) {
      // Retrieving sample *.json files from ./assets
      return this.http.get(`${url}`).map(this.getJson);
    } else {
      // Standard fetch from Cog Server AtomSpace API
      return this.http.get(`${url}${this.atomspace_api}/atoms`).map(this.getJson);
    }
  }

  // Get list of unordered (symmetric) link types
  getUnorderedLinkTypes(url) {
    return this.executeScmCommand(url, '(cog-get-all-subtypes \'UnorderedLink)');
  }

  /*
  // What do you know about Gene X?
  findAboutGene(url, gene) {
    return this.executeScmCommand(url, `(cog-bind (findAboutGene (GeneNode \"${gene}\"))) (cog-prt-atomspace)`);
  }

  // How does gene x related to gene y?
  findRelationships(url, geneNode1, geneNode2) {
    return this.executeScmCommand(url, `(findRelationships (GeneNode \"${geneNode1}\") (GeneNode \"${geneNode2}\")) (cog-prt-atomspace)`);
  }

  // What do you know about Go-term G?
  GOname(url, conceptNode) {
    return this.executeScmCommand(url, `(cog-satisfying-set (GOname (ConceptNode \"${conceptNode}\"))) (cog-prt-atomspace)`);
  }

  // Find list of geneNodes in GO-term G
  findGeneIn(url, conceptNode) {
    return this.executeScmCommand(url, `(cog-bind (find-gene-in (ConceptNode \"${conceptNode}\"))) (cog-prt-atomspace)`);
  }

  // finds the common genes in two GO categories x and y?
  commonGenes(url, conceptNodeX, conceptNodeY) {
    // tslint:disable-next-line:max-line-length
    return this.executeScmCommand(url, `(cog-bind (common-genes (ConceptNode \"${conceptNodeX}\") (ConceptNode \"${conceptNodeY}\"))) (cog-prt-atomspace)`);
  }

  // finds the categories the two genes have in common.
  findCommonCategories(url, geneNode, conceptNode) {
    // tslint:disable-next-line:max-line-length
    return this.executeScmCommand(url, `(cog-bind (common-categories (GeneNode \"${geneNode}\") (ConceptNode \"${conceptNode}\"))) (cog-prt-atomspace)`);
  }
  */

  executeScmCommand(url, command) {
    const body = { 'command': command };
    return this.http.post(`${url}${this.atomspace_api}/scheme`, body)
      .map(this.getJson);
  }
}
