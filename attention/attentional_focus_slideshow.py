"""
Example application where changes to the attentional focus over time are
visualized.

Allows analysis of an attentional focus timeseries by creating a slideshow
of PNG images using the Graphviz graph layout utility with DOT graph
description language input generated from Scheme snapshots of the attentional
focus at regular time intervals.

Scheme snapshots of an experiment must be captured first, as demonstrated in
example.py.

A convenient application for viewing a slideshow of images is gwenview:
  sudo apt-get install gwenview

Example usage:

cd ~/external-tools/attention/
python example.py
python attentional_focus_slideshow.py
gwenview ./timeseries -s
"""

import os
from attention_interface import *

__author__ = 'Cosmo Harrigan'

# Sets the subfolder for storing the analysis files
ANALYSIS_FOLDER = os.path.dirname(__file__)

sub_dir = "timeseries"
if not os.path.exists(sub_dir):
    os.makedirs(sub_dir)

client = pymongo.MongoClient(MONGODB_CONNECTION_STRING)
mongo = client[MONGODB_DATABASE]

points = mongo['points']


def render_image():
    dot_filename = "{0}-{1:05d}.dot".format(sub_dir, sequence_number)
    png_filename = "{0}-{1:05d}.png".format(sub_dir, sequence_number)

    dot_full_path = os.path.join(ANALYSIS_FOLDER, sub_dir, dot_filename)
    png_full_path = os.path.join(ANALYSIS_FOLDER, sub_dir, png_filename)

    with open(dot_full_path, 'w') as outfile:
        outfile.write(dot)

    from subprocess import check_call
    check_call(['dot', '-Tpng', dot_full_path, '-o', png_full_path])
    os.remove(dot_full_path)

# Iterate over the point in time snapshots
sequence_number = 0
for point in points.find():
    if len(point['atoms']) == 0:
        continue

    # Insert the Scheme representation of this point in time to the atomspace
    clear_atomspace()
    scheme(point['scheme'])

    # Request the DOT graph representation
    dot = dump_atomspace_dot()

    # Render the graph to an image
    render_image()

    sequence_number += 1
