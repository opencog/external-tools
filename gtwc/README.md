#### Google's Trillion Word Corpus.(GTWC)

* Inspired by https://github.com/first20hours/google-10000-english

* The script is used to generate from [Peter Norvig's](http://norvig.com/ngrams/)
  compilation of the [1/3 million most frequent English words](http://norvig.com/ngrams/count_1w.txt),
  a scheme file containing ConceptNodes with stv calculated from the frequency.

* Run `bash atomize.sh` to get the output file `gtwc-en-333333-words.scm`.

* It takes about 15 seconds to load the ouptut into the atomspace.
