
var express = require('express');
var cors = require('cors');

var environment = process.env.NODE_ENV || 'production';

var app = express();

app.use(express.static(__dirname + '/'));

app.listen(9000, function () {
  console.log('Glimpse listening on port 9000!');
});


if (environment == "test") {
    var test_atoms = express();

    test_atoms.use(cors());

    test_atoms.use('/api/v1.1/atoms', function(req, res) {
       res.sendFile( __dirname + '/test_jsons/atoms.json');
    });

    test_atoms.use('/api/v1.1/types', function(req, res) {
       res.sendFile( __dirname + '/test_jsons/types.json');
    });

    test_atoms.use('/api/v1.1/scheme', function(req, res) {
       var foo = { 
        'negative-valence': (0.1+(Math.random()*0.15)),
        'positive-valence': (0.2+(Math.random()*0.4)),
        'arousal': (0.3+(Math.random()*0.19)),
        'power': (0.35+(Math.random()*0.24)),
        'voice width': (0.8+(Math.random()*0.21))
       }
       res.send({ 'response' : JSON.stringify(foo)});
    });

    test_atoms.listen(5000, function() {
      console.log('Debug Atoms are listening on port 5000!');
    });
}
