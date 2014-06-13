"""
An adaptation of the interface defined in attention_interface.py to the Socrates demo
"""

__author__ = 'Sebastian Ruder'

from attention.attention_interface import *
from time import sleep

socrates_agent = "../opencog/python/pln/examples/attentionallocation/socrates_agent"

# Configurable parameters:
num_steps = 10                            # Number of time steps
output_filename = 'ecan-timeseries.csv'   # Output filename

clear_atomspace()

load_scheme_files(["python/pln/examples/relex2logic/socrates-r2l.scm"])

timeseries = []

# Run 'num_steps' cycles. At each discrete timestep, capture the STI values of
# the atoms in the attentional focus, and also capture a Scheme dump of the
# attentional focus. When finished, exports the STI timeseries dataset to
# 'output_filename'.

load_python_agent(socrates_agent)

for i in range(50):
    step_agent(socrates_agent, "SocratesAgent")
    sleep(.1)
    print(i)


print(dump_atomspace_scheme())

for t in range(0, num_steps):
    point_in_time = get_attentional_focus(timestep=t, scheme=True)
    timeseries.append(point_in_time)
    importance_diffusion()

    print("------------------------------------------------------\n"
          "{0}\n".format(point_in_time))

    sleep(.1)
