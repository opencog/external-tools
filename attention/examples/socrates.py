"""
An adaptation of the interface defined in attention_interface.py to the Socrates demo
"""

__author__ = 'Sebastian Ruder'

from attention_interface import *
from time import sleep

socrates_agent = "../../external-tools/attention/socrates_agent"


def load_socrates_agent():
    """
    load SocratesAgent in the CogServer
    """
    shell("loadpy {0}".format(socrates_agent))


def run_socrates_agent():
    """
    run a step of the SocratesAgent
    """
    shell("agents-step {0}.SocratesAgent".format(socrates_agent))

# Configurable parameters:
num_steps = 10                            # Number of time steps
output_filename = 'ecan-timeseries.csv'   # Output filename

clear_atomspace()

load_scheme_files(["python/pln/examples/relex2logic/r2l-output-test.scm"])

timeseries = []

# Run 'num_steps' cycles. At each discrete timestep, capture the STI values of
# the atoms in the attentional focus, and also capture a Scheme dump of the
# attentional focus. When finished, exports the STI timeseries dataset to
# 'output_filename'.

load_socrates_agent()

for i in range(50):
    run_socrates_agent()
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
