
var express = require('express');
var cors = require('cors');

var environment = process.env.NODE_ENV || 'production';

var app = express();

app.use(express.static(__dirname + '/app'));

app.listen(8000, function () {
  console.log('Impression listening on port 8000!');
});


if (environment == "test") {
    var test_atoms = express();

    test_atoms.use(cors());

    test_atoms.use('/api/v1.1/atoms', function(req, res) {
       res.sendFile( __dirname + '/test_jsons/atoms.json');
    });


    test_atoms.use('/api/v1.1/atoms?filterby=stirange&stimin=1&stimax=30000&includeOutgoing=true&includeIncoming=true', function(req, res) {
       res.sendFile( __dirname + '/test_jsons/atoms.json');
    });


    test_atoms.use('/api/v1.1/types', function(req, res) {
       res.sendFile( __dirname + '/test_jsons/types.json');
    });

    test_atoms.use('/api/v1.1/scheme', function(req, res) {
       res.send('{\"arousal\": '+(0.1+(Math.random()*0.08))+', \"valence\": '+(0.4+(Math.random()*0.1))+'}');
    });

    test_atoms.listen(5000, function() {
      console.log('Debug Atoms are listening on port 5000!');
    });
}
