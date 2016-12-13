#!/usr/bin/env bash

# Input file name
INPUT_FILE="/tmp/count_1w.txt"
if [ -f "$INPUT_FILE" ]; then
    rm "$INPUT_FILE"
fi

wget -O "$INPUT_FILE" http://norvig.com/ngrams/count_1w.txt

# Output file name
OUTPUT_FILE="gtwc-en-333333-words.scm"

# TODO:
# 1. Add creation date of OUTPUT_FILE and the git-sha when creating the
#    the file.
# 2. Move to octool.
cat > "$OUTPUT_FILE" << SCM
(use-modules (opencog))

(define (create-stv count)
"
  The total-count used for calculation is sourced from
  https://research.googleblog.com/2006/08/all-our-n-gram-are-belong-to-you.html
  as the Norvig extracted the data in count_1w.txt from gtwc.
"
    (define total-count 1024908267229.0)
    (define default-k 800) ; From TruthValue::DEFAULT_K
    (stv (/ count total-count) (/ count (+ count default-k)))
)

SCM

# Write the ConceptNodes
sed 's/\([a-zA-Z0-9]*\)\t\([a-zA-Z0-9]*\)/(Concept "\1" (create-stv \2))/' \
    "$INPUT_FILE" >> "$OUTPUT_FILE"
