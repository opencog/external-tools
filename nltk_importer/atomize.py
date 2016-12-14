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
        print("Finished adding {} to word_list.\n".format(i))
    except LookupError:
        nltk.download(i)
        print("Adding {} to word_list.".format(i))
        word_list += eval("nltk.corpus.{}.words()".format(i))
        print("Finished adding {} to word_list.\n".format(i))


def keep_word(word):
    """
    If the word has one of the characters specified then return False.
    """
    skip_words_with = ["\"", "/", "\\", "*", "+", "=", "[", "]", "(", ")", "{",
        "}", "<", ">", ",", ";", ":", "|", "#", "@", "%", "$", "^"]
    for i in skip_words_with:
        if i in word:
            return False

    return True

# Clean and start counting
print("Starting counting word frequency")
freq_dist = nltk.FreqDist(filter(keep_word, word_list))
print("Finished counting word frequency\n")

# Create the scheme file that has alist of the frequency distribution.
print("Writing a scheme a-list of the frequency distribution to nltk-en.scm")
# TODO:
# 1. Add creation date of OUTPUT_FILE and the git-sha when creating the
#    the file.
# 2. Move to octool.

output = """
(use-modules (opencog))

(define (create-stv count)
    (define total-count {})
    (define default-k 800) ; From TruthValue::DEFAULT_K
    (stv (/ count total-count) (/ count (+ count default-k)))
)
""".format(freq_dist.N())

for word in freq_dist.keys():
    a_word =  "(Concept \"{}\" (create-stv {}))".format(word.encode("utf-8"),
        freq_dist[word])
    output += a_word + "\n"

with open("nltk-en.scm", "w") as scm:
    scm.write(output)

print("Finished writing to nltk-en.scm\n")
