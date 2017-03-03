app.constant('config', {
    header: 'impression opencog visualizer',
    version: 'master branch v0.0.2',

    /* refresh rates in ms */
    atomspaceRefreshrate: 1000,
    openpsiRefreshrate: 500,

    /* default options for as query */
    atomspaceDefaultPoll: { 'filterby': 'attentionalfocus', 
                            'includeIncoming': true, 
                            'includeOutgoing': true },

    /* specified wobbliness of simulation, default is 0.001 */
    simulationAlphaTarget: 0.1,

    /* params for radius of nodes acc. to log function */
    // TODO: tweak these params to be applicable to a wider range of STI's
    atomspaceNodeScalingSteepness: 0.1,
    atomspaceNodeScalingInputMidpoint: 200,
    atomspaceNodeScalingOutputMaxpoint: 20,
    atomspaceNodeScalingMinimal: 4,

    /* specifies how strong nodes are pulled to center acc. to STI */
    atomspaceCenterGravityCoefficient: 0.00025,
    atomspaceMinimalCenterGravity: 0.1

});

app.constant('atomspaceStyle', {
    'Font': 'DosisLight',

    'DrawNodeText': true,
    'DrawLinkText': false,

    'LineColor': 'rgba(0,0,0,0.4)',
    'LineWidth': 0.15,

    'DefaultNodes':     {'nodeColor': 'rgba(108,110,88,0.5)', 'textColor': 'rgb(0,0,0)'},
    'DefaultLinks':     {'nodeColor': 'rgb(0,0,0)',           'textColor': 'rgb(255,255,255)'},

    'WordNode':         {'nodeColor': 'rgb(255,252,247)',     'textColor': 'rgb(0,0,0)'},
    'WordInstanceNode': {'nodeColor': 'rgb(255,252,247)',     'textColor': 'rgb(0,0,0)'},
    'ConceptNode':      {'nodeColor': 'rgb(120,68,74)',       'textColor': 'rgb(255,255,255)'},
    'NumberNode':       {'nodeColor': 'rgba(62,66,58,0.5)',   'textColor': 'rgb(255,255,255)'}
    /* insert arbitrary per-node colors and styles here */

});

app.constant('openpsiVariables', {
    /* keys of this object are also used for queries to OpenPSI */
    'positive-valence' : '#3794A6',
    'negative-valence' : '#FF615A',
    'arousal'          : '#FFD963',
    'power'            : '#4739DA',
    'voice width'      : '#63E340'
})