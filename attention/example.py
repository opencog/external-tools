"""
An example implementation of the interface defined in attention_interface.py
"""

__author__ = 'Cosmo Harrigan'

from attention_interface import *
from time import sleep

# Configurable parameters:
num_steps = 10                            # Number of time steps
output_filename = 'ecan-timeseries.csv'   # Output filename

clear_atomspace()

load_scheme_files(["python/pln/examples/tuffy/smokes/smokes.scm",
                   "python/pln/examples/tuffy/smokes/extra-data.scm"])


timeseries = []

# Run num_steps cycles, capturing the contents of the attentional focus
# at each discrete timestep, and then export the dataset

for t in range(0, num_steps):
    point_in_time = get_attentional_focus(timestep=t)
    timeseries.append(point_in_time)
    importance_diffusion()

    print "------------------------------------------------------\n"\
          "{0}\nAF contents:\n{1}\n".\
        format(point_in_time, dump_attentional_focus_scheme())

    sleep(.1)

write_timeseries(timeseries, output_filename)
