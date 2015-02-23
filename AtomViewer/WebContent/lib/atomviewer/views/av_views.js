/*
 * av_views.js
 *
 * This file contains code for rendering the different views on the atom
 * data.
 *
 * Copyright (C) 2013 OpenCog Foundation
 * All Rights Reserved
 *
 * Written by Scott Jones <troy.scott.j@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License v3 as
 * published by the Free Software Foundation and including the exceptions
 * at http://opencog.org/wiki/Licenses
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program; if not, write to:
 * Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */


/*
 * This function updates all of the views on our data, and is called whenever the
 * data is refreshed.
 */
function updateAllViews()
{
    // Graph view:
    updateGraphView();
    
    // Table view:
    updateTableView();
    
    // Scheme view:
    updateSchemeView();
    
    // JSON view:
    updateJSONView();
    
    // D3 Graph view:
    updateD3Graph();
     
}

//var jsonobj={};
function updateD3Graph(){
	
	  //av_graph.fdGraph = null;
	 if (av.atom_data != null)
     {
     	//Clearing what ever in html idTestTab div and redrow the d3 graph 
     	av.DOM.byId("idTestTab").innerHTML = "";
     	
    	//jsonobj=generateGraphJSONForD3();
    	//jsonobj=av.atom_data;
        updateD3GraphView(generateGraphJSONForD3());
     }else
     {
        av.DOM.byId("idTestTab").innerHTML = "<h1 align='center'>(No Data)</h1>";
     }
}

/*
 * Called to create/refresh the table view.
 */
function updateTableView()
{
    if (av.atom_data != null)
    {
        //TODO
        av.DOM.byId(idTableTab).innerHTML =AtomsTableView(av.atom_data); //"<h1 align='center'>(W.I.P. - not yet inplemented)</h1>";
    }
    else
    {
        av.DOM.byId(idTableTab).innerHTML = "<h1 align='center'>(No Data)</h1>";
    }
}

//outerMost table that hase all tables inside. 
function AtomsTableView(atoms)
{
  var table= "<table class='atomTable'>";
  table+="<tr><th class='atomTableHeader'> total </th><th class='atomTableHeader' style='text-align:left;'>"+ atoms.length.toString()+"</th></tr>";	
  table+="<tr><td class='cellId' style='vertical-align:text-top;' > atoms </td><td class='cellId'>"+upperTables(atoms)+"</td></tr></table>";
  return table;
}


//upper table that actual content consists. 
 
 function upperTables(atoms)
 	{    
    var entr=true;
 	var tbody="";
 	var Table="<table  class='atomTable'> ";
 	    Table+="<tr><td class='cellId'>[Key]</td>";
 	 
 	for(var atom in atoms)
 	{
 	if(entr==true)
 	{
 	  Table+=CreateTableHeader(atoms[atom]);
 	}
 	 entr=false;
 	tbody +=  "<tr><td class='cellId'>"+atom+"</td>"+ innerTables(atoms[atom]); 	        
 	}
 	Table+=tbody+"</table>";
 	return Table;
 	}
 	
 	function CreateTableHeader(Columns_data)
 	{ 		
 		var thValue="";
 		for(var Column_data in Columns_data)
 		{
 			thValue+="<TH class='atomTableHeader'> "+ Column_data +" </TH>";
 		}
 		thValue+="</tr>";
 		return thValue;
 	}
 	
 	//Creates table for nested objects.	
 	function innerTables(atom)
 	{
 		var reval="";
 		var tbody="";
 		var tmp=null;
 		for(var i in atom)
 		{ 			 
 		   tmp=atom[i];
 			if(tmp=="[object Object]")
 			{ 
 			 var objStr="[-] Object, "+objectCount(tmp) +" Properties<br/><br/>";
 			 tmp=objStr+innerMostTable(tmp);
 			} 	
 			if(Object.prototype.toString.apply(atom[i])=="[object Array]")
 			{
 				if(atom[i]=="")
 				{
 					
 					tmp="[empty Array]";
 				}else
 				{
 					tmp="[-] Array, "+atom[i].length.toString()+" Item<br/><br/>";
 					tmp+=ArrayTable(atom[i]);
 				} 				 
 			}	    
 		   reval+=createTr(tmp); 		    
 		} 		 
 		 tbody+=reval;
 		return tbody;
 	}	
 	
 	//Creates a single table cell at atime.
 	function createTr(columns)
 	{ 	       
 		return "<td class='cellId'>"+columns+"</td>";
 	}
 	
 	 /**
 	  * creates table of arrays. array table and object table are in seperate 
 	  * function due to the nested nature of objects. 
 	  */
 	
 	function ArrayTable(array_data)
 	{
 		var aTable="<table class='atomTable'>";
 		var aBody="";
 		for(var aData in array_data)
 		{
 			aBody+="<tr><td class='cellId'>"+aData+"</td><td class='cellId'>"+array_data[aData] +"</td></tr>";
 		}
 		 aTable+=aBody+ "</table>";
 		return aTable;
 	}
 	
   // counts the number of objects 
   function objectCount(objects)
   {
   	var objCount=0;
   	for( var obj in objects)
   	{
   		objCount++;
   	}
   	return objCount;
   }
 /**
  * creates inner tables recursively 
  */
 	function innerMostTable(atom)
 	{
 		var Innertable="<table class='atomTable' >";
 		var ibody="";
 		var tmp=null;
 		for(var i in atom)
 		{    tmp=atom[i];
 			if(tmp=="[object Object]")
 			{
 				 var objStr="[-] Object, "+objectCount(tmp) +" Properties<br/><br/>";
                 tmp=objStr+innerMostTable(tmp); 	
               		
  			}
 			
 			ibody+="<tr><td class='cellId'>"+i+"</td><td class='cellId'>"+tmp+"</td></tr>";
 			
 		}
 		Innertable+=ibody+"</table> ";
 		return Innertable;
 	}
 	

/*
 * Called to create/refresh the scheme view.
 */
function updateSchemeView()
{
    if (av.atom_data != null)
    {
        //TODO
        av.DOM.byId(idSchemeTab).innerHTML = "<h1 align='center'>(W.I.P. - not yet inplemented)</h1>";
    }
    else
    {
        av.DOM.byId(idSchemeTab).innerHTML = "<h1 align='center'>(No Data)</h1>";
    }
}

/*
 * Called to create/refresh the JSON view.
 */
function updateJSONView()
{
    if (av.atom_data != null)
    {
        var atom_list =
        {
            "total" : av.atom_data.length,
            "atoms" : av.atom_data
        };
        av.DOM.byId(idJSONTab).innerHTML = "<pre>" +
            av.JSON.stringify(atom_list, null, '\t') +
            "</pre>";
    }
    else
    {
        av.DOM.byId(idJSONTab).innerHTML = "<h1 align='center'>(No Data)</h1>";
    }
}

/*
 * Handles resize events.
 */
function onResize()
{
    // Only the graph needs resizing, other views update
    // automatically:
    resizeGraph();
}
