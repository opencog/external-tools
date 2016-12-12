Glimpse
================

Atomspace Viewer
https://github.com/opencog/atomspace

Setup on Ubuntu
--------
```sh
sudo apt-get install nodejs-legacy npm
# From within the directory containing this file.
npm install
```

Run
---
```sh
npm start
```

Goto http://localhost:9000 in your browser.

Test
----

```sh
npm test
```

This spawns two express servers running on ports 8000 for the frontend and 5000 for a debug atomspace. The atoms served come from the `test_jsons` folder. Note that these test datasets are probably only suited for debugging of the Atomspace visualizer and only provide `atoms` and `types` endpoints via GET.