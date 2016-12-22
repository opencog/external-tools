
# Description
Project cnet importer is a c++ implementation of conceptnet v 5.3 to atomspace import.

# Requirements
QT4 or higher

# Usage
1. Download the csv version of Conceptnet database from
   [here](http://conceptnet5.media.mit.edu/downloads/current/)
2. Run `./import.sh -i ` for installing dependencies
3. Run `./import.sh -c /path/to/the/downloaded/conceptnet/tar/file`. The imports
   will be found in the outputs directory.

# Notes
1. Run `./import.sh -r` for the above three steps, under `Usage`, to be
   undertaken for you.
2. It takes more than 20 minutes to run each file on an intel core i7
   3.07GHz with an SSD. So you may want want to download the ready made
   compressed version from [here](https://drive.google.com/file/d/0BwSBtmJFZjVXbHlEQnZ4YXdFU3M/view?usp=sharing).
3. For compressing the imports of conceptnet-5.4, run
   `tar -jcvf conceptnet5.4-scm-$(date +'%b-%d-%Y').tar.bz2 outputs/`.
4. If you are compressing for the scheme files to be hosted at the download
   site, add a `README.md` file simillar to the following.

   ```
   # Details required to reproduce these scheme files.
   1. Conceptnet csv download details:
      conceptnet5_flat_csv_5.4.tar.bz2   11-Sep-2015 06:47
   2. external-tools Commit Hash: 8c59cb28cc340d9b893e82c3990781f8797f4023
   3. test-datasets Commit Hash: bc5be99c460040990d67f4defdb233de56ad1496
   ```

# Download
A tar ball can be found at https://github.com/opencog/test-datasets/releases.
After downloading, to extract it run `tar -jxvf conceptnet5.4-scm-*.tar.bz2`.
