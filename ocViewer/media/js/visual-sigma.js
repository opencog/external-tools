function sigmaGraph(element)
{
	//Initialize Things
	var i,s,N = 2000,E = 2000;
	var g = 
	{
	    nodes: [],
	    edges: []
	};
	
	this.element = element;

	var webgl = 0;

	if (sigmag==null)
	{

		s =  new sigma({graph: g, settings:{
			hideEdgesOnMove: true,
			//defaultEdgeType: 'curve',
    		defaultEdgeArrow: 'target'
		}});

		s.addCamera('cam1'),

		s.addRenderer(
		{
			container: document.getElementById(element),
			type: (webgl) ? 'webgl' : 'canvas',
			camera: 'cam1',
			settings: {defaultLabelColor: '#fff'}
		});
		// Start the ForceAtlas2 algorithm:
 
		//s.startForceAtlas2({worker: true, barnesHutOptimize: false});

	}

	$('#' + element + ' canvas').click(function(e) 
	{

		x = sigma.utils.getX(e) - $(this).offsetWidth / 2;
	    y = sigma.utils.getY(e) - $(this).offsetHeight / 2;

	    
		if (preferences.selectedTool == "pointer")
		{

		}
		else if (preferences.selectedTool == "addNode")
		{
	  		s.graph.addNode({
				    id: 'n' + ++i ,  
				    label: 'Node ' + i,
				    x: x,
				    y: y,
				    size: 3,
				    color: '#d3d'
			});
  		}

		s.refresh();
    });
 
	if (!webgl)
	{
		var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
		dragListener.bind('startdrag', function(e) {});
		dragListener.bind('drag', function(e) {});
		dragListener.bind('drop', function(e) {});
		dragListener.bind('dragend', function(e) {});
	}

	//FUNCTIONS
	function findNodeByHandle(handle)
	{
		for (var i=0; i<s.graph.nodes().length; i++)
		{
			if (s.graph.nodes()[i].handle == handle)
				return s.graph.nodes()[i].id;
		}
		return null;
	}

	this.parseGefx = function (data)
	{

		//s.parseGexf('arctic.txt');
  		sigma.parsers.json('data.json', {
		    container: this.element,
		    settings: {
		      defaultNodeColor: '#ec5148'
		    }
  		});

	}

	this.addNodes = function(newnodes)
	{ 
		if (newnodes==null)return;

		for (i = 0; i < newnodes.length; i++)
		{
   
			s.graph.addNode({
			    id: 'n' + newnodes[i].handle,		     
			    label: newnodes[i].name,
			    x: Math.random(),
			    y: Math.random(),
			    size: (newnodes[i].incoming.length * 10) + 5,
			    color: '#fff'
			});
			newnodes[i].id = 'n' + i;
		}
		 
		for (i = 0; i < newnodes.length; i++)
		{
			for (var y=0; y < newnodes[i].incoming.length; y++)
			{
				
				s.graph.addEdge({
				    id: 'e' + i+y,
				    source: 'n'+ newnodes[i].incoming[y] ,
				    target:'n'+   newnodes[i].handle  ,
				    size: Math.random(),
				    color: '#ccc'
				});
			}
		}
		s.refresh();
		s.refresh(); 
		s.refresh();
	}

	function randomg()
	{
		
		
	}

	this.update = function()
	{


	}

	function isConnected(a, b) 
	{



		if (!arrycontain(a))
			connectedNode[connectedNode.length] = a;
 
		function recurse(node)
		{
			if (node.incoming.length > 0)
				node.incoming.forEach(function(entry)
				{
					//finde better way
					var currentNde = getnode(entry);
					if (!arrycontain(currentNde)) {
						connectedNode[connectedNode.length] = currentNde;
						recurse(currentNde);
					}
				});
			
			if (node.outgoing.length > 0)
				node.outgoing.forEach(function(entry)
				{
					//finde better way
					var currentNde = getnode(entry);
					if (!arrycontain(currentNde)) {
						connectedNode[connectedNode.length] = currentNde;
						recurse(currentNde);
					}
				});
 
		}

		recurse(a);

		if (!arrycontain(b))
			return false;
		else
			return true;
	}

	function arrycontain(obj) 
	{
		var i = connectedNode.length;
		while (i--)
		{
			if (connectedNode[i] === obj) 
				return true;
		}
		return false;
	}
	
	function getnode(handle) 
	{
		for ( jnode = 0; jnode < atomData.length; jnode++)
			if (handle == atomData[jnode].handle)
				return atomData[jnode];
	}
}