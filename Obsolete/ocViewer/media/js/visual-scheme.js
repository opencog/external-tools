/*
 * Called to create/refresh the scheme view.
 */
function updateSchemeView()
{
    if (atomData != null)
        $("#screen-scheme").html("<h3>Scheme view</h3><hr>Not yet implemented.");
    else
        $("#screen-scheme").html("<h3>Scheme view</h3><hr>No Data. Please connect to server and specify your filter data.");
}
