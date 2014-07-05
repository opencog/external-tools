"""
An adaptation of the interface defined in attention_interface.py to the Socrates demo
"""

__author__ = 'Sebastian Ruder'

from attention.attention_interface import *
from opencog.atomspace import types
from time import sleep

# Configurable parameters:
num_steps = 50                            # Number of time steps
output_filename = 'ecan-timeseries.csv'   # Output filename

path = "../opencog/python/pln/examples/attentionallocation/" \
       "socrates_attention_agent"
name = "SocratesAgent"

clear_atomspace()
set_af_boundary(5)

load_python_agent(path)
start_python_agent(path, name)

load_scheme_files(["python/pln/examples/attentionallocation" +
                   "/socrates-attention-node-av.scm"])

# no query to be defined

timeseries = []

for t in range(0, num_steps):
    point_in_time = get_attentional_focus(timestep=t, scheme=True)
    timeseries.append(point_in_time)

    importance_diffusion()
    importance_updating()
    step_python_agent(path, name)

    print "------------------------------------------------------\n"\
          "{0}\n".format(point_in_time)

    #print(dump_atomspace_scheme())
    print(dump_attentional_focus_scheme())

export_timeseries_csv(timeseries, output_filename, scheme=True)
