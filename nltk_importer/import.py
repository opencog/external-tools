#!/usr/bin/env python
import nltk

# English lanugae corpora from the nltk-corpus
corpora_used = ['abc', 'cmudict', 'comparative_sentences', 'conll2000',
    'gazetteers', 'genesis', 'gutenberg', 'inaugural', 'masc_tagged',
    'movie_reviews', 'names', 'opinion_lexicon', 'product_reviews_1',
    'product_reviews_2', 'pros_cons', 'reuters', 'semcor', 'sentence_polarity',
    'state_union', 'subjectivity', 'switchboard', 'webtext', 'words']

# List used to collect word lists from the corpora
word_list = []

# Download the corpora and populate the word_list
for i in corpora_used:
    try:
        nltk.data.find(i)
        print("Adding {} to word_list.".format(i))
        word_list += eval("nltk.corpus.{}.words()".format(i))
        print len(word_list)
        print("Finished adding {} to word_list.\n".format(i))
    except LookupError:
        nltk.download(i)
        print("Adding {} to word_list.".format(i))
        word_list += eval("nltk.corpus.{}.words()".format(i))
        print len(word_list)
        print("Finished adding {} to word_list.\n".format(i))

# Start counting
print("Start counting word frequency")
frequency = nltk.FreqDist(word_list)
print("Finished counting word frequency")
