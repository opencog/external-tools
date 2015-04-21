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

	colors = [
			'#ddd',
			'#668f3c',
			'#c6583e',
			'#b956af',
			'#b956af'
	];

	if (sigmag==null)
	{

		s =  new sigma({graph: g, settings:{
			hideEdgesOnMove: false,
    		labelColor:'node',
			edgeColor:'source',
			defaultEdgeColor:'#ddd',
			defaultNodeColor:'#eee',
			font: 'Courier',
			fontStyle:"bold",
			labelThreshold:5,
			labelSize:'proportional',
			labelSizeRatio:'3',
			batchEdgesDrawing:true,
			webglEdgesBatchSize:1000,
			webglOversamplingRatio:0.9,
			zoomMax:10,
			maxEdgeSize:0.1,
			minEdgeSize:0.1,
			maxNodeSize:8,
			minNodeSize:1,
			animationsTime:10,
			verbose:true,
			edgeLabels:true
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
	this.clear = function()
	{
		 
		s.graph.clear();
	}

	this.addNodes = function(newnodes)
	{ 

		if (newnodes==null)return;

		N = newnodes.length;
		L =0;
		No = 0; 

		for (i = 0; i < N; i++)
		{
			if (newnodes[i].type.search("Link")!=-1)
				L++;
		}
		No = N - L;

		l =0 ;
		n = 0;
		i = 0;

		for (i = 0; i < N; i++)
		{
   			//if (newnodes[i].type=="InheritageLink") return;

   			if (newnodes[i].name!="")
   				finalName = newnodes[i].name
   			else
   				finalName = newnodes[i].type

		    io = newnodes[i].incoming.length + newnodes[i].outgoing.length;

		    if (newnodes[i].type.search("Link")!=-1)
		    {
		    	//break;
		    	x = 90 * Math.cos(Math.PI * 2 * l / L - Math.PI / 2);
		    	y = 90 * Math.sin(Math.PI * 2 * l / L - Math.PI / 2);
		    	 l++;
		    }
		    else 
		    {
		    	//continue;
		    	x = 100 * Math.cos(Math.PI * 2 * n / No - Math.PI / 2) ;
		    	y = 100 * Math.sin(Math.PI * 2 * n / No - Math.PI / 2);
		    	 n++;
		    }

		   

		    if (newnodes[i].type.search("Link")!=-1)
		    {
		    	color="#333333";
		    	sizeis = 1;
		    }
		    else
		    {
		    	if (io<5)
		    		color = colors[0];
			    else if(io>5)
			    	color = colors[1];
			    else if(io>10)
			    	color = colors[2];
			    else if (io>20)
			    	color = colors[3];
			    else
		    		color = colors[4];

		    	sizeis =  (newnodes[i].incoming.length * 70) + 15
		    }

			s.graph.addNode({
			    id: 'n' + newnodes[i].handle,		     
			    label: finalName,
			    x: x ,
			    y: y ,
			    size: sizeis,
			    color: color
			});
			newnodes[i].id = 'n' + i;
		}
		 
		for (i = 0; i < newnodes.length; i++)
		{
			for (var y=0; y < newnodes[i].incoming.length; y++)
			{
				 
				s.graph.addEdge({
				    id: 'e' + i+y,
				    label: 'skoumas',
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

	this.view = function(viewType)
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
 