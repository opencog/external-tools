

var express = require('express');
var cors = require('cors');

var environment = process.env.NODE_ENV || 'production';

var app = express();

app.use(express.static(__dirname + '/app'));

app.listen(8006, function () {
  console.log('Impression listening on port 8006!');
});


if (environment == "test") {
    var test_atoms = express();

    test_atoms.use(cors());

    test_atoms.use(/\/api\/v1.1\/atoms.*/, function(req, res) {
       if (req.query.filterby == "stirange") {
          res.sendFile( __dirname + '/test_jsons/psi/atoms.json');
       } else if (req.query.filterby == "attentionalfocus") {
          res.sendFile( __dirname + '/test_jsons/relex/atoms.json');
       } else {
          res.sendFile( __dirname + '/test_jsons/emoji/atoms.json');
       }
    });

    test_atoms.use('/api/v1.1/types', function(req, res) {
       res.sendFile( __dirname + '/test_jsons/types.json');
    });

    test_atoms.use('/api/v1.1/scheme', function(req, res) {
       var foo = { 
        'negative-valence': (0.1+(Math.random()*0.015)),
        'positive-valence': (0.2+(Math.random()*0.04)),
        'arousal': (0.3+(Math.random()*0.019)),
        'power': (0.35+(Math.random()*0.024)),
        'voice width': (0.8+(Math.random()*0.021))
       }
       res.send({ 'response' : JSON.stringify(foo)});
    });

    test_atoms.listen(5000, function() {
      console.log('Debug Atoms are listening on port 5000!');
    });
}
