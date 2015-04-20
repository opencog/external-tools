function updateTableView()
{
 
  if (atomData != null)
    $("#screen-table").html(AtomsTableView(atomData));
  else
    $("#screen-table").html("<h3>Table view</h3><hr>No Data. Please connect to server and specify your filter data.");

}
 
function AtomsTableView(atoms)
{
 
  var table= "<table class='table table table-bordered'>";
  table+="<tr><th class='atomTableHeader'> total </th><th class='atomTableHeader' style='text-align:left;'>"+ atoms.length.toString()+"</th></tr>";	
  table+="<tr><td class='cellId' style='vertical-align:text-top;' > atoms </td><td class='cellId'>"+upperTables(atoms)+"</td></tr></table>";
  return table;
}

function upperTables(atoms)
{    
  var entr=true;
  var tbody="";
  var Table="<table class='table table-bordered'> ";
  Table+="<tr><td class='cellId'>[Key]</td>";
   	 
  for(var atom in atoms)
  {
    if(entr==true)
     	  Table+=CreateTableHeader(atoms[atom]);
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
 					tmp="[empty Array]";
 				else
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
 	

 	function createTr(columns)
 	{ 	       
 		return "<td class='cellId'>"+columns+"</td>";
 	}

 	
 	function ArrayTable(array_data)
 	{
 		var aTable="<table class='table table-bordered'>";
 		var aBody="";
 		for(var aData in array_data)
 		{
 			aBody+="<tr><td class='cellId'>"+aData+"</td><td class='cellId'>"+array_data[aData] +"</td></tr>";
 		}
 		 aTable+=aBody+ "</table>";
 		return aTable;
 	}
 	
  
function objectCount(objects)
{
   	var objCount=0;
   	for( var obj in objects)
   	{
   		objCount++;
   	}
   	return objCount;
}

function innerMostTable(atom)
{
     
 		var Innertable="<table class='table table-bordered' >";
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