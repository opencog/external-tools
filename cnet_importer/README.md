
#Description
Project cnet importer is a c++ implementation of conceptnet v 5.3 to atomspace import.

#Requirements
QT4 or higher 

#Usage
Step 1 - Download the Conceptnet database from [here](http://conceptnet5.media.mit.edu/downloads/current/) and the word frequency csv
file from [here](https://raw.githubusercontent.com/opencog/test-datasets/master/conceptnet/60000_Word_Freqs.csv)

step 2 - Compile cnet_importer.cpp using qmake or from qtcreator IDE

Step 3 - invoke cnet_importer on eache CSV file extracted from the concept net
raw csv compressed archive

example  * > cnet_importer part_00.csv 60000_Word_Freqs.csv  part_00.scm *

generates part_00.scm file.

**Note** It takes more than 20 minutes to run each file on an intel core i7
3.07GHz with an SSD. So you may want want to download the ready made
compressed version from our [downloads](http://buildbot.opencog.org/downloads/)
repository.


