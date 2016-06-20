set -e

usage() {
printf "Usage: ./%s [OPTIONS]
  OPTIONS:
    -c=? Path to a conceptnet csv file or directory containing multiple
         csv files
    -h   Show this help
    -i   Install Ubuntu dependencies
    -r   Install all dependencies, get conceptnet csv data, and run the
         importer \n" "$(basename $0)"
}

# Download conceptnet csv tar ball
download_conceptnet() {
    echo "Starting download of conceptnet csv tar ball"
    wget -c http://conceptnet5.media.mit.edu/downloads/current/conceptnet5_flat_csv_5.4.tar.bz2
    CNET_FILE_PATH=conceptnet5_flat_csv_5.4.tar.bz2
    echo "Finished download of conceptnet csv tar ball"
}

# The main importing function
#
# $1 = name of csv file to be processed
import() {
    echo "Running the importer on $1"
    if [ ! -d outputs ]; then
        mkdir outputs
    fi
    CSV_FILE_NAME="$(basename $1)"
    OUTPUT_FILE="outputs/${CSV_FILE_NAME/.csv/.scm}"
    ./cnet_importer $1 60000_Word_Freqs.csv $OUTPUT_FILE
    echo "Finished the importing of $1 into $OUTPUT_FILE"
}

install() {
    sudo apt-get -y install qt5-default wget make g++
}

# -----------------------------------------------------------------------------
# Main Execution
# -----------------------------------------------------------------------------
if [ $# -eq 0 ] ; then usage; exit 0 ; fi

while getopts "c:hir" flag; do
    case $flag in
        c) CNET_FILE_PATH="$OPTARG" ;;
        h) usage ; exit 0 ;;
        i) install ; exit 0 ;;
        r) install ; download_conceptnet ;;
        * | \?) usage ; exit 1 ;;
    esac
done

# Download word frequency file
if [ -a 60000_Word_Freqs.csv ]; then
    echo "Word frequency file already exists"
else
    wget https://raw.githubusercontent.com/opencog/test-datasets/master/conceptnet/60000_Word_Freqs.csv
    echo "Finished downloading the word frequency file"
fi

# Build the binary if it doesn't exist
if [ ! -f cnet_importer ]; then
    if [ -f Makefile ]; then
        rm Makefile
    fi
    qmake -o Makefile cnet_importer.pro && make
    echo "Finished building cnet_importer"
else
    echo "cnet_importer already built"
fi

# Set CNET_DIR_PATH to point to directory containing the csv file(s).
if [ -f $CNET_FILE_PATH ]; then
    if [ ${CNET_FILE_PATH: -7} == "tar.bz2" ]; then
        echo "Extracting the tar archive $CNET_FILE_PATH"
        if [ ! -d $PWD/cnet_csv_files ]; then
            mkdir $PWD/cnet_csv_files
        fi
        tar -jxvf $CNET_FILE_PATH -C $PWD/cnet_csv_files
        CNET_DIR_PATH=$PWD/cnet_csv_files/data/assertions/
    else
        import $CNET_FILE_PATH
        exit 0
    fi
elif [ -d $CNET_FILE_PATH ]; then
    CNET_DIR_PATH=$CNET_FILE_PATH
else
    echo "$CNET_FILE_PATH file/directory doesn't exist"
    exit 1
fi

# Start importing
for i in $(ls $CNET_DIR_PATH) ; do
    FILE_PATH=$CNET_DIR_PATH/$i
    if [ -f $FILE_PATH ] && [ ${FILE_PATH: -4} == ".csv" ]; then
        import $FILE_PATH
    else
        echo "Skipping $i. Only files ending with .csv are processed"
    fi
done
