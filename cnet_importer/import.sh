set -e

usage() {
printf "Usage: ./%s [OPTIONS]

  OPTIONS:
    -b   Build the package
    -c=? Path to the conceptnet csv file or directory containing multiple
         csv files. If this is not given then the csv file will be downloaded
         from http://conceptnet5.media.mit.edu/downloads/current/
    -h   Show this help
    -i   Install Ubuntu dependencies \n" "$(basename $0)"

}

import() {
    if [ ! -d build ] ; then
        mkdir build
    fi
}
# -----------------------------------------------------------------------------
# Main Execution
if [ $# -eq 0 ] ; then usage; exit 0 ; fi

while getopts "bc:hi" flag; do
    case $flag in
        b) BUILD_IMPORTER=true ;;
        c) CNET_PATH="$OPTARG" ;;
        i) INSTALL_DEPENDENCIES=true ;;
        h) usage ; exit 0 ;;
        * | \?) usage ; exit 1 ;;
    esac
done

if [ $INSTALL_DEPENDENCIES ]; then
    sudo apt-get -y install qt5-default
fi

# Download word frequency file
if [ -a 60000_Word_Freqs.csv ]; then
    echo "Word frequency file already exists"
else
    wget https://raw.githubusercontent.com/opencog/test-datasets/master/conceptnet/60000_Word_Freqs.csv
    echo "Finished downloading the word frequency file"
fi

# Download conceptnet csv tar ball
if [ -z $CNET_PATH ]; then
    echo "Starting download of conceptnet csv tar ball"
    wget -c http://conceptnet5.media.mit.edu/downloads/current/conceptnet5_flat_csv_5.4.tar.bz2
    echo "Finished download of conceptnet csv tar ball"
    CNET_PATH=conceptnet5_flat_csv_5.4.tar.bz2
fi

# Start parsing
if [ -f $CNET_PATH ]; then
 echo it is a file
elif [ -d $CNET_PATH ]; then
 echo directory

if [ $BUILD_IMPORTER ]; then
    if [ -f Makefile ]; then
        rm Makefile
    if
    qmake -o Makefile cnet_importer.pro && make
    echo "Finished building cnet_importer"
fi
