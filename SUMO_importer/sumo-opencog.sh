#!/bin/bash

#############
# Constants #
#############

ATOM_TYPE_FILE="atom-types.txt"

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
# Main #
########

if [ ! -d "sumo" ]; then
info_echo "Download sumo"
git clone https://github.com/ontologyportal/sumo.git
info_echo "Finished downloading SUMO kif files"
fi

cd "sumo/"

if [ ! -f "$ATOM_TYPE_FILE" ]; then
    info_echo "Infer atom types of SUMO instances, put results in sumo/$ATOM_TYPE_FILE"
    info_echo "Be patient, it may take a while..."
    ../sumo-to-atom-types.py *.kif >> "$ATOM_TYPE_FILE"
fi

info_echo "Create scheme files"

for file in *.kif; do
    info_echo "Export $file"
    ../sumo-importer.py "$ATOM_TYPE_FILE" $file
done

info_echo "Move the generated scheme files to sumo/output"
if [ ! -d "output" ]; then
    mkdir -p "output"
fi

mv *.scm output

cd ..

info_echo "Done"
