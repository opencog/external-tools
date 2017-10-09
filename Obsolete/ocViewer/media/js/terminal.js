function echo(message)
{
 	if (preferences.visibleTerminal)
		terminal.echo(message);
}

function loadTerminal()
{
	terminal = $('#terminalText').terminal(function(command, term)
	{
    	if (command.toUpperCase()=="CONNECT")
    		retrieveAtomTypes();
    	else if (command.toUpperCase()=="HELP")
            showScreen("help");
        else if (command.toUpperCase()=="IMPORT")
            showScreen("import");
        else if (command.toUpperCase()=="EXPORT")
            showScreen("export");
    	else if (command.toUpperCase()=="CLEAR")
    		term.clear();
        else if (command.toUpperCase().substring(0,3)=="ADD")
        {
            var newNodeName = command.split(" ")[1];
            
            if (newNodeName!="" && newNodeName!=null)
                d3g.addNode({handle:newNodeName});
    
        }
        else if (command.toUpperCase().substring(0,6)=="DELETE")
        {
            var node2Delete = command.split(" ")[1];
            
            if (node2Delete!="" && node2Delete!=null)
                d3g.removeNode(node2Delete);
    
        }
        else if (command.toUpperCase().substring(0,4)=="LINK")
        {
            var node1 = command.split(" ")[1];
            if (node1.toUpperCase().substring(0,3)=="ALL")
                return;

            var node2 = command.split(" ")[2];

            if ((node1!="" && node1!=null) && (node2!="" && node2!=null))
                d3g.addLink(node1,node2);
    
        }
        else if (command.toUpperCase().substring(0,3)=="FIX")
        {
            var select = command.split(" ")[1];
            
            if (select!="" && select!=null)
            {
                if ((select.toUpperCase().substring(0,3)=="ALL") || select=="*")
                for(var i=0;i<count;i++)
                {
                    nodes[i].fixed = true;
                }
            }
        }
        else if (command.toUpperCase().substring(0,3)=="UNFIX")
        {
            var select = command.split(" ")[1];
            
            if (select!="" && select!=null)
            {
                if ((select.toUpperCase().substring(0,3)=="ALL") || select=="*")
                for(var i=0;i<count;i++)
                {
                    nodes[i].fixed = false;
                }
            }
        }
        else if (command.toUpperCase().substring(0,5)=="FIXED")
        {
            var select = command.split(" ")[1];
            
            if (select!="" && select!=null)
            {

                selectedAtom = findNodebyHandle(select);
                if (selectedAtom==null)
                {
                    echo("Node was not found");
                    return;
                }
                selectedAtom.fixed = true;
                $("#atomDetailsFixed").switchButton({ checked: true });
                  
            }
            else
                echo("Nothing to select.");

        }
        else if (command.toUpperCase().substring(0,7)=="UNFIXED")
        {
            var select = command.split(" ")[1];
            
            if (select!="" && select!=null)
            {

                selectedAtom = findNodebyHandle(select);
                if (selectedAtom==null)
                {
                    echo("Node was not found");
                    return;
                }
                selectedAtom.fixed = false;
                $("#atomDetailsFixed").switchButton({ checked: false });
                  
            }
            else
                echo("Nothing to select.");
        
        }
        else if (command.toUpperCase().substring(0,6)=="SELECT")
        {
            var select = command.split(" ")[1];
            
            if (select!="" && select!=null)
            {

                selectedAtom = findNodebyHandle(select);
                if (selectedAtom==null)
                {
                    echo("Node was not found");
                    return;
                }
                node.classed("selectedNode",false);
                link.classed("selectedLink",false);
                d3.select("#node_"+select).classed("selectedNode",true);
                showSelectedAtom(selectedAtom);  

                var dcx = (width / 2 - selectedAtom.x *3 );
                var dcy = (height / 2 - selectedAtom.y *3 );
               
                zoom.translate([dcx, dcy]).scale(3);
                container.transition()
                    .duration(transitionSpeed)
                    .attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + 3 + ")");

            }
            else
                echo("Nothing to select.");
            
        }
        else if (command.toUpperCase().substring(0,5)=="NODES")
        {
            var select = command.split(" ")[1];
            
            if (!connected)
                echo("Not connected to the server");

            if (select!="" && select!=null)
            {

                tempSelectedAtom = findNodebyHandle(select);
                if (tempSelectedAtom==null)
                {
                    echo("Node was not found");
                    return;
                }

                console.log(tempSelectedAtom.incoming[0].handle);

                if (tempSelectedAtom.incoming.length==0)
                    return;

                for (var i=0; i < tempSelectedAtom.incoming.length; i++)
                {
                    tempNode = findNodebyHandle(tempSelectedAtom.incoming[i].handle);
                    tempNode.classed("selectedNode",true); 
                }
            }
 
        }
        else if (command.toUpperCase().substring(0,4)=="ZOOM")
        {
            var zoomn = command.split(" ")[1];
            
            if (zoomn!=null)
            {
                if (zoomn.toUpperCase()=="ALL")
                {
                    var dcx = (0  );
                    var dcy = (0  );
                   
                    zoom.translate([dcx, dcy]).scale(1);;
                    vis.transition()
                        .duration(transitionSpeed)
                        .attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + 1 + ")");
                    return;
                }
            }
            if (zoomn!="" && zoomn!=null)
            {
                d = findNodebyHandle(zoomn);
                if (d==null)
                {
                    echo("Node was not found");
                    return;
                }
                  
                d3.select("#node_"+d.handle).attr("stroke-width",4);

                var dcx = (width / 2 - d.x *3 );
                var dcy = (height / 2 - d.y *3 );
               
                zoom.translate([dcx, dcy]).scale(3);
                container.transition()
                    .duration(transitionSpeed)
                    .attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + 3 + ")");
            }
            else
            {
                var dcx = (0  );
                var dcy = (0  );
                   
                zoom.translate([dcx, dcy]);
                container.transition()
                        .duration(transitionSpeed)
                        .attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + 1 + ")");
                return;
            }
        }
        else if (command.toUpperCase()=="DESELECT")
        {
            node.classed("selectedNode",false);
            link.classed("selectedLink",false);
            selectedNode = null;
            selectedLink = null;
            clearAtomDetails();
        }
    	else if (command.toUpperCase().substring(0,4)=="VIEW")
    	{

    		var view = command.split(" ")[1];
            
            if (view!="" && view!=null)
                view = view.toUpperCase();
            else
                showScreen(preferences.viewer);
             
    		switch(view)
    		{
        		case "D3":
                    savePreference("viewer","d3")
                    preferences.viewer = "d3";
                    updateGUIPreferences();
                    showScreen(preferences.viewer);
        			break;
        		case "JSON":
                    preferences.viewer = "json";
                    updateGUIPreferences();
                    showScreen(preferences.viewer);
                    break;
        		case "TABLE":
                    preferences.viewer = "table";
                    updateGUIPreferences();
                    showScreen(preferences.viewer);
        		    break;
                default:
                    showScreen(preferences.viewer);
        			break;
    		}
    	}
    	else if (command.toUpperCase()=="PUSH")
    	{
    		node = new Object();
    		node.name = "nameis";
    		node.handle = 30;
    		nodes=[];
    		links =[];
    		echo("pushing node");
    		force.nodes([]).links([]).start();
    	}
    	else
    	{
    		/*
	    	if (!connected)
	    	{
	    		echo("[[b;red;black]No connection]. Please connect first.");
	    		return;
	    	}
	    	else
	    		*/
	    	{
	    		//Send AJAX
	    		commandtoSend = command;
				$.ajax(
				{
					url: preferences.cogserver + 'api/v1.1/scheme',
					type:'POST', 
                    data:
			    	{
			    		command:commandtoSend
			    	}

				})
				.success(function(d)
				{
					 term.echo('command success');
				})
				.fail(function(d){

					term.echo('[[b;red;black]Failed to execute.]');
				});
	    	}
    	}
		 
	}, { greetings:"[[b;white;black]AtomSpace Viewer Command Line]", prompt: '[[b;yellow;black]>]', name: 'test' });
}