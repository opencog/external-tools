function d3graph(element)
{
 
    var vis = this.vis = d3.select(element).append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()
    	.charge(preferences.appearanceCharge)
		.gravity(0.1)
		.linkDistance(preferences.appearanceLinkDistance)
		.linkStrength(preferences.appearanceLinkStrength/100)
		.friction(preferences.appearanceFriction/100)
        .size([width, height]);

    var nodes = force.nodes(),
        links = force.links();

 
 /*--------------------------*/
/*----------UPDATE---------*/
/*--------------------------*/
/*--------------------------*/
/*--------------------------*/

    var update = function () 
    {

        var link = vis.selectAll("line.link")
            .data(links, function(d) { return d.source.id + "-" + d.target.id; });

        var linkEnter = link.enter().insert("line")
            .attr("class", "link");

        link.exit().remove();

        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id;});

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .call(force.drag);

        nodeEnter.append("circle")
            .attr("class", "circle")
            .attr("r", 23) 
            .attr("x", "-8px")
            .attr("y", "-8px")
            .attr("width", "16px")
            .attr("height", "16px");

        nodeEnter.append("text")
            .attr("class", "text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) {return d.id});

        node.exit().remove();

        force.on("tick", function() 
        {
          link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        
        force.start();
    }

    update();

/*--------------------------*/
/*--------FUNCTIONS---------*/
/*--------------------------*/
/*--------------------------*/
/*--------------------------*/
 
	this.update = function (id) 
	{
        update();
    }

    this.addNodes = function (newnodes) 
	{
        nodes = newnodes;
        update();
    }


	this.addNode = function (newnode) 
	{
        nodes.push(newnode);
        update();
    }

    this.removeNode = function (id) 
    {
        var i = 0;
        var n = findNode(id);
        while (i < links.length) 
        {
            if ((links[i]['source'] === n)||(links[i]['target'] == n)) 
            	links.splice(i,1);
            else i++;
        }
        var index = findNodeIndex(id);
        if(index !== undefined) 
        {
            nodes.splice(index, 1);
            update();
        }
    }

    this.addLink = function (sourceId, targetId) 
    {
        var sourceNode = findNode(sourceId);
        var targetNode = findNode(targetId);

        if ((targetNode)==undefined)
		{
			echo("Target node is missing");
			return;
		}

        if((sourceNode !== undefined) && (targetNode !== undefined)) 
        {
            links.push({"source": sourceNode, "target": targetNode});
            update();
        }
        else
        {
        	echo("One of the connecting links have not been found");
        }
    }

    var findNode = function (id) 
    {
        for (var i=0; i < nodes.length; i++) 
        {
            if (nodes[i].handle === id)
                return nodes[i]
        };
        return null;
    }

    var findNodeIndex = function (id) 
    {
        for (var i=0; i < nodes.length; i++) 
        {
            if (nodes[i].handle === id)
                return i
        };
        return null;
    }


}

 