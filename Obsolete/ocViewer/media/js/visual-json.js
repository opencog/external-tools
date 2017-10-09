/*
 * Called to create/refresh the JSON view.
 */
function updateJSONView()
{
    if (atomData != null)
    {
        var atom_list =
        {
            "total" : atomData.length,
            "atoms" : atomData
        };
        $("#screen-json").html("<pre>" +
            JSON.stringify(atom_list, null, '\t') +
            "</pre>");
    }
    else
      $("#screen-json").html("<h3>JSON view</h3><hr>No Data. Please connect to server and specify your filter data.");
}
