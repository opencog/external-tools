//GEFX
/*
<gexf xmlns="http://www.gexf.net/1.2draft" xmlns:viz="http://www.gexf.net/1.2draft/viz" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.gexf.net/1.2draft http://www.gexf.net/1.2draft/gexf.xsd" version="1.2">
<meta lastmodifieddate="2009-03-20">
<creator>Gephi.org</creator>
<description>A hello world! file</description>
</meta>

<nodes>
<node id="0" label="Hello"/>
<node id="1" label="Word"/>
</nodes>
<edges>
<edge id="0" source="0" target="1"/>
</edges>
</graph>
</gexf>


var tempAtom = 
{
    'handle': null,
    'name': '',
    'type': 'ConceptNode',
    'outgoing': [],
    'incoming': [],
    'fixed':false,
    'truthvalue':
    {
		'type': 'simple',
		'details':
		{
		    'count': '0',
		    'confidence': '0',
		    'strength': '0'
		}
    },
    'attentionvalue':
    {
		'lti': 0,
		'sti': 0,
		'vlti': false
    }
}

*/
function updateGEFXView()
{
	var output = null;


	function getNow()
	{
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		return yyyy + "-" + mm + "-" + dd;
	}
	this.generate = function(data)
	{
		if (data==null) 
		{
			$("#screen-gexf").html("<h3>GEXF view</h3><hr>No Data. Please connect to server and specify your filter data.");
			return;
		}

		creator = ($("#exportGefxCreator").val());
		description = ($("#exportGefxDescription").val());

		a('<?xml version="1.0" encoding="UTF-8"?>');
		a('<gexf xmlns="http://www.gexf.net/1.2draft" version="1.2">');
		a('<meta lastmodifieddate="'+getNow()+'">');
		
		if (creator !="")
			a('<creator>'+creator+'</creator>');
		if (description !="")
			a('<description>'+ description +'</description>'); 
 
		a('</meta>');
		a('<graph>');
		a('<nodes>');
		for (var i=0; i<data.length; i++)
		{
			a('<node id="' + data[i].handle + '" label="' + data[i].name + '"" >');
			a('<attvalues>');
				a('<attvalue for="handle" value="'+data[i].handle+'"/>');
				a('<attvalue for="name" value="'+data[i].name+'"/>');
				a('<attvalue for="type" value="'+data[i].type+'"/>');
				a('<attvalue for="truthValueType" value="'+data[i].truthvalue.type+'"/>');
				a('<attvalue for="truthValueCount" value="'+data[i].truthvalue.count+'"/>');
				a('<attvalue for="truthValueConfidence" value="'+data[i].truthvalue.confidence+'"/>');
				a('<attvalue for="truthValueStrength" value="'+data[i].truthvalue.strength+'"/>');
				a('<attvalue for="truthValueAttentionValueLti" value="'+data[i].attentionvalue.lti+'"/>');
				a('<attvalue for="truthValueAttentionValueSti" value="'+data[i].attentionvalue.sti+'"/>');
				a('<attvalue for="truthValueAttentionValueVlti" value="'+data[i].attentionvalue.vlti+'"/>');
			a('</attvalues>');
			a('</node>');
		}
		a('</nodes>');
		a('<edges>');
		for (var i=0; i<data.length;i++)
		{
			for (var y=0; y<data[i].incoming.length; y++)
			{
				a('<edge id="' + i +'_' + y + '" source="' + data[i].incoming[y] + '" target="' + data[i].handle + '"/>');
			}

			for (var y=0; y<data[i].outgoing.length; y++)
			{
				a('<edge id="' + i +'_' + y + '" source="' + data[i].handle + '" target="' + data[i].outgoing[y] + '"/>');
			}

		}
		a('</edges>');
		a('</graph>');
		a('</gexf>');
 
		return output;
	}
     
 	function a (line)
 	{
 		//adds a new linke
 		output = output + line + "\n";
 	}
}
