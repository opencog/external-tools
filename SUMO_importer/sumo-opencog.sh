#!/bin/bash

if [ ! -d "sumo" ]; then
echo -e "Downloading sumo \n"
git clone https://github.com/ontologyportal/sumo.git
echo -e "Finished downloading SUMO kif files \n"
fi

echo -e " \n *** Creating scheme files *** \n"
cd "sumo/"

for file in *.kif; do
   python ../sumo-importer.py $file; 
done

echo -e " \n *** Coping the output files to /outputs *** \n "
if [ ! -d "output" ]; then
    mkdir -p "output"
fi

for file in *.scm; do
   mv $file output   
done

echo "Done"


