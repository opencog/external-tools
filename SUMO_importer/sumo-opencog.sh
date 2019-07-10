#!/bin/bash

#############
# Constants #
#############

ATOM_TYPE_FILE="atom-types.txt"
ALL_SUMO_KB="all-sumo-labeled-kb.scm"
LOWER_CASE_CONCEPT=""

#############
# Functions #
#############

# Info level logging
info_echo() {
    echo "[INFO] $@"
}

# Warning level logging on stderr
warn_echo() {
    echo "[WARN] $@" 1>&2
}

# Error level logging on stderr and exit
error_echo() {
    echo "[ERROR] $@" 1>&2
    exit 1
}

########
# Args #
########
case $1 in
    -l|--lower) LOWER_CASE_CONCEPT="--lower-case" ;;
esac


########
# Main #
########

if [ ! -d "sumo" ]; then
info_echo "Download sumo"
git clone --depth 1 https://github.com/ontologyportal/sumo.git
info_echo "Finished downloading SUMO kif files"
fi

cd "sumo/"

if [ ! -f "$ATOM_TYPE_FILE" ]; then
    info_echo "Infer atom types of SUMO instances, put results in sumo/$ATOM_TYPE_FILE"
    info_echo "Be patient, it may take a while..."
    ../sumo-to-atom-types.py *.kif tests/*.kif.tq > "$ATOM_TYPE_FILE"
fi


info_echo "Create KB scheme files"

for file in *.kif; do
    info_echo "Export $file"
    ../sumo-importer.py "$ATOM_TYPE_FILE" $file $LOWER_CASE_CONCEPT
done

info_echo "Move the generated scheme files to sumo/output"
if [ ! -d "output" ]; then
    mkdir -p "output"
fi

mv *.scm output

info_echo "Create test scheme files"

for file in tests/*.kif.tq; do
    info_echo "Export $file"
    ../sumo-importer.py "$ATOM_TYPE_FILE" $file
done

info_echo "Move the generated scheme files to sumo/output/tests"
if [ ! -d "output/tests" ]; then
    mkdir -p "output/tests"
fi

mv tests/*.scm output/tests

cd ..

info_echo "Move all scheme expression in $ALL_SUMO_KB and label them"
./label-kb.sh > "$ALL_SUMO_KB"

info_echo "Done"

info_echo "In order to load the scheme files to the atomspace, you may run"
info_echo "guile --no-auto-compile -l $ALL_SUMO_KB"
