#!/bin/bash

# Concatenate all scheme files produced by sumo-importer.py and label
# each fact by KB-N where N is a number.

#############
# Constants #
#############

SCHEME_DIR="sumo/output"
sexp_start_re='^\('

########
# Main #
########

i=0
while read; do
    if [[ $REPLY =~ $sexp_start_re ]]; then
        if [[ $i != 0 ]]; then
           echo
        fi
        echo ";; KB-$i"
        ((i++))
    fi
    echo "$REPLY"
done < <(cat "$SCHEME_DIR"/*.scm)
