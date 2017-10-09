function updateStats()
{
	if (atomData!=null)
	{
		html = '<table class="table table-hover" id="StatisticsTable"><tr><th>Name</th><th>Number</th></tr>';
		innerhtml = "";

		for (i=0;i<atomTypesUsed.length;i++)
			innerhtml = innerhtml + "<tr><td>" + atomTypesUsed[i]  + "</td><td>0</td></tr>";
		html = html + innerhtml;
		html = html + "</table>";
		
	}
	else
	{
		html = '<h3>Statistics</h3><hr>No Data. Please connect to server and specify your filter data.';
	}
	$("#screen-statistics").html(html);
}