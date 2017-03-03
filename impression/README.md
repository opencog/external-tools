# Impression

Experimental OpenCog Visualizer for demo purposes.

## Setup on Ubuntu

```sh
sudo apt-get install nodejs-legacy npm
# From within the directory containing this file.
npm install
```

## Run

```sh
npm start
```

Goto http://localhost:8000 in your browser.

## Test

```sh
npm test
```

This spawns two express servers running on ports 8000 for the frontend and 5000 for a debug atomspace. The atoms served come from the `test_jsons` folder. Note that these test datasets are probably only suited for debugging of the Atomspace visualizer and only provide `atoms` and `types` endpoints via GET.

## TODO

  - dynamic updating of atoms
  - try with live chatbot instance

  - hook in to openpsi
  - refactor factories out of app.js
  - general refactoring....