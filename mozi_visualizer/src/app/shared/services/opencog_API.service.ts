/**
 * Created by kal on 7/12/17.
 */

import  { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { configs } from "../../app.config";

@Injectable()
export class OpencogAPIService {

        private url = configs.opencog_url;

    constructor (private http: Http) {

    }

    private getJson(res: Response) {
        return res.json();
    }

    getAtoms() {
        return this.http.get(`${this.url}/atoms`)
            .map(this.getJson);
    }

    // What do you know about Gene X?
    findAboutGene(gene) {
        return this.executeScmCommand(`(cog-bind (findAboutGene (GeneNode \"${gene}\"))) (cog-prt-atomspace)`);
    }

    // How does gene x related to gene y?
    findRelationships(geneNode1, geneNode2) {
        return this.executeScmCommand(`(findRelationships (GeneNode \"${geneNode1}\") (GeneNode \"${geneNode2}\")) (cog-prt-atomspace)`);
    }

    // What do you know about Go-term G?
    GOname(conceptNode) {
        return this.executeScmCommand(`(cog-satisfying-set (GOname (ConceptNode \"${conceptNode}\"))) (cog-prt-atomspace)`);
    }

    // Find list of geneNodes in GO-term G
    findGeneIn(conceptNode) {
        return this.executeScmCommand(`(cog-bind (find-gene-in (ConceptNode \"${conceptNode}\"))) (cog-prt-atomspace)`);
    }

    // finds the common genes in two GO categories x and y?
    commonGenes(conceptNodeX, conceptNodeY) {
        return this.executeScmCommand(`(cog-bind (common-genes (ConceptNode \"${conceptNodeX}\") (ConceptNode \"${conceptNodeY}\"))) (cog-prt-atomspace)`);
    }

    // finds the categories the two genes have in common.
    findCommonCategories(geneNode, conceptNode) {
        return this.executeScmCommand(`(cog-bind (common-categories (GeneNode \"${geneNode}\") (ConceptNode \"${conceptNode}\"))) (cog-prt-atomspace)`);
    }


    executeScmCommand(command) {
        let body = {"command": command};
        return this.http.post(`${this.url}/scheme`, body)
            .map(this.getJson);
    }

}
