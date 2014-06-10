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

# Run 'num_steps' cycles. At each discrete timestep, capture the STI values of
# the atoms in the attentional focus, and also capture a Scheme dump of the
# attentional focus. When finished, exports the STI timeseries dataset to
# 'output_filename'.

for t in range(0, num_steps):
    point_in_time = get_attentional_focus(timestep=t, scheme=True)
    timeseries.append(point_in_time)
    importance_diffusion()

    print "------------------------------------------------------\n"\
          "{0}\n".format(point_in_time)

    sleep(.1)

write_timeseries(timeseries, output_filename)
